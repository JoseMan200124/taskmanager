export class TaskState {
    start(task)    { console.warn('Acción no permitida'); }
    complete(task) { console.warn('Acción no permitida'); }
    toString()     { return this.constructor.name.replace('State',''); }
}
