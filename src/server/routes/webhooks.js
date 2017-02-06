import express from 'express';

const router = express.Router();

router.get('/response/', (req, res, next) => {
  console.log(req.query)
  console.log(req.body)

  res.send({});
});

export default router;
