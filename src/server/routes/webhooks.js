import express from 'express';

const router = express.Router();

router.get('*', (req, res, next) => {
  console.log(req.query)
  console.log(req.body)
  console.log(req)

  res.send({});
});

export default router;
