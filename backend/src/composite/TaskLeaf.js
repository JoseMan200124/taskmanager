import { TaskComponent } from './TaskComponent.js';
import { PendingState }  from '../states/PendingState.js';

export class TaskLeaf extends TaskComponent {
    constructor(name, id) {
        super();
        this.id    = id;
        this.name  = name;
        this.state = new PendingState();
        this.type  = 'leaf';
    }
    getName()       { return this.name; }
    setState(state){ this.state = state; }
    start()         { this.state.start(this); }
    complete()      { this.state.complete(this); }
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            state: this.state.toString()
        };
    }
}
