const ROLES = {
  SuperAdmin: "SuperAdmin",
  admin: "Admin",
  formateur: "Formateur",
  visiteur: "Visiteur",
};

const inRole =
  (...roles) =>
  (req, res, next) => {
    const currentType = roles.find(
      (currentType) => req.user.currentType === currentType
    );
    if (!currentType) {
      return res.status(401).json({ message: "no access" });
    }
    next();
  };

module.exports = { ROLES, inRole };
