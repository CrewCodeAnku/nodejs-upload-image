import express from "express";
import User from "../controller/usercontroller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/uploadFile", upload.array("image"), User.uploadFile);
router.get("/getFile", User.getFile);

export default router;
