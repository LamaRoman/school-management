/**
 * ═══════════════════════════════════════════════════════════════
 * DATABASE SEED FILE
 * ═══════════════════════════════════════════════════════════════
 * 
 * Populates database with sample data for testing and development
 * 
 * Run: npm run seed
 * Or: node prisma/seed.js
 * 
 * ⚠️ WARNING: This will clear existing data!
 * 
 * ═══════════════════════════════════════════════════════════════
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * ───────────────────────────────────────────────────────────────
 * Helper: Hash Password
 * ───────────────────────────────────────────────────────────────
 */
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

/**
 * ───────────────────────────────────────────────────────────────
 * Clear Existing Data
 * ───────────────────────────────────────────────────────────────
 */
async function clearDatabase() {
  console.log('🗑️  Clearing existing data...');
  
  // Delete in correct order (respecting foreign keys)
  await prisma.attendance.deleteMany();
  await prisma.result.deleteMany();
  await prisma.mark.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.subjectTeacher.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.class.deleteMany();
  await prisma.academicYear.deleteMany();
  await prisma.user.deleteMany();
  
  console.log('✅ Database cleared\n');
}

/**
 * ───────────────────────────────────────────────────────────────
 * Seed Academic Years
 * ───────────────────────────────────────────────────────────────
 */
async function seedAcademicYears() {
  console.log('📅 Seeding academic years...');
  
  const academicYears = await prisma.academicYear.createMany({
    data: [
      {
        name: '2024-2025',
        startDate: new Date('2024-04-01'),
        endDate: new Date('2025-03-31'),
        isCurrent: true,
      },
      {
        name: '2023-2024',
        startDate: new Date('2023-04-01'),
        endDate: new Date('2024-03-31'),
        isCurrent: false,
      },
    ],
  });
  
  const currentYear = await prisma.academicYear.findFirst({
    where: { isCurrent: true }
  });
  
  console.log(`✅ Created ${academicYears.count} academic years\n`);
  return currentYear;
}

/**
 * ───────────────────────────────────────────────────────────────
 * Seed Classes
 * ───────────────────────────────────────────────────────────────
 */
async function seedClasses(academicYearId) {
  console.log('🏫 Seeding classes...');
  
  const classes = await prisma.class.createMany({
    data: [
      // Grade 1
      { name: 'Grade 1', section: 'A', academicYearId, capacity: 30 },
      { name: 'Grade 1', section: 'B', academicYearId, capacity: 30 },
      
      // Grade 2
      { name: 'Grade 2', section: 'A', academicYearId, capacity: 30 },
      
      // Grade 3
      { name: 'Grade 3', section: null, academicYearId, capacity: 25 }, // Single section
      
      // Grade 4
      { name: 'Grade 4', section: 'A', academicYearId, capacity: 30 },
      { name: 'Grade 4', section: 'B', academicYearId, capacity: 30 },
    ],
  });
  
  const allClasses = await prisma.class.findMany({
    where: { academicYearId }
  });
  
  console.log(`✅ Created ${classes.count} classes\n`);
  return allClasses;
}

/**
 * ───────────────────────────────────────────────────────────────
 * Seed Users & Students
 * ───────────────────────────────────────────────────────────────
 */
async function seedStudents(classes) {
  console.log('👨‍🎓 Seeding students...');
  
  const studentData = [
    // Grade 1-A Students
    { firstName: 'John', lastName: 'Doe', email: 'john.doe@student.com', class: classes[0] },
    { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@student.com', class: classes[0] },
    { firstName: 'Mike', lastName: 'Johnson', email: 'mike.johnson@student.com', class: classes[0] },
    
    // Grade 1-B Students
    { firstName: 'Sarah', lastName: 'Williams', email: 'sarah.williams@student.com', class: classes[1] },
    { firstName: 'Tom', lastName: 'Brown', email: 'tom.brown@student.com', class: classes[1] },
    
    // Grade 2-A Students
    { firstName: 'Alice', lastName: 'Davis', email: 'alice.davis@student.com', class: classes[2] },
    { firstName: 'Bob', lastName: 'Miller', email: 'bob.miller@student.com', class: classes[2] },
    
    // Grade 3 Students
    { firstName: 'Carol', lastName: 'Garcia', email: 'carol.garcia@student.com', class: classes[3] },
    
    // Grade 4-A Students
    { firstName: 'David', lastName: 'Martinez', email: 'david.martinez@student.com', class: classes[4] },
    { firstName: 'Emma', lastName: 'Rodriguez', email: 'emma.rodriguez@student.com', class: classes[4] },
  ];
  
  let rollNumber = 1;
  const students = [];
  
  for (const data of studentData) {
    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: await hashPassword('password123'), // Default password
        role: 'STUDENT',
        isActive: true,
      },
    });
    
    // Create student
    const student = await prisma.student.create({
      data: {
        userId: user.id,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: new Date('2015-05-15'),
        gender: 'MALE',
        classId: data.class.id,
        rollNumber: rollNumber++,
        admissionDate: new Date('2024-04-01'),
        bloodGroup: 'O+',
        fathersName: `Father of ${data.firstName}`,
        mothersName: `Mother of ${data.firstName}`,
      },
    });
    
    students.push(student);
  }
  
  console.log(`✅ Created ${students.length} students\n`);
  return students;
}

