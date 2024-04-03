import gsap from 'gsap';

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
import SwupFadeTheme from '../packages/fade-theme';
import SwupSlideTheme from '../packages/slide-theme';
import SwupOverlayTheme from '../packages/overlay-theme';

const swup = new Swup({
  // native: true,
  animationSelector: '[class*="page-transition-"]',
  containers: ['header', 'main'],
  // native: true,
  // animateHistoryBrowsing: true,
  plugins: [
    new SwupA11yPlugin({
      contentSelector: 'body',
      respectReducedMotion: true,
      autofocus: true,
      announcements: {
        'en-US': {
          visit: 'Navigated to: {title}',
          url: 'New page at {url}'
        },
        'de-DE': {
          visit: 'Navigiert zu: {title}',
          url: 'Neue Seite unter {url}'
        },
        'fr-FR': {
          visit: 'Navigué vers : {title}',
          url: 'Nouvelle page à {url}'
        },
        '*': {
          visit: '{title}',
          url: '{url}'
        }
      }
    }),
    new SwupBodyClassPlugin(),
    // new SwupDebugPlugin(),
    new SwupFormsPlugin(),
    new SwupFragmentPlugin({
      rules: [
        {
          from: '/fragments/:filter?',
          to: '/fragments/:filter?',
          containers: ['#fragments-content', '#fragments-nav', '#fragments-heading']
        }
      ]
    }),
    new SwupHeadPlugin({ persistAssets: true, awaitAssets: true }),
    // new SwupJSPlugin({
    //   animations: [

    //     // Web animations API: parallel
    //     // {
    //     //   from: '(.*)',
    //     //   to: '(.*)',
    //     //   in: async () => {
    //     //     const next = document.querySelector('main');
    //     //     const prev = document.querySelector('main + main');
    //     //     await Promise.all([
    //     //       next!.animate([{ opacity: 0, transform: 'translateX(100%)' }, {}], 500).finished,
    //     //       prev!.animate([{}, { opacity: 0, transform: 'translateX(-100%)' }], 500).finished
    //     //     ]);
    //     //   }
    //     // },

    //     // Web animations API: sequential
    //     // {
    //     //   from: '(.*)',
    //     //   to: '(.*)',
    //     //   out: async () => {
    //     //     const container = document.querySelector('main');
    //     //     const { opacity, transform } = getComputedStyle(container);
    //     //     const duration = 400 * (opacity - 0);
    //     //     await container!.animate([
    //     //       { opacity, transform },
    //     //       { opacity: 0, transform: 'translateY(10px)' }
    //     //     ], duration).finished;
    //     //   },
    //     //   in: async () => {
    //     //     const container = document.querySelector('main');
    //     //     const { opacity, transform } = getComputedStyle(container);
    //     //     await container!.animate([
    //     //       { opacity: 0, transform: 'translateY(10px)' },
    //     //       { opacity: 1, transform: 'none' }
    //     //     ], 400).finished;
    //     //   }
    //     // },

    //     // // GSAP: sequential
    //     // {
    //     //   from: '(.*)',
    //     //   to: '(.*)',
    //     //   out: (onComplete) => {

    //     //     const container = document.querySelector('main');
    //     //     // container.style.opacity = 1;
    //     //     gsap.to(container, { opacity: 0, duration: 0.5, onComplete });
    //     //     console.log('out', container);
    //     //   },
    //     //   in: (onComplete) => {
    //     //     const container = document.querySelector('main');
    //     //     container.style.opacity = 0;
    //     //     gsap.to(container, { opacity: 1, duration: 0.5, onComplete });
    //     //     console.log('in', container);
    //     //   }
    //     // },
    //   ]
    // }),
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
    new SwupScriptsPlugin(),
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
    new SwupMorphPlugin({ containers: ['#randoms'] }),
    // new SwupFadeTheme(),
    // new SwupSlideTheme({ reversed: false }),
    // new SwupOverlayTheme({ color: '#000', duration: 500, direction: 'to-top' }),
  ]
})

window.swup = swup;

swup.hooks.on('visit:start', (visit) => {
  console.log('visit:start', '----------------------------');
})

swup.hooks.on('visit:start', (visit) => {
  if (visit.to.url === '/stress-testing') {
    console.log('manually aborting visit', visit.to.url );
    // setTimeout(() => visit.abort(), 5);
  }
})

window.addEventListener('swup:any', ({ detail: { hook, visit, args }}) => {
  const normal = 'color: black; font-weight: normal;';
  const bold = 'color: black; font-weight: bold;';
  const blue = 'color: blue; font-weight: bold;';
  const red = 'color: red; font-weight: bold;';
  const green = 'color: green; font-weight: bold;';
  const name = [hook, hook === 'content:replace' ? blue : bold];
  const url = [visit.to.url, normal];
  const status = visit.aborted ? ['aborted', red] : ['valid', green]; // ['valid', green]
  const params = false ? [args] : [];
  console.log(
    `%c ${name[0]} %c ${url[0]} %c ${status[0]}`,
    name[1], url[1], status[1], ...params
  );
})

// swup.hooks.replace('fetch:request', function(visit, { url, options }) {
//   const controller = new AbortController();
//   const { signal } = controller;
//   setTimeout(() => {
//     controller.abort();
//   }, 5)
//   return fetch(url, { ...options, signal });
// });
