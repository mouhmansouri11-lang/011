/**
 * Algerian phone number utilities
 */

/**
 * Format an Algerian phone number to international format
 * @param phone - Phone number (with or without country code)
 * @returns Formatted phone number in +213XXXXXXXXX format
 */
export function formatAlgerianPhone(phone: string): string {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, "");

  // If starts with 0, replace with 213
  if (cleaned.startsWith("0")) {
    cleaned = "213" + cleaned.slice(1);
  }

  // If doesn't start with 213, add it
  if (!cleaned.startsWith("213")) {
    cleaned = "213" + cleaned;
  }

  return "+" + cleaned;
}

/**
 * Validate an Algerian phone number
 * @param phone - Phone number to validate
 * @returns true if valid Algerian phone number
 */
export function isValidAlgerianPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "");

  // Algerian mobile numbers: 05, 06, 07 followed by 8 digits
  // Or with country code: 213 5, 213 6, 213 7 followed by 8 digits
  const mobileRegex = /^(0|213)?(5|6|7)\d{8}$/;

  return mobileRegex.test(cleaned);
}

/**
 * Extract the local format of an Algerian phone number
 * @param phone - Phone number (international or local format)
 * @returns Phone number in local format (0XXXXXXXXX)
 */
export function toLocalFormat(phone: string): string {
  let cleaned = phone.replace(/\D/g, "");

  // Remove country code if present
  if (cleaned.startsWith("213")) {
    cleaned = "0" + cleaned.slice(3);
  }

  // Ensure it starts with 0
  if (!cleaned.startsWith("0")) {
    cleaned = "0" + cleaned;
  }

  return cleaned;
}

/**
 * Get the mobile operator from an Algerian phone number
 * @param phone - Phone number
 * @returns Operator name or null
 */
export function getMobileOperator(phone: string): string | null {
  const cleaned = phone.replace(/\D/g, "");
  const firstDigits = cleaned.slice(-10, -8);

  // Algerian mobile operators
  const operators: Record<string, string> = {
    "05": "Ooredoo",
    "06": "Mobilis",
    "07": "Djezzy",
  };

  return operators[firstDigits] || null;
}
