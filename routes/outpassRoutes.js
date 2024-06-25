const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const outpassController = require('../controllers/outpassController');

router.post('/request', outpassController.requestOutpass);
router.get('/status', authMiddleware, outpassController.getOutpassStatus);
router.get('/pending', authMiddleware, outpassController.getAllOutpasses);
router.get('/approved', authMiddleware, outpassController.getApprovedOutpasses);
router.post('/handle', authMiddleware, outpassController.handleOutpass);
router.get('/myoutpasses', authMiddleware, outpassController.viewMyOutpasses);
module.exports = router;
