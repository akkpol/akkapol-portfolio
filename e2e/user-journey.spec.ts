import { test, expect } from '@playwright/test';

test.describe('AK3 Studio Portfolio User Journey', () => {

    test('should display global components and sections', async ({ page }) => {
        await page.goto('/');

        // Check Header and Brand
        await expect(page.getByText('AK3 Studio', { exact: true }).first()).toBeVisible();
        await expect(page.getByText('Akkapol.dev')).toBeVisible();

        // Check Main Headline
        await expect(page.getByRole('heading', { name: /ยกระดับธุรกิจด้วย/i })).toBeVisible();

        // Check Navigation
        await expect(page.getByRole('link', { name: 'Experience' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Skills' })).toBeVisible();

        // Check Theme Toggle (aria-label="Toggle theme")
        const themeToggle = page.getByRole('button', { name: 'Toggle theme' }).first();
        await expect(themeToggle).toBeVisible();
    });

    test('should toggle dark mode via the theme button', async ({ page }) => {
        await page.goto('/');

        const html = page.locator('html');

        // Check initial state (might be light or system, assuming not forced dark)
        // We can force a click to ensure it switches.
        const themeToggle = page.getByRole('button', { name: 'Toggle theme' }).first();
        await themeToggle.click();

        // Check that class list contains or doesn't contain dark depending on toggles
        // Since we don't know the default OS theme in the test environment, we just want to ensure it changes on click
        const classList1 = await html.getAttribute('class') || '';

        await themeToggle.click();
        const classList2 = await html.getAttribute('class') || '';

        expect(classList1).not.toBe(classList2);
    });

    test('should verify AI Consultant section is present', async ({ page }) => {
        await page.goto('/');

        // Scroll to AI Section
        const aiHeading = page.getByRole('heading', { name: /Interactive/i });
        await aiHeading.scrollIntoViewIfNeeded();
        await expect(aiHeading).toBeVisible();

        // Verify AI input box exists
        await expect(page.getByPlaceholder('พิมพ์ข้อความที่นี่...')).toBeVisible();
    });

});
