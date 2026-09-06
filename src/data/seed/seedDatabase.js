import db from "../../db/database";
import { seedData } from "./seedData";

export async function seedDatabase() {
  for (const [table, records] of Object.entries(seedData)) {
    if (records.length === 0) continue;

    const count = await db.table(table).count();

    if (count === 0) {
      await db.table(table).bulkAdd(records);
    }
  }
}
