import { useEffect, useState } from 'react';
import { Card } from './components/InteractiveCard';
import { CareerTimeline } from './components/CareerTimeline';
import { ProjectFilters } from './components/ProjectFilters';
import { useProjects } from './hooks/useProjects';
import { github, email, skills, careerStart } from './data/profile';
import './app.css';
export default function App() {
    const { repos, status, retry } = useProjects();
    const today = new Date();
    const totalCareerMonths = Math.max(0, (today.getFullYear() - careerStart.year) * 12 + today.getMonth() + 1 - careerStart.month);
    const careerYears = Math.floor(totalCareerMonths / 12);
    const careerMonths = totalCareerMonths % 12;
    const careerDuration = [
        careerYears > 0 ? careerYears + (careerYears === 1 ? ' ano' : ' anos') : '',
        careerMonths > 0 ? careerMonths + (careerMonths === 1 ? ' mês' : ' meses') : '',
    ].filter(Boolean).join(' e ') || '0 meses';
    const [visibleCount, setVisibleCount] = useState(6);
    const [query, setQuery] = useState(''), [language, setLanguage] = useState('Todos'), [copy, setCopy] = useState('');
    useEffect(() => { const paths: Record<string, string> = { '/about': 'sobre', '/projects': 'projetos', '/contact': 'contato', '/articles': 'artigos' }; const id = paths[location.pathname]; if (id)
        document.getElementById(id)?.scrollIntoView(); }, []);
    async function copyEmail() { try {
        await navigator.clipboard.writeText(email);
        setCopy('E-mail copiado!');
    }
    catch {
        setCopy(`Copie manualmente: ${email}`);
    } }
    const languages = ['Todos', ...Array.from(new Set(repos.map(r => r.language).filter((l): l is string => !!l)))];
    const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
    useEffect(() => setVisibleCount(6), [query, language]);
    const filtered = repos.filter(r => (language === 'Todos' || r.language === language) && normalize(`${r.name} ${r.description ?? ''}`).includes(normalize(query.trim())));
    return <><a className="skip" href="#principal">Pular para o conteúdo</a>
  <header><a className="logo" href="#inicio" aria-label="Fabrisio Filho, início">ff<span>.</span><small>FABRISIO FILHO</small></a><nav aria-label="Navegação principal"><a href="#sobre">Sobre</a><a href="#trajetoria">Trajetória</a><a href="#projetos">Projetos</a></nav><a className="contact-link" href="#contato">Vamos conversar ↗</a></header>
  <main id="principal"><section className="hero wrap personal-hero" id="inicio">
    <div className="hero-intro">
      <div className="eyebrow">OLÁ, EU SOU</div>
      <h1>Fabrisio<br /><span>Filho<span className="name-dot">.</span></span></h1>
      <p className="hero-role">Full Stack Software Developer</p>
      <p>Desenvolvo aplicações com Java, Spring, Angular e React. Hoje, faço parte da Trier Sistemas, trabalhando com arquitetura de microsserviços.</p>
      <div className="actions"><a className="button" href="#projetos">Conheça meu trabalho ↗</a><a href="https://www.linkedin.com/in/fabrisio-filho/" target="_blank" rel="noreferrer">Meu LinkedIn ↗</a></div>
      <div className="hero-note">DESENVOLVENDO DESDE 2021 <span>DO BACKEND À INTERFACE</span></div>
    </div>
    <Card className="focus-card">
      <span className="eyebrow">COMO POSSO CONTRIBUIR</span>
      <h3>Do domínio<br />à experiência.</h3>
      <div className="focus-item"><span>01</span><div><strong>Backend & microsserviços</strong><p>Java, Spring e arquitetura de microsserviços.</p></div></div>
      <div className="focus-item"><span>02</span><div><strong>Interfaces & aplicações</strong><p>Angular, React e TypeScript.</p></div></div>
      <div className="focus-item"><span>03</span><div><strong>Qualidade & evolução</strong><p>Testes automatizados, boas práticas e responsabilidade técnica.</p></div></div>
      <a className="current-position" href="#trajetoria"><i /> Conheça minha trajetória <span>↓</span></a>
    </Card>
  </section>
  <div className="strip"><div className="wrap">{['Java', 'Spring Framework', 'React', 'TypeScript', 'PostgreSQL', 'Docker'].map(s => <span key={s}>{s} <b>✳</b></span>)}</div></div>
  <section className="section wrap" id="sobre"><div className="eyebrow">01 / SOBRE MIM</div><h2>Curiosidade para aprender.<br /><span>Critério para construir.</span></h2><div className="about-grid"><Card className="about-card"><img src="https://avatars.githubusercontent.com/u/65460537?s=240" alt="Fabrisio Filho" width="88" height="88" loading="lazy"/><h3>Muito prazer, Fabrisio.</h3><p>Sou Full Stack Software Developer na Trier Sistemas desde outubro de 2026, apaixonado por tecnologia e pela evolução constante. Tenho experiência com desenvolvimento ágil e busco soluções claras, boas práticas e design patterns para criar aplicações que possam evoluir.</p><a href="https://www.linkedin.com/in/fabrisio-filho/" target="_blank" rel="noreferrer">Conecte-se no LinkedIn ↗</a></Card><Card className="skills-card"><div className="eyebrow">MINHA CAIXA DE FERRAMENTAS</div><h3>Da lógica à experiência.</h3><p>Tecnologias que fazem parte da minha trajetória.</p><div className="skills">{skills.map(s => <span key={s}>{s}</span>)}</div><div className="education">↳ <div><strong>Análise e Desenvolvimento de Sistemas</strong><p>IFSC · Graduação · 2019 — 2022</p></div></div></Card></div></section>

  <section className="section wrap" id="trajetoria"><div className="eyebrow">02 / TRAJETÓRIA</div><div className="experience-heading"><h2>Experiência profissional<span>.</span></h2><span className="career-counter" title="Desde julho de 2021">{careerDuration} de carreira</span></div><CareerTimeline /></section>
  <section className="wrap" id="artigos"><Card className="articles"><div className="eyebrow">NO RADAR / ARTIGOS</div><h3>Conhecimento também merece ser compartilhado.</h3><p>Novos conteúdos em breve. Enquanto isso, acompanhe meus projetos no <a href={github}>GitHub ↗</a>.</p></Card></section>
  <section className="section wrap" id="contato"><Card className="contact-panel"><div className="eyebrow">03 / CONTATO</div><h2>Uma boa conversa.<br /><span>Uma nova possibilidade.</span></h2><p>Tem um projeto em mente ou quer trocar uma ideia sobre tecnologia?</p><div className="actions"><a className="button" href={`mailto:${email}`}>Vamos conversar ↗</a><button onClick={copyEmail}>Copiar e-mail ⧉</button></div><p className="copy-status" role="status">{copy || email}</p><div className="social"><a href="https://www.linkedin.com/in/fabrisio-filho/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={github} target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.instagram.com/fabrisiofilho.dev/" target="_blank" rel="noreferrer">Instagram ↗</a></div></Card></section>  <section className="section wrap" id="projetos"><div className="section-row"><div><div className="eyebrow">04 / PROJETOS</div><h2>Do conceito <span>ao código.</span></h2></div><a href={github + '?tab=repositories'} target="_blank" rel="noreferrer">Todos no GitHub ↗</a></div><p className="description">Experimentos, aplicações e aprendizados. Explore meus repositórios públicos.</p><ProjectFilters query={query} onQueryChange={setQuery} language={language} onLanguageChange={setLanguage} languages={languages} />
  {status === 'loading' ? <p className="feedback" role="status">Carregando projetos do GitHub…</p> : status === 'error' ? <div className="feedback" role="alert">Não foi possível carregar os projetos. <button onClick={retry}>Tentar novamente</button> ou <a href={github}>visite meu GitHub ↗</a>.</div> : <><p className="count" role="status">{filtered.length} projetos encontrados</p><div className="projects">{filtered.slice(0, visibleCount).map((r, i) => <Card className="project" key={r.id}><div className="project-top"><span>{String(i + 1).padStart(2, '0')}</span><span>{r.language || 'Código aberto'}</span></div><h3><a href={r.html_url} target="_blank" rel="noreferrer">{r.name.replace(/[-_]/g, ' ')} <span>↗</span></a></h3><p>{r.description || 'Explore o código, a estrutura e os aprendizados deste projeto no GitHub.'}</p><div className="project-bottom"><span><i /> {r.language || 'Repositório'}</span><span>☆ {r.stargazers_count}</span></div></Card>)}</div>{filtered.length > visibleCount && <button className="load-more" onClick={() => setVisibleCount(count => count + 6)}>Mostrar mais projetos ({filtered.length - visibleCount} restantes) ↓</button>}{!filtered.length && <p className="feedback">Nenhum projeto encontrado. Experimente outra busca ou tecnologia.</p>}</>}</section></main><footer className="wrap"><a className="logo" href="#inicio">ff<span>.</span></a><span>© {new Date().getFullYear()} Fabrisio Filho. Feito com intenção.</span><a href="#inicio">Voltar ao topo ↑</a></footer></>;
}
