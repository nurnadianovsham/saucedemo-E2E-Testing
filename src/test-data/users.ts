// Define a union type: either a successful user OR a failing user
export type User =
  | { username: string; expectedSuccess: true }
  | { username: string; expectedSuccess: false; errorMessage: string };

// A map of user keys to their definitions
export const users: Record<string, User> = {
  standard: {
    username: 'standard_user',
    expectedSuccess: true,
  },
  lockedOut: {
    username: 'locked_out_user',
    expectedSuccess: false,
    errorMessage: 'Epic sadface: Sorry, this user has been locked out.',
  },
  problem: {
    username: 'problem_user',
    expectedSuccess: true,
  },
  performance: {
    username: 'performance_glitch_user',
    expectedSuccess: true,
  },
  error: {
    username: 'error_user',
    expectedSuccess: true,
  },
  visual: {
    username: 'visual_user',
    expectedSuccess: true,
  },
};

// Shared test constants
export const PASSWORD = 'secret_sauce';
export const BASE_URL = 'https://www.saucedemo.com';
export const INVENTORY_URL = `${BASE_URL}/inventory.html`;
export const CART_URL = `${BASE_URL}/cart.html`;
export const CHECKOUT_STEP_ONE_URL = `${BASE_URL}/checkout-step-one.html`;
export const CHECKOUT_STEP_TWO_URL = `${BASE_URL}/checkout-step-two.html`;
export const CHECKOUT_COMPLETE_URL = `${BASE_URL}/checkout-complete.html`;
export const ABOUT_URL = 'https://saucelabs.com/';
