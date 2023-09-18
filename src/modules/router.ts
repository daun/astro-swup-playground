import Swup from 'swup';
// import Swup from '../packages/swup';
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
  // animateHistoryBrowsing: true,
  plugins: [
    new SwupA11yPlugin({
      respectReducedMotion: true,
      announcementTemplate: 'Harhar: {title}',
      announcements: {
        // title: 'Haha: {title}',
        // url: 'Ah ja? {url}',
        'en': {
          title: 'Navigated to: {title}',
          url: 'New page at {url}'
        },
        'fr': {
          title: 'Navigué vers : {title}',
          url: 'Nouvelle page à {url}'
        },
        'es': {
          title: 'Navigado a: {titre}',
          url: 'Nueva pagina en {url}'
        },
        // '*': {
        //   title: '{title}',
        //   url: '{url}'
        // }
      }
    }),
    // new SwupBodyClassPlugin(),
    new SwupDebugPlugin(),
    new SwupFormsPlugin(),
    // new SwupFragmentPlugin({
    //   rules: [
    //     {
    //       from: '/fragments/:filter?',
    //       to: '/fragments/:filter?',
    //       containers: ['#names']
    //     }
    //   ]
    // }),
    new SwupHeadPlugin({
      persistAssets: true,
      awaitAssets: true
    }),
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
    // new SwupPreloadPlugin({ throttle: 5, preloadVisibleLinks: true }),
    // new SwupParallelPlugin({ containers: ['main'], keep: 2 }),
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
    //   animateScroll: {
    //     betweenPages: false,
    //     samePageWithHash: true,
    //     samePage: true
    //   },
    //   doScrollingRightAway: false,
    //   // shouldResetScrollPosition: (e) => false,
    //   offset: 30,
    //   markScrollTarget: true
    // }),
    new SwupMorphPlugin({
      containers: ['#randoms']
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


// @ts-ignore
// swup.hooks.on('page:load', (visit, { page, cache }) => {
//   console.log('loaded', page, 'from cache:', cache)
// })

// swup.hooks.before('page:preload', async (visit, { page }) => {
//   await new Promise((resolve) => setTimeout(resolve, 1000))
//   console.log('will preload', page.url)
// })

// swup.hooks.on('page:preload', async (visit, { page }) => {
//   console.log('preloaded', page.url)
// })


swup.hooks.before('content:announce', (visit) => {
  console.log(visit.a11y)
  // visit.a11y.announce = 'No way'
});

// swup.hooks.on('visit:start', (visit) => {
//   const useViewTransition = visit.animation.animate && !!document.startViewTransition;
//   if (useViewTransition) {
//     visit.animation.wait = true;
//     visit.animation.animate = false;
//     visit.animation.useViewTransition = true;
//     document.documentElement.classList.add('is-view-transition');
//   }
// });

// swup.hooks.on('visit:end', (visit) => {
//   document.documentElement.classList.remove('is-view-transition');
// });

// swup.hooks.replace('visit:transition', async (visit, args, defaultHandler) => {
//   if (!visit.animation.useViewTransition) {
//     return defaultHandler(visit, args);
//   }

//   let rendered: boolean | null = null;
//   const transition = document.startViewTransition(() => {
//     return new Promise((resolve) => {
//       swup.hooks.once('content:replace', () => resolve());
//       defaultHandler(visit, args).then((wasRendered) => rendered = wasRendered);
//     });
//   });

//   await transition.updateCallbackDone;

//   console.log('rendered view?', rendered);

//   if (rendered === false) {
//     transition.skipTransition();
//     return;
//   }

//   // await transition.ready;
//   await transition.finished;
// });
