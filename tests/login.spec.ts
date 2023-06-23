import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  test('login with correct credentials', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('ltesterl');
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill('qwertyuy');
    await page.getByTestId('login-button').click();
    await expect(page.getByTestId('user-name')).toBeVisible()
    await expect(page.getByTestId('user-name')).toHaveText('Jan Demobankowy')
  });
  test('unsuccesfull login with short username', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('w');
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill('qwertyuy');
    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków')
    await expect(page.getByTestId('error-login-id')).toBeVisible()
  });
  test('unsuccesfull login with short password', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').click();
    await page.getByTestId('login-input').fill('loginGood');
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill('qwe');
    await page.getByTestId('password-input').blur();
    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków')
    await expect(page.getByTestId('error-login-password')).toBeVisible()
  });

})
