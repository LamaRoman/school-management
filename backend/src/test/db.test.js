/**
 * ═══════════════════════════════════════════════════════════════
 * DATABASE CONNECTION TEST
 * ═══════════════════════════════════════════════════════════════
 * 
 * Run this to verify your database connection works
 * 
 * Usage: node src/test/db.test.js
 * 
 * ═══════════════════════════════════════════════════════════════
 */

import { 
  testDatabaseConnection, 
  getDatabaseHealth,
  disconnectDatabase 
} from '../utils/db.utils.js';

async function runTests() {
  console.log('\n🔍 Testing Database Connection...\n');

  // Test 1: Basic Connection
  console.log('Test 1: Basic Connection');
  const connected = await testDatabaseConnection();
  if (!connected) {
    console.log('\n❌ Database connection failed. Check your .env file!\n');
    process.exit(1);
  }

  // Test 2: Health Check
  console.log('\nTest 2: Database Health Check');
  const health = await getDatabaseHealth();
  console.log(JSON.stringify(health, null, 2));

  // Disconnect
  console.log('\n🔌 Disconnecting...');
  await disconnectDatabase();

  console.log('\n✅ All tests passed!\n');
}

// Run tests
runTests().catch((error) => {
  console.error('\n❌ Test failed:', error.message);
  process.exit(1);
});