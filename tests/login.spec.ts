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
    //Arrange
    const shortUserName = 'w'
    const userPassword = 'qwertyuy'
    const expectedErrorUserNameMessage = 'identyfikator ma min. 8 znaków'
    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(shortUserName);
    await page.getByTestId('password-input').fill(userPassword);
    //Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(expectedErrorUserNameMessage)
    await expect(page.getByTestId('error-login-id')).toBeVisible()
  });
  test('unsuccesfull login with too short password', async ({ page }) => {
    //Arrange
    const userName = 'loginGood'
    const shortPassword = 'qwe'
    const expectedErrorPasswordNameMessage = 'hasło ma min. 8 znaków'
    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userName);
    await page.getByTestId('password-input').fill(shortPassword);
    await page.getByTestId('password-input').blur();
    //Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(expectedErrorPasswordNameMessage)
    await expect(page.getByTestId('error-login-password')).toBeVisible()
  });

})
