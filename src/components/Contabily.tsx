import { Card } from './InteractiveCard';
import { DesktopLogo, DesktopSurface, openContabily } from './ContabilyIdentity';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from '../i18n/I18nProvider';
import './contabily.css';
import { ContabilyDetails } from './ContabilyDetails';

const repository = 'https://github.com/fabrisiofilho/contabily';
const releases = `${repository}/releases/latest`;
const installer = `${repository}/releases/download/v2.8.2/Contabily-setup-2.8.2.exe`;

function useCopy() {
    const { locale } = useTranslation();
    return (pt: string, en: string) => locale === 'pt-BR' ? pt : en;
}

export function ContabilySpotlight() {
    const c = useCopy();
    return <Card className="contabily-spotlight">
        <div>
            <div className="eyebrow">{c('PROJETO EM DESTAQUE · CONTABILY', 'FEATURED PROJECT · CONTABILY')}</div>
            <h3>{c('Suas finanças. Uma visão completa.', 'Your finances. The full picture.')}</h3>
            <p>{c('Um aplicativo desktop para organizar a vida financeira. Uma experiência mobile em construção. E um futuro conectado entre dispositivos.', 'A desktop app to organize your finances. A mobile experience in progress. And a connected future across devices.')}</p>
            <div className="actions"><a className="button" href="/contabily" onClick={openContabily}>{c('Conheça o Contabily', 'Discover Contabily')} ↗</a><a href={releases} target="_blank" rel="noopener noreferrer">{c('Download para Windows', 'Download for Windows')} ↓</a></div>
        </div>
        <div className="contabily-monogram"><DesktopLogo /><small>DESKTOP / MOBILE / WEB</small></div>
    </Card>;
}

