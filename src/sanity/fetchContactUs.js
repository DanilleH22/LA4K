import { client } from "./client";

let cachedContactUs = null;

export async function fetchContact() {
  if (cachedContactUs) return cachedContactUs;

  const data = await client.fetch(`
    *[_type == "contact"][0]{
      titleScreen->{
        heroTitle,
        heroSubtitle,
        heroMedia
      },
      heroSection,
      contactBackgroundVideo {
        asset->{ url }
      },
      headerTitle,
      headerSubtitle,
      contactEyebrow,
      contactSectionTitle,
      projectTypes,
      faqs,
      ctaTitle,
      ctaDescription,
      ctaButtonText
    }
  `);

  cachedContactUs = data;
  return data;
}

export function clearContactCache() {
  cachedContactUs = null;
}
