const express = require('express');
const router = express.Router();
const { addEvent, getEvents, getEventDetails, joinEvent, checkAlreadyJoined } = require('../Controler/activism');
const { jwtAuth } = require('../middleware/jwtauth');
const { createdAndJoinedEvents } = require('../Controler/eventList');


router.get('/activism', getEvents);
router.get('/activism/:eventId', jwtAuth, getEventDetails);
router.post('/activism/:eventId', jwtAuth, joinEvent);
router.get('/activism/:eventId/check', jwtAuth, checkAlreadyJoined);
router.post('/activism/:user/addevent', jwtAuth, addEvent);


router.get('/activism/:user/createdandjoinedevents', jwtAuth, createdAndJoinedEvents);


module.exports = router;