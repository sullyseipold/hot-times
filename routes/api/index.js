const router = require("express").Router();
const userRoutes = require("./user");
const timesheetRoutes = require("./timesheet");
const activityRoutes = require("./activity");
const activityTypeRoutes = require("./activityType");
const reportRoutes = require('./reports');

//routes
router.use("/user", userRoutes);
router.use("/timesheet", timesheetRoutes);
router.use("/activity", activityRoutes);
router.use("/activityType", activityTypeRoutes);
router.use("/reports", reportRoutes);

module.exports = router;
