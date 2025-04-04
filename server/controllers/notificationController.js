const path = require("path")
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const { notificationError } = require(path.join(__dirname, "..", "utils", "customError.js"))
const Notification = require(path.join(__dirname, "..", "models", "notificationModel.js"))
const getMyNotifications = async (req, res) => {
    const { page, limit, category } = req.query;
    const skip = (page - 1) * limit;
    try{
        const notifications = await Notification.find({ user: req.user._id, category : category })
        .populate("actor", "picture bio username")
        .populate("referenceId",  category == "profile" ? "picture bio username" : "title") // Populate user or story details
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        console.log(notifications.length, page)
        const storyNotificationCount = await Notification.countDocuments({ user: req.user._id, category : "story" })
        const profileNotificationCount = await Notification.countDocuments({user: req.user._id, category : "profile"})
        res.status(200).json({
            "message" : "Successfully Retreived Notifications",
            notifications : notifications,
            storyNotificationCount : storyNotificationCount,
            profileNotificationCount: profileNotificationCount,
            currentNotificationCount: category == "story" ? storyNotificationCount : profileNotificationCount
             
            })            


    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "getMyNotificationsError.txt", "notificationError")
        if(error instanceof notificationError){
            return res.status(error.statusCode).json({ message : error.message})
        }else{
            return res.status(500).json({message : "Internal Server Error"})
        }
    }
}
module.exports = { getMyNotifications }