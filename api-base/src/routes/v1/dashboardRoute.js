/* eslint-disable semi */

//~ Licensed by: TrungQuanDev: https://youtube.com/@trungquandev

import express from 'express';
import { dashboardController } from '~/controllers/dashboardController';
import { authMiddleware } from '~/middlewares/authMiddleware';

const Router = express.Router();

Router.route('/access').get(
  authMiddleware.isAuthorizaed,
  dashboardController.access
);

export const dashboardRoute = Router;