/**
 * ───────────────────────────────────────────────────────────────
 * Seed Teachers
 * ───────────────────────────────────────────────────────────────
 */
async function seedTeachers() {
  console.log('👨‍🏫 Seeding teachers...');
  
  const teacherData = [
    { firstName: 'Robert', lastName: 'Anderson', email: 'robert.anderson@teacher.com' },
    { firstName: 'Lisa', lastName: 'Taylor', email: 'lisa.taylor@teacher.com' },
    { firstName: 'James', lastName: 'Wilson', email: 'james.wilson@teacher.com' },
  ];
  
  const teachers = [];
  
  for (const data of teacherData) {
    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: await hashPassword('password123'),
        role: 'TEACHER',
        isActive: true,
      },
    });
    
    // Create teacher
    const teacher = await prisma.teacher.create({
      data: {
        userId: user.id,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: new Date('1985-06-15'),
        gender: 'MALE',
        joiningDate: new Date('2020-01-01'),
        qualification: 'M.Ed',
        experience: 5,
      },
    });
    
    teachers.push(teacher);
  }
  
  console.log(`✅ Created ${teachers.length} teachers\n`);
  return teachers;
}

/**
 * ───────────────────────────────────────────────────────────────
 * Seed Admin User
 * ───────────────────────────────────────────────────────────────
 */
async function seedAdmin() {
  console.log('👑 Seeding admin user...');
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@school.com',
      password: await hashPassword('admin123'),
      role: 'ADMIN',
      isActive: true,
    },
  });
  
  console.log('✅ Created admin user');
  console.log('   Email: admin@school.com');
  console.log('   Password: admin123\n');
  
  return admin;
}

/**
 * ───────────────────────────────────────────────────────────────
 * Seed Subjects
 * ───────────────────────────────────────────────────────────────
 */
async function seedSubjects(classes, teachers) {
  console.log('📚 Seeding subjects...');
  
  const subjectData = [
    { name: 'Mathematics', code: 'MATH101', classId: classes[0].id },
    { name: 'English', code: 'ENG101', classId: classes[0].id },
    { name: 'Science', code: 'SCI101', classId: classes[0].id },
    
    { name: 'Mathematics', code: 'MATH201', classId: classes[2].id },
    { name: 'English', code: 'ENG201', classId: classes[2].id },
  ];
  
  const subjects = [];
  
  for (const data of subjectData) {
    const subject = await prisma.subject.create({
      data: {
        ...data,
        totalMarks: 100,
        passingMarks: 40,
      },
    });
    
    // Assign teacher to subject
    await prisma.subjectTeacher.create({
      data: {
        teacherId: teachers[0].id, // Assign first teacher to all subjects
        subjectId: subject.id,
      },
    });
    
    subjects.push(subject);
  }
  
  console.log(`✅ Created ${subjects.length} subjects\n`);
  return subjects;
}

/**
 * ───────────────────────────────────────────────────────────────
 * Main Seed Function
 * ───────────────────────────────────────────────────────────────
 */
async function main() {
  console.log('\n🌱 Starting database seeding...\n');
  
  try {
    // Clear existing data
    await clearDatabase();
    
    // Seed data in order
    const academicYear = await seedAcademicYears();
    const classes = await seedClasses(academicYear.id);
    const students = await seedStudents(classes);
    const teachers = await seedTeachers();
    const admin = await seedAdmin();
    const subjects = await seedSubjects(classes, teachers);
    
    console.log('🎉 Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   - Academic Years: 2`);
    console.log(`   - Classes: ${classes.length}`);
    console.log(`   - Students: ${students.length}`);
    console.log(`   - Teachers: ${teachers.length}`);
    console.log(`   - Subjects: ${subjects.length}`);
    console.log(`   - Admin: 1\n`);
    
    console.log('🔐 Login Credentials:');
    console.log('   Admin:');
    console.log('   - Email: admin@school.com');
    console.log('   - Password: admin123\n');
    console.log('   Student (example):');
    console.log('   - Email: john.doe@student.com');
    console.log('   - Password: password123\n');
    console.log('   Teacher (example):');
    console.log('   - Email: robert.anderson@teacher.com');
    console.log('   - Password: password123\n');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

/**
 * ───────────────────────────────────────────────────────────────
 * Execute Seeding
 * ───────────────────────────────────────────────────────────────
 */
main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });