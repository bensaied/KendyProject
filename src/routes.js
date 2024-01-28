import Qrcode from "./views/qrcode/Qrcode";
import Partage from "./views/partage/partage";
import Accueil from "./views/dashboard/Dashboard";
import MesProjets from "./views/mesprojets/MesProjets";
import ListeUtilisateurs from "./views/listeutilisateurs/ListeUtilisateurs";
import CreerProjet from "./views/creerprojet/CreerProjet";
import ProjetLabo from "./views/projetlabo/ProjetLabo";
import ProjetQt from "./views/projetqt/ProjetQt";
import CreerVersion from "./views/creerversion/CreerVersion";
import Version from "./views/version/Version";
import Reseau from "./views/reseau/Reseau";
import CreerReseau from "./views/creerreseau/CreerReseau";
import CreerMission from "./views/creermission/CreerMission";
import Mission from "./views/mission/Mission";
import AjoutUtilisateur from "./views/ajoututilisateur/AjoutUtilisateur";
import Profile from "./views/userprofile/Profile";
import MesMissions from "./views/mesmissions/MesMissions";
import ModifierUtilisateur from "./views/modifierutilisateur/ModifierUtilisateur";
// import FirstConnect from "./views/pages/firstConnect/firstConnect";
import PdfPrint from "./views/imprimer/PdfPrint";

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/accueil", name: "Accueil", element: Accueil },
  // { path: "/projets", name: "Projets", element: MesProjets },
  {
    path: "/projets",
    name: "Projets",
    element: MesProjets,
    // children: [
    //   {
    //     path: "/projets/projetqt/:id",
    //     name: "ProjetQt",
    //     element: ProjetQt,
    //   },
    // ],
  },

  {
    path: "/utilisateurs",
    name: "Utilisateurs",
    element: ListeUtilisateurs,
  },
  {
    path: "/projets/creerprojet",
    name: "Nouveau projet",
    element: CreerProjet,
  },
  {
    path: "/projets/projetqt/:id",
    name: "Projet",
    element: ProjetQt,
  },
  {
    path: "/partage",
    name: "Partage",
    element: Partage,
  },
  {
    path: "/projets/projetlabo/:id",
    name: "Projet",
    element: ProjetLabo,
  },
  {
    path: "/projets/projetlabo/creerversion/:id",
    name: "Nouvelle version",
    element: CreerVersion,
  },
  { path: "/projets/projetlabo/version", name: "Version", element: Version },
  {
    path: "/projets/projetlabo/version/reseau",
    name: "Réseau",
    element: Reseau,
  },
  { path: "/creerreseau", name: "Nouveau réseau", element: CreerReseau },
  { path: "/creermission", name: "Nouvelle mission", element: CreerMission },
  {
    path: "/projets/projetlabo/version/reseau/mission",
    name: "Mission",
    element: Mission,
  },
  {
    path: "/utilisateurs/ajouterutilisateur",
    name: "Nouveau utilisateur",
    element: AjoutUtilisateur,
  },
  { path: "/profile", name: "Mon profile", element: Profile },
  {
    path: "/utilisateurs/listepdf",
    name: "Imprimer la liste des utilisateurs",
    element: PdfPrint,
  },
  //  Mes Missions Component
  // { path: "/missions", name: "Missions", element: MesMissions },
  {
    path: "/:id",
    name: "Modifier un utilisateur",
    element: ModifierUtilisateur,
  },
  {
    path: "/genererqrcode",
    name: "Generer Qr code",
    element: Qrcode,
  },
];

export default routes;
