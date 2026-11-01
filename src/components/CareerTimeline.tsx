import { experience } from '../data/profile';
import { Card } from './InteractiveCard';

const companies = [
  { company: 'Trier Sistemas', period: '2026 — ATUAL', roles: experience.filter(role => role.current) },
  { company: 'SENAI · Soluções Digitais', period: '2022 — 2026', roles: experience.filter(role => role.company.startsWith('SENAI')) },
  { company: 'Trier Sistemas', period: '2021 — 2022', roles: experience.filter(role => role.company === 'Trier Sistemas' && !role.current) },
];

export function CareerTimeline() {
  return <div className="career-path" aria-label="Trajetória profissional, da experiência mais recente para a mais antiga">
    {companies.map((company, index) => <div className="career-chapter" key={company.company + company.period}>
      <div className="career-marker" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
      <Card className={`career-company ${company.roles.some(role => role.current) ? 'career-current' : ''}`}>
        <div className="career-company-header"><h3>{company.company}</h3><span className="career-years">{company.period}</span></div>
        <ol className="career-roles">{company.roles.map(role => <li key={role.role}>
          <div className="career-role-heading"><h4>{role.role}</h4>{role.current && <span className="current-badge">Atuação atual</span>}</div>
          <span className="career-date">{role.period}</span>
          <p>{role.description}</p>
        </li>)}</ol>
      </Card>
    </div>)}
  </div>;
}
