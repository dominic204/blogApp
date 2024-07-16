const express = require("express");
const blogController = require("../controllers/blog");
const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

router.post("/addPost",verify , blogController.addPost);

router.get("/getPost", blogController.getPost); 

router.get("/getPosts/:postId", verify, blogController.getPosts);

router.patch("/updatePost/:postId",verify , blogController.updatePost);

router.delete("/deletePost/:postId",verify , blogController.deletePost);

router.patch("/addComment/:postId",verify , blogController.addComment);

router.get("/getComments/:postId", verify, verifyAdmin, blogController.getComments);



module.exports = router;