import express from 'express';

const router = express.Router();

router.get('/social-login/finish/', (req, res, next) => {
  if (req.query.code) {
    req.session.code = req.query.code;
  }

  const html = `<script type="text/javascript">
      if (window.opener && window.opener.postMessage) {
        window.opener.postMessage('ready', document.location.origin);
        window.close()
      }
    </script>`;

  res.send(html);
});

export default router;
