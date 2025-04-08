import connectClient from "../config/client";
import * as path from "path";
import * as fs from "fs";

interface MigrationRow {
  migration: string;
}

const migrations_dir = path.resolve("src/migrations");

/**
 * Generate migration file and apply it to the database
 *
 * This function will create a migration table if it does not exist, and
 * apply all unexecuted migration files in the migrations directory to the
 * database.
 *
 * After applying all migrations, the function will exit with code 0 if no
 * errors occur, or 1 if an error occurs while applying a migration.
 */
export const generateMigrationFile = async () => {
  const client = await connectClient();
  const { rows } = await client.query(
    `SELECT * FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'migrations';`
  );

  if (rows.length === 0) {
    await client.query(
      `CREATE TABLE migrations (
        id SERIAL PRIMARY KEY,
        migration VARCHAR(255) NOT NULL,
        batch INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`
    );

    console.log("Migration table created");
  }

  // Get all migration files
  const migration_files = fs.readdirSync(migrations_dir).sort();

  // Get executed migrations
  const executed_migrations: string[] = (
    await client.query<MigrationRow>("SELECT migration FROM migrations")
  ).rows.map((m) => m.migration);

  // Get unexecuted migrations
  const unexecuted_migrations = migration_files.filter(
    (file) => !executed_migrations.includes(file)
  );

  // Check if there are any unexecuted migrations
  if (unexecuted_migrations.length === 0) {
    console.log("No migration to apply");
    process.exit(0);
  }

  let batch = 1;
  for (const file of migration_files) {
    const file_path = path.join(migrations_dir, file);
    const sql = fs.readFileSync(file_path, "utf8");

    try {
      const up_query = sql.split("-- UP")[1].split("-- DOWN")[0].trim();
      await client.query(up_query);

      // Insert migration record
      await client.query(
        "INSERT INTO migrations (migration, batch) VALUES ($1, $2)",
        [file, batch]
      );
      console.log(`${file} applied successfully.`);
    } catch (error: any) {
      console.error(`Error applying migration ${file}:`, error.message);
      process.exit(1);
    }
  }

  console.log("All migration already created");
  client.end();
};

generateMigrationFile();
