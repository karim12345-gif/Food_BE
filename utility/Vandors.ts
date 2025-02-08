import { Vandor } from "../models";

/**
 * Find a vendor by ID or email.
 * 
 * @param id - The vendor's ID.
 * @param email - The vendor's email address.
 */
export const FindVandor = async (id: string | undefined, email?:string) => {

        if(email){
            return await Vandor.findOne({email: email})
        } else {
            return await Vandor.findById(id);
        }

}
