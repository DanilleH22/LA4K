export default {
  name: "about",
  title: "About Page",
  type: "document",
  fields: [
  
    // hero 


    {
      name: "aboutBackgroundVideo",
      title: "Hero Title For About Page",
      type: "file", // Use 'file' for videos
      options: {
        accept: "video/mp4,video/webm,video/ogg", // restrict file types
      }
    },
     





    // HERO / MISSION
    {
      name: "missionTitle",
      title: "Mission Title",
      type: "string",
    },
    {
      name: "missionSubtitle",
      title: "Mission Subtitle",
      type: "text",
    },

    // STORY SECTION
    {
      name: "storyEyebrow",
      title: "Story Eyebrow (small header)",
      type: "string",
    },
    {
      name: "storyTitle",
      title: "Story Title",
      type: "string",
    },
    {
      name: "storyTagline",
      title: "Story Tagline",
      type: "string",
    },
    {
      name: "storyDescription",
      title: "Story Description",
      type: "text",
    },
    {
      name: "storySince",
      title: "Story Since (badge text)",
      type: "string",
    },
    {
      name: "stats",
      title: "Story Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "number", title: "Number", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
        },
      ],
    },

    // MISSION SECTION
    {
      name: "missionEyebrow",
      title: "Mission Eyebrow (small header)",
      type: "string",
    },
    {
      name: "missionTitleSection",
      title: "Mission Section Title",
      type: "string",
    },
    {
      name: "missionPoints",
      title: "Mission Points",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Icon", type: "string" },
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
          ],
        },
      ],
    },
    {
      name: "missionCtaText",
      title: "Mission CTA Text",
      type: "string",
    },

   

    // VALUES SECTION
    {
      name: "eyebrowPrincipal",
      title: "Values Section Eyebrow",
      type: "string",
    },
    {
      name: "titleValues",
      title: "Values Section Title",
      type: "string",
    },
    {
      name: "values",
      title: "Values",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Icon", type: "string" },
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "string" },
          ],
        },
      ],
    },

    // CONTACT CTA
    {
      name: "contactTitle",
      title: "Contact CTA Title",
      type: "string",
    },
    {
      name: "contactDescription",
      title: "Contact CTA Description",
      type: "text",
    },
    {
      name: "contactButtonText",
      title: "Contact Button Text",
      type: "string",
    },

     // Images
    {
      name: 'storyImage',
      title: 'Our Story Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ]
    },
    {
      name: 'missionImage',
      title: 'Our Mission Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ]
    }
  ],
};
