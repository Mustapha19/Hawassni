var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
	 	name:"Ain Tmouchent",
		image:"https://images.pexels.com/photos/1414221/pexels-photo-1414221.jpeg?auto=compress&cs=tinysrgb&h=350",
		description:"Ain Tmouchent is a beautifull place to visit it has a lot of nice beaches"
	},
	{
	 	name:"Tikjda",
		image:"https://lecourrier-dalgerie.com/wp-content/uploads/2018/08/Tikjda-620x330.jpg",
		description:"Tikjda is a beautifull place to visit it has a lot of nice beaches"
	},
	{
	 	name:"Mountains of tikjda",
		image:"https://i.pinimg.com/originals/52/ff/36/52ff36d7179188795f584aedb3f3e08c.jpg",
		description:"The Mountains are  beautifull place in tikjdda to visit it has a lot of nice beaches"
	},
	{
	 	name:"Canstantine",
		image:"https://www.gannett-cdn.com/-mm-/615eb9b3dda3f2daf3ceb045278d833fb7918d51/c=0-286-5616-3459/local/-/media/2017/07/18/WIGroup/Milwaukee/636359756074681331-IMG-1848.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp",
		description:"The Mountains are  beautifull place in tikjdda to visit it has a lot of nice beaches"
	},
	{
	 	name:"Chriaa",
		image:"https://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg",
		description:"The Mountains are  beautifull place in tikjdda to visit it has a lot of nice beaches"
	},
	{
	 	name:"Chriaa",
		image:"https://media-cdn.tripadvisor.com/media/photo-s/16/73/1b/cf/auberge-la-rose-des-neiges.jpg",
		description:"The Mountains are  beautifull place in tikjdda to visit it has a lot of nice beaches"
	},

	{
	 	name:"Tlemcen",
		image:"https://i.pinimg.com/originals/56/96/ce/5696ce1419f23975910c876a7996b431.jpg",
		description:"Tlemcen is a beautifull place to visit it has a lot of nice beaches"
	}
	
]

function seeDB () {
	Campground.deleteMany({},function (err) {
		if(err)
			console.log(err);
		else{
			console.log("removed campground");
			data.forEach(function (seed) {
			Campground.create(seed, function (err,campground) {
				if (err) {
					console.log(err);
				} else {
					console.log("added a campground");
					Comment.create({
						text:"this place is amazing i love it",
						author:"Mustapha Abdelaziz"
					}, function (err,comment) {
						if (err) {
							console.log(err);
						} else {
							campground.comments.push(comment);
							campground.save();
							console.log('created a new comment');
						}
					})
				}
			});
	});
		}

	});
	
}



module.exports = seeDB;	