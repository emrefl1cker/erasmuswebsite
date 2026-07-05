import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { projectId, dataset } from "./ayarlar.js";
import { semalar } from "./semalar.js";

export default defineConfig({
  name: "fbu-erasmus",
  title: "FBÜ Erasmus+ Yönetim Paneli",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: semalar },
});
