const express = require("express");
const app = express();
const expressSession = require("express-session");
const router = require("./api/appRouting");

const session = expressSession({
    secret: "super secrettttt",
    saveUninitialized: true,
    resave: true,
});

app.use(express.json());
app.use(session);
app.use("/", router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is listening at port " + port);
});
