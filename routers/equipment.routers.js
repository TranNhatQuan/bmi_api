const express =  require('express')
const {Equipment} = require("../models")
const {authenticate} = require("../middlewares/auth/authenticate.js")
const {authorize} = require("../middlewares/auth/authorize.js")
const {getAllEquipment} = require("../controllers/equipment.controllers");
const equipmentRouter = express.Router();

equipmentRouter.get("/", authenticate, authorize([1]), getAllEquipment);
// equipmentRouter.post("/add/:id_item", authenticate, authorize([1]), createEquipment);
// equipmentRouter.post("/update/:id_item", authenticate, authorize([1]), updateItemInequipment);
// equipmentRouter.post("/checkout", authenticate, authorize([1]), checkout);
// equipmentRouter.delete("/remove/:id_item", authenticate, authorize([1]), deleteOneItemInequipment);
// equipmentRouter.post("/decrease/:id_item", authenticate, authorize([1]), decreaseNumItemInequipment);
// equipmentRouter.post("/increase/:id_item", authenticate, authorize([1]), increaseNumItemInequipment);


module.exports = {
    equipmentRouter,
}