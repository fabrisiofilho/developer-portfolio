import { expect, test } from '@playwright/test';

for (const scenario of ['unavailable', 'no-installer']) {
    test(`Latest release fallback: ${scenario}`, async ({ page }) => {
        await page.route('https://api.github.com/repos/fabrisiofilho/contabily/releases/latest', route =>
            scenario === 'unavailable'
                ? route.fulfill({ status: 403, json: { message: 'Rate limit exceeded' } })
                : route.fulfill({ json: { tag_name: 'v3.2.0', assets: [] } }));
        await page.goto('/contabily');
        await expect(page.locator('#download .button')).toHaveAttribute('href', 'https://github.com/fabrisiofilho/contabily/releases/latest');
        if (scenario === 'no-installer') await expect(page.locator('#download')).toContainText('Contabily Desktop 3.2.0');
        await expect(page.locator('#download')).not.toContainText('2.8.2');
    });
}

for (const width of [390, 1440]) {
    test(`Contabily navigation and responsive layout at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.route('https://api.github.com/repos/fabrisiofilho/contabily/releases/latest', route => route.fulfill({ json: {
            tag_name: 'v3.1.0',
            assets: [{ name: 'Contabily-setup-3.1.0.exe', browser_download_url: 'https://github.com/fabrisiofilho/contabily/releases/download/v3.1.0/Contabily-setup-3.1.0.exe' }],
        } }));
        await page.route('https://api.github.com/users/fabrisiofilho/repos?*', route => route.fulfill({ json: [] }));
        await page.goto('/');
        await page.getByRole('link', { name: /Discover Contabily/ }).click();
        await expect(page).toHaveURL(/\/contabily$/);
        await expect(page.getByRole('heading', { name: 'Contabily.', exact: true })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Download for Windows ↓', exact: true }).last()).toHaveAttribute('href', /releases\/download\/v3.1.0\/Contabily-setup-3.1.0.exe$/);
        await expect(page.locator('#download')).toContainText('Contabily Desktop 3.1.0');
        await expect(page.locator('.desktop-real-shot')).toBeVisible();
        await expect(page.locator('.desktop-gallery img')).toHaveCount(6);
        expect(await page.locator('.desktop-real-shot').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
        await expect(page.locator('.mobile-development')).toContainText('The mobile app is not ready yet.');
        await page.getByRole('button', { name: 'Português (Brasil)' }).click();
        await expect(page.getByRole('heading', { name: 'Seu dinheiro, com mais clareza.' })).toBeVisible();
        await page.getByRole('link', { name: 'O futuro', exact: true }).click();
        await expect(page.getByText('Versão web, recursos centralizados e sincronização entre dispositivos. Ainda não disponíveis e sem data anunciada.')).toBeVisible();
        await expect(page.getByRole('link', { name: /APK/ })).toHaveCount(0);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await page.reload();
        await expect(page.getByRole('heading', { name: 'Contabily.', exact: true })).toHaveCount(1);
        await page.getByRole('link', { name: 'Voltar ao portfólio ↗' }).click();
        await expect(page).toHaveURL(/\/#projetos$/);
        await expect(page.locator('#projetos')).toBeVisible();
        await expect(page.getByRole('link', { name: /Conheça o Contabily/ })).toBeVisible();
        await expect(page.locator('.contabily-dot-transition')).toHaveCount(0);
        await expect(page).toHaveTitle(/Fabrisio Filho/);
    });
}




