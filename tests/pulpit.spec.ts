import { test, expect } from '@playwright/test';
const url = 'https://demo-bank.vercel.app/'
test.describe('Pulpit test', () => {
    test('Send a quick transfer from the dashboard', async ({ page }) => {
        //Arrange
        const userName = 'ltesterl';
        const userPassword = 'qwertyuy';
        const recieverId = '2';
        const transferAmount = '150';
        const transferTitle = 'pizza';
        const expectedTransferReciever = 'Chuck Demobankowy'

        //Act
        await page.goto(url);
        await page.getByTestId('login-input').fill(userName);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();
        await page.locator('#widget_1_transfer_receiver').selectOption(recieverId);
        await page.locator('#widget_1_transfer_amount').fill(transferAmount);
        await page.locator('#widget_1_transfer_title').fill(transferTitle);
        await page.getByRole('button', { name: 'wykonaj' }).click();
        await page.getByTestId('close-button').click();
        //Assert
        await expect(page.getByRole('link', { name: `Przelew wykonany! ${expectedTransferReciever} - ${transferAmount},00PLN - ${transferTitle}` })).toBeVisible()
        await expect(page.locator('#show_messages')).toHaveText(`Przelew wykonany! ${expectedTransferReciever} - ${transferAmount},00PLN - ${transferTitle}`)
    })
    test('Successfull phone top-up from the dashboard', async ({ page }) => {
        await page.goto(url);
        await page.getByTestId('login-input').fill('ltesterl');
        await page.getByTestId('password-input').fill('password');
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
        await page.locator('#widget_1_topup_amount').fill('2121');
        await page.locator('#uniform-widget_1_topup_agreement span').click();
        await page.getByRole('button', { name: 'doładuj telefon' }).click();
        await page.getByTestId('close-button').click();
        await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 2121,00PLN na numer 500 xxx xxx');
    })
})