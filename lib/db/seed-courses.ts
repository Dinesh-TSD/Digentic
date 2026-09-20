import { connectToDatabase } from '../mongoose';
import { Course } from '../models/course.model';
import { COURSES } from '../courses-data';

async function seedCourses() {
  try {
    await connectToDatabase();
    
    // Check if courses already exist
    const existingCount = await Course.countDocuments();
    if (existingCount > 0) {
      console.log('Courses already seeded. Skipping.');
      return;
    }

    // Transform and insert courses
    const coursesToInsert = COURSES.map(course => ({
      ...course,
      slug: course.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await Course.insertMany(coursesToInsert);
    console.log(`Successfully seeded ${coursesToInsert.length} courses`);
  } catch (error) {
    console.error('Error seeding courses:', error);
    throw error;
  }
}

export { seedCourses };

// Run seed if this file is executed directly
if (require.main === module) {
  seedCourses().then(() => process.exit(0)).catch(() => process.exit(1));
}
