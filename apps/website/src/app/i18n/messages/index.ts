/* Only English is re-exported here: it is the prerender and fallback locale
   and the one dictionary allowed in the initial bundle. Every other locale is
   imported exclusively through `../locale-chunks` so it ships as a lazy chunk;
   re-exporting them from this barrel would pull them all back in eagerly. */
export { en } from './en';
