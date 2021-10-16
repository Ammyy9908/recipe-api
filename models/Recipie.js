const { model, Schema } = require("mongoose");

const recipie_schema = new Schema(
  {
    title: {
      type: "String",
      required: true,
    },
    snaps: {
      type: "Array",
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
      type: "Object",
      required: true,
    },
    ingredients: {
      type: "Object",
      required: true,
    },
    methods: {
      type: "Object",
      required: true,
    },
    publish_by: {
      type: "String",
      required: true,
    },
  },
  { timestamps: true }
);

const Recipie = model("recipie", recipie_schema);

module.exports = Recipie;
