import {Request, Response} from 'express';
import {connection} from '../routes/utils/database';
import {SimpleAggregation} from "../routes/types/aggregations";

export const getSalesMeasurement = (req: Request, res: Response) => {
    let group: string = req.params.group;
    let measurement: string = req.params.measurement.toUpperCase();
    if (group == "franchise") group = "franchise_name";

    connection.query(
        `SELECT ${group} AS category, ${measurement}(sales) AS result FROM videogame 
             WHERE ${group} IS NOT NULL 
             GROUP BY ${group}`,
        (err: { message: any }, results: SimpleAggregation[]) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json(results);
            }
        }
    )
}

