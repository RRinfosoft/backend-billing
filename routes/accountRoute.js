const express = require("express");
const { getAllaccount, createAccount, updateAccount, getAccountDetail, deleteAccount } = require("../controllers/addAccount");


const router=express.Router();
 
//making routes
// for all students record
router.route("/accounts").get(getAllaccount);
router.route("/account/new").post(createAccount);
router.route("/account/:id").put(updateAccount).get(getAccountDetail).delete(deleteAccount);


module.exports= router