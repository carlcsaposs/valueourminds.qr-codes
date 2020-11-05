TODO: Add redirects in "dist/\_redirects"

TODO: Update copyright year in LICENSE, if neccessary

TODO: Configure repository settings

- Only allow squash merge
- Enable automatic deletion of head branches
- Add branch protection to "main"
  - Require status checks
    - Require branches be up to date
    - Require the following Netlify status checks:
      - Header rules
      - Mixed content
      - Redirect rules
      - Deploy preview
    - Require linear history
    - Include administrators
- Add Dependabot security alerts for valueourminds/everyone
- Add write access for valueourminds/everyone
- Disable releases & packages from displaying on the home page
- Add "dependencies" label with color #d4c5f9

TODO: Add site in Netlify & disable form detection

TODO: Remove TODO comments from this README file

# Build Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/395e08a2-11e0-4b19-93a2-59a25a86fffa/deploy-status)](https://app.netlify.com/sites/nuxt-static-website-template-e1bcf8/deploys?filter=main)

TODO: Replace Netlify deploy status badge (above in this README file) & add "?filter=main" to the end of the link (the link should end in "/deploys?filter=main")

# Contributing

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
