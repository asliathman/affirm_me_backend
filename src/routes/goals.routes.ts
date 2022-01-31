import { Router, Request, Response } from 'express';
import Goal, { GoalMap } from '../models/goal';
import database from '../database';
import { Identifier } from 'sequelize/dist';

// create connection once and everyone piggybacks off it 
// create db connection as a singleton and be able to use it in multiple places 
// Handle Errors for routes 
const router = Router();

GoalMap(database)
// GET - goals
router.get('/', async (req: Request, res: Response) => {
    //GoalMap(database);
    const result = await Goal.findAll();
    res.status(200).json({ goals: result });
});

//POST - goals
// router.post('/', async (req: Request, res: Response) => {
//     let newGoal = req.body as Goal;
//     //GoalMap(database);
//     const result = await Goal.create(newGoal);
//     newGoal = result.dataValues as Goal;
//     res.status(201).json({ goal: newGoal });
// });


router.post('/', async (req: Request, res: Response) => {
    //let newGoal= req.body;
    //GoalMap(database);
    const result = await Goal.create(req.body);
    //newGoal = result?.dataValues;
    res.status(201).json({ goal: result })
    //res.status(201).json({ goal: newGoal });
});

// GET - goals/:id
// crashes app if invalid 
router.get('/:id', async (req: Request, res: Response) => {
    //GoalMap(database);
    const id = Number(req.params.id);
    const result = await Goal.findByPk(id);
    res.status(200).json({ goal: result });
});

//PATCH - goals/:id  or should we do put
router.patch("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await Goal.update(req.body, {
            where: {id: id}
        });
        if (updated) {
            const updatedUser = await Goal.findOne({ where: {id: id} }); // find one fixed, the problem, why?
            
            return res.status(200).json({user: updatedUser});
        }
        throw new Error('User not Found');
    }
    catch (error:any) {
        return res.status(500).send(error.message);
    }

})

// DELETE - goals/:id

export default router;