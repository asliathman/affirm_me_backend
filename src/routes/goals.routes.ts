import { Router, Request, Response} from 'express';
import Goal, { GoalMap } from '../models/goal';
import database from '../database';

// create connection once and everyone piggybacks off it 
// create db connection as a singleton and be able to use it in multiple places 
// Handle Errors for routes 
// closing the database when we host?


// add error handle for get routes for get routes invalid id not available and if id is not a valid char
// test for char invalid for all routes 
// decide on consitent error messages 

const router = Router();

GoalMap(database)
// GET - goals
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await Goal.findAll();
        res.status(200).json({ goals: result });
    }
    catch(error:any) {
        return res.status(500).json(error.message)
    }
});


router.post('/', async (req: Request, res: Response) => {
    if (!req.is("application/json")) {
        return res.status(400).json("Expecting application/json content header");
    };
    try {
        const goal = await Goal.create(req.body);
        return res.status(201).json({
            goal,
        });
    } catch (error:any) {
        return res.status(400).json({ error: error.message})
    }
});

// GET - goals/:id

router.get('/:id', async (req: Request, res: Response) => {
    
    try {
        const id  = Number(req.params.id);
        const user = await Goal.findByPk(id);

        if (user === null) {
            return res.status(400).json("User not found");
        };

        return res.status(200).json({ goal: user });
    } catch (error:any) {
        console.log(error) 
        return res.status(400).send(error.message)
    }
    
});

//PATCH - goals/:id  or should we do put
router.patch("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await Goal.update(req.body, {
            where: {id: id}
        });
        if (updated) {
            console.log(updated)
            const updatedUser = await Goal.findOne({ where: {id: id} }); 
            
            return res.status(200).json({user: updatedUser});
        }
        throw new Error('User not Found');
    }
    catch (error:any) {
        return res.status(500).send(error.message);
    }

})

// DELETE - goals/:id


router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await Goal.destroy({
            where: {id: id} 
        });
        if (deleted) {
            return res.status(200).send("User deleted");
        }
        throw new Error("User not found")
    } catch (error:any) {
        return res.status(400).send(error.message)
    }
});




export default router;