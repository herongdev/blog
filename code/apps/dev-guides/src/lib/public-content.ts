import { getCollection } from 'astro:content';
import { isPublicTutorial } from './published-search.mjs';

/** Every public route starts from this collection, never from the author library. */
export async function getPublicTutorials() {
  return (await getCollection('tutorials')).filter(isPublicTutorial);
}
