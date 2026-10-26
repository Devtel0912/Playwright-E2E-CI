
const { test, expect } = require('@playwright/test');

test('Playwright homepage loads successfully', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await expect(page).toHaveTitle(/Playwright/);

  await expect(
    page.getByRole('link', { name: 'Get started' }).first()
  ).toBeVisible();
});

test('Playwright documentation link navigates correctly', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await page.getByRole('link', { name: 'Get started' }).first().click();

  await expect(page).toHaveURL(/intro/);
});
