const router = require("express").Router();
const Recipie = require("../models/Recipie");
const User = require("../models/User");
const verifyApi = async (req, res, next) => {
  const api_key = req.headers["x-api-key"];

  if (!api_key) {
    return res.status(403).send({
      message: "Access denied provide a API Key in authorization headers",
    });
  }
  const user = await User.findOne({ api_key: api_key });
  if (!user) {
    return res.status(403).send({ message: "Wrong API Key" });
  }
  next();
};

router
  .get("/recipes/recents", verifyApi, async (req, res) => {
    const recipies = await Recipie.find({});
    const hour = new Date().getHours();

    const recent = recipies.filter(
      (recipie) => new Date(recipie.createdAt).getHours() === hour
    );
    res.status(200).send(recent);
  })
  .get("/recipes/type/:food_type", verifyApi, async (req, res) => {
    const allowed_food_types = ["non-veg", "veg"];
    if (!allowed_food_types.includes(req.params.food_type.toLowerCase())) {
      return res.status(401).send({ message: "Invalid Food type" });
    }
    const recipes = await Recipie.find({
      type: req.params.food_type.toLowerCase(),
    });
    res.status(200).send(recipes);
  })

  .get("/recipes/all", verifyApi, async (req, res) => {
    const recipies = await Recipie.find({});
    res.status(200).send(recipies);
  })
  .post("/new", verifyApi, async (req, res) => {
    const {
      snap,
      title,
      description,
      duration,
      servings,
      ingredients,
      methods,
      publish_by,
    } = req.body;

    if (
      !snap ||
      !title ||
      !description ||
      !duration ||
      !servings ||
      !ingredients ||
      !methods ||
      !publish_by
    ) {
      return res
        .status(401)
        .send({ message: "Check all fields to add a new recipe" });
    }

    // else make a new recipe

    new Recipie({
      title,
      snap,
      description,
      duration,
      servings,
      ingredients,
      methods,
      publish_by,
    })
      .save()
      .then(() => {
        res.status(200).send({ message: "Your Recipie Added Successfully!" });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  });

module.exports = router;
