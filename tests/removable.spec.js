const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Removable Behavior', () => {
  test('should remove the element when the remove button is clicked', async ({ page }) => {
    // Navigate to the local index.html file
    const filePath = `file://${path.resolve(__dirname, '../index.html')}`;
    await page.goto(filePath);

    // Locate the span with class "banner" and text "Close me?"
    const spanElement = page.locator('span.banner', { hasText: 'Close me?' });

    // Locate the button with text "Click to remove previous span"
    const removeButton = page.locator('button', { hasText: 'Click to remove previous span' });

    // Ensure both elements are initially visible
    await expect(spanElement).toBeVisible();
    await expect(removeButton).toBeVisible();

    // Click the remove button
    await removeButton.click();

    // Verify that the span element is no longer visible (it was removed)
    await expect(spanElement).toBeHidden();

    // Verify that the span element is actually removed from the DOM
    await expect(spanElement).toHaveCount(0);
  });
});
