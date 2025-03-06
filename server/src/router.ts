import path from "node:path";
import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import offersListActions from "./modules/offersList/offersListActions";

import offersActions from "./modules/offers/offersActions";

router.get("/api/offers", offersActions.browseOffers);
router.get("/api/offersByCompany", offersActions.browseOffersByCompany);
// Define item-related routes

import { comparePassword, hashPassword } from "./middlewares/argon.middleware";
import { checkEmail, verifieEmail } from "./middlewares/checkEmail.middleware";
import {
  candidateRegister,
  companyRegister,
} from "./middlewares/register.middleware";
import {
  checkAdminRole,
  checkCandidateRole,
  checkCompanyRole,
} from "./middlewares/role.middleware";
import { login, verifyToken } from "./modules/auth/authActions";
import userActions from "./modules/item/user/userActions";

const { validateUserForm, add } = userActions;

router.post(
  "/api/usercandidateformregister",
  validateUserForm,
  hashPassword,
  checkEmail,
  candidateRegister,
  userActions.add,
);
router.post(
  "/api/usercompanyformregister",
  validateUserForm,
  hashPassword,
  checkEmail,
  companyRegister,
  userActions.add,
);

router.post(
  "/api/login/company",
  verifieEmail,
  comparePassword,
  checkCompanyRole,
  login,
);

router.post(
  "/api/login/candidate",
  verifieEmail,
  comparePassword,
  checkCandidateRole,
  login,
);

router.post(
  "/api/login/admin",
  verifieEmail,
  comparePassword,
  checkAdminRole,
  login,
);
/* ************************************************************************* */

import offerActions from "./routes/offer.routes";

router.use("/api/offers", offerActions);
router.get("/api/offers", offersListActions.browse);
router.get("/api/offers/:id", offersActions.browseOffer);
router.post(
  "/api/apply",
  candidateActions.readProfilforApply,
  applyActions.addApply,
);

import { upload } from "./middlewares/multer.middleware";
import candidatesActions from "./modules/candidate/candidateActions";
import companiesActions from "./modules/companies/companiesActions";

router.get("/api/companies", companiesActions.browseCompanies);

router.use(
  "/uploads",
  express.static(path.join(__dirname, "/middlewares/uploads")),
);

import candidateUpdateSchema from "./modules/candidate/candidate.validation";
import candidateActions from "./modules/candidate/candidateActions";

router.get("/api/user/:id", userActions.readUserData);
router.get("/api/candidate/account/:id", candidatesActions.readProfil);
router.post(
  "/api/candidate/account",

  upload,
  candidatesActions.uploadFiles,
);
router.get("/api/companies/account/:id", companiesActions.readCompany);
router.post(
  "/api/companies/account",
  verifyToken,
  companiesActions.uploadCompany,
);

router.post(
  "/api/companies/offer",
  verifyToken,
  companiesActions.readCompanyProfil,
  offersActions.addOffer,
);

router.get("/api/offerByCandidate", offersActions.browseOffer);
router.get("/api/candidate/account/:id", candidateActions.readProfil);
router.post(
  "/api/candidate/account",
  verifyToken,
  upload,
  candidateActions.uploadFiles,
);

router.get(
  "/api/candidate/candidature/:id",
  candidateActions.readApply,
  applyActions.browseApply,
);

/* ************************************************************************* */
router.use("/admin", verifyToken);

router.get("/admin/companies", userActions.browseCompanies);
router.get("/admin/latest-profiles", userActions.getLatestProfiles);
router.put("/admin/companies/:id", userActions.anonymizeCompany);
router.get("/admin/candidates", userActions.browseCandidates);
router.get("/admin/candidates/:id", userActions.readUserData);
router.put("/admin/candidates/:id", userActions.anonymizeCandidate);
router.post(
  "/admin/companies",
  hashPassword,
  checkEmail,
  companyRegister,
  userActions.add,
);

router.post(
  "/admin/candidates",
  hashPassword,
  checkEmail,
  candidateRegister,
  userActions.add,
);
router.get("/admin/companies", userActions.browseCompanies);
router.put("/admin/companies/:id", userActions.anonymizeCompany);
router.get("/admin/candidates", userActions.browseCandidates);
router.put("/admin/candidates/:id", userActions.anonymizeCandidate);

import applyActions from "./modules/candidature/applyActions";
import adminCompanyOffers from "./routes/admin.companyOffers.routes";
router.use("/api/admin/companyOfferList", adminCompanyOffers);

export default router;
