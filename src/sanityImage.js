// src/sanityImage.js
import { createImageUrlBuilder } from '@sanity/image-url'; // Use named export
import { client } from './sanity/client';

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}