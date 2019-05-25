const router = require("express").Router();
const userRoutes = require("./user");
const timesheetRoutes = require("./timesheet");
const activityRoutes = require("./activity");
const activityTypeRoutes = require("./activityType");

//routes
router.use("/user", userRoutes);
router.use("/timesheet", timesheetRoutes);
router.use("/activity", activityRoutes);
router.use("/activityType", activityTypeRoutes);

module.exports = router;
