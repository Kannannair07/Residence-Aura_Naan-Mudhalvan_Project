const mongoose = require('mongoose');

// const connectionOfDb = () => {
//   mongoose
//     .connect(process.env.MONGO_DB, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => {
//       console.log('Connected to MongoDB');
//     })
//     .catch((err) => {
//       throw new Error(`Could not connect to MongoDB: ${err}`);
//     });
// };

const connectionOfDb = () => {
  mongoose
    .connect("mongodb+srv://admin:7375Kannan@cluster0.nhkpz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      throw new Error("Could not connect to MongoDB: " + err );
    });
};


module.exports = connectionOfDb;