const ProjetUSSCQ = require("../models/projectUssqModel");
const mongoose = require("mongoose");
const ProjectLabo = require("../models/projectLaboModel");
const User = require("../models/userModel");
const { ObjectId } = mongoose.Types;
const { GraphQLUpload } = require("graphql-upload");
const path = require("path");
const fs = require("fs");

module.exports = {
  Upload: GraphQLUpload,
  //********************************************************************** QUERIES **********************************************************************//
  Query: {
    //*********************************************** USSCQ PROJECT QUERIES ***********************************************//
    //******************* GET USSCQ PROJECTS *******************//
    getProjects: async () => {
      try {
        const projects = await ProjetUSSCQ.find().populate("admin"); // Retrieve projects from MongoDB & populating the administrator
        return projects;
      } catch (error) {
        throw new Error("Failed to fetch projects");
      }
    },

    //******************* GET USSCQ PROJECT BY ID *******************//
    project: async (_, { id }) => {
      // Retrieve the project based on the provided ID
      const project = await ProjetUSSCQ.findById(id).populate("admin"); //  Retrieve project from MongoDB & populating the administrator
      return project;
    },

    //******************* GET USSCQ ACTIVITIES BY PROJECT_ID *******************//
    getActivities: async (_, { projectId }) => {
      try {
        const project = await ProjetUSSCQ.findById(projectId); // Retrieve the project based on the provided project ID
        if (!project) {
          throw new Error("Project not found");
        }
        return project.activite; // Return the activities array from the project
      } catch (error) {
        throw new Error("Failed to fetch activities");
      }
    },

    //******************* GET USSCQ ACTIVITY BY PROJECT_ID & ACTIVITY _ID *******************//
    getActivity: async (_, { projectId, activityId }) => {
      try {
        const project = await ProjetUSSCQ.findById(projectId); // Retrieve the project based on the provided project ID
        if (!project) {
          throw new Error("Project not found");
        }
        // return project.activite; // Return the activities array from the project

        const activities = project.activite;

        for (let i = 0; i < activities.length; i++) {
          if (activities[i].id == activityId) {
            // let myArray = [];
            // myArray.unshift(activities[i]);
            //console.log(activities[i]);
            return activities[i];
          }
        }
      } catch (error) {
        throw new Error("Failed to fetch activities");
      }
    },

    //*********************************************** LABO PROJECT QUERIES ***********************************************//
    //******************* GET LABO PROJECTS *******************//

    getProjectsLabo: async () => {
      try {
        const projectsLabo = await ProjectLabo.find().populate("adminProject"); // Retrieve projectsLabo from MongoDB & populating the administrator

        return projectsLabo;
      } catch (error) {
        throw new Error("Failed to fetch projects");
      }
    },

    //******************* GET LABO PROJECT BY ID *******************//
    projectLabo: async (_, { id }) => {
      // Retrieve the project based on the provided ID
      const projectLabo = await ProjectLabo.findById(id).populate(
        "adminProject"
      );
      //console.log(projectLabo.projectLabo);
      return projectLabo;
    },
    //******************* GET LABO Versions BY PROJECT_ID *******************//
    getVersions: async (_, { projectId }) => {
      try {
        const project = await ProjectLabo.findById(projectId); // Retrieve the project based on the provided project ID
        if (!project) {
          throw new Error("Project not found");
        }
        return project.versionProject; // Return the Versions array from the project
      } catch (error) {
        throw new Error("Failed to fetch Versions");
      }
    },
    //******************* GET LABO VERSION BY PROJECT_ID & VERSION _ID *******************//
    getVersion: async (_, { projectId, versionID }) => {
      try {
        const project = await ProjectLabo.findById(projectId); // Retrieve the project based on the provided project ID
        if (!project) {
          throw new Error("Project not found");
        }
        // return project.activite; // Return the activities array from the project

        const versions = project.versionProject;

        for (let i = 0; i < versions.length; i++) {
          if (versions[i].id == versionID) {
            // let myArray = [];
            // myArray.unshift(versions[i]);
            //console.log(versions[i]);
            return versions[i];
          }
        }
      } catch (error) {
        throw new Error("Failed to fetch versions");
      }
    },
  },

  //********************************************************************** MUTATIONS **********************************************************************//

  Mutation: {
    //*********************************************** USSCQ PROJECT MUTATIONS ***********************************************//
    //******************* MODIFY USSCQ PROJECT BY (PROJECT USSCQ infos) *******************//
    modifyProject: async (parent, { input }, context) => {
      // Extract the input values
      const {
        id,
        name,
        source,
        benificaire,
        periodeProject,
        integration,
        encryptionType,
        lengthKey,
        liaison,
        KeyDuration,
        description,
        partage,
        admin,
      } = input;
      try {
        const project = await ProjetUSSCQ.findById(id).populate("admin"); // Retrieve the project based on the provided ID
        if (!project) {
          throw new Error("Project not found");
        }

        project.name = name.toUpperCase();
        project.source = source;
        project.benificaire = benificaire.map((name) => name.toUpperCase());
        project.periodeProject = periodeProject;
        project.integration = integration;
        project.encryptionType = encryptionType;
        project.lengthKey = lengthKey;
        project.liaison = liaison;
        project.KeyDuration = KeyDuration;
        project.description = description;
        project.partage = partage;
        project.updatedAt = new Date();
        //Admin USSCQ PROJECT MODIFICATION
        if (
          admin[0].grade + admin[0].firstname + admin[0].name !=
          project.admin[0].grade +
            project.admin[0].firstname +
            project.admin[0].name
        ) {
          //Find the PrevAdmin and Retrieve the id from his projectQt list & Delete AdminQt from usertype in the case of Adminstrating one project
          const PrevAdmin = await User.findOne({
            name: project.admin[0].name,
            firstname: project.admin[0].firstname,
          }).exec();
          if (PrevAdmin.projectQt.length == 1) {
            PrevAdmin.userType = PrevAdmin.userType.filter(
              (role) => role !== "AdminQt"
            );
          }
          PrevAdmin.projectQt = PrevAdmin.projectQt.filter(
            (id) => !id.equals(project.id)
          );
          await PrevAdmin.save();

          // Find and update the NewAdmin & add the Administrator userType if it does not exists
          const NewAdmin = await User.findOne({
            name: admin[0].name,
            firstname: admin[0].firstname,
          }).exec();
          if (NewAdmin) {
            // Change the Admin of the USSCQ Project
            project.admin = NewAdmin;
            // Check if the ObjectId already exists in the array
            const idExists = NewAdmin.projectQt.some((id) =>
              id.equals(project.id)
            );
            if (!idExists) {
              NewAdmin.projectQt.push(project.id); // Push the ObjectId only if it doesn't exist
            }
            if (!NewAdmin.userType.includes("AdminQt")) {
              NewAdmin.userType.push("AdminQt");
            }
            await NewAdmin.save();
          }
        }
        await project.save();

        // Return the modified PROJECT
        return project;
      } catch (error) {
        throw new Error("Failed to fetch PROJECT");
      }
    },
    //******************* CREATE USSCQ Resource BY ( PROJECT_ID ) *******************//

    createResource: async (parent, { input }, context) => {
      const { projectId, pdfFile, ref, source, date, description, tache } =
        input;

      try {
        // Update the project document with the new resource
        const project = await ProjetUSSCQ.findById(projectId);
        if (!project) {
          throw new Error("Projet n'est pas trouvé.'");
        }
        const { createReadStream, filename, mimetype } = await pdfFile;
        if (!filename) {
          throw new Error("Le document n'est pas saisi.");
        }
        //TEST IF THE DOCUMENT WITH THAT NAME EXISTS ALREADY
        for (let i = 0; i < project.resource.length; i++) {
          let pdfFilePath = project.resource[i].pdfFile;
          let isFilenameIncluded = pdfFilePath.includes(filename);
          if (isFilenameIncluded) {
            throw new Error("Document déja existe.");
          }
        }

        // Create a folder with the project name if it doesn't exist
        const projectFolderPath = path.join(
          __dirname,
          "..",
          "uploads",
          project.name
        );
        if (!fs.existsSync(projectFolderPath)) {
          fs.mkdirSync(projectFolderPath);
        }
        // Define the file path where you want to store the uploaded PDF file
        const uploadPath = path.join(projectFolderPath, filename);

        // Create a write stream to save the file
        const writeStream = fs.createWriteStream(uploadPath);

        // Pipe the file data to the write stream
        createReadStream().pipe(writeStream); // Note the added () after createReadStream
        // Once the file is saved, you can save the resource data to your database

        const newResource = {
          id: new ObjectId(), // Generate a new ObjectId for the activite
          pdfFile: uploadPath,
          ref,
          source: source.toUpperCase(),
          date,
          description,
          tache,
        };

        // Add the new resource to the project's resource array
        project.resource.push(newResource);
        // Save the updated project document
        await project.save();
        // Return success or additional information
        return {
          success: true,
          message: "File uploaded successfully",
        };
      } catch (error) {
        // Handle errors
        console.error(
          "Erreur lors de la création de la ressource",
          error.message
        );
        return {
          success: false,
          message: error.message,
        };
      }
    },
    //******************* CREATE USSCQ ACTIVITY BY ( PROJECT_ID and activity infos) *******************//
    createActivite: async (parent, { input }, context) => {
      // Extract the input values
      const { projectId, ref, date, sujet, recommendation, remarques } = input;

      const newActivite = {
        id: new ObjectId(), // Generate a new ObjectId for the activite
        name: "",
        ref,
        date,
        sujet,
        recommendation,
        remarques,
      };

      // Update the project document with the new activite
      const project = await ProjetUSSCQ.findById(projectId);
      if (!project) {
        throw new Error("Project not found");
      }
      // Activity name function
      if (project.activite.length == 0) {
        newActivite.name = "Réunion 1";
      } else {
        let lastActivityIndex = project.activite.length;
        let lastActivityNum = lastActivityIndex + 1;
        newActivite.name = "Réunion " + lastActivityNum.toString();
        if (project.activite[lastActivityIndex - 1].name == newActivite.name) {
          let lastActivityNum = lastActivityIndex + 2;
          newActivite.name = "Réunion " + lastActivityNum.toString();
        }
      }
      // console.log(remarques);
      if (remarques == "") {
        newActivite.remarques = "";
      }
      // Add the new activite to the project's activite array
      project.activite.push(newActivite);

      // Save the updated project document
      await project.save();

      // Return the created activity
      return newActivite;
    },
    //******************* MODIFY USSCQ RESSOURCE BY (PROJECT_ID, RESSOURCE_ID and ressource infos) *******************//
    modifyRessource: async (parent, { input }, context) => {
      // Extract the input values
      const {
        projectId,
        ressourceId,
        //  pdfFile,
        ref,
        source,
        date,
        description,
        // tache,
      } = input;

      try {
        const project = await ProjetUSSCQ.findById(projectId); // Retrieve the project based on the provided project ID
        if (!project) {
          throw new Error("Project not found");
        }

        const ressources = project.resource;

        for (let i = 0; i < ressources.length; i++) {
          if (ressources[i].id == ressourceId) {
            // Modify the Ressource
            project.resource[i].ref = ref;
            // project.resource[i].pdfFile = pdfFile;
            project.resource[i].source = source.toUpperCase();
            project.resource[i].date = date;
            project.resource[i].description = description;
            // project.resource[i].tache = tache;

            // console.log(project.resource[i]);

            // Save modified Ressource
            await project.save();

            // Return the modified resource
            return project.resource[i];
          }
        }
      } catch (error) {
        throw new Error("Failed to fetch ressource");
      }
    },
    //******************* MODIFY USSCQ ACTIVITY BY (PROJECT_ID, ACTIVITY_ID and activity infos) *******************//
    modifyActivite: async (parent, { input }, context) => {
      // Extract the input values
      const {
        projectId,
        activityId,
        name,
        ref,
        date,
        sujet,
        recommendation,
        remarques,
      } = input;

      try {
        const project = await ProjetUSSCQ.findById(projectId); // Retrieve the project based on the provided project ID
        if (!project) {
          throw new Error("Project not found");
        }

        const activities = project.activite;

        for (let i = 0; i < activities.length; i++) {
          if (activities[i].id == activityId) {
            // Modify the Activity
            project.activite[i].name = name;
            project.activite[i].ref = ref;
            project.activite[i].sujet = sujet;
            project.activite[i].date = date;
            project.activite[i].recommendation = recommendation;
            project.activite[i].remarques = remarques;
            // console.log(project.activite[i]);

            // Save modified activity
            await project.save();

            // Return the modified activite
            return project.activite[i];
          }
        }
      } catch (error) {
        throw new Error("Failed to fetch activity");
      }
    },

    //******************* DELETE USSCQ ACTIVITY BY (PROJECT_ID & ACTIVITY_ID) *******************//
    deleteActivite: async (_, { projectId, activiteId }) => {
      try {
        // Find the project by ID
        const project = await ProjetUSSCQ.findById(projectId);

        if (!project) {
          throw new Error("Project not found");
        }

        // Find the index of the activity with the given activiteId
        const activityIndex = project.activite.findIndex(
          (activity) => activity.id === activiteId
        );

        if (activityIndex === -1) {
          throw new Error("Activity not found in the project");
        }

        // Remove the activity from the project's activite array
        const removedActivity = project.activite.splice(activityIndex, 1)[0];

        // Save the updated project
        await project.save();

        return removedActivity;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    //******************* DELETE USSCQ Ressource BY (PROJECT_ID & Ressource_ID) *******************//
    deleteRessource: async (_, { projectId, ressourceId }) => {
      try {
        // Find the project by ID
        const project = await ProjetUSSCQ.findById(projectId);

        if (!project) {
          throw new Error("Project not found");
        }

        // Find the index of the ressource with the given ressourceId
        const ressourceIndex = project.resource.findIndex(
          (ressource) => ressource.id === ressourceId
        );

        if (ressourceIndex === -1) {
          throw new Error("Ressource not found in the project");
        }

        // Remove the ressource from the project's ressource array
        const removedRessource = project.resource.splice(ressourceIndex, 1)[0];

        // Save the updated project
        await project.save();

        return removedRessource;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    //*********************************************** LABO PROJECT MUTATIONS ***********************************************//
    //******************* ADD Version to an existing PROJECT BY (PROJECT Labo ID) *******************//
    createVersion: async (parent, { input }, context) => {
      // Extract the input values
      const { projectId, nameVersion, descriptionVersion } = input;

      const project = await ProjectLabo.findById(projectId);
      if (!project) {
        throw new Error("Project not found");
      }

      const versions = project.versionProject;

      for (let i = 0; i < versions.length; i++) {
        if (versions[i].nameVersion == nameVersion) {
          throw new Error("Version déja existe.");
        }
      }

      let newVersion = {
        nameVersion,
        versionId: "",
        descriptionVersion,
      };

      // Version name function
      if (project.versionProject.length == 0) {
        newVersion.versionId = "1";
      } else {
        let lastVersionIndex = project.versionProject.length;
        let lastVersionNum = lastVersionIndex + 1;
        newVersion.versionId = lastVersionNum.toString();
        if (
          project.versionProject[lastVersionIndex - 1].versionId ==
          newVersion.versionId
        ) {
          let lastVersionNum = lastVersionIndex + 2;
          newVersion.versionId = lastVersionNum.toString();
        }
      }

      // Update the project document with the new version

      // Add the new version to the project's version array
      project.versionProject.push(newVersion);

      // Save the updated project document
      await project.save();

      // Return the created version
      return newVersion;
    },
  },
};
