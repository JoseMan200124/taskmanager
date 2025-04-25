import { TaskState }        from './TaskState.js';
import { CompletedState }   from './CompletedState.js';

export class InProgressState extends TaskState {
    complete(task) { task.setState(new CompletedState()); }
}
