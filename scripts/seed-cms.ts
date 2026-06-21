import { config } from "dotenv"
import { seedCmsContent } from "../lib/cms/seed"

config({ path: ".env.local" })
config({ path: ".env" })

async function main() {
  console.log("Seeding CMS content...")
  const result = await seedCmsContent()
  console.log(`Done. Created: ${result.created}, Updated: ${result.updated}`)
}

main().catch((error) => {
  console.error("Seed failed:", error)
  process.exit(1)
})
