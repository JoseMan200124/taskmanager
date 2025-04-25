import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, RadioGroup, FormControlLabel, Radio,
    Button, Stack
} from '@mui/material';

export default function SubtaskDialog({ open, composite, onClose, onSubmit }) {
    const [name, setName] = useState('');
    const [isComposite, setIsComposite] = useState(composite);

    useEffect(() => {
        setIsComposite(composite);
        setName('');
    }, [open, composite]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{isComposite ? 'Nueva Tarea' : 'Nueva Subtarea'}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField
                        label="Nombre"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        fullWidth
                    />
                    <RadioGroup
                        row
                        value={isComposite ? 'composite' : 'leaf'}
                        onChange={e => setIsComposite(e.target.value === 'composite')}
                    >
                        <FormControlLabel value="leaf" control={<Radio />} label="Hoja" />
                        <FormControlLabel value="composite" control={<Radio />} label="Compuesta" />
                    </RadioGroup>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button
                    variant="contained"
                    onClick={() => onSubmit(name, isComposite)}
                    disabled={!name.trim()}
                >
                    Crear
                </Button>
            </DialogActions>
        </Dialog>
    );
}
