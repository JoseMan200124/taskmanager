import React from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMore   from '@mui/icons-material/ExpandMore';
import ChevronRight from '@mui/icons-material/ChevronRight';
import TaskNode     from './TaskNode.jsx';

export default function TaskTree({ tree, handlers }) {
    const renderNode = node => (
        <TreeItem
            key={node.id}
            nodeId={node.id}
            label={
                <TaskNode
                    node={node}
                    onStart={handlers.start}
                    onComplete={handlers.complete}
                    onAdd={handlers.add}
                />
            }
        >
            {node.children?.map(child => renderNode(child))}
        </TreeItem>
    );

    return (
        <TreeView
            defaultExpandAll
            defaultCollapseIcon={<ExpandMore/>}
            defaultExpandIcon={<ChevronRight/>}
            sx={{ flexGrow:1, overflowY:'auto', mt:2 }}
        >
            {renderNode(tree)}
        </TreeView>
    );
}
