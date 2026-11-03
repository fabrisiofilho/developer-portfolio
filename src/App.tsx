import { useEffect, useState } from 'react';
import { Card } from './components/InteractiveCard';
import { CareerTimeline } from './components/CareerTimeline';
import { ProjectFilters } from './components/ProjectFilters';
import { useProjects } from './hooks/useProjects';
import { featuredProjects } from './data/featuredProjects';
import { github, email, skills, careerStart } from './data/profile';
import { I18nProvider, useTranslation } from './i18n/I18nProvider';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import './app.css';
export default function App() {
    return (
        <I18nProvider>
            <Portfolio />
        </I18nProvider>
    );
}

function Portfolio() {
    const { locale, t } = useTranslation();
    const { repos, hasCache, status, retry } = useProjects();
    const today = new Date();
    const totalCareerMonths = Math.max(
        0,
        (today.getFullYear() - careerStart.year) * 12 +
            today.getMonth() +
            1 -
            careerStart.month,
    );
    const careerYears = Math.floor(totalCareerMonths / 12);
    const careerMonths = totalCareerMonths % 12;
    const years = new Intl.NumberFormat(locale, {
        style: 'unit',
        unit: 'year',
        unitDisplay: 'long',
    });
    const months = new Intl.NumberFormat(locale, {
        style: 'unit',
        unit: 'month',
        unitDisplay: 'long',
    });
    const careerDuration = new Intl.ListFormat(locale).format([
        ...(careerYears ? [years.format(careerYears)] : []),
        ...(careerMonths || !careerYears ? [months.format(careerMonths)] : []),
    ]);
    const [visibleCount, setVisibleCount] = useState(6);
    const [query, setQuery] = useState('');
    const [technologyFilter, setTechnologyFilter] = useState('');
    const [copy, setCopy] = useState<'copied' | 'manual' | null>(null);
    useEffect(() => {
        const paths: Record<string, string> = {
            '/about': 'sobre',
            '/projects': 'projetos',
            '/contact': 'contato',
            '/articles': 'artigos',
        };
        const id = paths[location.pathname];
        if (id) document.getElementById(id)?.scrollIntoView();
    }, []);
    async function copyEmail() {
        try {
            await navigator.clipboard.writeText(email);
            setCopy('copied');
        } catch {
            setCopy('manual');
        }
    }
    const technologies = [
        ...new Set([
            '',
            ...repos.flatMap((repo) => (repo.language ? [repo.language] : [])),
            technologyFilter,
        ]),
    ];
    const normalize = (text: string) =>
        text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase('pt-BR');
    useEffect(() => setVisibleCount(6), [query, technologyFilter]);
    const search = normalize(query.trim());
    const filtered = repos.filter(
        (r) =>
            (!technologyFilter || r.language === technologyFilter) &&
            normalize(`${r.name} ${r.description ?? ''}`).includes(search),
    );
    return (
        <>
            <a className="skip" href="#principal">
                {t.skip}
            </a>
            <header>
                <a className="logo" href="#inicio" aria-label={t.home}>
                    ff<span>.</span>
                    <small>FABRISIO FILHO</small>
                </a>
                <nav aria-label={t.mainNav}>
                    <a href="#sobre">{t.about}</a>
                    <a href="#trajetoria">{t.experience}</a>
                    <a href="#projetos">{t.projects}</a>
                    <a className="mobile-contact" href="#contato">
                        {t.contactNav}
                    </a>
                </nav>
                <div className="header-actions">
                    <LanguageSwitcher />
                    <a className="contact-link" href="#contato">
                        {t.contact} ↗
                    </a>
                </div>
            </header>
            <main id="principal" tabIndex={-1}>
                <section className="hero wrap personal-hero" id="inicio">
                    <div className="hero-intro">
                        <div className="eyebrow">{t.greeting}</div>
                        <h1>
                            Fabrisio
                            <br />
                            <span>
                                Filho<span className="name-dot">.</span>
                            </span>
                        </h1>
                        <p className="hero-role">{t.headline}</p>
                        <p>{t.heroDescription}</p>
                        <div className="actions">
                            <a className="button" href="#projetos">
                                {t.explore} ↗
                            </a>
                            <a
                                href="https://www.linkedin.com/in/fabrisio-filho/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t.linkedIn} ↗
                            </a>
                        </div>
                        <div className="hero-note">
                            {t.since} <span>{t.fullStack}</span>
                        </div>
                    </div>
                    <Card className="focus-card">
                        <span className="eyebrow">{t.focus}</span>
                        <h2>
                            {t.focusFirst}
                            <br />
                            {t.focusSecond}
                        </h2>
                        <div className="focus-item">
                            <span>01</span>
                            <div>
                                <strong>{t.backend}</strong>
                                <p>{t.backendStack}</p>
                            </div>
                        </div>
                        <div className="focus-item">
                            <span>02</span>
                            <div>
                                <strong>{t.frontend}</strong>
                                <p>{t.frontendStack}</p>
                            </div>
                        </div>
                        <div className="focus-item">
                            <span>03</span>
                            <div>
                                <strong>{t.quality}</strong>
                                <p>{t.qualityDetails}</p>
                            </div>
                        </div>
                        <a className="current-position" href="#trajetoria">
                            <i /> {t.careerLink} <span>↓</span>
                        </a>
                    </Card>
                </section>
                <div className="strip">
                    <div className="wrap">
                        {[
                            'Java',
                            'Spring Framework',
                            'React',
                            'TypeScript',
                            'PostgreSQL',
                            'Docker',
                        ].map((s) => (
                            <span key={s}>
                                {s} <b>✳</b>
                            </span>
                        ))}
                    </div>
                </div>
                <section className="section wrap" id="sobre">
                    <div className="eyebrow">{t.aboutEyebrow}</div>
                    <h2>
                        {t.aboutFirst}
                        <br />
                        <span>{t.aboutSecond}</span>
                    </h2>
                    <div className="about-grid">
                        <Card className="about-card">
                            <img
                                src="https://avatars.githubusercontent.com/u/65460537?s=240"
                                alt="Fabrisio Filho"
                                width="88"
                                height="88"
                                loading="lazy"
                            />
                            <h3>{t.introduction}</h3>
                            <p>{t.biography}</p>
                            <a
                                href="https://www.linkedin.com/in/fabrisio-filho/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t.connect} ↗
                            </a>
                        </Card>
                        <Card className="skills-card">
                            <div className="eyebrow">{t.toolkit}</div>
                            <h3>{t.toolkitTitle}</h3>
                            <p>{t.toolkitDescription}</p>
                            <div className="skills">
                                {skills.map((s) => (
                                    <span key={s}>{s}</span>
                                ))}
                            </div>
                        </Card>
                    </div>
                    <Card className="education">
                        <div>
                            <div className="eyebrow">{t.undergraduate}</div>
                            <h3>{t.degree}</h3>
                            <p>{t.institution}</p>
                        </div>
                        <span className="education-period">
                            <time dateTime="2019">2019</time> — <time dateTime="2022">2022</time>
                        </span>
                    </Card>
                </section>

                <section className="section wrap" id="trajetoria">
                    <div className="eyebrow">{t.experienceEyebrow}</div>
                    <div className="experience-heading">
                        <h2>
                            {t.experienceTitle}
                            <span>.</span>
                        </h2>
                        <span className="career-counter">
                            {careerDuration} {t.careerDuration}
                        </span>
                    </div>
                    <CareerTimeline />
                </section>
                <section className="wrap" id="artigos">
                    <Card className="articles">
                        <div className="eyebrow">{t.articlesEyebrow}</div>
                        <h2>{t.articlesTitle}</h2>
                        <p>
                            {t.articlesDescription}
                            <a href={github}>GitHub ↗</a>.
                        </p>
                    </Card>
                </section>
                <section className="section wrap" id="projetos">
                    <div className="section-row">
                        <div>
                            <div className="eyebrow">{t.projectsEyebrow}</div>
                            <h2>
                                {t.projectsFirst}
                                <span>{t.projectsSecond}</span>
                            </h2>
                        </div>
                        <a
                            href={github + '?tab=repositories'}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {t.allOnGithub} ↗
                        </a>
                    </div>
                    <p className="description">{t.projectsDescription}</p>
                    <h3 className="projects-subheading">{t.featured}</h3>
                    <div className="projects">
                        {featuredProjects.map((project) => (
                            <Card className="project" key={project.repo}>
                                <h4>
                                    <a
                                        href={github + '/' + project.repo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {project.repo} ↗
                                    </a>
                                </h4>
                                <p>{project.description[locale]}</p>
                                <div className="skills">
                                    {project.stack.map((technology) => (
                                        <span key={technology}>
                                            {technology}
                                        </span>
                                    ))}
                                </div>
                                {project.demo && (
                                    <p>
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {t.demo} ↗
                                        </a>
                                    </p>
                                )}
                            </Card>
                        ))}
                    </div>
                    <h3 className="projects-subheading">{t.allProjects}</h3>
                    <ProjectFilters
                        query={query}
                        onQueryChange={setQuery}
                        technologyFilter={technologyFilter}
                        onTechnologyChange={setTechnologyFilter}
                        technologies={technologies}
                    />
                    {status === 'loading' && (
                        <p className="feedback" role="status">
                            {t.loading}
                        </p>
                    )}
                    {(status === 'error' || status === 'rate-limit') && (
                        <div className="feedback" role="alert">
                            {status === 'rate-limit'
                                ? t.rateLimit
                                : t.loadError}{' '}
                            {hasCache && t.cached}{' '}
                            <button onClick={retry}>{t.retry}</button>
                            {t.or}
                            <a href={github}>{t.visitGithub} ↗</a>.
                        </div>
                    )}
                    {(status === 'success' || hasCache) && (
                        <>
                            <p className="count" role="status">
                                {filtered.length} {t.results}
                            </p>
                            <div className="projects">
                                {filtered.slice(0, visibleCount).map((r, i) => (
                                    <Card className="project" key={r.id}>
                                        <div className="project-top">
                                            <span>
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                            <span>
                                                {r.language || t.openSource}
                                            </span>
                                        </div>
                                        <h4>
                                            <a
                                                href={r.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {r.name} <span>↗</span>
                                            </a>
                                        </h4>
                                        <p>
                                            {r.description || t.repoDescription}
                                        </p>
                                        <div className="project-bottom">
                                            <span>
                                                <i />{' '}
                                                {r.language || t.repository}
                                            </span>
                                            <span>☆ {r.stargazers_count}</span>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                            {filtered.length > visibleCount && (
                                <button
                                    className="load-more"
                                    onClick={() =>
                                        setVisibleCount((count) => count + 6)
                                    }
                                >
                                    {t.more} ({filtered.length - visibleCount}{' '}
                                    {t.remaining}) ↓
                                </button>
                            )}
                            {!filtered.length && (
                                <p className="feedback">{t.empty}</p>
                            )}
                        </>
                    )}
                </section>
                <section className="section wrap" id="contato">
                    <Card className="contact-panel">
                        <div className="eyebrow">{t.contactEyebrow}</div>
                        <h2>
                            {t.contactFirst}
                            <br />
                            <span>{t.contactSecond}</span>
                        </h2>
                        <p>{t.contactDescription}</p>
                        <div className="actions">
                            <a className="button" href={`mailto:${email}`}>
                                {t.contact} ↗
                            </a>
                            <button onClick={copyEmail}>{t.copy} ⧉</button>
                        </div>
                        <p className="copy-status" role="status">
                            {copy === 'copied'
                                ? t.copied
                                : copy === 'manual'
                                  ? t.copyManual + ': ' + email
                                  : email}
                        </p>
                        <div className="social">
                            <a
                                href="https://www.linkedin.com/in/fabrisio-filho/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                LinkedIn ↗
                            </a>
                            <a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GitHub ↗
                            </a>
                            <a
                                href="https://www.instagram.com/fabrisiofilho/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Instagram ↗
                            </a>
                        </div>
                    </Card>
                </section>
            </main>
            <footer className="wrap">
                <a className="logo" href="#inicio" aria-label={t.home}>
                    ff<span>.</span>
                </a>
                <span>
                    © {new Date().getFullYear()} Fabrisio Filho. {t.footer}
                </span>
                <a href="#inicio">{t.top} ↑</a>
            </footer>
        </>
    );
}
