const router = require("express").Router();
const timesheetController = require("../../controllers/timesheetController");

// Matches with "/api/timesheet"
router.route("/")
  .get(timesheetController.findAll)
  .post(timesheetController.create);

// Matches with "/api/timesheet/:id"
router
  .route("/:id")
  .get(timesheetController.findById)
  .put(timesheetController.update)
  .delete(timesheetController.remove);

router
  .route("/user/:userId/startDate/:startDate/endDate/:endDate")
  .get(timesheetController.findByUserIdAndStartAndEndDates);

router
  .route("/user/:userId")
  .get(timesheetController.getTimesheetsByUserId)

module.exports = router;
