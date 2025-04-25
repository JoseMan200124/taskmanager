import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Chip,
    IconButton,
    Tooltip
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckIcon     from '@mui/icons-material/Check';
import AddIcon       from '@mui/icons-material/Add';

export default function TaskItem({ node, handlers }) {
    const colorMap = {
        Pending:    'default',
        InProgress: 'info',
        Completed:  'success'
    };

    const textStyle = node.state === 'Completed'
        ? { textDecoration: 'line-through', color: 'text.disabled' }
        : {};

    return (
        <Paper
            elevation={1}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 1,
                mb: 1,
                backgroundColor: node.state === 'Completed' ? '#f5f5f5' : '#ffffff'
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={textStyle}>{node.name}</Typography>
                <Chip
                    label={node.state}
                    color={colorMap[node.state]}
                    size="small"
                />
            </Box>

            <Box>
                <Tooltip title="Iniciar">
          <span>
            <IconButton
                onClick={() => handlers.start(node.id)}
                disabled={node.state !== 'Pending'}
            >
              <PlayArrowIcon />
            </IconButton>
          </span>
                </Tooltip>

                <Tooltip title="Completar">
          <span>
            <IconButton
                onClick={() => handlers.complete(node.id)}
                disabled={node.state !== 'InProgress'}
            >
              <CheckIcon />
            </IconButton>
          </span>
                </Tooltip>

                {node.type === 'composite' && (
                    <Tooltip title="Añadir subtarea">
                        <IconButton onClick={() => handlers.add(node.id, true)}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>
        </Paper>
    );
}
