var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	methodOverride = require("method-override");

var Campground = require("./models/campground"),
    Comments = require("./models/comment"),
	User = require("./models/user"),
    seedDB = require("./seeds"),
    app = express();

var campgroundRoutes = require("./routes/campgrounds"),
	commentsRoutes = require("./routes/comments"),
	indexRoutes = require("./routes/index");

const hostname = '127.0.0.1';
const port = 3000;
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
// seedDB();

// ========== Connect to the MongoDB =============
mongoose.connect("mongodb://localhost/yelpCamp_V6",{useNewUrlParser: true, useUnifiedTopology: true});

// =========== PASSPORT Configuration =============
app.use(require("express-session")({
	secret:"I love nodeJS and express",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
// include cuurentUser variable on all routes 
app.use(function (request,response,next) {
	response.locals.currentUser = request.user
	next();
});

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentsRoutes);
app.use("/",indexRoutes);


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// ================= Nested ROUTES ===========================







// ========= Start the server ==================
app.listen(port,hostname,function() {
	console.log("==================================");
	console.log("----- SERVER IS RUNNING ... ----");
	console.log("==================================");
});  