import { client } from "./client";

let cachedAbout = null;

export async function fetchAbout() {
  if (cachedAbout) return cachedAbout;

  const data = await client.fetch(`
    *[_type == "about"][0]{
      titleScreen->{
        heroTitle,
        heroSubtitle,
        heroMedia
      },

      aboutBackgroundVideo {
        asset->{ url }
      },

      missionTitle,
      missionSubtitle,

      storyEyebrow,
      storyTitle,
      storyTagline,
      storyDescription,
      storySince,
      stats,

      missionEyebrow,
      missionTitleSection,
      missionPoints,
      missionCtaText,

      eyebrowPrincipal,
      titleValues,
      values,

      contactTitle,
      contactDescription,
      contactButtonText,

      storyImage,
      missionImage
    }
  `);

  cachedAbout = data;
  return data;
}

export function clearAboutCache() {
  cachedAbout = null;
}
