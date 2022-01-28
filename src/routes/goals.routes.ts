import { Router, Request, Response } from 'express';
import Goal, { GoalMap } from '../models/goal';
import database from '../database';

const router = Router();

// GET - goals
router.get('/', async (req: Request, res: Response) => {
    GoalMap(database);
    const result = await Goal.findAll();
    res.status(200).json({ goals: result });
});

// POST - goals
// router.post('/', async (req: Request, res: Response) => {
//     let newGoal = req.body as Goal;
//     GoalMap(database);
//     const result = await Goal.create(newGoal);
//     newGoal = result.dataValues as Goal;
//     res.status(201).json({ goal: newGoal });
// });

// GET - goals/:id
router.get('/:id', async (req: Request, res: Response) => {
    GoalMap(database);
    const id = Number(req.params.id);
    const result = await Goal.findByPk(id);
    res.status(200).json({ goal: result });
});

// PATCH - goals/:id

// DELETE - goals/:id

export default router;