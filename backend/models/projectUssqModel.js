const mongoose = require("mongoose");

const projectUssqSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    admin: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    source: {
      type: String,
      required: true,
    },

    benificaire: {
      type: Array,
      required: true,
    },

    periodeProject: {
      type: Array,
      //required: true,
    },

    integration: {
      type: Array,
      //enum: ["Hardware", "Software", "Software et Hardware"],
    },

    encryptionType: {
      type: Array,
      //enum: ["Symetrique", "Asymetrique"],
    },

    lengthKey: {
      type: Array,
      //enum: ["32-bit", "64-bit", "128-bit", "256-bit", "512-bit", "1024-bit"],
    },
    liaison: {
      type: Array,
      required: true,
    },
    KeyDuration: {
      type: Number,
      required: true,
    },
    activite: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          ref: {
            type: String,
            required: true,
          },
          date: {
            type: String,
            required: true,
          },
          sujet: {
            type: String,
            required: true,
          },
          recommendation: {
            type: String,
            required: true,
          },
          remarques: {
            type: String,
          },
        },
      ],
      required: true,
    },
    resource: [
      {
        pdfFile: { type: String, required: true },
        ref: { type: String, required: true },
        source: { type: String, required: true },
        date: { type: String, required: true },
        description: { type: String },
        tache: { type: String, required: true },
      },
    ],
    description: {
      type: String,
      required: true,
    },
    partage: {
      type: String,
      default: "false",
    },
  },
  {
    timestamps: true,
  }
);

const ProjectUssq = mongoose.model("ProjectUssq", projectUssqSchema);

module.exports = ProjectUssq;
