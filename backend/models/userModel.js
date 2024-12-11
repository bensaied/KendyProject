const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ProjectQtSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: "ProjectUssq" },
  role: { type: String },
});
const ProjectLaboSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: "ProjectLabo" },
  role: { type: String },
});

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },

    firstname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },

    login: {
      type: String,
      minlength: 3,
      maxlength: 20,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    userType: {
      type: Array,
      //enum: [ "Visiteur", "SuperAdmin", "Admin", "Formateur"],
      default: "Visiteur",
    },

    projectLabo: [ProjectLaboSchema],
    projectQt: [ProjectQtSchema],

    direction: {
      type: String,
      enum: ["Laboratoire", "USSCQ"],
    },

    grade: {
      type: String,
      enum: [
        "Cpl",
        "CplCh",
        "Sgt",
        "SgtCh",
        "Adj",
        "AdjCh",
        "AdjMaj",
        "Slt",
        "Lt",
        "Cne",
        "Cdt",
        "LtCol",
        "Col",
        "ColMaj",
      ],
    },

    dateLogin: {
      type: Date,
      default: Date.now(),
    },
    firstConnect: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
