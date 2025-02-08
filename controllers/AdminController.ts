import { NextFunction, Request, Response } from "express";
import {ICreateVandorInput} from '../dto'
import { Vandor } from "../models";
import { FindVandor, GeneratePassword, GenerateSalt } from "../utility";


export const CreateVandor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { 
            name,
            ownerName,
            foodType,
            pinCode,
            address,
            phone,
            email,
            password 
        } = req.body as ICreateVandorInput;

          // hasing the password
          const salt = await GenerateSalt();
          const userPassword = await GeneratePassword(password, salt)
          
          // Check if the vandor already exists
         const vandlorExists = await FindVandor("",email)

         if(vandlorExists !== null){
            return res.status(409).json({
                success: false,
                message: "A vendor with this email already exists",
                error: "VENDOR_EXISTS"
            });
        }
        
        const createVandor = await Vandor.create({
            name,
            ownerName,
            foodType,
            pinCode,
            address,
            phone,
            email,
            password: userPassword,
            salt: salt,
            serviceAvailable: false,
            coverImage: [''],
            rating: 0
        })

        return res.status(200).json({
            success: true,
            message: "Vendor created successfully",
            data: createVandor
        });

    } catch (error) {
        // Pass the errors to the error hanlder in middleware 
        next(error)
    }
}

export const GetVandors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get all vendors from DB
        const vandors = await Vandor.find();

        // Check if array is empty
        if(vandors.length === 0) {  
            // 404 is more appropriate for "not found" 
            return res.status(404).json({  
                success: false,
                message: "No vendors found",
                error: "VENDORS_NOT_FOUND"
            });
        }
    
        return res.status(200).json({
            success: true,
            message: "Vendors retrieved successfully",
            data: vandors
        });
        
    } catch(error) {
        next(error);
    }
}

export const GetVandorById = async (req: Request, res: Response, next: NextFunction) => {

    try{
        const vandorId = req.params.id;
        const vandorById = await FindVandor(vandorId)

        if(vandorById !== null){
            return res.status(200).json({
                success: true,
                message: "Vendors retrieved successfully",
                data: vandorById
            });
        }

             // 404 is more appropriate for "not found" 
             return res.status(404).json({  
                success: false,
                message: "No vendors found",
                error: "VENDORS_NOT_FOUND"
            });



    } catch(error){
        next(error)
    }
    
}