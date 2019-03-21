# gatsby-plugin-sentry

Gatsby plugin to add Sentry error tracking to your site.

## Install

`npm install --save gatsby-plugin-sentry`

## How to use

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: "@loicmahieu/gatsby-plugin-sentry",
    options: {
      dsn: "YOUR_SENTRY_DSN_URL",
      // Any sentry client settings, see https://docs.sentry.io/clients/node/config/#optional-settings
    }
  }
];
```
