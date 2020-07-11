module.exports = {
  title: 'CI Hackathon',
  tagline: 'Crowdsourced science to help cochlear implant wearers hear better',
  url: 'https://localhost:3000',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'kmerri11', // Usually your GitHub org/user name.
  projectName: 'cihackathon', // Usually your repo name.
  themeConfig: {
    disableDarkMode: true,
    // Google Analytics
    gtag: {
      trackingID: "G-TBXF7PSF2Q",
    },
    navbar: {
      title: 'Cochlear Implant Hackathon',
      logo: {
        alt: 'CI Hackathon',
        src: 'img/logo.svg',
      },
      links: [
        {
          to: 'docs/history',
          activeBasePath: 'docs',
          label: 'About',
          position: 'left',
        },
        {
          to: 'docs/getting_started',
          activeBasePath: 'docs',
          label: 'Getting Started',
          position: 'left',
        },
        {
          href: 'https://master.d1k5pqsgfrsgrv.amplifyapp.com/profile/',
          label: 'Register',
          position: 'right',
        },
        {
          href: 'https://master.d1k5pqsgfrsgrv.amplifyapp.com/profile/',
          label: 'Login',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: { src: 'img/ci-hackathon-logo.png', alt: 'CI Hackathon Logo' },
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Advanced Bionics',
              href: 'https://advancedbionics.com/',
            },
            {
              label: 'Tward Lab',
              href: 'https://twardlab.ucsf.edu/',
            },
            {
              label: 'University of California San Francisco',
              to: 'https://www.ucsf.edu/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CI Hackathon. Tward Lab.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'getting-started',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
