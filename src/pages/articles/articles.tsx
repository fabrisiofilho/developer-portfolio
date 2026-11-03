import { Box, Container, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

export function Articles() {


    return (
        <AnimatePresence>
            <motion.div
                key={"articles"}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <Container maxWidth="md"
                    sx={{padding: '30px'}} 
                >
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
                            Artigos publicados
                        </Typography>
                        <Typography 
                            sx={{
                                color: 'white', 
                                fontWeight: '400'
                            }}
                            variant="body2" 
                            display="block" 
                            gutterBottom>
                                Aguarde... Em desenvolvimento.
                        </Typography>
                    </Box>
                    <Grid container columns={3} gap={3} justifyContent={'center'}>
                        <Stack alignItems={'center'} justifyContent={'center'} spacing={1}>
                            <Skeleton 
                                sx={{borderRadius: '20px'}}
                                variant="rounded" 
                                width={320} height={180} />
                        </Stack>
                        <Stack alignItems={'center'} justifyContent={'center'} spacing={1}>
                            <Skeleton 
                                sx={{borderRadius: '20px'}}
                                variant="rounded" 
                                width={320} height={180} />
                        </Stack>
                        <Stack alignItems={'center'} justifyContent={'center'} spacing={1}>
                            <Skeleton 
                                sx={{borderRadius: '20px'}}
                                variant="rounded" 
                                width={320} height={180} />
                        </Stack>
                        <Stack alignItems={'center'} justifyContent={'center'} spacing={1}>
                            <Skeleton 
                                sx={{borderRadius: '20px'}}
                                variant="rounded" 
                                width={320} height={180} />
                        </Stack>
                    </Grid>
                </Container>
            </motion.div>
        </AnimatePresence>
    );
}
