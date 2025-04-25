import React from 'react';
import {
    Accordion, AccordionSummary, AccordionDetails,
    Box, Chip, IconButton, Tooltip, List, ListItem,
    ListItemText
} from '@mui/material';
import ExpandMoreIcon  from '@mui/icons-material/ExpandMore';
import PlayArrowIcon  from '@mui/icons-material/PlayArrow';
import CheckIcon      from '@mui/icons-material/Check';
import AddIcon        from '@mui/icons-material/Add';

export default function TaskAccordion({ node, handlers, onAdd }) {
    const colorMap = {
        Pending: 'default',
        InProgress: 'info',
        Completed: 'success'
    };

    const label = (
        <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
            <Chip label={node.name} color={colorMap[node.state]||'default'} size="small" />
            {node.state==='Pending' && (
                <Tooltip title="Start">
                    <IconButton size="small" onClick={()=>handlers.start(node.id)}>
                        <PlayArrowIcon fontSize="small"/>
                    </IconButton>
                </Tooltip>
            )}
            {node.state==='InProgress' && (
                <Tooltip title="Complete">
                    <IconButton size="small" onClick={()=>handlers.complete(node.id)}>
                        <CheckIcon fontSize="small"/>
                    </IconButton>
                </Tooltip>
            )}
            {node.type==='composite' && (
                <Tooltip title="Añadir subtarea">
                    <IconButton size="small" onClick={()=>onAdd(node.id)}>
                        <AddIcon fontSize="small"/>
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    );

    return (
        <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                {label}
            </AccordionSummary>
            <AccordionDetails>
                {node.children?.map(child =>
                    child.type === 'composite' ? (
                        <TaskAccordion
                            key={child.id}
                            node={child}
                            handlers={handlers}
                            onAdd={onAdd}
                        />
                    ) : (
                        <List key={child.id}>
                            <ListItem
                                secondaryAction={
                                    child.state==='Pending' ? (
                                        <IconButton onClick={()=>handlers.start(child.id)}>
                                            <PlayArrowIcon fontSize="small"/>
                                        </IconButton>
                                    ) : child.state==='InProgress' ? (
                                        <IconButton onClick={()=>handlers.complete(child.id)}>
                                            <CheckIcon fontSize="small"/>
                                        </IconButton>
                                    ) : null
                                }
                            >
                                <ListItemText primary={child.name} />
                                <Chip label={child.state} color={colorMap[child.state]||'default'} size="small"/>
                            </ListItem>
                        </List>
                    )
                )}
            </AccordionDetails>
        </Accordion>
    );
}
