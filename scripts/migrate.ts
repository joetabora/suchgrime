import { config } from "dotenv"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { migrate } from "drizzle-orm/neon-http/migrator"

config({ path: ".env.local" })
config({ path: ".env" })

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env.local and add your Neon connection string.",
    )
  }

  console.log("Running migrations via Neon HTTP...")
  const sql = neon(url)
  const db = drizzle(sql)
  await migrate(db, { migrationsFolder: "./drizzle" })
  console.log("Migrations complete.")
}

main().catch((error) => {
  console.error("Migration failed:", error)
  process.exit(1)
})
