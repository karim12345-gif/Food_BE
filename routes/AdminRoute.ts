import express, {Request, Response, NextFunction} from 'express';
import { CreateVandor, GetVandorById, GetVandors } from '../controllers';

const router = express.Router();

router.post('/vandor', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await CreateVandor(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.get('/vandors', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await GetVandors(req, res, next);
    } catch (error) {
        next(error);
    }
});


router.get('/vandor/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await GetVandorById(req, res, next);
    } catch (error) {
        next(error);
    }
});


router.get('/', (req: Request, res: Response, next: NextFunction) => {

    res.json({message: "Hello from Admin route"})
})

export {router as AdminRoute };