 const express = require('express');
const addEvent = require('../../controllers/events/addevents');

 const router=express.Router();
 router.post ('/addevents' , addEvent)


 module.exports=router;