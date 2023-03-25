import { Request, Response } from 'express';
import { connection } from '../routes/utils/database';
import {Franchise} from "../routes/types/types";

export const getAllFranchises = (req: Request, res: Response) => {
    let data = req.body as string[];
    let projection: string = data.join(", ");
    console.log(data);
    return connection.query(
        `SELECT ${projection} FROM franchise`,
        (err: {message: any}, results: Franchise[]) => {
            if (err) res.status(500).json({error: err.message});
            else res.status(200).json(results);
        }
    )
}




