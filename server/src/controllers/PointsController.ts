import knex from '../database/connection';
import { Request, Response } from 'express';

import appAdress from '../utils/appUrl';

interface Item{
    id: number,
    title: string;
}

interface Point{
    name: string,
    email: string,
    whatsapp: string,
    image: string,
    latitude: number,
    longitude: number,
    city: string,
    uf: string,
    items: Item[];
}

class PointsController {
    async store(req: Request, res: Response) {
        const { name, email, whatsapp, latitude, longitude, city, uf, items } = req.body;

        const trx = await knex.transaction();

        const point = await trx('points').select('*').where('email', email).first();

        if (point) {
            return res.status(400).json({ message: 'That point already exists' });
        }

        const pointData = {
            image: req.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }
        let point_id = 0;
        try {
            const insertedId = await trx('points').insert(pointData).returning('id');

            point_id = Number(insertedId);

            const pointItems = items
                .split(',')
                .map((item: string) => Number(item.trim()))
                .map((item_id: number) => {
                    return {
                        point_id,
                        item_id
                    }
                });
            await trx('point_items').insert(pointItems);
            await trx.commit();
        } catch (e) {
            return res.status(400).json({ message: "Can't insert the point" });
        }
        return res.json({
            id: point_id,
            ...pointData,
        });
    }
    async show(req: Request, res: Response) {
        const { point_id } = req.params;

        const point = await knex('points').where('id', point_id).first();

        if (!point) {
            return res.status(404).json({ message: 'Point not was found.' })
        }
        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', point_id)
            .select('title', 'item_id');

        point.items = items;
        const serializedPoint = {
            ...point,
            image_url: `${appAdress.url_app}/uploads/${point.image}`
        };

        return res.json(serializedPoint);

    }

    async index(req: Request, res: Response) {
        const { city, uf, items } = req.query;
        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .distinct()
            .modify(queryBuilder => {
                if (city !== '' && uf !== '' && city !== undefined && uf !== undefined) {
                    queryBuilder
                        .where('city', String(city))
                        .where('uf', String(uf))
                }
            })
            .select('points.*');

        const serializedPoints = points.map((point:Point) => {
            return {
                ...point,
                image_url: `${appAdress.url_app}/uploads/${point.image}`
            }
        });
        return res.json(serializedPoints);
    }
}

export default new PointsController;
