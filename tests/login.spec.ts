import { test, expect } from '@playwright/test';
const url = 'https://demo-bank.vercel.app/'

test.describe('User login to Demobank', () => {
  test('login with correct credentials', async ({ page }) => {
    //Arrange
    const userName = 'ltesterl';
    const userPassword = 'qwertyuy';
    const expectedUserName = 'Jan Demobankowy';
    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userName);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
    //Assert
    await expect(page.getByTestId('user-name')).toBeVisible()
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName)
  });
  test('unsuccesfull login with too short username', async ({ page }) => {
    await page.goto(url);
    await page.getByTestId('login-input').fill('w');
    await page.getByTestId('password-input').fill('qwertyuy');
    await expect(page.getByTestId('error-login-id')).toHaveText('identyfikator ma min. 8 znaków')
    await expect(page.getByTestId('error-login-id')).toBeVisible()
  });
  test('unsuccesfull login with too short password', async ({ page }) => {
    await page.goto(url);
    await page.getByTestId('login-input').fill('loginGood');
    await page.getByTestId('password-input').fill('qwe');
    await page.getByTestId('password-input').blur();
    await expect(page.getByTestId('error-login-password')).toHaveText('hasło ma min. 8 znaków')
    await expect(page.getByTestId('error-login-password')).toBeVisible()
  });

})
