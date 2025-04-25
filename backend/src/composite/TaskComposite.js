import { TaskComponent } from './TaskComponent.js';

export class TaskComposite extends TaskComponent {
    constructor(name, id) {
        super();
        this.id       = id;
        this.name     = name;
        this.children = [];
        this.type     = 'composite';
    }
    add(child)    { this.children.push(child); }
    remove(child) { this.children = this.children.filter(c => c !== child); }
    start()       { /* no aplica */ }
    complete()    { /* no aplica */ }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            children: this.children.map(c => c.toJSON())
        };
    }
}
