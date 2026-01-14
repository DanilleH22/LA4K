import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'LA4K-STUDIO',

  projectId: 'q74eh5v5',
  dataset: 'production',

  appID: 'pyc352054dg83p5xbzewkjp0',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
