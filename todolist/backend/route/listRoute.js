import express from "express";
const router = express.Router();
import { listItems, saveItem, deleteItem, toggleLike, updateItem } from "../controller/listController.js";
import { authentication } from "../middleware/authentication.js";

router.use(authentication)

router.get("/:customListName", listItems);
router.post("/", saveItem);
router.post("/delete", deleteItem);
router.post("/like", toggleLike);
router.post("/update", updateItem)

export default router;