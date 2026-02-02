import { AppError } from './index.js';

export class ValidationError extends AppError {
  constructor(message = 'Validation failed', errors = []) {
    super(message, 400);
    this.errors = errors;
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad request') {
    super(message, 400);
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'You do not have permission to perform this action') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super(message, 409);
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message = 'Unprocessable entity') {
    super(message, 422);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message = 'Too many requests. Please try again later.') {
    super(message, 429);
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Internal server error') {
    super(message, 500);
  }
}
