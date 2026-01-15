export default {
  name: "titleScreen",
  title: "Hero Section",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Hero Title",
      type: "string",
      validation: Rule => Rule.required()
    },
    {
      name: "metaLeft",
      title: "Meta Left",
      type: "string",
    },
    {
      name: "images",
      title: "Hero Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Alt Text",
              type: "string"
            }
          ]
        }
      ]
    }
  ]
};