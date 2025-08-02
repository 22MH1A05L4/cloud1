const express = require('express');

const { getTaskDistribution, distributeTasksEqually} = require('../controllers/taskController');
const router = express.Router();

router.get('/distribution', getTaskDistribution);
router.post('/distribute', distributeTasksEqually);

module.exports = router;