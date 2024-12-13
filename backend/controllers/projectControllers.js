const ProjectLabo = require("../models/projectLaboModel");
const ProjectUsscq = require("../models/projectUssqModel");
const User = require("../models/userModel");

const asyncHandler = require("express-async-handler");
// const { utcToZonedTime, format } = require("date-fns-tz");

//******************************LABO PROJECT************************************************/
const CreateProjectLabo = asyncHandler(async (req, res) => {
  let {
    nameProject,
    adminProject,
    referenceTypeProject,
    livrablesProject,
    encryptionTypeProject,
    integrationProject,
    descriptionProject,
    partageProject,
    statusProject,
    // versionProject,
    // reseauProject,
    // missionProject,
  } = req.body;

  if (
    !nameProject ||
    !adminProject ||
    !referenceTypeProject ||
    !livrablesProject ||
    !integrationProject ||
    !encryptionTypeProject ||
    !descriptionProject
  ) {
    res.status(400);
    throw new Error("Veuillez remplir tous les champs.");
    return;
  } else {
    // ASSIGN THE ADMIN OBJECT FROM THE ADMIN STRING TO PROJECT DOCUMENT
    const users = await User.find();
    for (let i = 0; i < users.length; i++) {
      let user =
        users[i].grade + " " + users[i].name + " " + users[i].firstname;

      if (adminProject == user) {
        adminProject = users[i];
        if (adminProject.userType.includes("AdminLabo")) {
          break;
        } else {
          adminProject.userType.push("AdminLabo");
        }

        await adminProject.save();
      }
    }
    const versionProject = [];
    const reseauProject = [];
    const missionProject = [];

    const projectExists = await ProjectLabo.findOne({
      nameProject,
    });

    if (projectExists) {
      res.status(404);
      throw new Error("Projet déja existe.");
    }

    const projectLabo = new ProjectLabo({
      nameProject,
      adminProject,
      referenceTypeProject,
      livrablesProject,
      encryptionTypeProject,
      integrationProject,
      descriptionProject,
      partageProject,
      versionProject,
      reseauProject,
      missionProject,
      statusProject,
    });

    const createdProject = await projectLabo.save();
    // Add Project to ProjectLabo
    adminProject.projectLabo.push({
      id: createdProject._id,
      role: "AdminLabo",
    });
    await adminProject.save();

    res.status(201).json(createdProject);
  }
});

// *****************************************QT PROJECT*************************************************************
const CreateProjectUssq = asyncHandler(async (req, res) => {
  let {
    name,
    admin,
    source,
    benificaire,
    periodeProject,
    integration,
    encryptionType,
    lengthKey,
    KeyDuration,
    liaison,
    description,
    partage,
  } = req.body;

  // Some modifications of the USSCQ PROJECT inputs
  benificaire = benificaire.map((name) => name.toUpperCase());
  const timezone = "Africa/Tunis";
  // const periodeProjectInTimezone = periodeProject.map((date) =>
  //   format((new Date(date), timezone), "yyyy-MM-dd'T'HH:mm:ss")
  // );
  if (
    !name ||
    !admin ||
    !source ||
    !benificaire ||
    // !periodeProjectInTimezone ||
    !periodeProject ||
    !integration ||
    !encryptionType ||
    !lengthKey ||
    !KeyDuration ||
    !liaison ||
    !description
  ) {
    res.status(400);
    throw new Error("Veuillez remplir tous les champs.");
    return;
  } else {
    // ASSIGN THE ADMIN OBJECT FROM THE ADMIN STRING TO PROJECT DOCUMENT
    const users = await User.find();
    for (let i = 0; i < users.length; i++) {
      let user =
        users[i].grade + " " + users[i].name + " " + users[i].firstname;

      if (admin == user) {
        admin = users[i];
        if (admin.userType.includes("AdminQt")) {
          break;
        } else {
          admin.userType.push("AdminQt");
        }

        await admin.save();
      }
    }
    const activite = [];
    const projectExists = await ProjectUsscq.findOne({
      name,
    });

    if (projectExists) {
      res.status(404);
      throw new Error("Projet déja existe.");
    }
    const project = new ProjectUsscq({
      name,
      admin,
      source,
      benificaire,
      // periodeProject: periodeProjectInTimezone,
      periodeProject,
      integration,
      encryptionType,
      lengthKey,
      KeyDuration,
      liaison,
      description,
      partage,
      activite,
    });

    const createdProject = await project.save();
    // Add Project to ProjectQt
    admin.projectQt.push({ id: createdProject._id, role: "AdminQt" });
    await admin.save();
    res.status(201).json(createdProject);
  }
});

module.exports = { CreateProjectUssq, CreateProjectLabo };
