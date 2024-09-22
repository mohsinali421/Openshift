const app = require("express")()
app.get("/", (req,res) => {
    res.json("This is webhook version 4")
})
app.listen(3000, () => {
    console.log(`Server started at 3000...`);
})