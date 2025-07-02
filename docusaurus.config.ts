import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {

  // Site metadata

  title: 'WECasino Documentation',
  tagline: 'WECasino API Documentation',
  favicon: 'img/favicon.ico',
  // Set the production url of your site here
  url: 'https://www.wecasino.live',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'wecasino', // Usually your GitHub org/user name.
  projectName: 'wecasino-www', // Usually your repo name.
  deploymentBranch: 'main',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          includeCurrentVersion: false,
          versions: {
            // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#VersionsConfig
            // badge: true,
            '1.8.0': {
              label: '1.8.0',
              banner: 'none', 
              badge: true, // always show badge
              noIndex: false, // only last version can be indexed
            },
            // banner: 'unmaintained',
            // noIndex: true,
            '1.7.0': {
              label: '1.7.0',
              banner: 'unmaintained',
              badge: true,
              noIndex: true,
            },
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'beta',
        path: 'beta'
        routeBasePath: '/docs/beta',
        sidebarPath: './sidebars.ts',
        includeCurrentVersion: false,
        versions: {
          '1.8.0-beta.2': {
            label: '測試版',
            path: '1.8.0/beta/1.8.0-beta.2',
            banner: 'unreleased',
          },
          '1.8.0-beta.1': {
            label: '測試版',
            path: '1.8.0/beta/1.8.0-beta.1',
            banner: 'unreleased',
          },
        },
      },
    ],
    // [
    //   '@docusaurus/plugin-content-docs',
    //   {
    //     id: 'alpha',
    //     path: 'versioned_docs/1.8.0/alpha',
    //     routeBasePath: '/docs/alpha',
    //     sidebarPath: './sidebars.ts',
    //     lastVersion: '1.8.0-alpha.1',
    //     versions: {
    //       '1.8.0-alpha.1': {
    //         label: '開發版',
    //         path: '1.8.0/alpha/1.8.0-alpha.1',
    //         banner: 'unreleased',
    //       },
    //     },
    //   },
    // ],
    // [
    //   '@docusaurus/plugin-content-docs',
    //   {
    //     id: 'dev',
    //     path: 'versioned_docs/1.8.0/dev',
    //     routeBasePath: '/docs/dev',
    //     sidebarPath: './sidebars.ts',
    //     lastVersion: '1.8.0-dev.1',
    //     versions: {
    //       '1.8.0-dev.1': {
    //         label: '開發版',
    //         path: '1.8.0/dev/1.8.0-dev.1',
    //         banner: 'unreleased',
    //       },
    //     },
    //   },
    // ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'WECasino Docs',
      logo: {
        alt: 'WECasino Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docsVersion',
          position: 'left',
          label: 'Release',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
        },
        {
          href: 'https://github.com/wecasino/wecasino-www',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Release',
              to: 'docs',
            },
            {
              label: 'beta',
              to: '/docs/beta',
            },
            {
              label: 'alpha',
              to: '/docs/alpha',
            },
            {
              label: 'dev',
              to: '/docs/dev',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/wecasino/wecasino-www',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} WECasino. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
