const router = require("express").Router();
const activityTypeController = require("../../controllers/activityTypeController");

// Matches with "/api/activityType"
router.route("/")
  .get(activityTypeController.findAll)
  .post(activityTypeController.create);

// Matches with "/api/activityType/:id"
router
  .route("/:id")
  .get(activityTypeController.findById)
  .put(activityTypeController.update)
  .delete(activityTypeController.remove);

module.exports = router;
