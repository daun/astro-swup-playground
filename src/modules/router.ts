import gsap from 'gsap';

// import Swup from 'swup';
import Swup from '../packages/swup';

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
  containers: ['header', 'main'],
  // animateHistoryBrowsing: true,
  plugins: [
    new SwupA11yPlugin({ respectReducedMotion: true, autofocus: true }),
    // new SwupBodyClassPlugin(),
    // new SwupDebugPlugin(),
    new SwupFormsPlugin(),
    new SwupFragmentPlugin({
      rules: [
        {
          from: '/fragments/:filter?',
          to: '/fragments/:filter?',
          containers: ['#names']
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
    //     {
    //       from: '(.*)',
    //       to: '(.*)',
    //       out: async () => {
    //         const container = document.querySelector('main');
    //         const opacityStart = getComputedStyle(container).opacity;
    //         const transformStart = getComputedStyle(container).transform;
    //         await container!.animate([
    //           { opacity: opacityStart, transform: transformStart },
    //           { opacity: 0, transform: 'translateY(10px)' }
    //         ], 400).finished;
    //       },
    //       in: async () => {
    //         const container = document.querySelector('main');
    //         await container!.animate([
    //           { opacity: 0, transform: 'translateY(10px)' },
    //           { opacity: 1, transform: 'none' }
    //         ], 400).finished;
    //       }
    //     },

    //     // GSAP: sequential
    //     {
    //       from: '(.*)',
    //       to: '(.*)',
    //       out: (onComplete) => {

    //         const container = document.querySelector('main');
    //         // container.style.opacity = 1;
    //         gsap.to(container, { opacity: 0, duration: 0.5, onComplete });
    //         console.log('out', container);
    //       },
    //       in: (onComplete) => {
    //         const container = document.querySelector('main');
    //         container.style.opacity = 0;
    //         gsap.to(container, { opacity: 1, duration: 0.5, onComplete });
    //         console.log('in', container);
    //       }
    //     },
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
    // new SwupMorphPlugin({ containers: ['#randoms'] }),
    // new SwupFadeTheme(),
    // new SwupSlideTheme({ reversed: false }),
    // new SwupOverlayTheme({ color: '#000', duration: 500, direction: 'to-top' }),
  ]
})

window.swup = swup;

swup.hooks.on('visit:start', (visit) => {
  console.log('visit:start', '----------------------------');
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
