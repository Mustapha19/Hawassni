var express = require("express"),
	router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// ======================== INDEX ========================
// ========== The campgrounds route for the GET request ===============
router.get("/",function (request,response) {
	// Get all the campgrounds from the DB
	Campground.find({},function (err,allCampgrounds) {
		if (err) {
			console.log(err);
		} else {
			response.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:request.user});
		}
	});
	// response.render("campgrounds",{campgrounds:campgrounds});
});

// ================================ NEW ================================================
// ==========  The form for creating a new campground===============
router.get("/new",middleware.isLoggedIn,function (request,response) {
	response.render("campgrounds/new");
});
// ================================ CREATE ================================================
// ========== The campgrounds route for the POST request to create a new campground===============
router.post("/",middleware.isLoggedIn,function (request,response) {
	//get the data from the form
	var name = request.body.name;
	var image = request.body.image;
	var description = request.body.description;
	var author = {
		id:request.user._id,
		username:request.user.username
	};
	var newCampground = {name:name,image:image,description:description,author:author};
	// Create a new campground and save it the DB
	Campground.create(newCampground, function (err,newCamp) {
		if (err) {
			console.log(err);
		} else {
			console.log(newCamp);
			//redirect to the campground page
			response.redirect("/campgrounds");	
		}
	});
});
// ========================= SHOW ========================
router.get("/:id",function (request,response) {
	// Find the campground provided with id
	Campground.findById(request.params.id).populate("comments").exec(function (err,foundCampground) {
		if (err) {
			console.log(err);
		} else {
			response.render("campgrounds/show",{campground:foundCampground});
		}
	});
});

// =================== EDIT Campground ============
 router.get("/:id/edit",middleware.checkCampgroundOwnership, function (request,response) {

 	Campground.findById(request.params.id,function (err,foundCampground) {
 		if (err) {
 			response.redirect("/campgrounds");
 		}else {
 			response.render("campgrounds/edit",{campground:foundCampground});	
 		}
 	})
 });

// =================== UPDATE Campground ============
router.put("/:id",middleware.checkCampgroundOwnership,function (request,response) {
	// find campground to update 
	Campground.findByIdAndUpdate(request.params.id,request.body.campground ,function (err,updatedCampground) {
		if (err) {
			response.redirect("/campgrounds");
		}else {
			response.redirect("/campgrounds/"+request.params.id);
		}
	});
});

// DESTROY Campground ROUTES 
// ================== DELETE Campground =============
router.delete( "/:id",middleware.checkCampgroundOwnership,function (request,response) {
	Campground.findByIdAndRemove(request.params.id,function (err) {
		if (err) {
			response.redirect("/campgrounds");	
		} else {
			response.redirect("/campgrounds");
		}
	});
});
module.exports = router;
