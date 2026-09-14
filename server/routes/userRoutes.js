const {Router} = require('express')
const {registerUser, loginUser, getUser, changeAvatar, editUser, allUsers, changePassword}=require("../controllers/userControllers")
const authMiddleWare = require('../middleware/authMiddleWare')
const router = Router();

router.post("/register", registerUser);
router.post('/login', loginUser);
router.get('/:id', getUser);
router.get('/', allUsers);
router.patch("/:userId/change-avatar", authMiddleWare, changeAvatar);
router.patch("/:userId/changePassword", authMiddleWare, changePassword)
router.patch("/:userId/edit-user", authMiddleWare, editUser);


module.exports = router;