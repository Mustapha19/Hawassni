var express = require("express"),
	router = express.Router({mergeParams:true});

var Comments = require("../models/comment"),
	Campground = require("../models/campground");

var middleware = require("../middleware");
// ================ Comments ROUTES ==========================

// ==================== NEW ROUTES ===========================
router.get("/new",middleware.isLoggedIn,function (request,response) {
	Campground.findById(request.params.id,function (err,campground) {
		if (err) {
			console.log(err);
		} else { 
			response.render("comments/new",{campground:campground});
		}
	});
});

// ==================== CREATE ROUTES ===========================
router.post("/",middleware.isLoggedIn	,function (request,response) {
	Campground.findById(request.params.id,function (err,foundCampground) {
		if (err) {
			console.log(err);
			response.redirect("/campgrounds");
		} else {
			// console.log(request.body.comment);
			Comments.create(request.body.comment, function (err,newCommment) {
				if (err) {
					console.log(err);
				} else {
					// add the username and id to comment
					newCommment.author.id = request.user.id;
					newCommment.author.username = request.user.username;
					// save comment
					newCommment.save();
					foundCampground.comments.push(newCommment);
					foundCampground.save();
					console.log(newCommment);
					response.redirect("/campgrounds/"+foundCampground._id)
				}
			});
		}
	});
});
// ================== EDIT ROIUTE ===============
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (request,response) {
	Comments.findById(request.params.comment_id,function (err,foundCommennt) {
		if (err) {
			response.redirect("back");
		} else {
			response.render("comments/edit", {campground_id:request.params.id,comment:foundCommennt }); 
		}
	});
});
// ================== UPDATE ROUTE ==================
router.put("/:comment_id",middleware.checkCommentOwnership ,function (request,response) {
	Comments.findByIdAndUpdate(request.params.comment_id , request.body.comment , function (err,updateComment) {
		if (err) {
			response.redirect("back"); 
		} else {
			response.redirect("/campgrounds/"+request.params.id);
		}
	});
});
// ================ DESTROY ROUTE ===============
router.delete("/:comment_id",middleware.checkCommentOwnership,function (request,response) {
	Comments.findByIdAndRemove(request.params.comment_id,function (err) {
		if (err) {
			response.redirect("back");	
		} else {
			response.redirect("/campgrounds/"+request.params.id);
		}
	});
});
module.exports = router;
