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
    //GoalMap(database);
    const result = await Goal.findAll();
    res.status(200).json({ goals: result });
});



router.post('/', async (req: Request, res: Response) => {
    //let newGoal= req.body;
    const result = await Goal.create(req.body);
    //newGoal = result?.dataValues;
    res.status(201).json({ goal: result })
    //res.status(201).json({ goal: newGoal });
});

// GET - goals/:id

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
// commenting out the else doesnt work because we dont handle logic for when the response is not one but also not an error
router.delete("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;

    Goal.destroy({
    where: { id: id }
    })
    .then(num => {
        
        if (num == 1) {
        console.log(num)
        res.send({
        message: "Goal was deleted successfully!"
        });
        } //else {
        // res.send({
        //     message: `Cannot delete Goal with id ${id}. Maybe Goal was completed!`
        // });
        // }
    })
    .catch(err => {
        console.log(err)
        res.status(500).send({
        message: "Could not delete Goal with id=" + id
        });
    });
});


export default router;