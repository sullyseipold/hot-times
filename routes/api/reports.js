const router = require("express").Router();
const reportController = require('../../controllers/reportController');


// Matches with "/api/reports"
router.route("/payPeriod/startDate/:startDate/endDate/:endDate")
  .get(reportController.getPayPeriodReport);


module.exports = router;
