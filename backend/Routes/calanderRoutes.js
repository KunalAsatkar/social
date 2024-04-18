const express = require('express');
const router = express.Router();
const { getOauth2, getOauthToken } = require('../Controler/integrateCalendar');

router.get('/:eventId/google', getOauth2);
router.get('/google/redirect', getOauthToken);

module.exports = router;

