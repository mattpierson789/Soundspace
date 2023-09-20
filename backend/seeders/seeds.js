


// const mongoose = require("mongoose");
// const { mongoURI: db } = require('../config/keys.js');
// const User = require('../models/User');
// const Track = require('../models/Track');
// const bcrypt = require('bcryptjs');
// const faker = require('faker');
// require('dotenv').config();


// const NUM_SEED_USERS = 10;
// const NUM_SEED_TRACKS = 10;


// const users = [];

// users.push(
//   new User({
//     username: 'demo-user',
//     email: 'demo-user@appacademy.io',
//     hashedPassword: bcrypt.hashSync('starwars', 10)
//   })
// );

// for (let i = 1; i < NUM_SEED_USERS; i++) {
//   const firstName = faker.name.firstName();
//   const lastName = faker.name.lastName();
//   users.push(
//     new User({
//       username: faker.internet.userName(firstName, lastName),
//       email: faker.internet.email(firstName, lastName),
//       hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
//     })
//   );
// }

// const tracks = [];


//   const artist = "Paul Mccartney"
//   const song = faker.lorem.words(3);
//   const genre = faker.music.genre();
//   const track = new Track({
//     artist,
//     song,
//     genre,
//   });
//   tracks.push(track);


// mongoose
//   .connect(db, { useNewUrlParser: true })
//   .then(() => {
//     console.log('Connected to MongoDB successfully');
//     insertSeeds();
//   })
//   .catch(err => {
//     console.error(err.stack);
//     process.exit(1);
//   });

// const insertSeeds = () => {
//   console.log("Resetting db and seeding users and tracks...");

//   User.collection.drop()
//     .then(() => Track.collection.drop())
//     .then(() => User.insertMany(users))
//     .then(() => Track.insertMany(tracks))
//     .then(() => {
//       console.log("Done!");
//       mongoose.disconnect();
//     })
//     .catch(err => {
//       console.error(err.stack);
//       process.exit(1);
//     });
// };
