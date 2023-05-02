const mongoose = require("mongoose");
const toDoTaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateTill: {
        type: Date,
        required: false,
    },
});

module.exports = mongoose.model("toDoTaskSchema", toDoTaskSchema, "tasks-list");
