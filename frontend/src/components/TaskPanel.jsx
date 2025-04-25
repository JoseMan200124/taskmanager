import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    IconButton,
    Tooltip,
    Typography,
    LinearProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon        from '@mui/icons-material/Add';
import TaskItem       from './TaskItem.jsx';

function calcProgress(node) {
    const leaves = [];
    (function traverse(n) {
        if (n.type === 'leaf') leaves.push(n);
        else n.children.forEach(traverse);
    })(node);
    if (!leaves.length) return 0;
    const done = leaves.filter(l => l.state === 'Completed').length;
    return (done / leaves.length) * 100;
}

export default function TaskPanel({ node, handlers }) {
    const progress = calcProgress(node);

    return (
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ '& .MuiAccordionSummary-content': { alignItems: 'center' } }}
            >
                <Box sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                    {node.name}
                </Box>
                {node.type === 'composite' && (
                    <Tooltip title="Añadir subtarea">
                        <IconButton size="small" onClick={() => handlers.add(node.id, true)}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </AccordionSummary>

            <AccordionDetails>
                {/* Barra de progreso para el compuesto */}
                {node.type === 'composite' && (
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{ mb: 2 }}
                    />
                )}

                {node.children.map(child =>
                    child.type === 'composite' ? (
                        <TaskPanel key={child.id} node={child} handlers={handlers} />
                    ) : (
                        <TaskItem key={child.id} node={child} handlers={handlers} />
                    )
                )}
            </AccordionDetails>
        </Accordion>
    );
}
