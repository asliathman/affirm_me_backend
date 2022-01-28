import { Router, Request, Response } from 'express';

const router = Router();

// GET - goals
router.get('/', async (req: Request, res: Response) => {
    // TO DO
    const result : string[] = [];
    res.status(200).json({ goals: result });
});

// GET - goals/:id
router.get('/:id', async (req: Request, res: Response) => {
    // TO DO
    const result : string = '';
    res.status(200).json({ goal: result });
});

// POST - goals
router.post('/', async (req: Request, res: Response) => {
    // TO DO
    res.status(201).json({ goal: {} });
});

export default router;