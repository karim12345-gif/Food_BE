import { NextFunction, Request, Response } from "express";
import { EditVandorInput, IVandorLoginInputs } from "../dto";
import { FindVandor, GenerateToken, ValidatePassword } from "../utility";

// Vendor login
export const VandorLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
       // Extract email and password from request body
       const { email, password } = req.body as IVandorLoginInputs;

       // Find vendor by email
       const existingVandor = await FindVandor("", email);

       // Handle case where vendor is not found
       if (!existingVandor) {
           return res.status(404).json({
               success: false,
               message: "Vendor not found",
               error: "USER_NOT_FOUND"
           });
       }

         // Validate password
         const isPasswordValid = await ValidatePassword(password, existingVandor.password, existingVandor.salt);
         if (!isPasswordValid) {
             return res.status(401).json({
                 success: false,
                 message: "Invalid email or password",
                 error: "INVALID_CREDENTIALS"
             });
         }


         const token = await GenerateToken({
            _id: existingVandor.id,
            email: existingVandor.email,
            name: existingVandor.name,
            foodTypes: existingVandor.foodType
        });

        // Return success response with token
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: token
        });


       

    } catch (error) {
        // Pass the errors to the error hanlder in middleware 
        next(error)
    }
}

// Get the vendor profile
export const GetVandorProfile = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if(user){
        const existingVandor = await FindVandor(user._id);

        return res.status(200).json({
            success: true,
            message: "Vandor profile",
            data: existingVandor
        })
    }

    return res.status(401).json({
        success: false,
        message: "Vandors information not found",
        error: "UNAUTHORIZED"
    })

}

// updating the vendor profile
export const UpdateVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const {name, address, phone, foodTypes} = req.body as EditVandorInput;

    if(user){
        const existingVandor = await FindVandor(user._id);

        if(existingVandor !== null){
            existingVandor.name = name;
            existingVandor.address = address;
            existingVandor.phone = phone;
            existingVandor.foodType = foodTypes;

            // Save the updated vendor profile
            const savedResult = await existingVandor.save();

            return res.status(200).json({
                success: true,
                message: "Vandor profile updated",
                data: savedResult
            })
            
        }
           // Handle case where vendor is not found
              return res.status(404).json({
                success: false,
                message: "Vendor information not found",
                error: "USER_NOT_FOUND"})
    }


}

// Updating the vendor service --> like a switch button in FE
export const UpdateVandorService = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if(user){
        const existingVandor = await FindVandor(user._id);

        if(existingVandor !== null){
            existingVandor.serviceAvailable = !existingVandor.serviceAvailable;

            const savedResult = await existingVandor.save();
            return res.status(200).json({
                success: true,
                message: "Vandor service updated",
                data: savedResult
            })
            
        }
           // Handle case where vendor is not found
              return res.status(404).json({
                success: false,
                message: "Vendor information not found",
                error: "USER_NOT_FOUND"})
    }

}

