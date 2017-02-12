import express from 'express';
import action from './action';
import frontend from '../frontend';

const router = express.Router();

router.use('/action', action);
router.use('/assets', express.static('build', { maxAge: '200d' }));
router.get('*', frontend);


export default router;
