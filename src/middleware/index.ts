import { defineMiddleware } from 'astro:middleware';

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delay(context, next) {
  const delay = 5000;
  console.log(`Delaying ${context.url.pathname} by ${delay}ms`);
  const [response] = await Promise.all([await next(), sleep(delay)]);
  console.log(`Returning response after ${delay}ms`);
  return response;
}

async function nil(context, next) {
  return next();
}

export const onRequest = defineMiddleware(nil);
