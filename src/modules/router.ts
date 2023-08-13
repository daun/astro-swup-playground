import Swup from 'swup';
import SwupA11yPlugin from '../packages/a11y-plugin';
import SwupBodyClassPlugin from '../packages/body-class-plugin';
import SwupDebugPlugin from '../packages/debug-plugin';
import SwupFormsPlugin from '../packages/forms-plugin';
import SwupFragmentPlugin from '../packages/fragment-plugin';
import SwupJSPlugin from '../packages/js-plugin';
import SwupHeadPlugin from '../packages/head-plugin';
import SwupParallelPlugin from '../packages/parallel-plugin';
import SwupPreloadPlugin from '../packages/preload-plugin';
import SwupProgressPlugin from '../packages/progress-plugin';
import SwupRouteNamePlugin from '../packages/route-name-plugin';
import SwupScriptsPlugin from '../packages/scripts-plugin';
import SwupScrollPlugin from '../packages/scroll-plugin';
import SwupMorphPlugin from '../packages/morph-plugin';
import SwupFadeTheme from '../packages/fade'
import SwupSlideTheme from '../packages/slide'
import SwupOverlayTheme from '../packages/overlay'

const swup = new Swup({
  containers: ['header', 'main'],
  plugins: [
    // new SwupA11yPlugin(),
    // new SwupBodyClassPlugin(),
    // new SwupDebugPlugin(),
    // new SwupFormsPlugin(),
    // new SwupFragmentPlugin({
    //   rules: [
    //     {
    //       from: '/fragments/:filter?',
    //       to: '/fragments/:filter?',
    //       containers: ['#names']
    //     }
    //   ]
    // }),
    // new SwupHeadPlugin({
    //   persistAssets: true,
    //   awaitAssets: true
    // }),
    // new SwupJSPlugin({
    //   animations: [
    //     {
    //       from: '(.*)',
    //       to: '(.*)',
    //       in: async () => {
    //         const container = document.querySelector('main');
    //         await container!.animate([{ opacity: 0 }, { opacity: 1 }], 300).finished;
    //       },
    //       out: async () => {
    //         const container = document.querySelector('main');
    //         await container!.animate([{ opacity: 1 }, { opacity: 0 }], 300).finished;
    //       }
    //     },
    //     {
    //       from: '(.*)',
    //       to: '(.*)',
    //       in: async () => {
    //         const container = document.querySelector('main');
    //         await container!.animate([{ opacity: 0.5 }, { opacity: 1 }], 600).finished;
    //       },
    //       out: async () => {
    //         const container = document.querySelector('main');
    //         await container!.animate([{ opacity: 1 }, { opacity: 0.5 }], 600).finished;
    //       }
    //     },
    //   ]
    // }),
    new SwupPreloadPlugin({ throttle: 2, preloadVisibleLinks: false }),
    // new SwupParallelPlugin({ containers: ['main'] }),
    // new SwupProgressPlugin(),
    // new SwupRouteNamePlugin({
    //   routes: [
    //     { name: 'home', path: '/' },
    //     { name: 'filter', path: '/fragments/:slug?' },
    //     { name: 'sub', path: '/:slug' },
    //     { name: 'any', path: '(.*)' }
    //   ]
    // }),
    // new SwupScriptsPlugin(),
    // new SwupScrollPlugin({
    //   offset: 30,
    //   doScrollingRightAway: true
    // }),
    new SwupMorphPlugin({
      containers: ['#random']
    }),
    // new SwupFadeTheme(),
    // new SwupSlideTheme({ reversed: false }),
    // new SwupOverlayTheme({
    //   // color: '#000',
    //   duration: 500,
    //   direction: 'to-top',
    // }),
  ]
})

// swup.preload(Array.from(document.querySelectorAll('a[href]')));

swup.hooks.on('visit:start', (visit) => {
  console.log('visit', visit.from.url, visit.to.url, visit.animation.name);
  // @ts-ignore
  console.log('route', visit.from.route, visit.to.route);
})

// @ts-ignore
swup.hooks.on('page:load', (visit, { page, cache }) => {
  console.log('loaded', page, 'from cache:', cache)
})

// @ts-ignore
swup.hooks.on('page:preload', (visit, { page }) => {
  console.log('preloaded', page)
})
