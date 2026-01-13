import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "q74eh5v5",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});