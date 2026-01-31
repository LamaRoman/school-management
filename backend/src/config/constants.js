/**
 * ═══════════════════════════════════════════════════════════════
 * APPLICATION CONSTANTS
 * ═══════════════════════════════════════════════════════════════
 * 
 * 🎯 PURPOSE: Define constant values used throughout the application
 * 
 * 💡 WHY USE CONSTANTS?
 * 1. Single source of truth (change once, affects everywhere)
 * 2. No typos (IDE autocomplete helps)
 * 3. Easy to maintain
 * 4. Self-documenting code
 * 
 * ❌ Bad: Using strings directly
 * if (user.role === 'ADMIN') { } // What if you typo: 'ADMN'?
 * 
 * ✅ Good: Using constants
 * if (user.role === ROLES.ADMIN) { } // IDE will catch typos!
 * 
 * ═══════════════════════════════════════════════════════════════
 */


/**
 * ───────────────────────────────────────────────────────────────
 * USER ROLES
 * ───────────────────────────────────────────────────────────────
 * 
 * Hierarchy (from highest to lowest permission):
 * SUPER_ADMIN > ADMIN > TEACHER > STUDENT > PARENT
 */

export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',  // Full system access, can do everything
  ADMIN: 'ADMIN',              // School admin, manages exams/results
  TEACHER: 'TEACHER',          // Can enter marks, view class results
  STUDENT: 'STUDENT',          // Can view own results and exam schedules
  PARENT: 'PARENT',            // Can view child's results
};

/**
 * Array of all roles (useful for validation)
 */
export const ALL_ROLES = Object.values(ROLES);


/**
 * ───────────────────────────────────────────────────────────────
 * PERMISSIONS
 * ───────────────────────────────────────────────────────────────
 * 
 * Fine-grained permissions for specific actions
 * Used in RBAC (Role-Based Access Control) middleware
 */

export const PERMISSIONS = {
  
  // ─── Exam Permissions ───────────────────────────────────────
  CREATE_EXAM: 'CREATE_EXAM',
  VIEW_EXAM: 'VIEW_EXAM',
  UPDATE_EXAM: 'UPDATE_EXAM',
  DELETE_EXAM: 'DELETE_EXAM',
  PUBLISH_EXAM: 'PUBLISH_EXAM',
  
  // ─── Marks Permissions ──────────────────────────────────────
  ENTER_MARKS: 'ENTER_MARKS',
  VIEW_MARKS: 'VIEW_MARKS',
  UPDATE_MARKS: 'UPDATE_MARKS',
  DELETE_MARKS: 'DELETE_MARKS',
  BULK_UPLOAD_MARKS: 'BULK_UPLOAD_MARKS',
  
  // ─── Result Permissions ─────────────────────────────────────
  PUBLISH_RESULT: 'PUBLISH_RESULT',
  VIEW_OWN_RESULT: 'VIEW_OWN_RESULT',
  VIEW_ALL_RESULTS: 'VIEW_ALL_RESULTS',
  DOWNLOAD_RESULT: 'DOWNLOAD_RESULT',
  GENERATE_REPORT_CARD: 'GENERATE_REPORT_CARD',
  
  // ─── User Management Permissions ────────────────────────────
  CREATE_USER: 'CREATE_USER',
  VIEW_USER: 'VIEW_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  ASSIGN_ROLE: 'ASSIGN_ROLE',
};


/**
 * ───────────────────────────────────────────────────────────────
 * ROLE PERMISSIONS MAPPING
 * ───────────────────────────────────────────────────────────────
 * 
 * Defines which permissions each role has
 * 
 * Example usage:
 * const userPermissions = ROLE_PERMISSIONS[user.role];
 * if (userPermissions.includes(PERMISSIONS.CREATE_EXAM)) {
 *   // User can create exams
 * }
 */

export const ROLE_PERMISSIONS = {
  
  [ROLES.SUPER_ADMIN]: [
    // Has ALL permissions
    ...Object.values(PERMISSIONS),
  ],
  
  [ROLES.ADMIN]: [
    // Exam permissions
    PERMISSIONS.CREATE_EXAM,
    PERMISSIONS.VIEW_EXAM,
    PERMISSIONS.UPDATE_EXAM,
    PERMISSIONS.DELETE_EXAM,
    PERMISSIONS.PUBLISH_EXAM,
    
    // Marks permissions
    PERMISSIONS.ENTER_MARKS,
    PERMISSIONS.VIEW_MARKS,
    PERMISSIONS.UPDATE_MARKS,
    PERMISSIONS.DELETE_MARKS,
    PERMISSIONS.BULK_UPLOAD_MARKS,
    
    // Result permissions
    PERMISSIONS.PUBLISH_RESULT,
    PERMISSIONS.VIEW_ALL_RESULTS,
    PERMISSIONS.DOWNLOAD_RESULT,
    PERMISSIONS.GENERATE_REPORT_CARD,
    
    // User permissions
    PERMISSIONS.CREATE_USER,
    PERMISSIONS.VIEW_USER,
    PERMISSIONS.UPDATE_USER,
  ],
  
  [ROLES.TEACHER]: [
    // Can view exams
    PERMISSIONS.VIEW_EXAM,
    
    // Can enter and view marks for their subjects
    PERMISSIONS.ENTER_MARKS,
    PERMISSIONS.VIEW_MARKS,
    PERMISSIONS.UPDATE_MARKS,
    PERMISSIONS.BULK_UPLOAD_MARKS,
    
    // Can view results
    PERMISSIONS.VIEW_ALL_RESULTS,
    PERMISSIONS.DOWNLOAD_RESULT,
    
    // Can view users
    PERMISSIONS.VIEW_USER,
  ],
  
  [ROLES.STUDENT]: [
    // Can view exams
    PERMISSIONS.VIEW_EXAM,
    
    // Can view own results
    PERMISSIONS.VIEW_OWN_RESULT,
    PERMISSIONS.DOWNLOAD_RESULT,
  ],
  
  [ROLES.PARENT]: [
    // Can view exams
    PERMISSIONS.VIEW_EXAM,
    
    // Can view child's results
    PERMISSIONS.VIEW_OWN_RESULT,
    PERMISSIONS.DOWNLOAD_RESULT,
  ],
};


