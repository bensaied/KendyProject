const ProjetUSSCQ = require("../models/projectUssqModel");
const mongoose = require("mongoose");
const ProjectLabo = require("../models/projectLaboModel");
const User = require("../models/userModel");
const { ObjectId } = mongoose.Types;
const { GraphQLUpload } = require("graphql-upload");
const path = require("path");
const fs = require("fs");
const { gql } = require("@apollo/client");

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
      const project = await ProjetUSSCQ.findById(id).populate("admin").exec();
      //  Retrieve project from MongoDB & populating the resource of the Activities
      project.activite.forEach((activite) => {
        // Log resource for each activite
        // console.log("Resources for activite:", activite.resource);
      });
      // Retrieve project from MongoDB & populating the resource of the Responses
      project.response.forEach((response) => {});
      return project;
    },

    //******************* GET USSCQ ACTIVITIES BY PROJECT_ID *******************//
    getActivities: async (_, { projectId }) => {
      try {
        const project = await ProjetUSSCQ.findById(projectId); // Retrieve the project based on the provided project ID
        if (!project) {
          throw new Error("Project not found");
        }
        //  Retrieve project from MongoDB & populating the resource of the Activities
        project.activite.forEach((activite) => {
          // Log resource for each activite
          // console.log("Resources for activite:", activite.resource);
        });

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
          // Remove the specific project and its associated role from projectQt
          PrevAdmin.projectQt = PrevAdmin.projectQt.filter(
            (projectQtItem) => !projectQtItem.id.equals(project.id)
          );

          await PrevAdmin.save();

          // Find and update the NewAdmin & add the Administrator userType if it does not exists
          const newAdminValue =
            admin[0].grade + " " + admin[0].name + " " + admin[0].firstname;
          const newAdminValueParts = newAdminValue.split(" ");
          // Construct a flexible query to check if any of the input parts match any field
          const searchQuery = {
            $and: newAdminValueParts.map((part) => ({
              $or: [
                { grade: { $regex: part, $options: "i" } }, // Case-insensitive regex match for grade
                { firstname: { $regex: part, $options: "i" } }, // Case-insensitive regex match for firstname
                { name: { $regex: part, $options: "i" } }, // Case-insensitive regex match for name
              ],
            })),
          };
          const NewAdmin = await User.findOne(searchQuery).exec();

          if (NewAdmin) {
            // Change the Admin of the Project
            project.admin = NewAdmin;

            // Check if the project with the given id already exists in the array
            const idExists = NewAdmin.projectQt.some((projectQtItem) =>
              projectQtItem.id.equals(project.id)
            );

            // Push the ObjectId and role only if it doesn't exist
            if (!idExists) {
              NewAdmin.projectQt.push({ id: project.id, role: "AdminQt" });
            }

            // Add "AdminQt" to userType if not already present
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
        if (!ref) {
          throw new Error("La reférence du ressource n'est pas saisie.");
        }
        if (!source) {
          throw new Error("La source du ressource n'est pas saisie.");
        }
        if (!date) {
          throw new Error("La date du ressource n'est pas saisie.");
        }
        if (!description) {
          throw new Error("La description du ressource n'est pas saisie.");
        }

        //TEST IF THE DOCUMENT WITH THAT NAME EXISTS ALREADY
        const existingResource = project.resource.find((resource) =>
          resource.pdfFile.includes(filename)
        );
        if (existingResource) {
          return {
            success: true,
            message: "File already exists",
            resourceRef: existingResource._id.toString(),
          };
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
          _id: new ObjectId(), // Generate a new ObjectId for the resource
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

        return {
          success: true,
          message: "File uploaded successfully",
          resourceRef: newResource._id.toString(),
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
          resourceRef: null,
        };
      }
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

          // Handle Modify Resource Errors
          if (!ref) {
            throw new Error("La référence du ressource n'est pas saisie.");
          }
          if (!source) {
            throw new Error("La source du ressource n'est pas saisie.");
          }
          if (!date) {
            throw new Error("La date du ressource n'est pas choisie.");
          }
          if (!description) {
            throw new Error("La description du ressource n'est pas saisie.");
          }

          // Save modified Ressource
          await project.save();

          // Return the modified resource
          return project.resource[i];
        }
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

    //******************* CREATE USSCQ ACTIVITY BY ( PROJECT_ID and activity infos) *******************//
    createActivite: async (parent, { input }, context) => {
      // Extract the input values
      const { projectId, resourceRef, date, sujet, recommendation, remarques } =
        input;

      // Update the project document with the new activite
      const project = await ProjetUSSCQ.findById(projectId);
      if (!project) {
        throw new Error("Project not found");
      }
      // Find the resource within the project's resources array
      // const resource = project.resource.find(
      //   (res) => res.id.toString() === resourceRef
      // );
      // if (!resource) {
      //   throw new Error("Resource not found within the project");
      // }
      const resourceObjectId = new ObjectId(resourceRef);
      const newActivite = {
        id: new ObjectId(), // Generate a new ObjectId for the activite
        name: "",
        resource: resourceObjectId,
        date,
        sujet,
        remarques,
        recommendation,
      };

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
      // Error Handling
      if (!date) {
        throw new Error("La date du réunion n'est pas saisie.");
      }
      if (!sujet) {
        throw new Error("Le sujet du réunion n'est pas saisi.");
      }
      if (!remarques) {
        throw new Error("Le compte rendu du réunion n'est pas saisi.");
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

    //******************* MODIFY USSCQ ACTIVITY BY (PROJECT_ID, ACTIVITY_ID and activity infos) *******************//
    modifyActivite: async (parent, { input }, context) => {
      // Extract the input values
      const {
        projectId,
        activityId,
        name,
        date,
        sujet,
        remarques,
        recommendation,
      } = input;

      const project = await ProjetUSSCQ.findById(projectId); // Retrieve the project based on the provided project ID
      if (!project) {
        throw new Error("Project not found");
      }

      const activities = project.activite;

      for (let i = 0; i < activities.length; i++) {
        if (activities[i].id == activityId) {
          // Modify the Activity
          project.activite[i].name = name;
          project.activite[i].sujet = sujet;
          project.activite[i].date = date;
          project.activite[i].remarques = remarques;
          if (recommendation) {
            project.activite[i].recommendation = recommendation;
          } else {
            project.activite[i].recommendation = " ";
          }

          // Handle Modifying activity Errors
          if (!date) {
            throw new Error("La date du réunion n'est pas choisie.");
          }
          if (!sujet) {
            throw new Error("Le sujet du réunion n'est pas saisi.");
          }
          if (!remarques) {
            throw new Error("Le compte rendu du réunion n'est pas saisi.");
          }

          // Save modified activity
          await project.save();

          // Return the modified activite
          return project.activite[i];
        }
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

        // Find the index of the activity with the given activityArray
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
    //******************* CREATE USSCQ RESPONSE BY ( PROJECT_ID and response infos) *******************//
    createResponse: async (parent, { input }, context) => {
      // Extract the input values
      const { projectId, resourceRef, degre, description, dateLimite } = input;

      // Update the project document with the new response
      const project = await ProjetUSSCQ.findById(projectId);
      if (!project) {
        throw new Error("Project not found");
      }
      const resourceObjectId = new ObjectId(resourceRef);
      const newResponse = {
        id: new ObjectId(), // Generate a new ObjectId for the response
        name: "",
        resource: resourceObjectId,
        degre,
        description,
        dateLimite,
        etat: "Non répondue",
      };
      // Response name function
      if (project.response.length == 0) {
        newResponse.name = "Réponse 1";
      } else {
        let lastResponseIndex = project.response.length;
        let lastResponseNum = lastResponseIndex + 1;
        newResponse.name = "Réponse " + lastResponseNum.toString();
        if (project.response[lastResponseIndex - 1].name == newResponse.name) {
          let lastResponseNum = lastResponseIndex + 2;
          newResponse.name = "Réponse " + lastResponseNum.toString();
        }
      }
      // Error Handling
      if (!description) {
        throw new Error("La description du réponse n'est pas saisie.");
      }
      if (!degre) {
        throw new Error("Le degré du réponse n'est pas choisi.");
      }
      if (!dateLimite) {
        throw new Error("La date du réponse n'est pas choisie.");
      }
      // Add the new response to the project's response array
      project.response.push(newResponse);

      // Save the updated project document
      await project.save();
      // Return the created activity
      return newResponse;
    },
    //******************* MODIFY USSCQ ACTIVITY ( RESPONSE ) BY (PROJECT_ID, RESPONSE_ID and response infos) *******************//
    modifyResponse: async (parent, { input }, context) => {
      // Extract the input values
      const { projectId, responseId, degre, description, dateLimite, etat } =
        input;

      const project = await ProjetUSSCQ.findById(projectId); // Retrieve the project based on the provided project ID
      if (!project) {
        throw new Error("Project not found");
      }

      const responses = project.response;

      for (let i = 0; i < responses.length; i++) {
        if (responses[i].id == responseId) {
          // Modify the Response
          project.response[i].degre = degre;
          project.response[i].description = description;
          project.response[i].dateLimite = dateLimite;
          project.response[i].etat = etat;

          // Handle Modifying Response Errors
          if (!degre) {
            throw new Error(
              "Le degré d'urgence de la réponse n'est pas choisi."
            );
          }
          if (!description) {
            throw new Error("La description du réponse n'est pas saisi.");
          }
          if (!dateLimite) {
            throw new Error("La date limite du réponse n'est pas choisie.");
          }
          if (!etat) {
            throw new Error("L'état de réponse n'est pas saisi.");
          }

          // Save modified response
          await project.save();

          // Return the modified response
          return project.response[i];
        }
      }
    },
    //******************* DELETE USSCQ ACTIVITY ( RESPONSE ) BY (PROJECT_ID & RESPONSE_ID) *******************//
    deleteResponse: async (_, { projectId, responseId }) => {
      try {
        // Find the project by ID
        const project = await ProjetUSSCQ.findById(projectId);
        if (!project) {
          throw new Error("Project not found");
        }
        // Find the index of the response with the given responseArray
        const responseIndex = project.response.findIndex(
          (response) => response.id === responseId
        );
        if (responseIndex === -1) {
          throw new Error("Response not found in the project.");
        }
        // Remove the response from the project's response array
        const removedResponse = project.response.splice(responseIndex, 1)[0];
        // Save the updated project
        await project.save();
        return removedResponse;
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
    //******************* MODIFY LABO PROJECT BY (PROJECT LABO infos) *******************//
    modifyProjectLabo: async (parent, { input }, context) => {
      const {
        id,
        nameProject,
        adminProject,
        referenceTypeProject,
        livrablesProject,
        encryptionTypeProject,
        integrationProject,
        descriptionProject,
        partageProject,
        // versionProject,
        // reseauProject,
        // missionProject,
        statusProject,
        formateurProject,
        // createdAt,
        // updatedAt,
      } = input;
      try {
        const project = await ProjectLabo.findById(id);
        if (!project) {
          throw new Error("Project not found");
        }
        project.nameProject = nameProject.toUpperCase();
        project.referenceTypeProject = referenceTypeProject;
        project.livrablesProject = livrablesProject;
        project.encryptionTypeProject = encryptionTypeProject;
        project.integrationProject = integrationProject;
        project.descriptionProject = descriptionProject;
        project.partageProject = partageProject;
        project.updatedAt = new Date();

        // (project.versionProject = versionProject),
        // (project.reseauProject = reseauProject),
        // (project.missionProject = missionProject),
        // (project.statusProject = statusProject),

        await project.save();

        if (formateurProject.length != 0) {
          const formateurIds = await Promise.all(
            formateurProject.map(async (formateur) => {
              let formateurProjectParts = formateur.split(" ");
              let searchQuery = {
                $and: formateurProjectParts.map((part) => ({
                  $or: [
                    { grade: { $regex: part, $options: "i" } }, // Case-insensitive regex match for grade
                    { firstname: { $regex: part, $options: "i" } }, // Case-insensitive regex match for firstname
                    { name: { $regex: part, $options: "i" } }, // Case-insensitive regex match for name
                  ],
                })),
              };

              const formateurUserFound = await User.findOne(searchQuery).exec();

              if (project.formateurProject.length !== 0) {
                for (const formateurId of project.formateurProject) {
                  const Formateur = await User.findById(formateurId);
                  // console.log("formProjLabo:", Formateur.projectLabo);
                  // Remove the projectId from their projectLabo array
                  Formateur.projectLabo = Formateur.projectLabo.filter(
                    (projectItem) => {
                      const idMatch = projectItem.id == project.id;
                      const roleMatch = projectItem.role == "Formateur";

                      // Debug: Log the comparison results
                      console.log(
                        `Comparing: projectItem.id (${projectItem.id}) with project.id (${project.id}), projectItem.role (${projectItem.role}) === "Formateur"`
                      );

                      return !(idMatch && roleMatch); // Exclude the matching item
                    }
                  );

                  // console.log("FormateurProjLabo", Formateur.projectLabo);
                  // Check if the remaining projects have roles other than 'Formateur'
                  const hasOtherRoles =
                    Formateur.projectLabo.length > 0 &&
                    Formateur.projectLabo.some(
                      (projectItem) => projectItem.role !== "Formateur"
                    );

                  // If no projects left or only projects with other roles, remove 'Formateur' from userType
                  if (Formateur.projectLabo.length === 0 || hasOtherRoles) {
                    console.log("HERE !! To DELETE");
                    Formateur.userType = Formateur.userType.filter(
                      (role) => role !== "Formateur"
                    );
                    console.log("FormateurName", Formateur.name);
                    console.log("FormateurUserType", Formateur.userType);
                  }

                  // Save the updated formateur document
                  await Formateur.save();
                }
              }

              // Add LaboProject to the projectLAbo array in FormateurDoc
              const idExists = formateurUserFound.projectLabo.some(
                (projectLaboItem) =>
                  projectLaboItem.id.toString() === project.id.toString() &&
                  projectLaboItem.role === "Formateur"
              );
              if (!idExists) {
                formateurUserFound.projectLabo.push({
                  id: project.id,
                  role: "Formateur",
                }); // Push the ObjectId only if it doesn't exist
              }
              if (!formateurUserFound.userType.includes("Formateur")) {
                formateurUserFound.userType.push("Formateur");
              }
              await formateurUserFound.save();
              // Return the user's ID if found
              return formateurUserFound ? formateurUserFound.id : null;
            })
          );

          // Filter out any null IDs (in case some formateurs are not found)
          const validFormateurIds = formateurIds.filter((id) => id !== null);
          // Assign all valid formateur IDs to the project
          project.formateurProject = validFormateurIds;
          project.statusProject = "Actif";
          await project.save();
        }

        if (adminProject) {
          let project1 = await ProjectLabo.findById(id).populate(
            "adminProject"
          );

          if (
            adminProject.value !=
            project1.adminProject[0].grade +
              " " +
              project1.adminProject[0].name +
              " " +
              project1.adminProject[0].firstname
          ) {
            //Find the PrevAdmin and Retrieve the id from his projectLabo list & Delete AdminLabo from usertype in the case of Adminstrating one project
            const PrevAdmin = await User.findOne({
              name: project1.adminProject[0].name,
              firstname: project1.adminProject[0].firstname,
            }).exec();

            if (PrevAdmin.projectLabo.length == 1) {
              PrevAdmin.userType = PrevAdmin.userType.filter(
                (role) => role !== "AdminLabo"
              );
            }
            PrevAdmin.projectLabo = PrevAdmin.projectLabo.filter(
              (projectLaboItem) => !projectLaboItem.id.equals(project.id)
            );
            await PrevAdmin.save();

            // Find and update the NewAdmin & add the Administrator userType if it does not exists
            const newAdminValue = adminProject.value;
            const newAdminValueParts = newAdminValue.split(" ");

            // Construct a flexible query to check if any of the input parts match any field
            const searchQuery = {
              $and: newAdminValueParts.map((part) => ({
                $or: [
                  { grade: { $regex: part, $options: "i" } }, // Case-insensitive regex match for grade
                  { firstname: { $regex: part, $options: "i" } }, // Case-insensitive regex match for firstname
                  { name: { $regex: part, $options: "i" } }, // Case-insensitive regex match for name
                ],
              })),
            };
            const NewAdmin = await User.findOne(searchQuery).exec();
            if (NewAdmin) {
              // Change the Admin of the LABO Project
              project1.adminProject = NewAdmin;
              await project1.save();
              // Check if the ObjectId already exists in the array
              const idExists = NewAdmin.projectLabo.some((projectLaboItem) =>
                projectLaboItem.equals(project.id)
              );
              if (!idExists) {
                NewAdmin.projectLabo.push({
                  id: project.id,
                  role: "AdminLabo",
                }); // Push the ObjectId with the AdminLabo role only if it doesn't exist
              }
              if (!NewAdmin.userType.includes("AdminLabo")) {
                NewAdmin.userType.push("AdminLabo");
              }
              await NewAdmin.save();
            }
          }
        }

        //Return the modified PROJECT
        return project;
      } catch (error) {
        throw new Error("Failed to fetch PROJECT");
      }
    },
  },
};
