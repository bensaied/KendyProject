const mongoose = require("mongoose");
const { string } = require("prop-types");

const projectLaboSchema = mongoose.Schema(
  {
    nameProject: {
      type: String,
      required: true,
      minlength: 3,
    },

    adminProject: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    formateurProject: [{ type: String }],

    encryptionTypeProject: {
      type: Array,
    },
    referenceTypeProject: {
      type: Array,
    },
    livrablesProject: {
      type: Array,
    },
    // docsRetourProject: {
    //   type: Array,
    // },
    integrationProject: {
      type: Array,
    },

    versionProject: {
      type: [
        {
          nameVersion: {
            type: String,
          },
          versionId: {
            type: String,
          },
          descriptionVersion: {
            type: String,
          },
        },
      ],
    },

    reseauProject: {
      type: [
        {
          namereseau: {
            type: String,
          },
          reseauproject: {
            type: String,
          },
          reseauversion: {
            type: String,
          },

          typereseau: {
            type: String,
          },

          referencereseau: {
            type: String,
          },

          livrablesreseau: {
            type: String,
          },

          missionduration: {
            type: String,
          },

          benificiairereseau: {
            type: String,
          },
        },
      ],
    },

    missionProject: {
      type: [
        {
          namemission: {
            type: String,
          },
          missionproject: {
            type: String,
          },
          missionversion: {
            type: String,
          },

          reference: {
            type: String,
          },
          formateur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          destination: {
            type: String,
          },
          typeuser: {
            type: String,
          },
        },
      ],
    },
    descriptionProject: {
      type: String,
    },
    partageProject: {
      type: String,
      default: false,
    },
    statusProject: {
      type: String,
      default: "Défaut",
    },
  },
  {
    timestamps: true,
  }
);

const ProjectLabo = mongoose.model("ProjectLabo", projectLaboSchema);

module.exports = ProjectLabo;
