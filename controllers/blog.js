const Blog = require("../models/Blog");
const auth = require("../auth");

module.exports.addPost = (req, res) => {

	if(req.user.isAdmin === true) {
		return res.status(403).send({error: 'Admin is forbidden'});
	}

	let newPost = new Blog({
		userId : req.user.id,
		title : req.body.title,
		location : req.body.location,
		description : req.body.description
	});

	return newPost.save().then(newPost => res.status(201).send({message : 'successfully post'})).catch(saveError => {
		console.log('Error in posting', saveError);
		res.status(500).send({error : 'Failed to post'});
	})

}

module.exports.getPost = async (req, res) => {

    const posts = await Blog.find();
    return res.status(200).send({ posts });

};

module.exports.getPosts = (req, res) => {

  let postID = req.params.postId;

  return Blog.find({ _id: postID })
    .then((post) => {
      if (post.length > 0) {
        return res.status(200).send({ post });
      }

      return res.status(404).send({ error: "Post not found" });
    })
    .catch((findErr) => {
      console.error(`Error in finding post:`, findErr);
      return res.status(500).send({ error: "'Failed to fetch post" });
    });
};


module.exports.updatePost = (req, res) => {

	 Blog.findOne({ _id: req.params.postId }).then((post) => {
	 if (!post) {
        return res.status(404).send({ error: "Post not found" });
      }

       let updatedPost = {
				title : req.body.title,
				location : req.body.location,
				description : req.body.description
			};

	  return Blog.findByIdAndUpdate(req.params.postId, updatedPost , { new: true})
	    .then((post) => {
	      if (post) {
	        res.status(200).send({ message: "Post updated successfully", updatedPost: post });
	      } else {
	        res.status(404).send(false);
	      }
	    })
	    .catch((err) => res.status(500).send(err));

	 })
  
};

module.exports.deletePost = (req, res) => {

	 Blog.findOne({ _id: req.params.postId}).then((post) => {
	 	if (!post) {
        return res.status(404).send({ error: "Post not found" });
      }

		return Blog.deleteOne({_id : req.params.postId}).then((deleted) => {
			if(deleted) {
				res.status(200).send({ message : "Post deleted successfully"});
			} else {
				res.status(500).send("Deleting post failed");
			}
		})
		  .catch((findErr) => {
	      console.error("Error to deleting post: ", findErr);
	      return res.status(500).send({ error: "Failed to delete post." });
	    });

  	})
};

module.exports.addComment = async (req, res) => {

  const postId = req.params.postId;
  const { comment } = req.body;
  const userId = req.user.id;

  try {
    const post = await Blog.findByIdAndUpdate({ _id: postId });

    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }

    post.comments.push({ userId, comment });

    await post.save().then((updatedPost) => {
    	res.status(200).send({ message: "Post updated successfully", updatedPost });
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports.getComments = (req, res) => {

  return Blog.findById(req.params.postId)
    .then((posts) => {
      if (!posts) {
        return res.status(404).send({ error: "Posts not found " });
      }

      return res.status(200).send({ comments: posts.comments });
    })
    .catch((findErr) => {
      console.error("Error finding posts: ", findErr);

      return res.status(500).send({ error: "Failed to fetch comments" });
    });
};