/**
 * ───────────────────────────────────────────────────────────────
 * EXAM TYPES
 * ───────────────────────────────────────────────────────────────
 */

export const EXAM_TYPES = {
  MIDTERM: 'MIDTERM',
  FINAL: 'FINAL',
  UNIT_TEST: 'UNIT_TEST',
  ASSIGNMENT: 'ASSIGNMENT',
  PROJECT: 'PROJECT',
  PRACTICAL: 'PRACTICAL',
  QUIZ: 'QUIZ',
};


/**
 * ───────────────────────────────────────────────────────────────
 * EXAM STATUS
 * ───────────────────────────────────────────────────────────────
 */

export const EXAM_STATUS = {
  DRAFT: 'DRAFT',           // Being created/edited
  SCHEDULED: 'SCHEDULED',   // Scheduled but not started
  ONGOING: 'ONGOING',       // Currently happening
  COMPLETED: 'COMPLETED',   // Finished, marks can be entered
  CANCELLED: 'CANCELLED',   // Cancelled
};


/**
 * ───────────────────────────────────────────────────────────────
 * RESULT STATUS
 * ───────────────────────────────────────────────────────────────
 */

export const RESULT_STATUS = {
  DRAFT: 'DRAFT',           // Results being calculated
  PUBLISHED: 'PUBLISHED',   // Results published to students
  WITHHELD: 'WITHHELD',     // Results temporarily hidden
};


/**
 * ───────────────────────────────────────────────────────────────
 * GRADING SYSTEMS
 * ───────────────────────────────────────────────────────────────
 */

export const GRADING_SYSTEMS = {
  PERCENTAGE: 'PERCENTAGE',   // 0-100%
  GPA: 'GPA',                 // 0.0-4.0
  LETTER: 'LETTER',           // A, B, C, D, F
  PASS_FAIL: 'PASS_FAIL',     // Pass/Fail only
};


/**
 * ───────────────────────────────────────────────────────────────
 * DEFAULT GRADE SCALES
 * ───────────────────────────────────────────────────────────────
 * 
 * Can be customized per school/exam
 */

export const DEFAULT_LETTER_GRADES = [
  { grade: 'A+', minPercentage: 90, maxPercentage: 100, gpa: 4.0 },
  { grade: 'A',  minPercentage: 85, maxPercentage: 89,  gpa: 3.7 },
  { grade: 'B+', minPercentage: 80, maxPercentage: 84,  gpa: 3.3 },
  { grade: 'B',  minPercentage: 75, maxPercentage: 79,  gpa: 3.0 },
  { grade: 'C+', minPercentage: 70, maxPercentage: 74,  gpa: 2.7 },
  { grade: 'C',  minPercentage: 65, maxPercentage: 69,  gpa: 2.3 },
  { grade: 'D',  minPercentage: 50, maxPercentage: 64,  gpa: 2.0 },
  { grade: 'F',  minPercentage: 0,  maxPercentage: 49,  gpa: 0.0 },
];


/**
 * ───────────────────────────────────────────────────────────────
 * ATTENDANCE STATUS
 * ───────────────────────────────────────────────────────────────
 */

export const ATTENDANCE_STATUS = {
  PRESENT: 'PRESENT',
  ABSENT: 'ABSENT',
  LATE: 'LATE',
  EXCUSED: 'EXCUSED',
};


/**
 * ───────────────────────────────────────────────────────────────
 * FILE TYPES (for uploads)
 * ───────────────────────────────────────────────────────────────
 */

export const ALLOWED_FILE_TYPES = {
  // Documents
  PDF: 'application/pdf',
  DOC: 'application/msword',
  DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  
  // Spreadsheets
  XLS: 'application/vnd.ms-excel',
  XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  CSV: 'text/csv',
  
  // Images
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  GIF: 'image/gif',
};


/**
 * ───────────────────────────────────────────────────────────────
 * HTTP STATUS CODES (for reference)
 * ───────────────────────────────────────────────────────────────
 */

export const HTTP_STATUS = {
  // Success
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  
  // Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  
  // Server Errors
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  SERVICE_UNAVAILABLE: 503,
};


/**
 * ═══════════════════════════════════════════════════════════════
 * USAGE EXAMPLES
 * ═══════════════════════════════════════════════════════════════
 * 
 * // In controllers:
 * import { ROLES, PERMISSIONS, EXAM_TYPES } from '../config/constants.js';
 * 
 * // Check role
 * if (user.role === ROLES.ADMIN) {
 *   // Admin-specific logic
 * }
 * 
 * // Check permission
 * const userPermissions = ROLE_PERMISSIONS[user.role];
 * if (userPermissions.includes(PERMISSIONS.CREATE_EXAM)) {
 *   // User can create exams
 * }
 * 
 * // Create exam
 * const exam = {
 *   type: EXAM_TYPES.MIDTERM,
 *   status: EXAM_STATUS.SCHEDULED,
 * };
 * 
 * ═══════════════════════════════════════════════════════════════
 */