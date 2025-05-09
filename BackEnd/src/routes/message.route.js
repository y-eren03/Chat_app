import express from "express";
import {protectRoute} from "../middleware/auth.middleware.js";
import {getMessages, getUsersForSidebar} from "../controllers/message.controller.js";

const router = express.Router();


router.get("/users",protectRoute,getUsersForSidebar)
router.get("/users/:id",protectRoute,getMessages)




export default router;