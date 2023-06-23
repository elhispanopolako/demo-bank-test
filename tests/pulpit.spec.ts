import { test, expect } from '@playwright/test';
test.describe('Pulpit test', () => {
    test('Send a quick transfer from the dashboard', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('ltesterl');
        await page.getByTestId('password-input').fill('password');
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_transfer_receiver').selectOption('2');
        await page.locator('#widget_1_transfer_amount').fill('150');
        await page.locator('#widget_1_transfer_title').fill('pizza');
        await page.getByRole('button', { name: 'wykonaj' }).click();
        await page.getByTestId('close-button').click();
        await expect(page.getByRole('link', { name: 'Przelew wykonany! Chuck Demobankowy - 150,00PLN - pizza' })).toBeVisible()
        await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck Demobankowy - 150,00PLN - pizza')

    })
})