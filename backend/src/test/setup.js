/**
 * ═══════════════════════════════════════════════════════════════
 * JEST TEST SETUP
 * ═══════════════════════════════════════════════════════════════
 * 
 * Runs before all tests
 * 
 * Note: NODE_ENV=test is set in package.json script
 * The .env.test file is loaded by env.config.js automatically
 * 
 * ═══════════════════════════════════════════════════════════════
 */

import { jest } from '@jest/globals';

// Global test timeout (10 seconds)
jest.setTimeout(10000);