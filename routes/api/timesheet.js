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

module.exports = router;
