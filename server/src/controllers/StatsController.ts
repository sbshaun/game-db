import {Request, Response} from 'express';
import {connection} from '../routes/utils/database';
import {AggregationGroup} from "../routes/types/types";

export const getSalesMeasurement = (req: Request, res: Response) => {
    let group: string = req.params.group;
    if (group == "franchise") group = "franchise_name";
    let measurement: string = req.params.measurement.toUpperCase();

    connection.query(
        `SELECT ${group} AS category, ${measurement}(sales) AS result FROM videogame 
             WHERE ${group} IS NOT NULL 
             GROUP BY ${group}`,
        (err: { message: any }, results: AggregationGroup[]) => {
            if (err) res.status(500).json({ error: err.message });
            else res.status(200).json(results);
        }
    )
}

export const countGroups = (req: Request, res: Response) => {
    let body: {count: number, operation: string} = req.body;
    let group: string = req.params.group;
    if (group == "franchise") group = "franchise_name";

    connection.query(
        `SELECT ${group} AS category, COUNT(*) AS result FROM videogame 
             WHERE ${group} IS NOT NULL 
             GROUP BY ${group}
             HAVING result ${body.operation} ${body.count} ORDER BY result DESC`,
        (err: { message: any }, results: AggregationGroup[]) => {
            if (err) res.status(500).json({ error: err.message });
            else res.status(200).json(results);
        }
    )
}

export const getSalesMeasurementExtrema = (req: Request, res: Response) => {
    let group: string = req.params.group;
    if (group == "franchise") group = "franchise_name";
    let measurement: string = req.params.measurement.toUpperCase();
    let extrema: string = req.params.extrema.toUpperCase();

    connection.query(
        `WITH SalesTemp AS (
                SELECT ${group} AS category, ${measurement}(sales) AS result FROM videogame
                WHERE ${group} IS NOT NULL
                GROUP BY ${group}
            )
            SELECT * FROM SalesTemp
            WHERE result = (SELECT ${extrema}(result) FROM SalesTemp)`,
        (err: { message: any }, results: AggregationGroup[]) => {
            if (err) res.status(500).json({ error: err.message });
            else res.status(200).json(results);
        }
    )
}

