import { db } from '../db';
import { resources } from '../db/schema';
import { parsedResources } from './parse_resources';

async function populateDatabase() {
  try {
    console.log('Starting database population...');
    
    // Insert resources in batches
    const batchSize = 50;
    for (let i = 0; i < parsedResources.length; i += batchSize) {
      const batch = parsedResources.slice(i, i + batchSize);
      await db.insert(resources).values(batch).onConflictDoNothing();
      console.log(`Inserted batch ${i / batchSize + 1}`);
    }

    console.log('Database population completed successfully');
  } catch (error) {
    console.error('Error populating database:', error);
    process.exit(1);
  }
}

// Run the population script
populateDatabase();
