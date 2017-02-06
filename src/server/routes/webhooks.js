import express from 'express';

const router = express.Router();

router.get('*', (req, res, next) => {
  console.log(req.query)
  console.log(req.body)

  res.status(200).send();
});

export default router;
