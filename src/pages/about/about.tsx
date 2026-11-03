import { Container, Box, Typography, Stack, IconButton, Grid} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from "@mui/lab";
import ApartmentIcon from '@mui/icons-material/Apartment';

interface Exp {
    title: string,
    company: string,
    data: string,
    body: string,
    stacks: Stack[]
}

const steps: Exp[]= [
    {
        title: 'Backend Software Developer', 
        company: 'Senai - Soluções Digitais',
        data: 'Março de 2022 -  Atualmente',
        body: 'Manutenção e desenvolvimento de uma aplicação Java, utilizando o ecossistema Spring, e testes automatizado utilizando Junit, TestContainers, ArchUnit e Mockito.',
        stacks: [ 
            {
                name: 'Spring Framework'
            },
            {
                name: 'Java'
            },
            {
                name: 'SQL'
            },
        ]
    },
    {
        title: 'Software Developer Internship', 
        company: 'Trier Sistemas',
        data: 'Julho de 2021 -  Março de 2022',
        body: 'Projeto de treinamento de programadores, onde obtive minha primeira experiencia da área. Onde obtive diversos conhecimenntos e experiencias.',
        stacks: [
            {
                name: 'Spring Framework'
            },
            {
                name: 'Java'
            },
            {
                name: 'Angular'
            },
        ]
    },
]

interface Stack {
    name: string,
}

const stacks: Stack[] = [
    {
        name: 'Spring Framework'
    },
    {
        name: 'Java'
    },
    {
        name: 'Node.js'
    },
    {
        name: 'PostgresQL'
    },
    {
        name: 'MariaDB & MySQL'
    },
    {
        name: 'Angular'
    },
    {
        name: 'React'
    },
    {
        name: 'TypeScript'
    },
    {
        name: 'JavaScript'
    },
    {
        name: 'Junit'
    },
    {
        name: 'Docker'
    },
    {
        name: 'API Rest'
    }
]

