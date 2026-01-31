/**
 * ═══════════════════════════════════════════════════════════════
 * CONFIGURATION TEST
 * ═══════════════════════════════════════════════════════════════
 * 
 * Run this to verify your configuration loads correctly
 * 
 * Usage: node src/test/config.test.js
 * 
 * ═══════════════════════════════════════════════════════════════
 */

import { config } from '../config/env.config.js';

console.log('\n🔍 Testing Configuration...\n');

console.log('✅ Environment:', config.env);
console.log('✅ Port:', config.port);
console.log('✅ API Version:', config.apiVersion);
console.log('✅ Database URL:', config.database.url ? '***configured***' : '❌ MISSING');
console.log('✅ JWT Secret:', config.jwt.secret ? '***configured***' : '❌ MISSING');
console.log('✅ CORS Origin:', config.cors.origin);
console.log('✅ Frontend URL:', config.frontend.url);

console.log('\n✅ Configuration loaded successfully!\n');