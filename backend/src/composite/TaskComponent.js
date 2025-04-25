export class TaskComponent {
    getName()          { throw new Error('abstract'); }
    print(indent = '') { throw new Error('abstract'); }
    setState(state)    { /* sólo relevante en hojas */ }
}