export function ContabilyPage() {
    const c = useCopy();
    const features = [
        [c('Movimentações', 'Transactions'), c('Receitas e despesas organizadas por conta, categoria e período, com uma visão clara do mês.', 'Income and expenses organized by account, category, and period, with a clear view of your month.')],
        [c('Planejamento', 'Planning'), c('Metas, orçamentos e recorrências para acompanhar a rotina e planejar os próximos passos.', 'Goals, budgets, and recurring transactions to track your routine and plan ahead.')],
        [c('Análises e investimentos', 'Insights and investments'), c('Relatórios, registros de investimentos e simulações para explorar diferentes cenários.', 'Reports, investment records, and simulations to explore different scenarios.')],
    ];
    return <div className="contabily-desktop">
        <a className="skip" href="#principal">{c('Pular para o conteúdo', 'Skip to content')}</a>
        <header className="contabily-header">
            <a href="/contabily" aria-label="Contabily"><DesktopLogo /></a>
            <nav aria-label={c('Navegação Contabily', 'Contabily navigation')}><a href="#experiencia">{c('Experiência', 'Experience')}</a><a href="#telas">{c('Telas reais', 'Screenshots')}</a><a href="#recursos">{c('Recursos', 'Features')}</a><a href="#futuro">{c('O futuro', 'The future')}</a><a href="#download">Download</a></nav>
            <div className="contabily-header-actions"><a className="portfolio-return" href="/#projetos" onClick={openContabily}>← {c('Meu portfólio', 'My portfolio')}</a><LanguageSwitcher /></div>
        </header>
        <main id="principal" tabIndex={-1} className="contabily-page">
            <section className="hero wrap contabily-hero">
                <div><a className="contabily-back" href="/#projetos" onClick={openContabily}>← {c('Voltar aos projetos', 'Back to projects')}</a><div className="eyebrow"><i /> {c('SOFTWARE AUTORAL · EM EVOLUÇÃO', 'INDEPENDENT SOFTWARE · EVOLVING')}</div>
                    <h1>Contabily<span>.</span></h1><h2>{c('Seu dinheiro,', 'Your money,')}<br /><span>{c('com mais clareza.', 'with more clarity.')}</span></h2>
                    <p>{c('Transforme números em uma visão da sua vida financeira. Organize receitas, acompanhe despesas e planeje suas próximas conquistas.', 'Turn numbers into a picture of your financial life. Organize income, track expenses, and plan your next milestones.')}</p>
                    <div className="actions"><a className="button" href="#download">{c('Baixar para Windows', 'Download for Windows')} ↓</a><a href={repository} target="_blank" rel="noopener noreferrer">{c('Explorar o código', 'Explore the code')} ↗</a></div>
                    <p className="contabily-caption">{c('Desktop disponível · Mobile em desenvolvimento · Web no horizonte', 'Desktop available · Mobile in development · Web on the horizon')}</p>
                </div>
                <DesktopSurface className="contabily-hero-art"><div className="eyebrow">{c('CLAREZA EM CADA DETALHE', 'CLARITY IN EVERY DETAIL')}</div><img className="desktop-real-shot" src="/contabily/desktop-dashboard.png" alt={c('Tela real da visão geral do Contabily Desktop', 'Actual Contabily Desktop overview screen')} width="1600" height="1032" /><p className="contabily-caption">{c('Captura real do desktop em desenvolvimento · dados demonstrativos', 'Actual desktop development capture · sample data')}</p></DesktopSurface>
            </section>
            <div className="strip"><div className="wrap">{['Electron', 'React', 'TypeScript', 'SQLite', 'React Native + Expo'].map(s => <span key={s}>{s} <b>✳</b></span>)}</div></div>
            <section className="section wrap" id="experiencia"><div className="eyebrow">01 / {c('A EXPERIÊNCIA', 'THE EXPERIENCE')}</div><h2>{c('Uma base sólida.', 'A solid foundation.')}<br /><span>{c('Novas possibilidades.', 'New possibilities.')}</span></h2>
                <div className="contabily-platforms">
                    <DesktopSurface className="contabily-platform"><div className="contabily-platform-top"><span className="eyebrow">DESKTOP</span><span className="current-badge">{c('Disponível para Windows', 'Available for Windows')}</span></div><h3>{c('Controle na sua mesa.', 'Control at your desk.')}</h3><p>{c('Uma experiência completa em uma interface escura e organizada. Dados armazenados localmente, sem integração bancária, com backup e restauração criptografados.', 'A full experience in an organized dark interface. Locally stored data, without bank integration, with encrypted backup and restore.')}</p><div className="skills">{['Electron', 'React', 'SQLite'].map(s => <span key={s}>{s}</span>)}</div><a href="#download">{c('Obter o aplicativo', 'Get the app')} ↓</a></DesktopSurface>
                    <DesktopSurface className="contabily-platform"><div className="contabily-platform-top"><span className="eyebrow">MOBILE</span><span className="current-badge">{c('Em desenvolvimento', 'In development')}</span></div><h3>{c('Mais perto da sua rotina.', 'Closer to your daily life.')}</h3><p>{c('A versão mobile está sendo construída em React Native e Expo, com foco inicial no Android e armazenamento local. A distribuição prevista é por APK; o aplicativo ainda não está pronto para distribuição pública.', 'The mobile version is being built with React Native and Expo, initially focused on Android and local storage. APK distribution is planned; the app is not ready for public distribution yet.')}</p><div className="skills">{['React Native', 'Expo', 'Android'].map(s => <span key={s}>{s}</span>)}</div><p className="contabily-caption">{c('As bases desktop e mobile são independentes nesta etapa.', 'Desktop and mobile databases are independent at this stage.')}</p></DesktopSurface>
                </div>
                <div className="projects contabily-features">{features.map(([title, description], i) => <DesktopSurface className="contabily-feature" key={title}><span className="eyebrow">0{i + 1}</span><h3>{title}</h3><p>{description}</p></DesktopSurface>)}</div>
            </section>
            <ContabilyDetails /><section className="section wrap" id="futuro"><DesktopSurface className="contabily-future"><div><div className="eyebrow">02 / {c('O PRÓXIMO CAPÍTULO', 'THE NEXT CHAPTER')}</div><h2>{c('Todos os dispositivos.', 'Every device.')}<br /><span>{c('Um só Contabily.', 'One Contabily.')}</span></h2><p>{c('O projeto segue em desenvolvimento. O próximo horizonte é uma versão web que centralize os recursos e permita compartilhar informações entre desktop, mobile e navegador, dando continuidade à mesma experiência em qualquer dispositivo.', 'The project is actively being developed. The next horizon is a web version that centralizes features and enables sharing information across desktop, mobile, and browser, continuing the same experience on every device.')}</p><ol className="contabily-roadmap"><li><b>{c('Hoje', 'Today')}</b><span>{c('Desktop disponível, com dados locais.', 'Desktop available, with local data.')}</span></li><li><b>{c('Em construção', 'Under construction')}</b><span>{c('Experiência mobile para Android.', 'Mobile experience for Android.')}</span></li><li><b>{c('Visão de futuro', 'Future vision')}</b><span>{c('Versão web, recursos centralizados e sincronização entre dispositivos. Ainda não disponíveis e sem data anunciada.', 'Web version, centralized features, and cross-device sync. Not yet available, with no announced release date.')}</span></li></ol></div><div className="contabily-connected"><div className="mobile-development"><DesktopLogo /><span className="current-badge">{c('Mobile em desenvolvimento', 'Mobile in development')}</span><h3>{c('Estamos construindo o próximo passo.', 'We are building the next step.')}</h3><p>{c('O aplicativo mobile ainda não está pronto. A interface, os fluxos e a distribuição Android estão em desenvolvimento. Não há download público disponível nesta página.', 'The mobile app is not ready yet. The interface, flows, and Android distribution are in development. No public download is available on this page.')}</p></div><div className="contabily-web"><span aria-hidden="true">◎</span><strong>Desktop ↔ Mobile ↔ Web</strong><p>{c('Uma conexão em construção.', 'A connection in the making.')}</p></div><p className="contabily-caption">{c('Desktop disponível · Mobile em andamento · Web planejada', 'Desktop available · Mobile in progress · Web planned')}</p></div></DesktopSurface></section>
            <section className="section wrap" id="download"><DesktopSurface className="contact-panel"><div className="eyebrow">03 / {c('COMECE PELO DESKTOP', 'START WITH DESKTOP')}</div><h2>{c('Dê clareza aos seus números.', 'Bring clarity to your numbers.')}</h2><p>{c('Contabily Desktop 2.8.2 · Instalador para Windows', 'Contabily Desktop 2.8.2 · Windows installer')}</p><div className="actions"><a className="button" href={installer}>{c('Baixar para Windows', 'Download for Windows')} ↓</a><a href={releases} target="_blank" rel="noopener noreferrer">{c('Ver versão mais recente', 'View latest release')} ↗</a></div><p className="contabily-caption">{c('Mobile e web seguem em desenvolvimento. Acompanhe a evolução no', 'Mobile and web remain in development. Follow progress on')} <a href={repository} target="_blank" rel="noopener noreferrer">GitHub ↗</a></p></DesktopSurface></section>
        </main>
        <footer className="wrap"><a href="/contabily"><DesktopLogo /></a><span>Contabily · {c('Um projeto de Fabrisio Filho', 'A project by Fabrisio Filho')}</span><a href="/#projetos" onClick={openContabily}>{c('Voltar ao portfólio', 'Back to portfolio')} ↗</a></footer>
    </div>;
}








