const mongoose = require("mongoose");

const SpotSchema = new mongoose.Schema(
  {
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId, // Referencia o usuário somente pelo ID
      re: "User" // qual o model que eu estou usando como refetrencia
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

SpotSchema.virtual("thumbnail_url").get(function() {
  return `${process.env.LOCAL_SERVER}/files/${this.thumbnail}`;
});

module.exports = mongoose.model("Spot", SpotSchema);
