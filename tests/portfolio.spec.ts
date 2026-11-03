import { expect, test } from '@playwright/test';

const api = 'https://api.github.com/users/fabrisiofilho/repos?*';
const repos = [
    {
        id: 1,
        name: 'catalog',
        description: 'Catálogo de livros',
        language: 'Java',
        html_url: 'https://github.com/example/catalog',
        stargazers_count: 0,
        fork: false,
    },
    {
        id: 2,
        name: 'dashboard',
        description: null,
        language: 'TypeScript',
        html_url: 'https://github.com/example/dashboard',
        stargazers_count: 0,
        fork: false,
    },
    {
        id: 3,
        name: 'fork',
        description: null,
        language: 'Java',
        html_url: 'https://github.com/example/fork',
        stargazers_count: 0,
        fork: true,
    },
];

test.describe('Portuguese browser preference', () => {
    test.use({ locale: 'pt-PT' });

    test('translates the UI, keeps filters, and persists the manual choice', async ({
        page,
    }) => {
        await page.route(api, (route) => route.fulfill({ json: repos }));
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
        await expect(
            page.getByRole('heading', { name: 'Analista Programador Master' }),
        ).toBeVisible();
        await expect(
            page.getByRole('heading', { name: 'Trier Sistemas' }),
        ).toHaveCount(2);
        await expect(
            page.getByRole('heading', { name: 'SENAI · Soluções Digitais' }),
        ).toHaveCount(1);
        await expect(page.getByRole('link', { name: 'fork' })).toHaveCount(0);
        await page
            .getByRole('searchbox', { name: 'Buscar projetos' })
            .fill('catalogo');
        await page.getByRole('button', { name: /Tecnologia/ }).click();
        await page.getByRole('option', { name: 'Java' }).click();

        await page
            .getByRole('button', { name: 'English (United States)' })
            .click();
        await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
        await expect(page).toHaveTitle(/Full-Stack Software Developer/);
        await expect(
            page.getByRole('heading', { name: 'Master Software Developer' }),
        ).toBeVisible();
        await expect(
            page.getByText('October 2026', { exact: true }).first(),
        ).toBeVisible();
        await expect(
            page.getByRole('searchbox', { name: 'Search projects' }),
        ).toHaveValue('catalogo');
        await expect(
            page.getByRole('button', { name: /Technology/ }),
        ).toContainText('Java');
        await expect(page.getByRole('link', { name: /catalog/ })).toBeVisible();
        await expect(page.getByRole('link', { name: /dashboard/ })).toHaveCount(
            0,
        );
        await page.getByRole('searchbox').fill('absent');
        await expect(page.getByText(/No projects found/)).toBeVisible();
        await page.reload({ waitUntil: 'domcontentloaded' });
        await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
    });
});

test.describe('Unsupported browser preference', () => {
    test.use({
        locale: 'es-ES',
        viewport: { width: 320, height: 800 },
        reducedMotion: 'reduce',
    });

    test('falls back to English, shows rate limits, and retries without losing the showcase', async ({
        page,
    }) => {
        let requests = 0;
        await page.route(api, (route) =>
            ++requests === 1
                ? route.fulfill({ status: 429, json: {} })
                : route.fulfill({ json: repos }),
        );
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
        await expect(page.getByRole('alert')).toContainText(
            'temporarily limited',
        );
        await expect(
            page.getByRole('heading', { name: 'Featured projects' }),
        ).toBeVisible();
        await page.getByRole('button', { name: 'Try again' }).click();
        await expect(
            page.getByRole('link', { name: /dashboard/ }),
        ).toBeVisible();
        await expect
            .poll(() =>
                page.evaluate(() => document.documentElement.scrollWidth),
            )
            .toBe(320);
        await page.reload({ waitUntil: 'domcontentloaded' });
        await expect(
            page.getByRole('link', { name: /dashboard/ }),
        ).toBeVisible();
        expect(requests).toBe(2);
    });
});

test('keeps cached results available when a refresh fails', async ({
    page,
}) => {
    await page.route(api, (route) => route.fulfill({ json: repos }));
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('link', { name: /dashboard/ })).toBeVisible();
    await page.evaluate(() => {
        const key = 'portfolio.github-repos.v1';
        const cache = JSON.parse(sessionStorage.getItem(key)!);
        sessionStorage.setItem(key, JSON.stringify({ ...cache, savedAt: 0 }));
    });
    await page.unroute(api);
    await page.route(api, (route) => route.abort());
    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('alert')).toContainText(
        'Showing the last saved list',
    );
    await expect(page.getByRole('link', { name: /dashboard/ })).toBeVisible();
});

test.describe('English browser preference', () => {
    test.use({ locale: 'en-GB', viewport: { width: 390, height: 844 } });

    test('supports keyboard access and localizes clipboard fallback', async ({
        page,
        browserName,
    }) => {
        await page.addInitScript(() => {
            Object.defineProperty(navigator, 'clipboard', { value: undefined });
        });
        await page.route(api, (route) => route.fulfill({ json: repos }));
        await page.goto('/', { waitUntil: 'domcontentloaded' });
        await expect(page.locator('html')).toHaveAttribute('lang', 'en-US');
        const skipLink = page.getByRole('link', { name: 'Skip to content' });
        // WebKit's default Tab navigation can skip links.
        if (browserName === 'webkit') await skipLink.focus();
        else await page.keyboard.press('Tab');
        await expect(skipLink).toBeFocused();
        await page.keyboard.press('Enter');
        await expect(page.locator('main')).toBeFocused();
        await page.getByRole('button', { name: 'Copy email' }).click();
        await expect(page.locator('.copy-status')).toContainText(
            'Copy manually',
        );
        await page.getByRole('button', { name: 'Português (Brasil)' }).click();
        await expect(page.locator('.copy-status')).toContainText(
            'Copie manualmente',
        );
        await expect
            .poll(() =>
                page.evaluate(() => document.documentElement.scrollWidth),
            )
            .toBe(390);
    });
});
