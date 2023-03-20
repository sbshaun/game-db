import { Request, Response } from 'express';
import { connection } from '../routes/utils/database';
import { VoiceActor } from '../routes/types/types';
import { OkPacket, QueryError, RowDataPacket } from 'mysql2';

export const getAllVoiceActors = (req: Request, res: Response) => {
	connection.query(
		'SELECT actor_id, name, biography, DATE_FORMAT(birthdate, "%Y-%m-%d") as birthdate FROM voiceactor',
		function (err: { message: any }, results: VoiceActor[], fields: any) {
			if (err) {
				res.status(500).json({ error: err.message });
			} else {
				res.status(200).json(results);
			}
		}
	);
};

export const getVoiceActorById = (req: Request, res: Response) => {
	const id = parseInt(req.params.id, 10);
	if (isNaN(id)) {
		return res.status(400).json({ error: 'Invalid ID' });
	}

	connection.query(
		'SELECT actor_id, name, biography, DATE_FORMAT(birthdate, "%Y-%m-%d") as birthdate FROM voiceactor WHERE actor_id = ?',
		[id],
		function (err: QueryError | null, results: RowDataPacket[], fields: any) {
			if (err) {
				res.status(500).json({ error: err.message });
			} else if (results.length === 0) {
				res.status(404).json({ error: 'Voice actor not found' });
			} else {
				res.status(200).json(results[0]);
			}
		}
	);
};

export const createVoiceActor = (req: Request, res: Response) => {
	const voiceActor: VoiceActor = req.body;
	connection.query(
		'INSERT INTO voiceactor (name, biography, birthdate) VALUES (?, ?, ?)',
		[voiceActor.name, voiceActor.biography, voiceActor.birthdate],
		function (err: QueryError | null, results: OkPacket, fields: any) {
			if (err) {
				res.status(500).json({ error: err.message });
			} else {
				res.status(200).json({ ...voiceActor, actor_id: results.insertId });
			}
		}
	);
};

export const updateVoiceActor = (req: Request, res: Response) => {
	const id = parseInt(req.params.id, 10);
	const voiceActor: Partial<VoiceActor> = req.body;

	if (isNaN(id)) {
		return res.status(400).json({ error: 'Invalid ID' });
	}

	connection.query(
		'UPDATE voiceactor SET name = ?, biography = ?, birthdate = ? WHERE actor_id = ?',
		[voiceActor.name, voiceActor.biography, voiceActor.birthdate, id],
		function (err: QueryError | null, results: OkPacket, fields: any) {
			if (err) {
				res.status(500).json({ error: err.message });
			} else if (results.affectedRows === 0) {
				res.status(404).json({ error: 'Voice actor not found' });
			} else {
				res.status(200).json({ ...voiceActor, actor_id: id });
			}
		}
	);
};

export function deleteVoiceActor(req: Request, res: Response): void {
	const id = parseInt(req.params.id, 10);
	connection.query(
		'DELETE FROM voiceactor WHERE actor_id = ?',
		[id],
		function (err: QueryError | null, results: OkPacket, fields: any) {
			if (err) {
				res.status(500).json({ error: err.message });
			} else if (results.affectedRows === 0) {
				console.log(results);
				console.log(id);
				res.status(404).json({ error: 'Voice actor not found' });
			} else {
				res.status(200).json({ message: 'Voice actor deleted successfully' });
			}
		}
	);
}
