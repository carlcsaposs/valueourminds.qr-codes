<template>
  <div>
    <div v-show="downloading">
      <p id="spinner-text">Generating posters...</p>
      <b-spinner id="spinner" variant="primary" label="Loading"></b-spinner>
    </div>
    <div v-show="!downloading">
      <heading heading="Create posters" />
      <b-alert show
        >Before creating posters, plan out their locations to approximate how
        many you will need.</b-alert
      >
      <b-form @submit="onSubmit">
        <b-form-group
          label="Select poster design"
          description="Want to add a new poster design? Start a thread on Twist in #2-posters and
      tag @Carl Csaposs."
        >
          <b-form-radio-group id="input-1" v-model="form.design" required plain>
            <b-form-radio
              v-for="(design, id) in designs"
              :key="id"
              :value="id"
              class="radio-item"
              ><img
                :src="require(`@/assets/images/pages/create/designs/${id}.svg`)"
                :alt="design.alt"
            /></b-form-radio>
          </b-form-radio-group>
        </b-form-group>
        <b-form-group label="Number of posters" label-for="input-2">
          <!-- max is set to 250 since Firestore batch writes have a maximum of 500 operations and each write counts as 2 operations (1 for the document write, 1 for the server timestamp) -->
          <b-form-input
            id="input-2"
            v-model="form.quantity"
            type="number"
            min="1"
            max="250"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-checkbox name="input-3" required>
          I understand that each poster has a unique QR code and I will only
          print each poster once.
        </b-form-checkbox>
        <b-form-checkbox name="input-4" required>
          I am planning to place and maintain all of these posters.
        </b-form-checkbox>
        <b-button
          id="download-button"
          type="submit"
          variant="primary"
          :disabled="downloading"
          >{{ downloading ? 'Downloading...' : 'Download posters' }}</b-button
        >
      </b-form>
    </div>
  </div>
</template>

