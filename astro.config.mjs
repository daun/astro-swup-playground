import { defineConfig } from 'astro/config';
// import swup from '@swup/astro';

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    // swup({
    //   theme: 'fade',
    //   debug: true,
    //   containers: ['main', 'header'],
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
