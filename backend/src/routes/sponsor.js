//DESCRIPTION: define endpoint and directs to specific sponsor controller functions
//NOTE: need to pass authentication  first 


const { Router } = require('express');
const router = Router();
const sponsorController = require('../../controllers/sponsorController');

//requires logged in account to access this 
const auth = require('../middlewares/auth');

//DEFINE ENDPOINTS AN EXECUTE ASSOCIATED CONTROLLER FUNCTIONS
router.post('/submit', auth, sponsorController.submitSponsorship);

module.exports = router;