/**
 * Indian Rupee (INR) currency formatting and constants
 */

export const FREE_SHIPPING_THRESHOLD = 9995;
export const STANDARD_SHIPPING_FEE = 750;
export const EXPRESS_SHIPPING_FEE = 1200;

export const formatINR = (amount: number): string => {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
};
