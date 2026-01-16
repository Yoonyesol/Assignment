// Authentication related constants
export const AUTH_CONSTANTS = {
  // Email verification timer (in seconds)
  EMAIL_VERIFICATION_TIME: 180, // 3 minutes
  
  // Password validation
  PASSWORD_MIN_LENGTH: 8,
  
  // File upload
  ALLOWED_IMAGE_TYPES: ['image/png', 'image/jpeg', 'image/jpg'],
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
} as const;

// Regular expressions
export const REGEX = {
  // At least one number, one letter, and one special character
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  
  // Email validation
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  // Phone number (Korean format)
  PHONE: /^0\d{1,2}-?\d{3,4}-?\d{4}$/,
} as const;
