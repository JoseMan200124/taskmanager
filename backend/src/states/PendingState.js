import { TaskState }        from './TaskState.js';
import { InProgressState }  from './InProgressState.js';

export class PendingState extends TaskState {
    start(task) { task.setState(new InProgressState()); }
}
