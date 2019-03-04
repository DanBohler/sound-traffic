const mongoose = require("mongoose");
const Article  = require('../models/Article');


mongoose
  .connect('mongodb://localhost/sound-traffic', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let articles = [
  {
    user: "Alice",
    product: "E-MU SP 1200",
    price: 890,
    description: "The SP-1200 can store up to 100 patterns, 100 songs, and has a 5,000-note maximum memory for drum sequences.",
    imageUrl: "https://res.cloudinary.com/dhnsxurnd/image/upload/v1551693599/E-MU_SP.jpg"
  },
  {
    user: "Bob",
    product: "Korg Wavestation",
    price: 740,
    description: "The Korg Wavestation is a vector synthesis synthesizer first produced in the early 1990s and later re-released as a software synthesizer in 2004.",
    imageUrl: "https://res.cloudinary.com/dhnsxurnd/image/upload/v1551693866/KorgWavestation.jpg"
  },
  {
    user: "Megan",
    product: "Korg MS-20",
    price: 620,
    description: "The Korg MS-20 is a patchable semi-modular monophonic analog synthesizer which Korg released in 1978 and which was in production until 1983.",
    imageUrl: "https://res.cloudinary.com/dhnsxurnd/image/upload/v1551694250/Korg_MS-20.jpg"
  },
  {
    user: "Mario",
    product: "Roland TR-909",
    price: 2400,
    description: "La Roland TR-909 Rhythm Composer es una caja de ritmos parcialmente analógica, parcialmente basada en samples construida por Roland Corporation en 1984.",
    imageUrl: "https://res.cloudinary.com/dhnsxurnd/image/upload/v1551694457/RolandTR909.jpg"
  }
]

Article.deleteMany()
.then(() => {
  return Article.create(articles)
})
.then(articlesCreated => {
  console.log(`${articlesCreated.length} users created with the following id:`);
  console.log(articlesCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})