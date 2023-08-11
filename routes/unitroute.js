const express = require("express");
const { getAllUnits, getAllUnitHistory, getUnitHistoryDetailsByDate, createUnit, updateunit, deleteUnit, getUnit } = require("../controllers/unitController");

const router = express.Router();


// Routes
router.route("/units").get(getAllUnits);

router.get("/unithistories", getAllUnitHistory);
router.get("/unithistory/:startDate/:endDate", getUnitHistoryDetailsByDate);
router.route("/unit/new").post(createUnit);
// router.route("/order/status/:id").put(updateOrderStatus);
router.route("/unit/:id").put(updateunit).delete(deleteUnit).get(getUnit);


module.exports = router;
