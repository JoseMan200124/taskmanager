import express  from 'express';
import cors     from 'cors';
import { taskService } from './src/TaskService.js';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/tasks', (_, res) => {
    res.json(taskService.getTree());
});

app.post('/tasks', (req, res) => {
    try {
        const data = taskService.addTask(req.body);
        res.status(201).json(data);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

app.patch('/tasks/:id/start',    (req, res) => { taskService.start(req.params.id);    res.sendStatus(204); });
app.patch('/tasks/:id/complete', (req, res) => { taskService.complete(req.params.id); res.sendStatus(204); });

const PORT = 4000;
app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));
