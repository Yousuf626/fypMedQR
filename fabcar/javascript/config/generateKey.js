const crypto = require('crypto');

function generateSecretKey(length = 32) {
  // Ensure at least 32 characters for strong security
  if (length < 32) {
    throw new Error('Secret key length must be at least 32 characters');
  }

  // Use a cryptographically secure random number generator
  const randomBytes = crypto.randomBytes(length);

  // Convert to a character string with a good mix of characters
  return randomBytes.toString('hex').toUpperCase(); // Uppercase for readability
}

// Example usage:
function main(){
try {
    const secretKey = generateSecretKey();
    console.log('Generated SECRET_KEY:', secretKey);
  } catch (error) {
    console.error('Error generating secret key:', error.message);
  }
}

main();