import { Request, Response } from 'express';
import { connection } from '../routes/utils/database';
import {Franchise} from "../routes/types/types";

export const getAllFranchises = (req: Request, res: Response) => {
    let data = req.body as string[];
    let projection: string = data.join(", ");
    return connection.query(
        `SELECT ${projection} FROM franchise`,
        (err: {message: any}, results: Franchise[]) => {
            if (err) res.status(500).json({error: err.message});
            else res.status(200).json(results);
        }
    )
}

export const getCharactersFromFranchise = (req: Request, res: Response) => {
    let franchiseName: string = req.params.franchiseName;
    return connection.query(
        `SELECT * FROM characters C WHERE NOT EXISTS(
                SELECT * FROM videogame V WHERE franchise_name = '${franchiseName}' AND NOT EXISTS (
                    SELECT * FROM videogamehascharacter WHERE game_name = V.name AND character_name = C.name
                )
            )`,
        (err: {message: any}, results: Franchise[]) => {
            if (err) res.status(500).json({error: err.message});
            else res.status(200).json(results);
        }
    )
}





