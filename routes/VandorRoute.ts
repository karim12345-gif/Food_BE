import express, {Request, Response, NextFunction} from 'express';
import { GetVandorProfile, VandorLogin, UpdateVandorProfile, UpdateVandorService } from '../controllers';
import { Authenticate } from '../middlewares';

const router = express.Router();

// The Authenticate middleware
router.use(Authenticate);


router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await VandorLogin(req, res, next);
    } catch (error) {
        next(error);
    }
});


router.get('/profile',async (req: Request, res: Response, next: NextFunction) => {
    try {
        await GetVandorProfile(req, res, next);
    } catch (error) {
        next(error);
    }
});
router.patch('/profile',async (req: Request, res: Response, next: NextFunction) => {
    try {
        await UpdateVandorProfile(req, res, next);
    } catch (error) {
        next(error);
    }
});
router.patch('/service', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await UpdateVandorService(req, res, next);
    } catch (error) {
        next(error);
    }
});




export {router as VandorRoute };