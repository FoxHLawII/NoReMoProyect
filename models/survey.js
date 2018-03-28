const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = require("./recipient");

const surveySchema = new Schema({
  title: String,
  body: String,
  subjetc: String,
  recipients: [recipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  dateSent: Date,
  lastResponded: Date,
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("surveys", surveySchema);