export function About() {
    return (
        <AnimatePresence>
            <motion.div
                key={"about"}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <Container 
                    maxWidth="md"
                    sx={{padding: '30px'}} 
                >
                    <Box 
                        sx={{
                            borderRadius: '20px', 
                            width: '100%',
                            padding: '20px',
                            marginBottom: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <img src="https://avatars.githubusercontent.com/u/65460537" style={{width: '150px', borderRadius: '100px'}} alt="" />
                        <Typography 
                            sx={{
                                color: 'white',
                                marginTop: '10px',
                                marginBottom: '0'
                            }}
                            variant="h5" 
                            display="block" 
                            gutterBottom>
                            Fabrisio Filho
                        </Typography>
                        <Typography 
                            sx={{
                                color: 'gray',
                                margin: '0'
                            }}
                            variant="body1" 
                            display="block" 
                            gutterBottom>
                            Software Developer 
                        </Typography>
                        <Stack
                            flexDirection={'row'}
                        >
                            <IconButton aria-label="delete" size="medium" href="https://github.com/fabrisiofilho" target={'_blank'}>
                                <GitHubIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton aria-label="delete" size="medium" href="https://www.linkedin.com/in/fabrisio-filho/" target={'_blank'}>
                                <LinkedInIcon fontSize="inherit" />
                            </IconButton>
                        </Stack>
                    </Box>
                    <Box 
                        sx={{
                            borderRadius: '20px', 
                            background: '#09090F',
                            width: '100%',
                            padding: '20px',
                            marginBottom: '10px'
                        }}
                    >
                        <Typography 
                            sx={{
                                color: '#D30059', 
                                fontWeight: 'bold'
                            }}
                            variant="button" 
                            display="block" 
                            gutterBottom>
                            Sobre mim
                        </Typography>
                        <Typography 
                            sx={{
                                color: 'white', 
                                fontWeight: '400'
                            }}
                            variant="body2" 
                            display="block" 
                            gutterBottom>
                                Desenvolvedor de sistema, apaixonado por tecnologia e muito focado em
                                minha evolução profissional. Tenho experiencia em desenvolvimento ágil.
                                Sempre busco a melhor forma de desenvolver com a utilização de boas
                                práticas e design patterns.
                        </Typography> 
                    </Box>
                    <Typography 
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '18px'
                        }}
                        variant="button" 
                        display="block" 
                        gutterBottom>
                        Principais competências
                    </Typography>
                    <Box 
                        sx={{
                            borderRadius: '20px', 
                            width: '100%',
                            padding: '20px',
                            marginBottom: '10px'
                        }}
                    >
                        <Grid container gap={1} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {
                                stacks.map((item) => (
                                    <Stack
                                        flexDirection={'row'}
                                        sx={{
                                            background: '#09090F',
                                            padding: '10px',
                                            borderRadius: '10px', 
                                        }}
                                    >
                                        <Typography 
                                            sx={{
                                                color: '#D30059',
                                                margin: 0,
                                                fontWeight: 'bold'
                                            }}
                                            variant="body1" 
                                            display="block" 
                                            gutterBottom>
                                            {item.name}
                                        </Typography>
                                    </Stack>
                                ))
                            }
                        </Grid>
                    </Box>
                    <Typography 
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '18px'
                        }}
                        variant="button" 
                        display="block" 
                        gutterBottom>
                        Formações acadêmicas
                    </Typography>
                    <Box 
                        sx={{
                            borderRadius: '20px', 
                            background: '#09090F',
                            width: '100%',
                            padding: '20px',
                            marginBottom: '10px'
                        }}
                    >   
                        <Typography 
                            sx={{
                                color: '#D30059', 
                                fontWeight: 'bold'
                            }}
                            variant="button" 
                            display="block" 
                            gutterBottom>
                            Graduado em Analise e desenvolvimento de sistemas
                        </Typography>
                        <Typography 
                            sx={{
                                color: 'white', 
                                fontWeight: '400'
                            }}
                            variant="body2" 
                            display="block" 
                            gutterBottom>
                            IFSC - Instituto Federal de Santa Catarina
                        </Typography>
                        <Typography 
                            sx={{
                                color: 'white', 
                                fontWeight: '400'
                            }}
                            variant="body2" 
                            display="block" 
                            gutterBottom>
                            Periodo de duração: 2019 - 2022
                        </Typography>
                    </Box>
                    <Typography 
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '18px'
                        }}
                        variant="button" 
                        display="block" 
                        gutterBottom>
                        Experiência
                    </Typography>
                    <Timeline position="alternate">
                    {steps.map((step: Exp, index: number) => 
                        <TimelineItem>
                            <TimelineOppositeContent color="textSecondary">
                                <Typography
                                    sx={{
                                        color: 'white', 
                                        fontWeight: '400',
                                        marginTop: '15px'
                                    }}
                                    variant="body2" 
                                >
                                    {step.data}
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator 
                            >
                            <TimelineDot
                                sx={{
                                    backgroundColor: '#D30059',
                                }}
                            >
                                <ApartmentIcon></ApartmentIcon>
                            </TimelineDot>
                            { (index + 1) != steps.length ? 
                            <TimelineConnector 
                                sx={{
                                    backgroundColor: '#D30059',
                                }}
                            /> : '' }
                            </TimelineSeparator>
                            <TimelineContent>
                                <Stack
                                    sx={{background: '#09090F', padding: '20px', borderRadius: '20px'}}
                                >
                                    <Typography
                                        sx={{
                                            color: '#D30059', 
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {step.company}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'white', 
                                            fontWeight: '500'
                                        }}
                                        variant="body1" 
                                    >
                                        {step.title}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'gray', 
                                            fontWeight: '400'
                                        }}
                                        variant="body2" 
                                    >
                                        {step.body}
                                    </Typography>
                                    <Grid  sx={{ marginTop: '5px' }} container gap={1}>
                                        {
                                            step.stacks.map((item) => (
                                                <Stack
                                                    flexDirection={'row'}
                                                    sx={{
                                                        background: '#0D0D16',
                                                        padding: '6px',
                                                        borderRadius: '10px', 
                                                    }}
                                                >
                                                    <Typography 
                                                        sx={{
                                                            color: '#D30059',
                                                            margin: 0,
                                                            fontSize: '14px',
                                                            fontWeight: 'bold'
                                                        }}
                                                        variant="body1" 
                                                        display="block" 
                                                        gutterBottom>
                                                        {item.name}
                                                    </Typography>
                                                </Stack>
                                            ))
                                        }
                                    </Grid>
                                </Stack>
                            </TimelineContent>
                        </TimelineItem>
                    )}
                    </Timeline>
                </Container>
            </motion.div>
        </AnimatePresence>
    );
}
