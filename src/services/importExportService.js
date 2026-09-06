import db from "../db/database";

const TABLES = [
  "users",
  "subjects",
  "chapters",
  "lessons",
  "quizzes",
  "flashcards",
  "progress"
];

export async function exportDatabase() {
  const data = {};

  for (const table of TABLES) {
    data[table] = await db.table(table).toArray();
  }

  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    data
  };
}

export async function importDatabase(payload) {
  if (!payload?.data) {
    throw new Error("Invalid SIH 26042 data package.");
  }

  await db.transaction("rw", TABLES.map((name) => db.table(name)), async () => {
    for (const table of TABLES) {
      const records = payload.data[table];

      if (Array.isArray(records) && records.length > 0) {
        await db.table(table).bulkPut(records);
      }
    }
  });
}
