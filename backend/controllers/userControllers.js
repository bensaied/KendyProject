const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const User = require("../models/userModel");
// const bcrypt = require("bcryptjs");

/******************************************************************* FIRST CONNECT API *******************************************************************/

const userFirstConnect = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    if (req.body.password) {
      user.password = req.body.password;
      user.firstConnect = false;

      await user.save();
    }
  } else {
    res.status(404);
    throw new Error("Utilisateur non trouvé.");
  }
});
/******************************************************************* CONNEXION API *******************************************************************/

const authUser = asyncHandler(async (req, res) => {
  const { login, password } = req.body;

  const user = await User.findOne({ login });

  if (user && (await user.matchPassword(password))) {
    user.dateLogin = Date.now();
    await user.save();
    res.json({
      _id: user._id,
      name: user.name,
      firstname: user.firstname,
      login: user.login,
      grade: user.grade,
      password: user.password,
      direction: user.direction,
      userType: user.userType,
      token: generateToken(user._id),
      firstConnect: user.firstConnect,
      projectLabo: user.projectLabo,
      projectQt: user.projectQt,
    });
  } else {
    res.status(400);
    throw new Error("Nom d'utilisateur ou mot de passe invalide.");
  }
});
/******************************************************************* REFRESH USER INFO API *******************************************************************/

const refreshUser = asyncHandler(async (req, res) => {
  const { login } = req.body;

  const user = await User.findOne({ login });

  if (user) {
    user.dateLogin = Date.now();
    await user.save();
    res.json({
      _id: user._id,
      name: user.name,
      firstname: user.firstname,
      login: user.login,
      grade: user.grade,
      password: user.password,
      direction: user.direction,
      userType: user.userType,
      token: generateToken(user._id),
      firstConnect: user.firstConnect,
      projectLabo: user.projectLabo,
      projectQt: user.projectQt,
    });
  } else {
    res.status(400);
    throw new Error("Nom d'utilisateur ou mot de passe invalide.");
  }
});
/******************************************************************* UPDATE OWN PROFILE API *******************************************************************/

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { password, newpassword, confirmpassword } = req.body;

  if (user) {
    user.name = req.body.name || user.name;
    user.firstname = req.body.firstname || user.firstname;
    user.login = req.body.login || user.login;
    user.direction = req.body.direction || user.direction;
    user.grade = req.body.grade || user.grade;
    user.userType = req.body.userType || user.userType;

    //user.password = req.body.newpassword || user.password;

    if (!req.body.password) {
      throw new Error("Insérer votre mot de passe s'il vous plaît.");
    }

    if (user && (await user.matchPassword(password))) {
      if (newpassword) {
        if (newpassword != confirmpassword) {
          res.status(404);
          throw new Error("Les deux mots de passe ne sont pas identiques.");
        } else if (newpassword.length < 8) {
          res.status(404);
          throw new Error(
            "Le mot de passe doit contenir au moins 8 caractères."
          );
        }
        user.password = req.body.newpassword;
      }
      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        firstname: updatedUser.firstname,
        login: updatedUser.login,
        userType: updatedUser.userType,
        direction: updatedUser.direction,
        grade: updatedUser.grade,
        date: Date.now(),
        pic: updatedUser.pic,
        token: generateToken(updatedUser._id),
        password: updatedUser.password,
        projectLabo: updatedUser.projectLabo,
        projectQt: updatedUser.projectQt,
      });
    } else {
      res.status(404);
      throw new Error("Votre mot de passe est incorrect.");
    }
  } else {
    res.status(404);
    throw new Error("Utilisateur non trouvé.");
  }
});

/******************************************************************* CHANGE OWN PASSWORD API *******************************************************************/

const userChangepwd = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { password } = req.body;

  if (user && (await user.matchPassword(password))) {
    if (req.body.newpassword) {
      user.password = req.body.newpassword;

      await user.save();

      res.json({ message: "Password modifié." });
    }
  } else {
    res.status(404);
    throw new Error("Mot de passe actuel est incorrect.");
  }
});
/******************************************************************* ADD USER API *******************************************************************/

const registerUser = asyncHandler(async (req, res) => {
  const {
    firstname,
    name,
    login,
    direction,
    grade,
    password,
    firstConnect,
    userType,
  } = req.body;

  const userExists = await User.findOne({
    login,
  });

  if (userExists) {
    res.status(404);
    throw new Error("Utilisateur déja existe.");
  }
  if (firstname.length < 3) {
    throw new Error("Prénom doit contenir au moins 3 caractères.");
  }
  if (password.length < 8) {
    throw new Error("Le mot de passe doit contenir au moins 8 caractères.");
  }

  const user = await User.create({
    firstname,
    name,
    login,
    direction,
    grade,
    firstConnect,
    userType,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      firstname: user.firstname,
      login: user.login,
      grade: user.grade,
      pic: user.pic,
      password: user.password,
      direction: user.direction,
      userType: user.userType,
      token: generateToken(user._id),
      firstConnect: user.firstConnect,
    });
  } else {
    res.status(400);
    throw new Error("Utilisateur non trouvé.");
  }
});

/******************************************************************* UPDATE USER API *******************************************************************/
const UpdateUtilisateur = asyncHandler(async (req, res) => {
  const { name, firstname, login, /*direction,*/ grade } = req.body;

  const update = await User.findById(req.params.id);
  if (update) {
    update.name = name;
    update.firstname = firstname;
    update.login = login;
    // update.direction = direction;
    update.grade = grade;
    if (req.body.password) {
      update.password = req.body.password;
      update.firstConnect = true;
    }
    const updatedUtilisateur = await update.save();
    res.json(updatedUtilisateur);
  } else {
    res.status(404);
    throw new Error("Utilisateur non trouvé.");
  }
});

/******************************************************************* GET USERS LIST API *******************************************************************/

const listUsers = asyncHandler(async (req, res) => {
  const utlis = await User.find();
  res.json(utlis);
});

/******************************************************************* GET USER BY ID API *******************************************************************/

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    //res.json("user");
    res.json(user);
  } else {
    res.status(404).json({ message: "Utilisateur non trouvé." });
  }
});

/******************************************************************* DELETE USER API *******************************************************************/

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "Utilisateur supprimé." });
  } else {
    res.status(404);
    throw new Error("Utilisateur non trouvé.");
  }
});

//////////////*************** EXPORT APIS ***************//////////////
module.exports = {
  registerUser,
  authUser,
  listUsers,
  getUserById,
  deleteUser,
  updateUserProfile,
  userFirstConnect,
  userChangepwd,
  UpdateUtilisateur,
  refreshUser,
};