<script>
import { PDFDocument } from 'pdf-lib'
import QRCode from 'qrcode'
import { zipSync } from 'fflate'
export default {
  beforeRouteLeave(to, from, next) {
    this.downloading = false
    this.form = {
      design: null,
      quantity: null,
    }
    next()
  },
  data() {
    return {
      downloading: false,
      form: {
        design: null,
        quantity: null,
      },
      designs: {
        1: {
          alt: 'You are not alone',
          destinationId: '0',
          qr: {
            x: 128.175781,
            y: 613.558594,
            size: 116.765625,
          },
        },
        2: {
          alt: 'Mind the 5',
          destinationId: '1',
          qr: {
            x: 153.820312,
            y: 637.617188,
            size: 92.824219,
          },
        },
      },
    }
  },
  head: {
    title: 'Create posters',
  },
  methods: {
    generateBase36String() {
      // Generate random 5 character base36 string
      const bytes = 4 // log(36^5)/log(2)/8 = ~3.23 bytes
      let array = new Uint8Array(bytes)
      const maxNum = Math.pow(256, bytes) // 256 = 2^8 (# of possible values in 1 byte)
      // Rejection sampling
      while (true) {
        array = window.crypto.getRandomValues(array)
        // Use BigInt() since Number() is limited to 32 bits including sign (31 bits excluding sign) during bitwise operations (and 4 bytes = 32 bits excluding sign > 31 bits)
        let val = 0n
        for (let i = 0; i < bytes; i++) {
          val = (val << 8n) + BigInt(array[i])
        }
        // 60466176 = 36^5
        if (val < maxNum - (maxNum % 60466176)) {
          // Convert number to uppercase base36 (A-Z, 0-9) string
          return (val % 60466176n).toString(36).padStart(5, '0').toUpperCase()
        }
      }
    },
    async generateQrCodeIds(destinationId, quantity) {
      const validIds = []
      while (validIds.length < quantity) {
        // Validate QR code IDs in groups of 9
        const ids = []
        while (ids.length < 9) {
          const id = `/${destinationId}/${this.generateBase36String()}`
          if (!(id in validIds || id in ids)) {
            ids.push(id)
          }
        }
        // Check if IDs are already in database
        // Check 9 IDs at once (10 clauses is the maximum for a Firestore query) at the cost of one read
        const querySnapshot = await this.$fire.firestore
          .collection('qr_code_events')
          .where('type', '==', 'generate')
          .where('qr_id', 'in', ids)
          .limit(9)
          .get()
        querySnapshot.forEach(function (doc) {
          // Remove ID from array
          ids.splice(ids.indexOf(doc.data().qr_id), 1)
        })
        // Add one item at a time to avoid exceeding quantity
        for (let i = 0; i < ids.length; i++) {
          if (validIds.length >= quantity) {
            break
          }
          validIds.push(ids[i])
        }
      }
      return validIds
    },
    async generatePDFs(designId, quantity) {
      const parser = new DOMParser()
      const selectedDesign = this.designs[designId]
      // Generate IDs
      const ids = await this.generateQrCodeIds(
        selectedDesign.destinationId,
        quantity
      )
      // Store PDFs
      const files = {}
      // Fetch base PDF
      const url = `/poster-design-pdfs/${designId}.pdf`
      const basePdfBytes = await fetch(url).then((res) => res.arrayBuffer())
      const basePdf = await PDFDocument.load(basePdfBytes)
      // Generate PDFs
      for (let i = 0; i < Math.ceil(ids.length / 50); i++) {
        // Generate 1 PDF per 50 pages for easier printing
        const pdfDoc = await PDFDocument.create()
        // Min and max ID indices
        const minInclusive = i * 50
        let maxExclusive = (i + 1) * 50
        if (maxExclusive > ids.length) {
          maxExclusive = ids.length
        }
        for (let n = minInclusive; n < maxExclusive; n++) {
          const page = (await pdfDoc.copyPages(basePdf, [0]))[0]
          const qrId = ids[n]
          // Generate qr code
          const generatedQR = await QRCode.toString(
            'HTTPS://L.VALUEOURMINDS.COM/' + qrId,
            {
              type: 'svg',
              errorCorrectionLevel: 'M',
              version: 2,
              margin: 0,
              color: { light: '#0000' }, // Transparent background
            }
          )
          const doc = parser.parseFromString(generatedQR, 'image/svg+xml')
          const qrPath = doc.children[0].children[0].getAttribute('d')
          const qrSize = parseInt(
            doc.children[0].getAttribute('viewBox').split(' ')[3]
          )
          const mediaBox = page.getMediaBox()
          // Convert configured coordinates to PDF coordinates
          // PDF coordinates are from bottom left corner and configured coordinates are from top left corner
          const pdfX = selectedDesign.qr.x
          const pdfY = mediaBox.height - selectedDesign.qr.y
          page.drawSvgPath(qrPath, {
            x: pdfX + mediaBox.x,
            y: pdfY + mediaBox.y,
            scale: selectedDesign.qr.size / qrSize,
          })
          pdfDoc.addPage(page)
        }
        // Store PDF to zip later
        files[`posters-${i + 1}.pdf`] = await pdfDoc.save()
      }
      if (window.location.hostname === 'qr.valueourminds.com') {
        // Send IDs to Firestore
        const batch = this.$fire.firestore.batch()
        const col = this.$fire.firestore.collection('qr_code_events')
        for (let i = 0; i < ids.length; i++) {
          const qrId = ids[i]
          batch.set(col.doc(), {
            qr_id: qrId,
            timestamp: this.$fireModule.firestore.FieldValue.serverTimestamp(),
            type: 'generate',
            design: Number(designId),
          })
        }
        await batch.commit()
        // Zip PDFs and return zip URL
        const zipped = zipSync(
          files,
          { level: 0 } // PDFs are already compressed
        )
        const blob = new Blob([zipped], { type: 'application/zip' })
        return URL.createObjectURL(blob)
      }
    },
    downloadUrl(url, name) {
      const link = document.createElement('a')
      link.download = name
      link.href = url
      link.click()
    },
    async onSubmit(event) {
      event.preventDefault()
      this.downloading = true
      // Create zip
      const zipDataUrl = await this.generatePDFs(
        this.form.design,
        this.form.quantity
      )
      // Download zip
      this.downloadUrl(zipDataUrl, 'posters.zip')
      this.$router.push('/create/next/')
    },
  },
}
</script>

<style lang="scss" scoped>
#spinner {
  width: 3rem;
  height: 3rem;
}
#spinner-text {
  font-size: 2rem;
}
#download-button {
  margin: 0.5rem 0;
}
#input-1 {
  display: flex;
  flex-wrap: wrap;
}
.radio-item {
  width: 50%;
  margin: 0;
  max-width: 15rem;
}
// Hide radio button circle
::v-deep input[type='radio'] {
  opacity: 0;
  width: 0;
  height: 0;
}
input[type='radio'] + label img {
  cursor: pointer;
  padding: 0.3rem;
  max-width: 100%;
}
input[type='radio']:checked + label img {
  border: 0.3rem solid theme-color('primary');
  padding: 0;
}
</style>
