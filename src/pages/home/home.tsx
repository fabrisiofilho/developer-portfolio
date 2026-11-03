import { Stack, Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

interface Tab {
    label: string,
    path: string
}

const tabs: Tab[] = [
    {
        label: 'Sobre',
        path: '/about'
    },
    {
        label: 'Projetos',
        path: '/projects'
    },
    {
        label: 'Artigos',
        path: '/articles'
    },
    {
        label: 'Contato',
        path: '/contact'
    }
]

export function Home() {
    const [, setSelectedTab] = useState(tabs[0]);
    const navigate = useNavigate();
    const location = useLocation();

    function validationPath(item: Tab) {
        if (location.pathname === "/") {
            return item.path === "/about"
        }
        return location.pathname === item.path
    }

    return (
        <div style={{display: "flex", flexDirection: 'column'}}>
            <Stack
                sx={{
                    width: '100vw', 
                    height: '80px', 
                    alignItems: 'center', 
                    justifyContent: 'space-around'
                }}
                direction="row" 
                spacing={2}
            >
                <Stack
                    direction="row" 
                >
                    <Typography 
                        sx={{
                            color: 'white', 
                            fontWeight: 'bold'
                        }}
                        variant="button" 
                        display="block" 
                        gutterBottom>
                        Fabrisio Filho
                    </Typography>
                    <Typography 
                        sx={{
                            color: '#D30059', 
                            fontWeight: 'bold',
                        }}
                        variant="button" 
                        display="block" 
                        gutterBottom>
                        .Dev
                    </Typography>
                </Stack>
                <Stack
                    direction="row" 
                    spacing={2}
                >
                    {
                        tabs.map((item:Tab) => (
                            <Button 
                            variant={"text"}
                            disabled={validationPath(item)} 
                            onClick={() => {
                                setSelectedTab(item);
                                navigate(item.path);
                            }}
                            sx={{fontWeight: 'bold'}}>{item.label}</Button>
                        ))
                    }
                </Stack>
            </Stack>
            <Box sx={{ height: "calc(100vh - 80px)", width: "100vw"}}>
                <Outlet/>
            </Box>
        </div>
    )

}
