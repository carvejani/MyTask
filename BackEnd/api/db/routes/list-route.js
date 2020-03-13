'use strict';

const express = requir('express');
const router = express.Router();
const controller = require('../controller/listController');


router.post('/', controller.post);
router.get('/', controller.get);


module.exports = router;