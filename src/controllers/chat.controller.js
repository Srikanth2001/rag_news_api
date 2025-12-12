const rag = require('../services/rag.service');

exports.chat = async (req, res, next) => {
  try {
    const { sessionId, query } = req.body;
    if (!sessionId || !query) return res.status(400).json({ error: 'sessionId and query are required' });
    const result = await rag.answerQuery(sessionId, query);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
