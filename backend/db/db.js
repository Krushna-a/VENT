const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(
      "mongodb+srv://boinwadkrushna9673361270:krushna@cluster0.ltj5lez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("connected to DB");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectToDB;
