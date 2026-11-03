import { experience } from '../data/profile';
import { useTranslation } from '../i18n/I18nProvider';
import { Card } from './InteractiveCard';

export function CareerTimeline() {
    const { locale, t } = useTranslation();
    const formatter = new Intl.DateTimeFormat(locale, {
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    });
    const format = (date: string) =>
        formatter.format(new Date(`${date}-01T00:00:00Z`));

    return (
        <div className="career-path" role="group" aria-label={t.timeline}>
            {experience.map(({ id, company, summary, roles }, index) => {
                const current = roles[0].end === null;
                const start = roles[roles.length - 1].start;
                const end = roles[0].end;
                return (
                    <div className="career-chapter" key={id}>
                        <div className="career-marker" aria-hidden="true">
                            {String(index + 1).padStart(2, '0')}
                        </div>
                        <Card
                            className={`career-company ${current ? 'career-current' : ''}`}
                        >
                            <div className="career-company-header">
                                <h3>{company}</h3>
                                <span className="career-years">
                                    {start.slice(0, 4)} —{' '}
                                    {end?.slice(0, 4) ?? t.present}
                                </span>
                            </div>
                            {summary && (
                                <p className="description">{summary[locale]}</p>
                            )}
                            <ol className="career-roles">
                                {roles.map((role) => (
                                    <li key={role.id}>
                                        <div className="career-role-heading">
                                            <h4>{role.title[locale]}</h4>
                                            {role.end === null && (
                                                <span className="current-badge">
                                                    {t.current}
                                                </span>
                                            )}
                                        </div>
                                        <span className="career-date">
                                            <time dateTime={role.start}>
                                                {format(role.start)}
                                            </time>{' '}
                                            —{' '}
                                            {role.end ? (
                                                <time dateTime={role.end}>
                                                    {format(role.end)}
                                                </time>
                                            ) : (
                                                t.present
                                            )}
                                        </span>
                                        <p>{role.description[locale]}</p>
                                        <ul className="skills role-stack">
                                            {role.technologies.map(
                                                (technology) => (
                                                    <li key={technology}>
                                                        {technology}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </li>
                                ))}
                            </ol>
                        </Card>
                    </div>
                );
            })}
        </div>
    );
}
