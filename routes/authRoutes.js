const router = require("express").Router();
const authController = require("../controllers/authController");
const {
  getFreelancerProfile,
  getClientProfile,
} = require("../controllers/authController");

// REGISTRATION

router.post("/register", authController.createUser);

// LOGIN
router.post("/login", authController.loginUser);

router.get("/freelancer/:id", getFreelancerProfile);
router.get("/client/:id", getClientProfile);

module.exports = router;
