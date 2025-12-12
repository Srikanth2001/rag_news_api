const historyService = require('../services/history.service');

exports.getHistory = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const rows = await historyService.fetchHistory(sessionId);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.deleteHistory = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    await historyService.clearHistory(sessionId);
    res.json({ message: 'deleted' });
  } catch (err) {
    next(err);
  }
};
