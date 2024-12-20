const { mongoose, ObjectId } = require("mongoose");

const projectUsscqSchema = mongoose.Schema(
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
          resource: {
            type: ObjectId,
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
          remarques: String,
        },
      ],
      required: true,
    },
    response: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          resource: {
            type: ObjectId,
            required: true,
          },
          degre: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          dateLimite: {
            type: String,
            required: true,
          },
          etat: {
            type: String,
            required: true,
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
        description: { type: String, required: true },
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

const ProjectUsscq = mongoose.model("ProjectUsscq", projectUsscqSchema);

module.exports = ProjectUsscq;
