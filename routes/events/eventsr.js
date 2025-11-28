const express = require('express');
const addEvent = require('../../controllers/events/addevents');
const getAllEvents = require('../../controllers/events/getAllEvents');
const getEvent = require('../../controllers/events/getEvent');

const updateEvent = require('../../controllers/events/updateEvent');
const deleteEvent = require('../../controllers/events/deleteEvent');

const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEvent);
router.post('/', addEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEvent);
router.post('/addevents', addEvent);

module.exports = router;
