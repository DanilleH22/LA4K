// schemas/contact.js
export default {
  name: "contact",
  title: "Contact Page",
  type: "document",
  fields: [
// hero

{
  name: "titleScreen",
  title: "Title Screen (Hero)",
  type: "reference",
  to: [{ type: "titleScreen" }],
},


    // Header Section
    {
      name: "headerTitle",
      title: "Header Title",
      type: "string",
      description: "Main heading for the contact page header",
    },
    {
      name: "headerSubtitle",
      title: "Header Subtitle",
      type: "text",
      description: "Subtitle or description under the header",
    },

    {
      name: "contactEyebrow",
      title: "Contact Eyebrow",
      type: "string",
      description: "Eyebrow text for the contact section",
    },
    

    {
      name: "contactSectionTitle",
      title: "Contact Section Title",
      type: "string",
      description: "Title for the contact section",
    },

    // Contact Info Section
   

    // Project Types for Form Dropdown
    {
      name: "projectTypes",
      title: "Project Types",
      type: "array",
      of: [{ type: "string" }],
      description: "Options shown in the project type dropdown in the contact form",
    },

    // FAQ Section
    {
      name: "faqs",
      title: "Frequently Asked Questions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Question", type: "string" },
            { name: "answer", title: "Answer", type: "text" },
          ],
        },
      ],
    },

    // CTA Section
    {
      name: "ctaTitle",
      title: "CTA Title",
      type: "string",
    },
    {
      name: "ctaDescription",
      title: "CTA Description",
      type: "text",
    },
    {
      name: "ctaButtonText",
      title: "CTA Button Text",
      type: "string",
    },
  ],
};
