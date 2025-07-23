import { defineConfig } from 'astro/config';
// import swup from '@swup/astro';
import tailwind from '@astrojs/tailwind';
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    // tailwind(),
    // swup({
    //   theme: 'fade',
    //   debug: true,
    //   globalInstance: true,
    //   containers: ['header', 'main'],
    //   // ignore: [/-/],
    //   ignore: (url, { el, event }) => {
    //     console.log('ignore', url, el, event)
    //   },
    //   smoothScrolling: true,
    //   reloadScripts: true,
    //   loadOnIdle: true,
    //   routes: [
    //     { name: 'home', path: '' },
    //     { name: 'about', path: '/about' },
    //     { name: 'any', path: '(.*)' }
    //   ]
    // })
  ]
}
);
