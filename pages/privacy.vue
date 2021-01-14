<template>
  <div>
    <heading heading="Privacy Policy" subheading="Your privacy matters" />
    <h2>External links</h2>
    <p>
      This website contains links to external websites. This privacy policy only
      applies to this website, not external websites.
    </p>
    <h2>Data collected by third parties</h2>
    <p>
      This website uses the following third-party services: Netlify Edge, Cloud
      Firestore.
    </p>
    <h3>Netlify Edge</h3>
    <p>
      When you load a page on this website, Netlify Edge stores the following
      information for 30 days:
    </p>
    <ul>
      <li>The URL of the page loaded</li>
      <li>Your IP address</li>
      <li>
        Your user agent (usually contains browser and operating system versions)
      </li>
      <li>The URL of the previous page, if your browser sends it</li>
    </ul>
    <p>
      Netlify Edge is subject to
      <a href="https://www.netlify.com/privacy">Netlify's Privacy Policy</a>.
    </p>
    <h3>Cloud Firestore</h3>
    <p>
      Cloud Firestore stores data collected directly by this website and does
      not collect any additional data.
    </p>
    <p>
      Cloud Firestore is subject to
      <a href="https://policies.google.com/privacy">Google's Privacy Policy</a>.
    </p>
    <h2>Data collected directly by this website</h2>
    <p>All data collected directly by this website may be made public.</p>
    <h3>Data automatically collected</h3>
    <p>This website automatically collects the following data:</p>
    <ul>
      <li>
        When posters are downloaded from this website, this website stores:
        <ul>
          <li>
            The unique identifier embedded in the QR code of the poster
            <ul>
              <li>
                This identifier will later be associated with the geographic
                coordinates where the poster is placed
              </li>
            </ul>
          </li>
          <li>The time the poster was downloaded, to the nearest nanosecond</li>
          <li>Which poster design was selected</li>
        </ul>
      </li>
    </ul>

    <h2>Contact</h2>
    <p>
      If you have any questions about this privacy policy, please send an email
      to
      <a href="mailto:contact@valueourminds.com">contact@valueourminds.com</a>.
    </p>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Privacy Policy',
  },
}
</script>
