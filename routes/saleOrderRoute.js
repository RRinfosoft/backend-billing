const express = require("express");
const { getAllsaleOrder, createSaleOrder, updateSaleOrder, createbagSaleOrder, getAllBagSaleHistory, updateBagSaleOrder, deleteSaleOrder, getBagSaleHistoryByDate, getSaleOrderDetail, getAllBagsaleOrder, deleteBagSaleOrder, getAllSaleHistory, getSaleHistoryByDate, getbagSaleOrderDetail } = require("../controllers/saleOrder");

const router = express.Router();


// Routes
router.route("/saleorders").get(getAllsaleOrder);

router.get("/salehistories", getAllSaleHistory);
router.get("/salehistory/:startDate/:endDate", getSaleHistoryByDate);
router.route("/saleorder/new").post(createSaleOrder);
// router.route("/order/status/:id").put(updateOrderStatus);
router.route("/saleorder/:id").put(updateSaleOrder).delete(deleteSaleOrder).get(getSaleOrderDetail);

router.route("/bagsaleorders").get(getAllBagsaleOrder);

router.get("/bagsalehistories", getAllBagSaleHistory);
router.get("/bagsalehistory/:startDate/:endDate", getBagSaleHistoryByDate);
router.route("/bagsaleorder/new").post(createbagSaleOrder);

router.route("/bagsaleorder/:id").delete(deleteBagSaleOrder).get(getbagSaleOrderDetail).put(updateBagSaleOrder)
module.exports = router;
