/**
 * Utility functions for currency formatting and calculations
 */

/**
 * Format a number as Indian Rupees currency
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a number as Indian Rupees currency without decimals for whole numbers
 * @param amount - The amount to format
 * @returns Formatted currency string
 */
export function formatPriceCompact(amount: number): string {
  const isWholeNumber = amount % 1 === 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: isWholeNumber ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Calculate total price for cart items
 * @param items - Array of cart items with price and quantity
 * @returns Total price
 */
export function calculateTotal(items: Array<{ price: number; quantity: number }>): number {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Format large numbers in Indian format (lakhs, crores)
 * @param amount - The amount to format
 * @returns Formatted number string
 */
export function formatLargeNumber(amount: number): string {
  if (amount >= 10000000) { // 1 crore
    return `₹${(amount / 10000000).toFixed(1)} Cr`;
  } else if (amount >= 100000) { // 1 lakh
    return `₹${(amount / 100000).toFixed(1)} L`;
  } else if (amount >= 1000) { // 1 thousand
    return `₹${(amount / 1000).toFixed(1)} K`;
  }
  return `₹${amount}`;
}
