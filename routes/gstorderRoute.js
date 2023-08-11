const express = require("express");
const {
  getAllOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderDetail,
  getGSTSaleHistory,
  getGSTSAleDetailsByDate,
  createUnitSaleOrder,
  getAllUnitSaleOrder,
  getGSTUnitSaleHistory,
  getGSTUnitSaleDetailsHistoryByDate,
  getGstUnitOrderDetail,
  updateGstBagSaleOrder,
  deleteGstUnitOrder,

} = require("../controllers/gstorderController");

const router = express.Router();


// Routes
router.route("/gstorders").get(getAllOrder);
router.get("/gstsalehistories", getGSTSaleHistory);
router.get("/gstsalehistory/:startDate/:endDate", getGSTSAleDetailsByDate);
router.route("/gstorder/new").post(createOrder);
// router.route("/order/status/:id").put(updateOrderStatus);
router.route("/gstorder/:id").put(updateOrder).delete(deleteOrder).get(getOrderDetail);




router.route("/gstunitorder/new").post(createUnitSaleOrder);
router.route("/gstunitorders").get(getAllUnitSaleOrder);
router.get("/gstunitsalehistories", getGSTUnitSaleHistory);
router.get("/gstunitsalehistory/:startDate/:endDate", getGSTUnitSaleDetailsHistoryByDate);
router.route("/gstunitorder/:id").put(updateGstBagSaleOrder).delete(deleteGstUnitOrder).get(getGstUnitOrderDetail);

module.exports = router;
