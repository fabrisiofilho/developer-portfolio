import { Box, Container, Stack, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';

export function Contact() {
    return (
        <AnimatePresence>
            <motion.div
                key={"contact"}
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
                            Como entrar em contato
                        </Typography>
                        <Typography 
                            sx={{
                                color: 'white', 
                                fontWeight: '400'
                            }}
                            variant="body2" 
                            display="block" 
                            gutterBottom>
                                Caso tenha interesse em entrar em contato comigo, pode ser feito via instagra, e-mail ou até linkedin.
                        </Typography>

                        <Stack
                        direction="row"
                        alignItems={'center'} 
                        spacing={2}
                        >
                            <EmailIcon sx={{color: 'white'}} fontSize="medium" />
                            <Typography 
                            sx={{
                                color: 'white', 
                                fontWeight: '400'
                            }}
                            variant="body2" 
                            display="block" 
                            gutterBottom>
                            fabrisiopbf@gmail.com
                        </Typography>
                        </Stack>

                        <Stack
                        direction="row" 
                        alignItems={'center'} 
                        spacing={2}
                        >
                            <InstagramIcon sx={{color: 'white'}} fontSize="medium" />
                            <Typography 
                                sx={{
                                    color: 'white', 
                                    fontWeight: '400'
                                }}
                                variant="body2" 
                                display="block" 
                                gutterBottom>
                                fabrisiofilho.dev
                            </Typography>
                        </Stack>

                    </Box>
                </Container>
            </motion.div>
        </AnimatePresence>
    );
}
