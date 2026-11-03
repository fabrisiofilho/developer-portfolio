import { useEffect, useState } from 'react';

export interface Repo {
    id: number;
    name: string;
    description: string | null;
    language: string | null;
    html_url: string;
    stargazers_count: number;
    fork: boolean;
}

export const hiddenRepos = new Set(['fabrisiofilho']);
const storageKey = 'portfolio.github-repos.v1';
const cacheDuration = 5 * 60 * 1000;
const pageSize = 100;
const maxPages = 10;

interface Cache {
    savedAt: number;
    repos: Repo[];
}

type Status = 'loading' | 'success' | 'error' | 'rate-limit';

function isRepo(value: unknown): value is Repo {
    if (!value || typeof value !== 'object') return false;
    const repo = value as Partial<Repo>;
    return (
        typeof repo.id === 'number' &&
        typeof repo.name === 'string' &&
        typeof repo.html_url === 'string' &&
        repo.html_url.startsWith('https://github.com/') &&
        (repo.description === null || typeof repo.description === 'string') &&
        (repo.language === null || typeof repo.language === 'string') &&
        typeof repo.stargazers_count === 'number' &&
        typeof repo.fork === 'boolean'
    );
}

function readCache(): Cache | null {
    try {
        const value = JSON.parse(sessionStorage.getItem(storageKey) ?? 'null');
        if (
            value &&
            typeof value.savedAt === 'number' &&
            Array.isArray(value.repos) &&
            value.repos.every(isRepo)
        )
            return value;
    } catch {
        /* Cache is optional. */
    }
    return null;
}

export async function fetchProjects(
    signal: AbortSignal,
): Promise<Repo[] | 'rate-limit'> {
    const repos = new Map<number, Repo>();
    for (let page = 1; page <= maxPages; page++) {
        const response = await fetch(
            `https://api.github.com/users/fabrisiofilho/repos?sort=updated&per_page=${pageSize}&page=${page}`,
            { signal },
        );
        if (response.status === 403 || response.status === 429)
            return 'rate-limit';
        if (!response.ok) throw new Error(`GitHub HTTP ${response.status}`);
        const data: unknown = await response.json();
        if (!Array.isArray(data) || !data.every(isRepo))
            throw new Error('Invalid GitHub response');
        for (const repo of data)
            if (!repo.fork && !hiddenRepos.has(repo.name))
                repos.set(repo.id, repo);
        if (data.length < pageSize) break;
    }
    return [...repos.values()];
}

export function useProjects() {
    const [cache, setCache] = useState(readCache);
    const [status, setStatus] = useState<Status>('loading');
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        const saved = readCache();
        if (
            attempt === 0 &&
            saved &&
            Date.now() - saved.savedAt < cacheDuration
        ) {
            setStatus('success');
            return;
        }

        const controller = new AbortController();
        let disposed = false;
        const timer = setTimeout(() => controller.abort(), 15000);
        setStatus('loading');

        async function load() {
            try {
                const result = await fetchProjects(controller.signal);
                if (disposed) return;
                if (result === 'rate-limit') {
                    setStatus(result);
                    return;
                }
                const next = { savedAt: Date.now(), repos: result };
                setCache(next);
                setStatus('success');
                try {
                    sessionStorage.setItem(storageKey, JSON.stringify(next));
                } catch {
                    /* Keep results in memory. */
                }
            } catch {
                if (!disposed) setStatus('error');
            } finally {
                clearTimeout(timer);
            }
        }
        void load();
        return () => {
            disposed = true;
            clearTimeout(timer);
            controller.abort();
        };
    }, [attempt]);

    return {
        repos: cache?.repos ?? [],
        hasCache: cache !== null,
        status,
        retry: () => setAttempt((n) => n + 1),
    };
}
