import { test, expect } from '@playwright/test';
//Arrange
const url = 'https://demo-bank.vercel.app/'
const userName = 'ltesterl';
const userPassword = 'qwertyuy';
const recieverId = '2';
const transferAmount = '150';
const transferTitle = 'pizza';
const expectedTransferReciever = 'Chuck Demobankowy'
const topUpReciever = '500 xxx xxx'
const topUpAmount = '2121'
const expectedTransferMessage = `Przelew wykonany! ${expectedTransferReciever} - ${transferAmount},00PLN - ${transferTitle}`;
const expectedTopUpMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReciever}`;

test.describe('Pulpit test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(url);
        await page.getByTestId('login-input').fill(userName);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();
    })
    test('Send a quick transfer from the dashboard', async ({ page }) => {
        //Act
        await page.locator('#widget_1_transfer_receiver').selectOption(recieverId);
        await page.locator('#widget_1_transfer_amount').fill(transferAmount);
        await page.locator('#widget_1_transfer_title').fill(transferTitle);
        await page.getByRole('button', { name: 'wykonaj' }).click();
        await page.getByTestId('close-button').click();
        //Assert
        await expect(page.getByRole('link', { name: expectedTransferMessage })).toBeVisible()
        await expect(page.locator('#show_messages')).toHaveText(expectedTransferMessage)
    })
    test('Successfull phone top-up from the dashboard', async ({ page }) => {
        //Act
        await page.locator('#widget_1_topup_receiver').selectOption(topUpReciever);
        await page.locator('#widget_1_topup_amount').fill(topUpAmount);
        await page.locator('#uniform-widget_1_topup_agreement span').click();
        await page.getByRole('button', { name: 'doładuj telefon' }).click();
        await page.getByTestId('close-button').click();
        //Assert
        await expect(page.locator('#show_messages')).toHaveText(expectedTopUpMessage);
    })
})