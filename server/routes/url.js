const router = require('express').Router();
const Url = require('../models/Url');
const crypto = require('crypto');

router.get('/', async (req, res) => {
  const urls = await Url.findAll({});

  return res.status(200).json({ data: urls });
});

router.get('/:hash', async (req, res) => {
  const { hash } = req.params;

  if (!hash) {
    return res.status(400).json({ error: 'Invalid url' });
  }

  const url = await Url.findOne({ where: { hash } });

  if (url) {
    return res.redirect(url.initialUrl);
  } else {
    return res.status(400).json({ error: 'Invalid url' });
  }
});

router.post('/', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'No url provided' });
  }

  if (typeof url !== 'string') {
    return res.status(400).json({ error: 'Invalid url' });
  }

  const sha256Hash = crypto.createHash('sha256');

  const hash = sha256Hash.update(url).digest('hex');

  const generatedUrl = `http://localhost:3000/${hash}`;

  const findUrl = await Url.findOne({
    where: {
      hash,
    },
  });

  if (findUrl) {
    return res.status(200).json({ data: findUrl });
  }

  const newUrl = await Url.create({ initialUrl: url, hash, generatedUrl });

  return res.status(200).json({ data: newUrl });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const deletedUrl = await Url.destroy({ where: { id } });

  if (deletedUrl) {
    return res.sendStatus(200);
  } else {
    return res.status(404).json({ error: 'Url not found' });
  }
});

module.exports = router;
