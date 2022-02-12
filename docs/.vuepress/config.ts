import chokidar = require('chokidar');
import { defineUserConfig } from '@vuepress/cli';
import { logger, path } from '@vuepress/utils';
import {
  getDefaultSidebar,
  getGuideSidebar,
  enNavbarConfig,
  zhNavbarConfig,
} from './configuration';

import type { HopeThemeOptions } from 'vuepress-theme-hope';

export default defineUserConfig<HopeThemeOptions>({
  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_3180165_a8pbcqicbql.css',
      },
    ],
  ],

  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Waline',
      description: '一款基于 Valine 衍生的简洁、安全的评论系统。',
    },
    '/en/': {
      lang: 'en-US',
      title: 'Waline',
      description: 'A Simple Comment System inspired by Valine.',
    },
  },

  markdown: {
    code: {
      lineNumbers: false,
    },
  },

  theme: path.resolve(__dirname, 'theme'),

  themeConfig: {
    hostname: 'https://waline.js.org',

    iconPrefix: 'iconfont icon-',
    logo: '/logo.png',
    repo: 'https://github.com/walinejs/waline',
    docsDir: 'docs',
    docsBranch: 'main',

    pageInfo: ['ReadingTime'],

    locales: {
      '/': {
        navbar: zhNavbarConfig,
        sidebar: {
          '/guide/': getGuideSidebar('', ['快速上手', '客户端', '服务端']),
          '/': getDefaultSidebar('', ['指南', '更多', '迁移', '参考']),
        },

        footer: 'GPL-2.0 协议 | Copyright © 2020-present lizheming',
        displayFooter: true,
      },
      '/en/': {
        navbar: enNavbarConfig,
        sidebar: {
          '/en/guide/': getGuideSidebar('/en', [
            'Get Started',
            'Client',
            'Server',
          ]),
          '/en/': getDefaultSidebar('/en', [
            'Guide',
            'Lear More',
            'Migration',
            'Reference',
          ]),
        },

        footer: 'GPL-2.0 LICENSE | Copyright © 2020-present lizheming',
        displayFooter: true,
      },
    },

    plugins: {
      blog: false,

      comment: {
        type: 'waline',
        serverURL: 'https://waline.vercel.app',
      },

      mdEnhance: {
        codegroup: true,
        tasklist: true,
      },

      pwa: {
        favicon: '/favicon.ico',
        themeColor: '#0e6db1',
        cachePic: true,

        apple: {
          icon: '/assets/icon/apple-icon-152.png',
          statusBarColor: 'white',
        },
        msTile: {
          image: '/assets/icon/ms-icon-144.png',
          color: '#ffffff',
        },

        manifest: {
          name: 'Waline',
          short_name: 'Waline',
          description: 'A simple comment system with backend support',
          icons: [
            {
              src: '/assets/icon/chrome-mask-512.png',
              sizes: '512x512',
              purpose: 'maskable',
              type: 'image/png',
            },
            {
              src: '/assets/icon/chrome-mask-192.png',
              sizes: '192x192',
              purpose: 'maskable',
              type: 'image/png',
            },
            {
              src: '/assets/icon/chrome-512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: '/assets/icon/chrome-192.png',
              sizes: '192x192',
              type: 'image/png',
            },
          ],
          shortcuts: [
            {
              name: '快速上手',
              short_name: '快速上手',
              url: '/guide/get-started',
              icons: [
                {
                  src: '/assets/icon/guide-maskable.png',
                  sizes: '192x192',
                  purpose: 'maskable',
                  type: 'image/png',
                },
                {
                  src: '/assets/icon/guide-monochrome.png',
                  sizes: '192x192',
                  purpose: 'monochrome',
                  type: 'image/png',
                },
              ],
            },
            {
              name: 'Guide Started',
              short_name: 'Guide Started',
              url: '/en/guide/get-started',
              icons: [
                {
                  src: '/assets/icon/guide-maskable.png',
                  sizes: '192x192',
                  purpose: 'maskable',
                  type: 'image/png',
                },
                {
                  src: '/assets/icon/guide-monochrome.png',
                  sizes: '192x192',
                  purpose: 'monochrome',
                  type: 'image/png',
                },
              ],
            },
          ],
        },
      },
    },
  },

  plugins: [
    [
      '@vuepress/plugin-docsearch',
      {
        apiKey: 'd189586c601d439f9247bdaf95b3555f',
        indexName: 'W34KABV4KM',
        locales: {
          '/': {
            placeholder: '搜索文档',
          },
          '/en/': {
            placeholder: 'Search',
          },
        },
      },
    ],
  ],

  // watch navbar
  onWatched: (_, watchers, restart) => {
    const navbarWatcher = chokidar.watch('./configuration/nav/*.ts', {
      cwd: __dirname,
      ignoreInitial: true,
    });

    navbarWatcher.on('change', async (file) => {
      logger.info(`file ${file} is modified`);
      await restart();
    });

    const sidebarWatcher = chokidar.watch('./configuration/sidebar.ts', {
      cwd: __dirname,
      ignoreInitial: true,
    });

    sidebarWatcher.on('change', async (file) => {
      logger.info(`file ${file} is modified`);
      await restart();
    });

    watchers.push(navbarWatcher, sidebarWatcher);
  },
});
