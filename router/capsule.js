const express = require('express')

const router = express.Router();


const { getAllCapsules, getCapsule ,upcomingCapsule, pastCapsule}  =require('../controllers/capsule')


router.get('/',getAllCapsules)
router.route('/:id').get(getCapsule)

// router.get('/:id',getCapsule)
// router.get('/upcoming',upcomingCapsule)
// router.get('/past',pastCapsule);

module.exports = router