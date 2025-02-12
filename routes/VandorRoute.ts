import multer from "multer";
import { storage } from '../config';
import { Authenticate } from '../middlewares';
import express, {Request, Response, NextFunction} from 'express';
import { GetVandorProfile, VandorLogin, UpdateVandorProfile, UpdateVandorService, AddFood, GetFoods } from '../controllers';


const router = express.Router();

// upload the image
const upload = multer({ storage });

// Keep /login open (No authentication required)
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await VandorLogin(req, res, next);
    } catch (error) {
        next(error);
    }
});

// The Authenticate middleware
router.use(Authenticate);


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

// Vandor will add the available food and upload the image
router.post('/food',upload.single("image"), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await AddFood(req, res, next);
    } catch (error) {
        next(error);
    }
});


// Vandor will get the available food
router.get('/foods', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await GetFoods(req, res, next);
    } catch (error) {
        next(error);
    }
});




export {router as VandorRoute };