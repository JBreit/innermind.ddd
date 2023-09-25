const dotenv = require('dotenv');
const { scripts } = require('./package');

const { parsed: { HOST, PORT } } = dotenv.config();

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 5,
      staticDistDir: './dist',
      startServerCommand: scripts['serve'],
      settings: {
        preset: 'desktop',
        chromeFlags: '--no-sandbox --disable-dev-shim-usage',
        disableStorageReset: true,
        isSinglePageApplication: true,
        onlyCategories: [
          'accessibility',
          'best-practices',
          'performance',
          'seo',
        ],
        skipAudits: [
          'is-on-https',
          'uses-http2',
        ],
      },
      url: [
        `http://${HOST}:${PORT}`,
      ],
    },
    assert: {
      preset: 'lighthouse:no-pwa', // same as 'lighthouse:recommended' without Progressive Web Application
      assertions: {
        'categories:accessibility': [
          'warn', // 'error'
          {
            minScore: 1,
            aggregationMethod: 'pessimistic',
          },
        ],
        'categories:best-practices': [
          'warn', // 'error'
          {
            minScore: 1,
            aggregationMethod: 'pessimistic',
          },
        ],
        'categories:performance': [
          'warn', // 'error'
          {
            minScore: 0.9,
            aggregationMethod: 'median-run',
          },
        ],
        'categories:seo': [
          'warn', // 'error'
          {
            minScore: 1,
            aggregationMethod: 'pessimistic',
          },
        ],
        // 'categories:pwa': [
        //   'warn', // 'error'
        //   {
        //     minScore: 1,
        //     aggregationMethod: 'pessimistic',
        //   },
        // ],
        'first-contentful-paint': [
          'warn',
          {
            maxNumericValue: 4000,
          },
        ],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
