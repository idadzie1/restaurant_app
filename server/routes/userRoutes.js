const {Router} = require('express')
const {registerUser, loginUser, getUser, changeAvatar, editUser, allUsers}=require("../controllers/userControllers")
const authMiddleWare = require('../middleware/authMiddleWare')
const router = Router();

router.post("/register", registerUser);
router.post('/login', loginUser);
router.get('/:id', getUser);
router.get('/', allUsers);
router.post("/change-avatar", authMiddleWare, changeAvatar);
router.patch("/edit-user", authMiddleWare, editUser);

module.exports = router;