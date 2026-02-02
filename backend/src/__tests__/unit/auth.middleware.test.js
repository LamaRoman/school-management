
import { authenticate, authorize } from '../../middleware/auth.middleware.js';
import { generateToken } from '../../utils/jwt.utils.js';
import { AuthenticationError, AuthorizationError } from '../../errors/index.js';

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
      user: null
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  describe('authenticate', () => {
    test('should authenticate valid token from header', () => {
      const payload = { userId: 'test-123', role: 'STUDENT' };
      const token = generateToken(payload);
      req.headers.authorization = `Bearer ${token}`;

      authenticate(req, res, next);

      expect(req.user).toBeDefined();
      expect(req.user.userId).toBe(payload.userId);
      expect(next).toHaveBeenCalled();
    });

    test('should reject request without token', () => {
      expect(() => authenticate(req, res, next)).toThrow(AuthenticationError);
      expect(next).not.toHaveBeenCalled();
    });

    test('should reject invalid token format', () => {
      req.headers.authorization = 'InvalidFormat';
      
      expect(() => authenticate(req, res, next)).toThrow(AuthenticationError);
    });

    test('should reject expired token', () => {
      const payload = { userId: 'test-123' };
      const expiredToken = generateToken(payload, '1ms');
      req.headers.authorization = `Bearer ${expiredToken}`;

      return new Promise(resolve => setTimeout(resolve, 10))
        .then(() => {
          expect(() => authenticate(req, res, next)).toThrow(AuthenticationError);
        });
    });
  });

  describe('authorize', () => {
    test('should allow user with correct role', () => {
      req.user = { userId: 'test-123', role: 'ADMIN' };
      const middleware = authorize(['ADMIN', 'TEACHER']);

      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    test('should reject user without required role', () => {
      req.user = { userId: 'test-123', role: 'STUDENT' };
      const middleware = authorize(['ADMIN']);

      expect(() => middleware(req, res, next)).toThrow(AuthorizationError);
    });

    test('should reject request without user object', () => {
      const middleware = authorize(['ADMIN']);

      expect(() => middleware(req, res, next)).toThrow(AuthenticationError);
    });
  });
});
