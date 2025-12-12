const ingestService = require('../services/ingest.service');

exports.ingest = async (req, res, next) => {
  try {
    const count = await ingestService.runIngest();
    res.json({ message: 'Ingested', count });
  } catch (err) {
    next(err);
  }
};
