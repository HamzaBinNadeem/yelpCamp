const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campgrounds');

mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp', {});

// Code snippet to check if there is an error in connection with DB.
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            author: '66c205f3b8e8f4c49e56d8ec',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo eligendi sint voluptas rem maxime quidem iusto excepturi praesentium qui fugiat id provident, accusamus similique culpa doloribus tempore atque! Sapiente, numquam!',
            price,
            geometry: { 
                type: "Point",
                coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude,
                ]
            }, 
            images: [
                {
                    url: 'https://res.cloudinary.com/dp9zmspmk/image/upload/v1724226359/YelpCamp/bwkvuxwfpmf5sixnybld.jpg',
                    filename: 'YelpCamp/bwkvuxwfpmf5sixnybld',
                  },
                  {
                    url: 'https://res.cloudinary.com/dp9zmspmk/image/upload/v1724226361/YelpCamp/uujwip54h4px5eit4zux.jpg',
                    filename: 'YelpCamp/uujwip54h4px5eit4zux',
                  },
                  {
                    url: 'https://res.cloudinary.com/dp9zmspmk/image/upload/v1724226364/YelpCamp/qazxwic235hmteahzerc.jpg',
                    filename: 'YelpCamp/qazxwic235hmteahzerc',
                  },
                  {
                    url: 'https://res.cloudinary.com/dp9zmspmk/image/upload/v1724226368/YelpCamp/onc0a1id9xxhaos909lj.jpg',
                    filename: 'YelpCamp/onc0a1id9xxhaos909lj',
                  },
                  {
                    url: 'https://res.cloudinary.com/dp9zmspmk/image/upload/v1724226366/YelpCamp/c24stq1tqimfioouzrxy.jpg',
                    filename: 'YelpCamp/c24stq1tqimfioouzrxy',
                  }
              
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close()
}); 

