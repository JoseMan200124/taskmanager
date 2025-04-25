import React from 'react';
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckIcon     from '@mui/icons-material/Check';
import AddIcon       from '@mui/icons-material/Add';

export default function TaskNode({ node, onStart, onComplete, onAdd }) {
    const colorMap = {
        Pending: 'default',
        InProgress: 'info',
        Completed: 'success'
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip label={node.name} color={colorMap[node.state] || 'default'} size="small" />

            {node.type === 'composite' && (
                <Tooltip title="Añadir subtarea">
                    <IconButton size="small" onClick={() => onAdd(node.id)}>
                        <AddIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}

            {node.state === 'Pending' && (
                <Tooltip title="Start">
                    <IconButton size="small" onClick={() => onStart(node.id)}>
                        <PlayArrowIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}

            {node.state === 'InProgress' && (
                <Tooltip title="Complete">
                    <IconButton size="small" onClick={() => onComplete(node.id)}>
                        <CheckIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    );
}
