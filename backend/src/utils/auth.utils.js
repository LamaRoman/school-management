/**
 * AUTH UTILITIES
 * Password hashing and comparison using bcrypt
 */

import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12; // Industry standard

export const hashPassword = async (password) => {
  if (!password || typeof password !== 'string') {
    throw new ValidationError('Password is required and must be a string');
  }
  
  if (password.trim() === '') {
    throw new ValidationError('Password cannot be empty');
  }
  
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password, hashedPassword) => {
  if (!password || !hashedPassword) {
    return false;
  }
  
  return await bcrypt.compare(password, hashedPassword);
};
