import React from 'react';
import {
    Box, AppBar, Toolbar, Typography, IconButton,
    Drawer, List, ListItemButton, ListItemIcon, ListItemText,
    Snackbar, Alert
} from '@mui/material';
import MenuIcon   from '@mui/icons-material/Menu';
import InboxIcon  from '@mui/icons-material/MoveToInbox';
import MailIcon   from '@mui/icons-material/Mail';
import TaskPanel  from './TaskPanel.jsx';
import SubtaskDialog from './SubtaskDialog.jsx';

const drawerWidth = 260;

export default function DashboardLayout({
                                            tree, handlers, dialog, onDialogClose, onDialogSubmit,
                                            snackbar, onSnackbarClose
                                        }) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const drawer = (
        <Box>
            <Toolbar><Typography variant="h6">Menú</Typography></Toolbar>
            <List>
                {['Tareas','Reportes','Configuración'].map((text,i)=>(
                    <ListItemButton key={text}>
                        <ListItemIcon>{i%2===0?<InboxIcon/>:<MailIcon/>}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display:'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" sx={{ mr:2, display:{ sm:'none' } }} onClick={()=>setMobileOpen(o=>!o)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>Task Manager Dashboard</Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={()=>setMobileOpen(o=>!o)}
                ModalProps={{ keepMounted:true }}
                sx={{ display:{ xs:'block', sm:'none' }, '& .MuiDrawer-paper':{ width:drawerWidth } }}
            >
                {drawer}
            </Drawer>

            <Drawer
                variant="permanent"
                sx={{ display:{ xs:'none', sm:'block' }, '& .MuiDrawer-paper':{ width:drawerWidth } }}
                open
            >
                {drawer}
            </Drawer>

            <Box component="main" sx={{ flexGrow:1, p:3, ml:{ sm:`${drawerWidth}px` } }}>
                <Toolbar />
                {tree ? <TaskPanel node={tree} handlers={handlers}/> : <Typography>Cargando…</Typography>}
            </Box>

            <SubtaskDialog
                open={dialog.open}
                composite={dialog.composite}
                onClose={onDialogClose}
                onSubmit={onDialogSubmit}
            />

            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={onSnackbarClose}>
                <Alert severity={snackbar.severity} variant="filled">{snackbar.message}</Alert>
            </Snackbar>
        </Box>
    );
}
