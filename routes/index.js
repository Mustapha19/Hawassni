var express = require("express"),
	passport = require("passport"),
	router = express.Router();
var User = require("../models/user");
var middleware = require("../middleware");

// ========== The home page route ============
router.get("/",function (request,response) {
	response.render("landing");
});

// =========== AUTH ROUTES ================

// SHOW register routes 
router.get("/register",function (request,response) {
	response.render("register");
});
// SIGN UP the USER 
router.post("/register",function (request,response) {
	var username = request.body.username;
	var password = request.body.password;
	User.register(new User({username:username}),password,function (err,user) {
		if (err) {
			console.log(err);
			return response.render("register");
		}
		passport.authenticate("local")(request,response,function() {
			response.redirect("/campgrounds");
		});
	});
});

// SHOW LOGIN FORM
router.get("/login",function (request,response) {
	response.render("login");
});
// app.post("/login",Middleware, callback);
router.post("/login",passport.authenticate("local",{
	successRedirect:"/campgrounds",
	failureRedirect:"/login"
}),function (request,response) {
	response.send("LOGIN Susccessfully");
});

// Lougout ROUTES 
router.get("/logout",function (request,response) {
	request.logout();
	response.redirect("back");
});

module.exports = router;