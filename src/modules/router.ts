import gsap from 'gsap';

import Swup from 'swup';
import SwupA11yPlugin from '@swup/a11y-plugin';
import SwupBodyClassPlugin from '@swup/body-class-plugin';
import SwupDebugPlugin from '@swup/debug-plugin';
import SwupFormsPlugin from '@swup/forms-plugin';
import SwupFragmentPlugin from '@swup/fragment-plugin';
import SwupJSPlugin from '@swup/js-plugin';
import SwupHeadPlugin from '@swup/head-plugin';
import SwupParallelPlugin from '@swup/parallel-plugin';
import SwupPreloadPlugin from '@swup/preload-plugin';
import SwupProgressPlugin from '@swup/progress-plugin';
import SwupRouteNamePlugin from '@swup/route-name-plugin';
import SwupScriptsPlugin from '@swup/scripts-plugin';
import SwupScrollPlugin from '@swup/scroll-plugin';
import SwupMorphPlugin from 'swup-morph-plugin';
import SwupFadeTheme from '@swup/fade-theme';
import SwupSlideTheme from '@swup/slide-theme';
import SwupOverlayTheme from '@swup/overlay-theme';

/* -------------------------------------------------------------------------- */
/* Plugins: A11y                                                              */
/* -------------------------------------------------------------------------- */

const A11yPlugin = new SwupA11yPlugin({
	respectReducedMotion: true,
	autofocus: true,
	announcements: {
		'en': {
			visit: 'Navigated to: {title}',
			url: 'New page at {url}'
		},
		'de': {
			visit: 'Navigiert zu: {title}',
			url: 'Neue Seite unter {url}'
		},
		'fr': {
			visit: 'Navigué vers : {title}',
			url: 'Nouvelle page à {url}'
		},
		'es': {
			visit: '{title} ha cargado',
			url: 'Nuevo página en {url}'
		},
		'*': {
			visit: '{title}',
			url: '{url}'
		}
	}
});

/* -------------------------------------------------------------------------- */
/* Plugins: Body Class                                                        */
/* -------------------------------------------------------------------------- */

const BodyClassPlugin = new SwupBodyClassPlugin({ attributes: ['lang', 'data-title'] });

/* -------------------------------------------------------------------------- */
/* Plugins: Debug                                                             */
/* -------------------------------------------------------------------------- */

const DebugPlugin = new SwupDebugPlugin();

/* -------------------------------------------------------------------------- */
/* Plugins: Forms                                                             */
/* -------------------------------------------------------------------------- */

const FormsPlugin = new SwupFormsPlugin();

/* -------------------------------------------------------------------------- */
/* Plugins: Fragment                                                          */
/* -------------------------------------------------------------------------- */

const FragmentPlugin = new SwupFragmentPlugin({
	rules: [
		{
			from: '/fragments/:filter?',
			to: '/fragments/:filter?',
			containers: ['#fragments-content', '#fragments-nav', '#fragments-heading']
		}
	]
});

/* -------------------------------------------------------------------------- */
/* Plugins: Head                                                              */
/* -------------------------------------------------------------------------- */

const HeadPlugin = new SwupHeadPlugin({
	persistAssets: true,
	awaitAssets: true,
	attributes: ['data-title', 'lang']
});

/* -------------------------------------------------------------------------- */
/* Plugins: JS                                                                */
/* -------------------------------------------------------------------------- */

const JSPlugin = new SwupJSPlugin({
	animations: [
		// Web animations API: parallel
		{
			from: '(.*)',
			to: '(.*)',
			out: (done) => done(),
			in: async () => {
				const next = document.querySelector('main');
				const prev = document.querySelector('main + main');
				await Promise.all([
					next!.animate([{ opacity: 0, transform: 'translateX(100%)' }, {}], 500)
						.finished,
					prev!.animate([{}, { opacity: 0, transform: 'translateX(-100%)' }], 500)
						.finished
				]);
			}
		},

		// Web animations API: sequential
		{
			from: '(.*)',
			to: '(.*)',
			out: async () => {
				const container = document.querySelector('main');
				const { opacity, transform } = getComputedStyle(container);
				const duration = 400 * (opacity - 0);
				await container!.animate(
					[
						{ opacity, transform },
						{ opacity: 0, transform: 'translateY(10px)' }
					],
					duration
				).finished;
			},
			in: async () => {
				const container = document.querySelector('main');
				const { opacity, transform } = getComputedStyle(container);
				await container!.animate(
					[
						{ opacity: 0, transform: 'translateY(10px)' },
						{ opacity: 1, transform: 'none' }
					],
					400
				).finished;
			}
		},

		// GSAP: sequential
		{
			from: '(.*)',
			to: '(.*)',
			out: (onComplete) => {
				const container = document.querySelector('main');
				// container.style.opacity = 1;
				gsap.to(container, { opacity: 0, duration: 0.5, onComplete });
				console.log('out', container);
			},
			in: (onComplete) => {
				const container = document.querySelector('main');
				container.style.opacity = 0;
				gsap.to(container, { opacity: 1, duration: 0.5, onComplete });
				console.log('in', container);
			}
		}
	]
});

