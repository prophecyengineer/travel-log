
import { z } from 'zod'

//all this file can be run on the frontend


//creating an object here cleans up the validator 
const errors = {
    title: 'Title cannot be empty',
    description: 'Description cannot be empty',
    image: 'Image must be a valid URL',
    rating: 'Rating must be 1-10',
}

// validating stuff before it goes into our db
//defining our validator
export const TravelLog = z.object({
    //trim prevents empty strings
    title: z.string().trim().min(1, errors.title),
    description: z.string().trim().min(1, errors.description),
    image: z.string().url(errors.image),
    //we take a string and then coerce it into a number on these occasions
    rating: z.coerce.number().min(0).max(10).default(0),
    latitude: z.coerce.number().min(-90).max(90),
    longitude: z.coerce.number().min(-180).max(180),
    visitDate: z.coerce.date(),

});

export type TravelLog = z.infer<typeof TravelLog>;


export const TravelLogKeys = TravelLog.keyof().Enum;
export type TravelLogKey = keyof typeof TravelLogKeys;
