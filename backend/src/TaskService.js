import { nanoid }         from 'nanoid';
import { TaskComposite }  from './composite/TaskComposite.js';
import { TaskLeaf }       from './composite/TaskLeaf.js';

class TaskService {
    constructor() {
        this.root = new TaskComposite('Proyecto Raíz', 'root');
        this.map  = new Map([['root', this.root]]);
    }

    _find(id) {
        const t = this.map.get(id);
        if (!t) throw new Error('Task no encontrada: ' + id);
        return t;
    }

    getTree() {
        return this.root.toJSON();
    }

    addTask({ parentId, name, composite = false }) {
        const parent = this._find(parentId);
        if (parent.type === 'leaf') throw new Error('No se puede añadir hijos a una hoja');
        const id = nanoid(6);
        const child = composite
            ? new TaskComposite(name, id)
            : new TaskLeaf(name, id);
        parent.add(child);
        this.map.set(id, child);
        return child.toJSON();
    }

    start(id) {
        this._find(id).start();
    }

    complete(id) {
        this._find(id).complete();
    }
}

export const taskService = new TaskService();
