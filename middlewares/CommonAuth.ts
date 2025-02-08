import { AuthPayload } from "../dto/Auth.dto";
import { Request, Response, NextFunction } from 'express';
import { ValidateSignatureToken } from "../utility";


//In an Express application, middleware
//  functions are used to process requests before they reach the route handlers.

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
        }
}
}


export const Authenticate = (req: Request, res: Response, next: NextFunction) => {
    // Validate the token asynchronously
    ValidateSignatureToken(req)
        .then((isValid) => {
            if (!isValid) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized: Invalid or missing token",
                });
            }

            // If the token is valid, pass control to the next middleware/handler
            next();
        })
        .catch((error) => {
            // Handle any errors during validation
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message || "Something went wrong",
            });
        });
};

// // The Authenticate middleware function is used to verify the token sent by the client.
// export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const isValid = await ValidateSignatureToken(req);

//         if(!isValid) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Unauthorized: Invalid or missing token",
//             });
//         }

//       return next();
    
//     } catch (error) {
//         next(error);
//     }
// };


