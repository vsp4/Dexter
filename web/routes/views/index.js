var user = require('../../models/user');
var moment = require("moment");

module.exports = {

	landing: function (req, res) {
		res.render("index");
	},

	startingLocation: function(req, res) {

		var initialStandId = req.body.startingPoint;
		var userId = req.body.beaconID;
		var busId = req.body.busID;
		var name = "hanu";

		console.log(req.body);
		user.findOne({userId: "d497c651-5b18-443a-a568-65bbb4fbd98b"}).exec(function(err, checkUserIsPresent) {

			if (err) {
				console.log(err);
			}

			if (!checkUserIsPresent) {
					user.create({
					initialStandId: initialStandId,
					userId: "d497c651-5b18-443a-a568-65bbb4fbd98b",
					busId: busId,
					name: name,
					creditedAmount: 3000,
					startingTime: moment().format()

				}, function(err, newUser) {
					if (err) {
						console.log(err);
					}

					console.log(newUser);

					res.json(newUser);
				})
			} else {
					user.create({
					initialStandId: initialStandId,
					userId: "d497c651-5b18-443a-a568-65bbb4fbd98b",
					busId: busId,
					name: name,
					creditedAmount: checkUserIsPresent.creditedAmount,
					startingTime: moment().format()

				}, function(err, newUser) {
					if (err) {
						console.log(err);
					}

					console.log(newUser);

					res.json(newUser);
				})
			}
		})
	},

	endLocation: function(req, res) {

		var finalStandId = req.body.endPoint;
		var userId = req.body.beaconID;
		userId = "d497c651-5b18-443a-a568-65bbb4fbd98b";
		var busId = req.body.busID;


		console.log(req.body);
		user.findOne({ userId: userId, busId: busId }, function(err, foundUser) {
			if (err) {
				console.log(err);
			}

			foundUser.finalStandId = finalStandId;
			foundUser.endTime = moment().format();
			foundUser.amountCharged = 5;
			foundUser.creditedAmount = foundUser.creditedAmount - 5;

			foundUser.save(function(err, SavedUser) {
				if (err){
					console.log(err);
				}

				console.log(SavedUser);
				res.json(foundUser);
			})




		})
	},

	home: function(req, res) {
		res.render("home.ejs");
	},

	timeline: function(req, res) {

		var locations = ["Rohini", "janakpuri", "dwarka", "dms Mall" , "samaypur", "badli" , "ramesh nagar",
						 "kalkaji Mandir", "kamla nagar", "moti nagar"
						]

		user.find({ userId: "d497c651-5b18-443a-a568-65bbb4fbd98b" }).sort({'startingTime': 'desc'}).exec(function(err, foundUser) {
			if (err) {
				console.log(err);
			}
			var location = {
				 location1 : locations[Math.floor(Math.random() * locations.length)],
				 location2 : locations[Math.floor(Math.random() * locations.length)]
			}
			// It is the array of the user
			res.render("timeline", { foundUser: foundUser, moment: moment, locations: locations });
		})
	},

	balanceEnquiry: function(req, res) {
		user.find({ userId: "d497c651-5b18-443a-a568-65bbb4fbd98b" }, function(err, foundUser) {
			if (err) {
				console.log(err);
			}

			res.render("profile" , { foundUser: foundUser[0] });
		})
	}

}
