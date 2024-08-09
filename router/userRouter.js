const router = require(`express`).Router()
const { createStaff, getAllStaff, getOneStaff, updateStaffInfo, replaceOneStaff, TimeIn, TimeOut, getTimeIn, getTimeOut } = require("../controller/userController")
const staffValidator = require(`../controller/validator`)
router.post(`/newstaff`, staffValidator(true), createStaff)
router.get(`/getallstaff`, getAllStaff)
router.get(`/getonestaff/:id`, getOneStaff)
router.put(`/updatestaffinfo/:id`, staffValidator(false), updateStaffInfo)
router.put(`/replacestaff/:id`, staffValidator(true), replaceOneStaff)
router.post(`/timein`, TimeIn)
router.post(`/timeout`, TimeOut)
router.get(`/checktimein/:id`, getTimeIn)
router.get(`/checktimeout/:id`, getTimeOut)

module.exports = router