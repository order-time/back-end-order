const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileSchema = new mongoose.Schema({
  name: String,
});

const companySchema = new Schema({
  companyName: {
    type: String,
  },
  logo: {
    type: String,
  },
  phone: {
    type: String,
    // required: [true, "Утасны дугаар заавал бичнэ үү!"],
    // maxlength: [8, "Утасны дугаар хамгийн ихдээ 8 оронтой байна!"],
  },
  files: [fileSchema],
  about: {
    type: String,
  },
  email: {
    type: String,
  },
  open: { type: String },
  close: { type: String },

  companyCreater: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  Category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  SubCategory: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  ],
  companyCode: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Company", companySchema);
