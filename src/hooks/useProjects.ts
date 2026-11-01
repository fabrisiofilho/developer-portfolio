import { useEffect, useState } from 'react';
interface Repo {
    id: number;
    name: string;
    description: string | null;
    language: string | null;
    html_url: string;
    stargazers_count: number;
    fork: boolean;
}
export function useProjects() {
    const [repos, setRepos] = useState<Repo[]>([]), [status, setStatus] = useState('loading'), [attempt, setAttempt] = useState(0);
    useEffect(() => {
        const controller = new AbortController();
        let disposed = false;
        const timer = setTimeout(() => controller.abort(), 15000);
        setStatus('loading');
        async function load() {
            try {
                const all: Repo[] = [];
                let page = 1;
                while (true) {
                    const response = await fetch(`https://api.github.com/users/fabrisiofilho/repos?sort=updated&per_page=100&page=${page}`, { signal: controller.signal });
                    if (!response.ok)
                        throw Error();
                    const data: Repo[] = await response.json();
                    if (!Array.isArray(data))
                        throw Error();
                    all.push(...data.filter(repo => !repo.fork));
                    if (data.length < 100)
                        break;
                    page++;
                }
                if (!disposed) {
                    setRepos(all);
                    setStatus('success');
                }
            }
            catch {
                if (!disposed)
                    setStatus('error');
            }
            finally {
                clearTimeout(timer);
            }
        }
        void load();
        return () => { disposed = true; clearTimeout(timer); controller.abort(); };
    }, [attempt]);
    return { repos, status, retry: () => setAttempt(n => n + 1) };
}
