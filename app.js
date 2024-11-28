const app = require("express")()
const fs = require("fs")
app.get("/", (req,res) => {
    res.json("This is webhook version for webhook")
})
app.get("/read", (req,res) => {
    console.log("Reading file contents")
    let d = fs.readFileSync("/mnt/myfilte.txt",'utf-8')
    console.log(d);
    return res.json("This is webhook version for webhook")
})
app.listen(3000, () => {
    console.log(`Server started at 3000...`);
})