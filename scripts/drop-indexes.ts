import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongoose';

async function dropIndexes() {
  try {
    await connectToDatabase();
    const db = mongoose.connection.db;
    
    if (!db) {
      console.error('No database connection');
      process.exit(1);
    }

    const indexes = await db.collection('courses').indexes();
    console.log('Current indexes:', indexes.map(i => i.name));

    const indexesToDrop = [
      'curriculum.id_1',
      'curriculum.lessons.id_1', 
      'reviews.id_1'
    ];

    for (const indexName of indexesToDrop) {
      try {
        await db.collection('courses').dropIndex(indexName);
        console.log(`Dropped index: ${indexName}`);
      } catch (err: any) {
        if (err.codeName === 'IndexNotFound') {
          console.log(`Index ${indexName} not found (already dropped)`);
        } else {
          console.error(`Error dropping ${indexName}:`, err.message);
        }
      }
    }

    const newIndexes = await db.collection('courses').indexes();
    console.log('Remaining indexes:', newIndexes.map(i => i.name));
    
    console.log('Done!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

dropIndexes();