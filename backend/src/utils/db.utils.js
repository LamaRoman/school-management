/**
 * ═══════════════════════════════════════════════════════════════
 * DATABASE UTILITIES
 * ═══════════════════════════════════════════════════════════════
 * 
 * Helper functions for database operations:
 * - Connection testing
 * - Database health checks
 * - Graceful disconnection
 * 
 * ═══════════════════════════════════════════════════════════════
 */

import prisma from '../services/prisma.service.js';

/**
 * ───────────────────────────────────────────────────────────────
 * Test Database Connection
 * ───────────────────────────────────────────────────────────────
 */

export const testDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

/**
 * ───────────────────────────────────────────────────────────────
 * Disconnect from Database
 * ───────────────────────────────────────────────────────────────
 */

export const disconnectDatabase = async () => {
  try {
    await prisma.$disconnect();
    console.log('✅ Database disconnected successfully');
  } catch (error) {
    console.error('❌ Error disconnecting from database:', error.message);
  }
};

/**
 * ───────────────────────────────────────────────────────────────
 * Database Health Check
 * ───────────────────────────────────────────────────────────────
 * Returns database status and statistics
 */

export const getDatabaseHealth = async () => {
  try {
    // Test connection with a simple query
    await prisma.$queryRaw`SELECT 1`;

    // Get counts from main tables
    const [
      userCount,
      studentCount,
      teacherCount,
      classCount,
      examCount
    ] = await Promise.all([
      prisma.user.count(),
      prisma.student.count(),
      prisma.teacher.count(),
      prisma.class.count(),
      prisma.exam.count(),
    ]);

    return {
      status: 'healthy',
      connected: true,
      counts: {
        users: userCount,
        students: studentCount,
        teachers: teacherCount,
        classes: classCount,
        exams: examCount,
      },
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      connected: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
};

/**
 * ───────────────────────────────────────────────────────────────
 * Clear All Data (Development Only)
 * ───────────────────────────────────────────────────────────────
 * ⚠️ WARNING: This deletes ALL data from the database!
 */

export const clearDatabase = async () => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Cannot clear database in production!');
  }

  try {
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

    console.log('✅ Database cleared successfully');
    return true;
  } catch (error) {
    console.error('❌ Error clearing database:', error.message);
    return false;
  }
};

/**
 * ═══════════════════════════════════════════════════════════════
 * USAGE EXAMPLES
 * ═══════════════════════════════════════════════════════════════
 * 
 * import { 
 *   testDatabaseConnection, 
 *   getDatabaseHealth,
 *   disconnectDatabase 
 * } from './utils/db.utils.js';
 * 
 * // Test connection
 * await testDatabaseConnection();
 * 
 * // Get health status
 * const health = await getDatabaseHealth();
 * console.log(health);
 * 
 * // Gracefully disconnect (on server shutdown)
 * await disconnectDatabase();
 * 
 * ═══════════════════════════════════════════════════════════════
 */