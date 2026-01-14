export default {
  name: "titleScreen",
  title: "Title Section",
  type: "document",
  fields: [

        { name: "heroTitle",
        title: "Hero Title",
        type: "string" },
        { name: "heroSubtitle", title: "Hero Subtitle", type: "string" },
        {
  name: "heroMedia",
  title: "Hero Media",
  type: "array",
  of: [
    {
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string"
        }
      ]
    },
    {
      type: "file",
      title: "Video"
    }
  ]
}

]

}

