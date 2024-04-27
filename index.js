const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { title } = require("process");
const config = require("./config/config.json");
const {Sequelize, QueryTypes} = require("sequelize");
const sequelize = new Sequelize(config.development);

// setting variable global
app.set('view engine', 'hbs');
app.set("views", path.join(__dirname, "./views"))

app.use("/asset", express.static(path.join(__dirname, "./asset")))

app.use(express.urlencoded({ extended: false }))
//routing

app.get("/", home);
app.get("/detail", detail);
app.get("/addmyproject", addMyProject);
app.get("/edit/:id", editProject);
app.post("/detail", addetail);
app.get("/project/:id", project);
app.post("/delete/:id", deleteProject);
app.post("/edit-baru", editNew);

const data = []

// service
function home(req, res) {

    res.render("index")
}

async function detail(req, res) {

    const query = "SELECT * FROM tb_projects"
    const data = await sequelize.query(query, {type: QueryTypes.SELECT})

    res.render("detail", { data })
}

function addetail(req, res) {

    const { title, content, start, end, image } = req.body
    data.unshift({
        title,
        content,
        start,
        end,
        image: "https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400"
    })

    res.redirect("detail")
}

function project(req, res) {

    const { id } = req.params

    const data = {
        title: "hello",
        content: "hello bima",
        start: "12 agustus 2000",
        end: "13 agustus 2000",
        month: "1 bulan"

    }

    res.render("project", { data: data })
}

function addMyProject(req, res) {

    res.render("addmyproject")
}

function deleteProject(req, res) {
    const { id } = req.params;

    // console.log("id yg di delete", id);
    data.splice(id, 1)
    res.redirect("/detail")
}

function editProject(req, res) {
    const { id } = req.params;

    const selectedData = data[id];
    selectedData.id = id

    res.render("edit", { data: selectedData });
}

function editNew(req, res) {
    const { title, content, start, end, images, id } = req.body

    data[id] = {
        title,
        content,
        start,
        end,
        images

    }

    res.redirect("/detail")
}

app.listen(port, () => {
    console.log('example app listening on PORT:', port)
})