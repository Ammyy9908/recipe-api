const { model, Schema } = require("mongoose");

const recipie_schema = new Schema(
  {
    title: {
      type: "String",
      required: true,
    },
    type: {
      type: "String",
      required: true,
    },
    snap: {
      type: "String",
      required: true,
    },
    description: {
      type: "String",
      required: true,
    },
    duration: {
      type: "String",
      required: true,
    },
    servings: {
      type: "String",
      required: true,
    },
    ingredients: {
      type: "Array",
      required: true,
    },
    methods: {
      type: "Array",
      required: true,
    },
    publish_by: {
      type: "String",
      required: true,
    },
    ratings: {
      type: "Number",
      default: 0,
    },
    liked_by: {
      type: "Array",
      default: [],
    },
  },
  { timestamps: true }
);

const Recipie = model("recipie", recipie_schema);

module.exports = Recipie;
