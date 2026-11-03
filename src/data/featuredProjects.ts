import type { LocalizedText } from '../i18n/I18nProvider';

interface FeaturedProject {
    repo: string;
    description: LocalizedText;
    stack: string[];
    demo?: string;
}

export const featuredProjects: FeaturedProject[] = [
    {
        repo: 'beaver-architecture',
        description: {
            'pt-BR':
                'Exemplo em Java de como organizar uma aplicação em módulos com Clean Architecture e Domain-Driven Design.',
            'en-US':
                'A Java example of organizing an application into modules using Clean Architecture and Domain-Driven Design.',
        },
        stack: ['Java', 'Clean Architecture', 'DDD'],
    },
    {
        repo: 'cep-finder',
        description: {
            'pt-BR':
                'Integração com APIs para consultar endereços pelo CEP brasileiro.',
            'en-US':
                'An integration with postal code APIs for looking up Brazilian addresses.',
        },
        stack: ['Java', 'CEP APIs'],
        demo: 'https://fabrisiofilho.github.io/cep-finder/',
    },
    {
        repo: 'tasx-desktop',
        description: {
            'pt-BR':
                'Aplicativo desktop para organizar tarefas, com interface em Angular e distribuição via Electron.',
            'en-US':
                'A desktop task manager with an Angular interface built on Electron.',
        },
        stack: ['TypeScript', 'Angular', 'Electron'],
    },
];
