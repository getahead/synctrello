import express from 'express';
import api from './api';
import action from './action';
import webhooks from './webhooks';
import frontend from '../frontend';

const router = express.Router();

router.use('/api/v1', api);
router.use('/action', action);
router.use('/webhooks', webhooks);
router.use('/assets', express.static('build', { maxAge: '200d' }));
router.get('*', frontend);


export default router;
