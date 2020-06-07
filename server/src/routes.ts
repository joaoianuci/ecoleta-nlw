import express from 'express';
import { celebrate, Joi } from 'celebrate';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import multer from 'multer';

import multerConfig from './config/multer';

const upload = multer(multerConfig);

const routes = express.Router();

routes.get('/items', ItemsController.index);

routes.post(
    '/points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required()
        })
    }, {
        abortEarly: false
    }),
    PointsController.store);

routes.get('/points/:point_id', PointsController.show);

routes.get('/points', PointsController.index)

export default routes;