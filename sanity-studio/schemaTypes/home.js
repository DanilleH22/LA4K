export default {
  name: "home",
  title: "Home Page",
  type: "document",
  fields: [
    {
  name: "heroSection",
  title: "Hero Section - Company Title Section",
  type: "object",
  fields: [
    {
      name: "title",
      title: "Hero Title",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "metaLeft",
      title: "Meta Left Text",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "metaRight",
      title: "Meta Right Text",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "images",
      title: "Floating Images",
      type: "array",
      validation: Rule => Rule.max(6),
      of: [
        {
          type: "image",
          options: { hotspot: true }
        }
      ]
    }
  ]
},
    {
  name: "ourStory",
  title: "Our Story Section",
  type: "object",
  fields: [
    { name: "ourStoryHeading", title: "Our Story Heading", type: "string" },
    { name: "ourStoryBody", title: "Our Story Body Text", type: "text" },
    {
      name: "media",
      title: "Media",
      type: "array",
      of: [
        { type: "image", options: { hotspot: true } },
        { type: "file", title: "Video", options: { accept: "video/*" } }
      ]
    },
    {
      name: "missionStatements",
      title: "Mission Statements",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" }
          ]
        }
      ]
    }
  ]
}
,
    {
  name: "caseStudy",
  title: "Case Study Section",
  type: "object",
  fields: [
    {
      name: "caseStudyHeading",
      title: "Case Study Heading",
      type: "string",
    },
    {
      name: "caseStudyBody",
      title: "Case Study Body",
      type: "text",
    },
    {
      name: "caseStudyMedia",
      title: "Case Study Videos",
      type: "array",
      of: [
        {
          type: "file",
          title: "Video",
          options: {
            accept: "video/*",
          },
        },
      ],
    },
  ],
},


    {
  name: "trustedFeedback",
  title: "Trusted Feedback Section",
  type: "object",
  fields: [
    { name: "trustedFeedbackHeading", title: "Trusted Feedback Heading", type: "string" },
    { name: "trustedFeedbackBody", title: "Trusted Feedback Body", type: "text" },
    {
      name: "trustedFeedbackMedia",
      title: "Trusted Feedback Media",
      type: "array",
      of: [{ type: "image", title: "Image" }]
    },
    {
      name: "feedbackLeft",
      title: "Left Column Feedback",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "quote", title: "Quote", type: "text" },
            { name: "author", title: "Author", type: "string" },
            { name: "project", title: "Project", type: "string" },
          ]
        }
      ]
    },
    {
      name: "feedbackRight",
      title: "Right Column Feedback",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "quote", title: "Quote", type: "text" },
            { name: "author", title: "Author", type: "string" },
            { name: "project", title: "Project", type: "string" },
          ]
        }
      ]
    }
  ]
},{
  name: "faq",
  title: "Frequently Asked Questions",
  type: "object",
  fields: [
    { name: "faqTitle", title: "FAQ Section Title", type: "string" },
    { name: "faqSubtitle", title: "FAQ Section Subtitle", type: "string" },
    {
      name: "faqItems",
      title: "FAQ Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Question", type: "string" },
            { name: "answer", title: "Answer", type: "text" },
          ]
        }
      ]
    }
  ]
},
{
  name: "servicesSection",
  title: "Services Section",
  type: "object",
  fields: [
    {
      name: "sectionTitle",
      title: "Section Title",
      type: "string",
    },
    {
      name: "sectionSubtitle",
      title: "Section Subtitle",
      type: "string",
    },
    {
      name: "additionalServices",
      title: "Additional Services",
      type: "string",
    },
    {
      name: "services",
      title: "Services",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description 1", type: "string" },
            { name: "description2", title: "Description 2", type: "string" },
            { name: "description3", title: "Description 3", type: "string" },
            { name: "price", title: "Price", type: "string" },
          ],
        },
      ],
    },
  ],

}, 
{
  name: "videoReelSection",
  title: "Video Reel Section",
  type: "object",
  fields: [
    {
      name: "eyebrow",
      title: "Eyebrow Text",
      type: "string",
    },
    {
      name: "heading",
      title: "Heading",
      type: "string",
    },
    {
      name: "projects",
      title: "Projects",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Project Title",
              type: "string",
            },
            {
              name: "description",
              title: "Project Description",
              type: "string",
            },
            {
              name: "image",
              title: "Project Image",
              type: "image",
              options: { hotspot: true },
            },
          ],
        },
      ],
    },
  ],
}
    // Add more sections here (like Testimonials, Services, etc.)
  ]
};
