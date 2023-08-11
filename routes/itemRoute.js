const express = require("express");
const bodyParser = require("body-parser");
const { getAllitems, createItem, updateitem, deleteItem, getItemDetail ,getAllPurchase,getPurchaseDetailsByDate} = require("../controllers/itemController");

// const multer = require("multer")
// const upload = multer({ }); 
// const router=express.Router();
const path = require("path");
const item_route = express();


item_route.use(bodyParser.json());
item_route.use(bodyParser.urlencoded({ extended: true }));

//making routes
// for all students record

item_route.use(express.static('public'));


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '../public/images'), function (error, success) {
//             if (error) throw error
//         })
//     },
//     filename: function (req, file, cb) {
//         Date.now() + '-' + file.originalname;
//         cb(null, file.originalname, function (error, success) {
//             if (error) throw error
//         })
//     }
// })

// const upload = multer({ storage: storage  })
item_route.post('/item/new', createItem)

item_route.get("/items", getAllitems);
item_route.get("/purchaseorders", getAllPurchase);
item_route.get("/purchaseorder/:startDate/:endDate", getPurchaseDetailsByDate);
// router.route("/item/new").post(createItem, upload.single("image"));
item_route.get("/item/:id", getItemDetail)

item_route.put("/item/:id", updateitem)
item_route.delete("/item/:id", deleteItem);


module.exports = item_route