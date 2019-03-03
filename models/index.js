const mongoose=require('mongoose');

const Dishes=require('./models/dishes');

const url='mongodb://localhost:27017/conFusion';
const connect=mongoose.connect(url);

connect.then((db) => {
	console.log('Connected Correctly to the server');

	Dishes.create({
		name:'Ryuk',
		description:'Gooood'
	})

		.then((dish) =>{
			console.log(dish);

			return Dishes.findByIdAndUpdate(dish._id, {
				$set: { description : 'Update test'}
			},{
				new:true
			})
			.exec();
			})
		.then((dish) => {
			console.log(dish);

			dish.comments.push({
				rating:5,
				comment:'I am the Secondary Awper At That Better Team',
				author:'Ryukkkiee'
			});

			return dish.save();
		})
		.then((dish) =>{
			console.log(dish);
		

			return Dishes.remove({});
		})
		.then(() => {
			return mongoose.connection.close();
		})
		.catch((err) =>{
			console.log(err);
		});

});