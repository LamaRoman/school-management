import { verifyToken } from '../utils/jwt.utils.js';
import { AuthenticationError, AuthorizationError } from '../errors/index.js';

/**
 * Authenticate - Verify JWT Token
 */
export const authenticate = (req, res, next) => {
    try {
        //Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AuthenticationError('No token provided, please login')
        }

        // Extract token
        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = verifyToken(token);

        // Attach user to request
        req.user = decoded;
        next()
    } catch (error) {
        throw error;
    }
}

/**
 * Authorize - Check user role
 */

export const authorize = (roles = []) => {
    return (req, res, next) => {
        //Check if user exists(must be authenticated first)

        try {
            if (!req.user) {
                throw new AuthenticationError('Authentication required')
            }

            //Check if user has required role
            if (!roles.includes(req.user.role)) {
                throw new AuthorizationError(
                    `Access denied. Required role: ${roles.join('or')}`
                )
            }
            next();

        } catch (error) {
            throw error;
        }
    }
}