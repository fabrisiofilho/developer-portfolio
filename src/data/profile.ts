import type { LocalizedText } from '../i18n/I18nProvider';

export const github = 'https://github.com/fabrisiofilho';
export const email = 'fabrisiopbf@gmail.com';
export const skills = [
    'Java',
    'Spring Framework',
    'React',
    'Angular',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'MariaDB',
    'H2',
    'SQLite',
    'Docker',
    'JUnit',
    'Git',
    'Liquibase',
    'Flyway',
    'REST APIs',
];

interface Role {
    id: string;
    start: string;
    end: string | null;
    title: LocalizedText;
    description: LocalizedText;
    technologies: string[];
}

interface CareerChapter {
    id: string;
    company: string;
    summary?: LocalizedText;

    roles: Role[];
}

const roles: Role[] = [
    {
        id: 'trier-master',
        technologies: ['Full-stack'],
        start: '2026-10',
        end: null,
        title: {
            'pt-BR': 'Analista Programador Master',
            'en-US': 'Master Software Developer',
        },
        description: {
            'pt-BR':
                'Desenvolvimento e evolução de soluções corporativas de grande porte, com atuação full-stack e foco na compreensão de regras de negócio, manutenção de código e implementação de funcionalidades. Colaboração na análise técnica, investigação de problemas e melhoria contínua.',
            'en-US':
                'Develop and enhance large-scale enterprise software across the full stack, focusing on business rules, maintainable code, and feature delivery. Collaborate on technical analysis, troubleshooting, and continuous improvement.',
        },
    },
    {
        id: 'senai-senior',
        technologies: [
            'Java',
            'Spring',
            'Angular',
            'React',
            'TypeScript',
            'MariaDB',
            'PostgreSQL',
            'H2',
            'JUnit',
            'Docker',
            'Git',
            'Liquibase',
            'Flyway',
            'Scrum',
        ],
        start: '2024-09',
        end: '2026-10',
        title: {
            'pt-BR': 'Desenvolvedor de Software Sênior',
            'en-US': 'Senior Software Developer',
        },
        description: {
            'pt-BR':
                'Atuação full-stack com maior responsabilidade técnica na evolução de sistemas de SST. Participação em decisões de implementação, qualidade de código e alinhamento técnico do squad.',
            'en-US':
                'Full-stack development with increased technical responsibility for evolving OHS systems. Contributed to implementation decisions, code quality, and technical alignment within the squad.',
        },
    },
    {
        id: 'senai-mid',
        technologies: ['Java', 'Spring', 'Angular', 'TypeScript', 'Git'],
        start: '2023-05',
        end: '2024-09',
        title: {
            'pt-BR': 'Desenvolvedor de Software Pleno',
            'en-US': 'Mid-Level Software Developer',
        },
        description: {
            'pt-BR':
                'Desenvolvimento e manutenção de funcionalidades de SST, investigação de problemas e colaboração com o squad em entregas ágeis.',
            'en-US':
                'Developed and maintained OHS features, investigated issues, and collaborated with the squad on agile deliveries.',
        },
    },
    {
        id: 'senai-dev',
        technologies: ['Java', 'Spring', 'Angular', 'Git'],
        start: '2022-03',
        end: '2023-05',
        title: {
            'pt-BR': 'Desenvolvedor de Software Júnior',
            'en-US': 'Junior Software Developer',
        },
        description: {
            'pt-BR':
                'Implementação e sustentação de funcionalidades para aplicações da área de Saúde e Segurança do Trabalho (SST).',
            'en-US':
                'Implemented and maintained features for Occupational Health and Safety (OHS) applications.',
        },
    },
    {
        id: 'trier-intern',
        technologies: [
            'Angular',
            'Sass',
            'Electron',
            'Java',
            'Spring',
            'Hibernate',
            'Node.js',
            'Express',
            'TypeScript',
            'TypeORM',
            'PostgreSQL',
            'SQLite',
            'JUnit',
            'Docker',
            'Git',
            'Flyway',
        ],
        start: '2021-07',
        end: '2022-03',
        title: {
            'pt-BR': 'Estagiário de Desenvolvimento de Software',
            'en-US': 'Software Development Intern',
        },
        description: {
            'pt-BR':
                'Desenvolvimento de aplicações web e desktop com Angular, Sass e Electron, além de serviços com Java, Spring, Hibernate, Node.js, Express, TypeScript e TypeORM. Experiência com PostgreSQL, SQLite, JUnit, Docker, Git e Flyway, além de conceitos de cloud e microsserviços.',
            'en-US':
                'Contributed to web and desktop applications with Angular, Sass, and Electron and to services using Java, Spring, Hibernate, Node.js, Express, TypeScript, and TypeORM. Worked with PostgreSQL, SQLite, JUnit, Docker, Git, and Flyway while exploring cloud and microservices concepts.',
        },
    },
];

export const experience: CareerChapter[] = [
    {
        id: 'trier-current',
        company: 'Trier Sistemas',
        roles: roles.slice(0, 1),
    },
    {
        id: 'senai',
        company: 'SENAI · Soluções Digitais',
        summary: {
            'pt-BR':
                'Desenvolvimento e sustentação de soluções de Saúde e Segurança do Trabalho (SST), com participação em decisões técnicas e papel ativo na liderança de processos e na organização da equipe. Conduzi cafés da equipe e ajudei a consolidar o Scrum e as práticas ágeis na rotina do squad.',
            'en-US':
                'Developed and maintained Occupational Health and Safety (OHS) solutions, contributed to technical decisions, led team processes, and helped organize the squad. I facilitated team coffee chats and reinforced Scrum and agile practices in the day-to-day workflow.',
        },
        roles: roles.slice(1, 4),
    },
    {
        id: 'trier-internship',
        company: 'Trier Sistemas',
        roles: roles.slice(4),
    },
];

const [year, month] = roles[roles.length - 1].start.split('-').map(Number);
export const careerStart = { year, month };