/* -------------------------------------------------------------------------- */
/* Plugins: Parallel                                                          */
/* -------------------------------------------------------------------------- */

const ParallelPlugin = new SwupParallelPlugin({
	containers: ['main'],
	keep: 2
});

/* -------------------------------------------------------------------------- */
/* Plugins: Progress                                                          */
/* -------------------------------------------------------------------------- */

const ProgressPlugin = new SwupProgressPlugin();

/* -------------------------------------------------------------------------- */
/* Plugins: Route Name                                                        */
/* -------------------------------------------------------------------------- */

const RouteNamePlugin = new SwupRouteNamePlugin({
	routes: [
		{ name: 'home', path: '/' },
		{ name: 'filter', path: '/fragments/:slug?' },
		{ name: 'sub', path: '/:slug' },
		{ name: 'any', path: '(.*)' }
	]
});

/* -------------------------------------------------------------------------- */
/* Plugins: Scripts                                                           */
/* -------------------------------------------------------------------------- */

const ScriptsPlugin = new SwupScriptsPlugin();

/* -------------------------------------------------------------------------- */
/* Plugins: Scripts                                                           */
/* -------------------------------------------------------------------------- */

const ScrollPlugin = new SwupScrollPlugin({
	animateScroll: {
		betweenPages: false,
		samePageWithHash: true,
		samePage: true
	},
	doScrollingRightAway: false,
	// shouldResetScrollPosition: (e) => false,
	offset: 30,
	markScrollTarget: true
});

/* -------------------------------------------------------------------------- */
/* Plugins: Morph                                                             */
/* -------------------------------------------------------------------------- */

const MorphPlugin = new SwupMorphPlugin({ containers: ['#randoms'] });

/* -------------------------------------------------------------------------- */
/* Themes                                                                     */
/* -------------------------------------------------------------------------- */

const FadeTheme = new SwupFadeTheme();

const SlideTheme = new SwupSlideTheme({ reversed: false });

const OverlayTheme = new SwupOverlayTheme({ color: '#000', duration: 500, direction: 'to-top' });

/* -------------------------------------------------------------------------- */
/* Swup Core                                                                  */
/* -------------------------------------------------------------------------- */

const swup = new Swup({
	// native: true,
	animationSelector: '[class*="page-transition-"]',
	containers: ['header', 'main'],
	// native: true,
	// animateHistoryBrowsing: true,
	plugins: [
		A11yPlugin,
		BodyClassPlugin,
		// DebugPlugin,
		FormsPlugin,
		FragmentPlugin,
		HeadPlugin,
		// JSPlugin,
		// ParallelPlugin,
		// ProgressPlugin,
		// RouteNamePlugin,
		ScriptsPlugin,
		// SwupScrollPlugin,
		MorphPlugin
		// FadeTheme,
		// SlideTheme,
		// OverlayTheme,
	]
});

window.swup = swup;

/* -------------------------------------------------------------------------- */
/* Debug Hooks                                                                */
/* -------------------------------------------------------------------------- */

window.addEventListener('swup:any', ({ detail: { hook, visit, args } }) => {
	const normal = 'color: black; font-weight: normal;';
	const bold = 'color: black; font-weight: bold;';
	const blue = 'color: blue; font-weight: bold;';
	const red = 'color: red; font-weight: bold;';
	const green = 'color: green; font-weight: bold;';
	const name = [hook, hook === 'content:replace' ? blue : bold];
	const url = [visit.to.url, normal];
	const status = visit.aborted ? ['aborted', red] : ['valid', green]; // ['valid', green]
	const params = false ? [args] : [];
	if (hook === 'visit:start') {
		console.log('visit:start', '----------------------------');
	}
	console.log(
		`%c ${name[0]} %c ${url[0]} %c ${status[0]}`,
		name[1],
		url[1],
		status[1],
		...params
	);
});

/* -------------------------------------------------------------------------- */
/* Custom Hooks                                                               */
/* -------------------------------------------------------------------------- */

swup.hooks.on('visit:start', (visit) => {
	if (visit.to.url === '/stress-testing') {
		console.log('manually aborting visit', visit.to.url);
		// setTimeout(() => visit.abort(), 5);
	}
});
