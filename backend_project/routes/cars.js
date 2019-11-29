const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const url = "mongodb://localhost:27017/cars";

router.use(express.json());

const schemaCars = new mongoose.Schema({
  //   id: { type: mongoose.Schema.Types.ObjectID },

  brand: { type: String, require: true, trim: true, minlength: 3 },

  spz: { type: String, require: true, trim: true, minlength: 3 }
});

const Car = mongoose.model("cars", schemaCars);

router.get("/", (req, res) => {
  mongoose

    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    .then(db => {
      Car.find({}).then(cars => {
        db.disconnect();
        res.send(cars);
      });
    })

    .catch(() => {
      res.status(400).send("wrong request");
    });
});

router.post("/", (req, res) => {
  const car = new Car({
    brand: req.body.brand,
    spz: req.body.spz
  });

  console.log(car);

  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    .then(db => {
      car
        .save()
        .then(inserted => {
          db.disconnect();
          res.status(201).send(JSON.stringify({ _id: inserted._id }));
        })

        .catch(msg => {
          db.disconnect();
          res.status(400).send({ error: "wrong data", msg: msg.errors });
        });
    })

    .catch(() => {
      res.status(400).send("wrong request");
    });
});

module.exports = router;
