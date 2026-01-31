/**
 * ═══════════════════════════════════════════════════════════════
 * ERROR HANDLER MIDDLEWARE (Industry Standard - JSend Format)
 * ═══════════════════════════════════════════════════════════════
 * 
 * 🎯 FOLLOWS: JSend specification
 * 
 * Response format:
 * {
 *   "status": "fail" | "error",
 *   "statusCode": 400,
 *   "message": "Error message",
 *   "errors": [...] // Optional validation errors
 * }
 * 
 * ═══════════════════════════════════════════════════════════════
 */

import { 
  AppError,
  ValidationError,
  AuthenticationError,
  BadRequestError,
  NotFoundError,
  ConflictError
} from '../errors/index.js';

const errorHandler = (err, req, res, next) => {
  // Start with the original error
  let error = err;

  // ─── Handle Prisma Errors ───────────────────────────────────
  if (error.code && error.code.startsWith('P')) {
    error = handlePrismaError(err);
  }

  // ─── Handle Zod Validation Errors ───────────────────────────
  if (error.name === 'ZodError') {
    const formattedErrors = error.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    
    error = new ValidationError('Validation failed');
    error.errors = formattedErrors;
  }

  // ─── Handle JWT Errors ──────────────────────────────────────
  if (error.name === 'JsonWebTokenError') {
    error = new AuthenticationError('Invalid token');
  }

  if (error.name === 'TokenExpiredError') {
    error = new AuthenticationError('Token has expired');
  }

  // ─── Handle Multer Errors ───────────────────────────────────
  if (error.name === 'MulterError') {
    error = handleMulterError(err);
  }

  // ─── Handle Non-Operational Errors ──────────────────────────
  // These are programmer errors (bugs), not expected errors
  if (!error.isOperational) {
    console.error('💥 UNEXPECTED ERROR:', err);
    error = new AppError('Something went wrong', 500);
  }

  // ─── Build Response ─────────────────────────────────────────
  const response = {
    status: error.status || 'error',
    statusCode: error.statusCode || 500,
    message: error.message,
  };

  // Add validation errors if present
  if (error.errors) {
    response.errors = error.errors;
  }

  // Include stack trace in development only
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  // Send response
  res.status(error.statusCode || 500).json(response);
};

/**
 * ───────────────────────────────────────────────────────────────
 * HELPER: Handle Prisma Errors
 * ───────────────────────────────────────────────────────────────
 */
const handlePrismaError = (err) => {
  switch (err.code) {
    case 'P2002': {
      // Unique constraint violation
      const field = err.meta?.target?.[0] || 'field';
      return new ConflictError(`${field} already exists`);
    }

    case 'P2025':
      // Record not found
      return new NotFoundError('Resource not found');

    case 'P2003':
      // Foreign key constraint failed
      return new BadRequestError('Invalid reference - related resource not found');

    case 'P2014':
      // Required relation violation
      return new BadRequestError('Invalid relationship');

    default:
      console.error('Unhandled Prisma error:', err.code, err.message);
      return new AppError('Database operation failed', 500);
  }
};

/**
 * ───────────────────────────────────────────────────────────────
 * HELPER: Handle Multer Errors
 * ───────────────────────────────────────────────────────────────
 */
const handleMulterError = (err) => {
  switch (err.code) {
    case 'LIMIT_FILE_SIZE':
      return new BadRequestError('File size is too large');

    case 'LIMIT_FILE_COUNT':
      return new BadRequestError('Too many files uploaded');

    case 'LIMIT_UNEXPECTED_FILE':
      return new BadRequestError('Unexpected file field');

    default:
      return new BadRequestError(err.message || 'File upload failed');
  }
};

export default errorHandler;