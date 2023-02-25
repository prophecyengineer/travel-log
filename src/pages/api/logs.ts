// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { FindCursor, WithId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import { TravelLog, TravelLogs, TravelLogWithId } from '@/models/TravelLogs'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TravelLogWithId | TravelLogWithId[] | { message: string }>,
) {
  try {
    switch (req.method) {
      case 'POST': {
        // making sure we recived our log and it is validated (with zod) to this schema
        const validatedLog = await TravelLog.parseAsync(req.body)
        // adding res to DB
        const insertResult = await TravelLogs.insertOne(validatedLog);
        return res.status(200).json({
          _id: insertResult.insertedId,
          ...req.body,
        })
      }
      case 'GET': {
        const logs = await TravelLogs.find().toArray();
        return res.status(200).json(logs)
      }
      default: {
        return res.status(404).json({ message: 'Not supported' })

      }
    }
  } catch (e) {
    const error = e as Error;
    return res.status(500).json({
      message: error.message,
    })
  }



}

