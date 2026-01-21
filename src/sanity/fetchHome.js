import { client } from "./client";

let cachedHome = null;

export async function fetchHome() {
  if (cachedHome) {
    return cachedHome; // reuse cached result
  }

  const data = await client.fetch(`
    *[_type == "home"][0]{
      heroSection,
      ourStory{
        ourStoryHeading,
        ourStoryBody,
        backgroundVideo{
          asset->{ url }
        },
        missionStatements[]{
          title,
          description
        }
      },

      caseStudy{
        caseStudyHeading,
        caseStudyBody,
        caseStudyMedia[]{
          asset->{ url }
        }
      },

      trustedFeedback,
      faq,
      servicesSection,

      videoReelSection{
        eyebrow,
        heading,
        projects[]{
          title,
          description,
          image{
            asset->
          }
        }
      }
    }
  `);

  cachedHome = data;
  return data;
}

export function clearHomeCache() {
  cachedHome = null;
}