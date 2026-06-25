const { test, expect } = require('@playwright/test');

test.describe('HyperScript Behaviors', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('toggles .red class on button click', async ({ page }) => {
    const button = page.locator('text="Toggle Red"');
    await expect(button).not.toHaveClass(/red/);
    await button.click();
    await expect(button).toHaveClass(/red/);
    await button.click();
    await expect(button).not.toHaveClass(/red/);
  });

  test('increments local X and displays in output', async ({ page }) => {
    const button = page.locator('text="Increment local X"');
    const output = button.locator('~ output').first();
    await expect(output).toHaveText('--');
    await button.click();
    await expect(output).toHaveText('1');
    await button.click();
    await expect(output).toHaveText('2');
  });

  test('increments data-counter and disables after 5 clicks', async ({ page }) => {
    const button = page.locator('text="Increment data-counter and disable after 5 clicks"');
    for (let i = 1; i <= 5; i++) {
      await button.click();
    }
    await expect(button).toBeDisabled();
  });

  test('fetches message and displays in output', async ({ page }) => {
    await page.route('**/clickedMessage', route => {
      route.fulfill({
        status: 200,
        contentType: 'text/plain',
        body: 'Hello from mock fetch!'
      });
    });

    const button = page.locator('text="Fetch It"');
    const output = button.locator('~ output').first();
    await button.click();
    await expect(output).toHaveText('Hello from mock fetch!');
  });
});
