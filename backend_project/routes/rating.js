const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const url = "mongodb://localhost:27017/rating";

router.use(express.json());

const schemaRating = new mongoose.Schema({
  value: { type: Number, require: true }
});

const Rating = mongoose.model("rating", schemaRating);

router.get("/", (req, res) => {
  mongoose

    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    .then(db => {
      Rating.find({}).then(rating => {
        db.disconnect();
        res.send(rating);
      });
    })

    .catch(() => {
      res.status(400).send("wrong request");
    });
});

router.post("/", (req, res) => {
  const rating = new Rating({
    value: req.body.value
  });

  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    .then(db => {
      rating
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
