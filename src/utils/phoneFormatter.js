// Ukrainian phone number formatter and validator

export function formatPhoneNumber(value) {
  if (!value) return '+380 ';
  
  // Remove all non-digits except initial +
  const digits = value.replace(/\D/g, '');
  
  // Normalize Ukrainian number
  let normalized = digits;
  if (normalized.startsWith('380')) {
    // keep as is
  } else if (normalized.startsWith('80')) {
    normalized = '3' + normalized;
  } else if (normalized.startsWith('0')) {
    normalized = '38' + normalized;
  } else if (!normalized.startsWith('380') && normalized.length > 0) {
    normalized = '380' + normalized;
  }

  // Slice to max 12 digits (380 + 9 digits)
  normalized = normalized.slice(0, 12);

  // Build formatted string: +380 (XX) XXX-XX-XX
  let formatted = '+380';
  const rest = normalized.slice(3);

  if (rest.length > 0) {
    formatted += ` (${rest.slice(0, 2)}`;
  }
  if (rest.length >= 2) {
    formatted += `) ${rest.slice(2, 5)}`;
  }
  if (rest.length >= 5) {
    formatted += `-${rest.slice(5, 7)}`;
  }
  if (rest.length >= 7) {
    formatted += `-${rest.slice(7, 9)}`;
  }

  return formatted;
}

export function isValidUkrainianPhone(value) {
  const digits = value.replace(/\D/g, '');
  return digits.length === 12 && digits.startsWith('380');
}
