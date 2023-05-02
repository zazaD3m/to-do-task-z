const express = require("express");
const app = express();
const mongoose = require("mongoose");
const toDoTaskSchema = require("./models/to-do-task");
const cors = require("cors");
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to db");
    })
    .catch((err) => {
        console.log(err);
    });

app.get("/", async (req, res) => {
    try {
        const data = await toDoTaskSchema.find({});
        res.render("index.ejs", {
            todoTasks: data,
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

app.post("/", async (req, res) => {
    try {
        const data = req.body;
        const todoTask = new toDoTaskSchema({
            title: data.title,
            content: data.content,
        });
        await todoTask.save();
        res.send({ message: "added succesfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

app.delete("/api", async (req, res) => {
    try {
        const id = await req.body;
        await toDoTaskSchema.findByIdAndDelete(id);
        res.json({ message: "Delete request received succesfully!!!" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log(`Server is running on port${PORT}`);
});
