import express from 'express';

import * as boardsController from '../../controllers/BoardsController';
import {UNAUTHORIZED_RESPONSE} from '../../lib/constants';

const router = express.Router();

router.get('/get',  (req, res) => {
  if (!res.user.isLoggedIn) {
    return res.status(401).send(UNAUTHORIZED_RESPONSE);
  }

  const {boards = '', field} = req.query;

  const idsBoards = boards ? boards.split(',') : res.user.profile.idBoards;

  if (!idsBoards || !idsBoards.length) {
    return res.send({
      success: false,
      error: {
        message: 'No boards ids provided'
      }
    });
  }

  return Promise.props({
    boards: boardsController.fetchAllBoards(idsBoards, field, res.user.trelloToken),
    webhooks: boardsController.getWebhooks(res.user.trelloToken),
    boardsConfig: Promise.resolve({data: null})
  })
    .then(boardsController.processBoardsData)
    .then(response => {

      return res.json({
        success: true,
        data: {
          items: response.boards.filter(board => !board.closed)
        }
      })
    })
});

router.get('/webhook', (req, res) => {
  if (!res.user.isLoggedIn) {
    return res.status(401).send(UNAUTHORIZED_RESPONSE);
  }

  let promise;

  if (req.query.active === 'false' && req.query.idWebhook) {
    promise = boardsController.deleteWebhook({
      idBoard: req.query.idBoard,
      idWebhook: req.query.idWebhook,
      trelloToken: res.user.trelloToken
    })
  } else {
    promise = boardsController.addWebhook({
      idBoard: req.query.idBoard,
      originUrl: req.origin,
      id: res.user.profile.id,
      trelloToken: res.user.trelloToken
    })
  }

  return promise
    .then(response => res.send(response))
    .catch(err => res.send(err))


});

export default router;
