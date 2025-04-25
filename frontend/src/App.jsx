import React, { useState, useEffect } from 'react';
import DashboardLayout from './components/DashboardLayout.jsx';
import TaskPanel       from './components/TaskPanel.jsx';
import SubtaskDialog   from './components/SubtaskDialog.jsx';
import { getTree, addTask, startTask, completeTask } from './api.js';

export default function App() {
    const [tree, setTree] = useState(null);
    const [dialog, setDialog] = useState({ open:false, parentId:'', composite:false });
    const [snackbar, setSnackbar] = useState({ open:false, message:'', severity:'success' });

    // Carga inicial
    useEffect(() => {
        getTree().then(setTree).catch(err=>showSnackbar(err.message,'error'));
    }, []);

    const refresh = () => getTree().then(setTree).catch(err=>showSnackbar(err.message,'error'));

    const handlers = {
        start: id => startTask(id).then(refresh).catch(err=>showSnackbar(err.message,'error')),
        complete: id => completeTask(id).then(refresh).catch(err=>showSnackbar(err.message,'error')),
        add: (parentId, composite) => setDialog({ open:true, parentId, composite })
    };

    const showSnackbar = (msg, sev='success') => setSnackbar({ open:true, message:msg, severity:sev });

    const handleDialogClose = () => setDialog(d=>({ ...d, open:false }));
    const handleDialogSubmit = (name, composite) => {
        addTask({ parentId:dialog.parentId, name, composite })
            .then(refresh)
            .then(()=>showSnackbar('Creada'))
            .catch(err=>showSnackbar(err.message,'error'))
            .finally(handleDialogClose);
    };

    return (
        <DashboardLayout
            tree={tree}
            handlers={handlers}
            dialog={dialog}
            onDialogClose={handleDialogClose}
            onDialogSubmit={handleDialogSubmit}
            snackbar={snackbar}
            onSnackbarClose={()=>setSnackbar(s=>({ ...s, open:false }))}
        />
    );
}
