const { Router } = require('express');


const countryMiddleware = require('./countries');
const activityMiddleware = require('./activities');
 
const router = Router();


router.use('/countries', countryMiddleware);
router.use('/activities', activityMiddleware);

router.get('/', (req, res) => {
  res.send('HENRY PI COUNTRY - Alejandro Guil');
});



module.exports = router;
