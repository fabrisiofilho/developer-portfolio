import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import type {} from 'redux-thunk/extend-redux';
import { getRepositories } from "../../redux/reducers/github";
import GitHubIcon from '@mui/icons-material/GitHub';
import { useDispatch } from "react-redux";

export function Projects() {
    const repositories  = useAppSelector(
        (state) => state.github.repositories,
    );    

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRepositories());
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                key={"project"}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <Container 
                sx={{padding: '30px'}} 
                maxWidth="md">
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
                            Projetos
                        </Typography>
                        <Typography 
                            sx={{
                                color: 'white', 
                                fontWeight: '400'
                            }}
                            variant="body2" 
                            display="block" 
                            gutterBottom>
                                Listagem de todos os meus projetos publicos no GitHub, são apenas alguns que foram "finalizados" ou versões, testes de framework entre outros.
                                <br />
                                Alguns desses projetos tem artigos publicados, e outros privados estão em cursos ou videoaula disponibilizadas no Youtube.
                        </Typography>
                    </Box>
                    {
                        repositories.map((repository) => (
                            <Box 
                                sx={{
                                    borderRadius: '20px', 
                                    background: '#09090F',
                                    width: '100%',
                                    padding: '20px',
                                    marginBottom: '10px'
                                }}
                            >   
                                <Stack direction="row" spacing={2} alignItems={'center'} justifyContent={'space-between'}>
                                    <Stack direction="row" spacing={2} alignItems={'center'}>
                                        <Typography 
                                            sx={{
                                                color: '#D30059', 
                                                fontWeight: 'bold',
                                                margin: 0
                                            }}
                                            variant="button" 
                                            display="block" 
                                            gutterBottom>
                                            {repository.name}
                                        </Typography>
                                        { repository.language ? 
                                        <Stack
                                        display={'block'}
                                        >
                                            <Typography 
                                                sx={{
                                                    minWidth: '100px',
                                                    color: 'gray', 
                                                    fontWeight: '400',
                                                    backgroundColor: '#0D0D16',
                                                    borderRadius: '10px',
                                                    textAlign: 'center'
                                                }}
                                                variant="body2" 
                                                display="block" 
                                                gutterBottom>
                                                    {repository.language}
                                            </Typography>
                                        </Stack> : ''}
                                    </Stack>
                                    <IconButton aria-label="github" size="small" href={repository.html_url} target="_blank">
                                        <GitHubIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </Box>
                        ))
                    }
                </Container>
            </motion.div>
        </AnimatePresence>
    );
}
