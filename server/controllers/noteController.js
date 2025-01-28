const path = require("path");
const { logEvents } = require(path.join(__dirname, "..", "middlewares", "logEvents.js"))
const Note = require(path.join(__dirname, "models", "noteModel"))
const User = require(path.join(__dirname, "models", "userModel"))
const Admin = require(path.join(__dirname, "models", "adminModel"))
const {  userError } = require("../utils/customError");
const validateMongoDbId = require(path.join(__dirname, "..", "utils", "validateMongoDBId.js"))
const createNote = async (req, res) => {
    const { author, title, content } = req.body;
try{
    if(!author || !title || !content){
        throw new userError("Please Fill In All The Fields", 400)
    }
    const newNote = {
        author, 
        title, 
        content
    }
    const note = await Note.create(newNote)
      switch (req.user.role) {
            case "user":
                await User.createNote(req.user._id, note._id);
                break;
            case "admin":
                await Admin.createNote(req.user._id, note._id);
        }
    res.status(200).json({ message: "Creation of Note Was Successful", note: note });
}
catch(error){
    console.log(error)
    logEvents(`${error.name}: ${error.message}`, "createNoteError.txt", "noteError")
    if (error instanceof userError) {
        return  res.status(error.statusCode).json({ message : error.message})
    }
     else{
        return res.status(500).json({error : "Internal Server Error"})
        }
}
}
const readNote = async (req, res) => {
    const { id } = req.params;
    try{
        if(!validateMongoDbId(id)){
            throw new userError("Pls enter a parameter recognized by the database", 400)
                }
                const foundNote = await Note.findById(id);
                if(!foundNote){
                    throw new userError("This Note Does Not Exist", 404)
                }           
    res.status(200).json({ message: "Reading of Note Was Successful", note: foundNote });

    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "readNoteError.txt", "noteError")
        if (error instanceof userError) {
            return  res.status(error.statusCode).json({ message : error.message})
        }
         else{
            return res.status(500).json({error : "Internal Server Error"})
            }
    }
    }

const updateNote = async (req, res) => {
    const { id } = req.params;
    try{
        if(!validateMongoDbId(id)){
            throw new userError("Pls enter a parameter recognized by the database", 400)
                }
const updatedNote = await Note.findByIdAndUpdate(id, req.body, {new : true});
if(!updatedNote){
    throw new userError("The Note You Want To Update Does Not Exist", 404)
}
res.status(201).json({ message: "Updating of Note Was Successful", note: updatedNote });

    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "updateNoteError.txt", "noteError")
        if (error instanceof userError) {
            return  res.status(error.statusCode).json({ message : error.message})
        }
         else{
            return res.status(500).json({error : "Internal Server Error"})
            }
    }
}
const deleteNote = async (req, res) => {
    const { id } = req.params;
    try{
        if(!validateMongoDbId(id)){
            throw new userError("Pls enter a parameter recognized by the database", 400)
                }
                const deletedNote = await Note.findOneAndDelete({_id : id});
if(!deletedNote){
    throw new userError("This Note Does Not Exist", 404)
}
switch (req.user.role) {
    case "user":
        await User.deleteNote(req.user._id, id);
        break;
    case "admin":
        await Admin.deleteNote(req.user._id, id);
}
res.status(200).json({ message: "Deletion of Note Was Successful", note: deletedNote });
    }
    catch(error){
        console.log(error)
        logEvents(`${error.name}: ${error.message}`, "deleteNoteError.txt", "noteError")
        if (error instanceof userError) {
            return  res.status(error.statusCode).json({ message : error.message})
        }
         else{
            return res.status(500).json({error : "Internal Server Error"})
            }
    }
}
const downloadNote = async (req, res) => {

}
module.exports ={
    createNote,
    readNote,
    updateNote, 
    deleteNote
}