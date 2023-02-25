import db from '@/db'
import { WithId } from 'mongodb';
// import { z } from 'zod'
import { TravelLog } from './TravelLog/TravelLog';

//backend file

export { TravelLog }
// typed api route
// export type TravelLog = z.infer<typeof TravelLog>;
export type TravelLogWithId = WithId<TravelLog>
export const TravelLogs = db.collection<TravelLog>('logs');

