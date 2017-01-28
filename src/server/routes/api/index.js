import express from 'express';
import auth from './auth';

const router = express.Router();


router.use('/auth', auth);

router.get('/hello', (req, res) =>
  res.json({
    success: true,
    data: {
      items: [
        {
          name: 'Repository 1',
          url: 'http://localhost:3000/repository/1'
        },
        {
          name: 'Repository 2',
          url: 'http://localhost:3000/repository/2'
        },
        {
          name: 'Repository 3',
          url: 'http://localhost:3000/repository/3'
        }
      ]
    }
  })
);


export default router;
