import express from "express";
import { createBlogs, deleteBlogs, getAllBlogs, updateBlogs } from "../controller/Blogs.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/allBlogs", getAllBlogs)


router.post("/createBlog",isAuthenticated,createBlogs);

router.delete("/blog/:id",isAuthenticated, deleteBlogs);

router.put("/blog/:id",isAuthenticated, updateBlogs);

export default router