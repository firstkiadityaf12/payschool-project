const express = require("express")
const models = require("../models/index")
const petugas = models.petugas
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//auth
const md5 = require("md5")

const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "pembayaranspp"

//endpoint GET
app.get("/", auth, async(req, res) => {
    petugas.findAll()
    //berhasil
    .then(result => {
        res.json({
            data: result
        })
    })
    //gagal
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint GET by ID
app.get("/:id_petugas", auth, async (req, res) => {
    petugas.findOne({ where: {id_petugas: req.params.id_petugas}})
    //berhasil
    .then(result => {
        res.json({
            data: result
        })
    })
    //gagal
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint POST
app.post("/", auth, async (req, res) => {
   //tampung data
    let data = {
        id_petugas: req.body.id_petugas,
        username: req.body.username,
        password: md5(req.body.password),
        nama_petugas: req.body.nama_petugas,
        level: req.body.level
    }
    petugas.create(data)
    //berhasil
    .then(result => {
        res.json({
            message: "data has been inserted",
            data: result
        })
    })
    //gagal
    .catch(error => {
        res.json({
            message: error.message
        })
    }) 
})

//endpoint UPDATE
app.put("/", auth, async (req, res) => {
    let parameter = {id_petugas: req.body.id_petugas}
    //tampung data update
    let data = {
        username: req.body.username,
        nama_petugas: req.body.nama_petugas,
        level: req.body.level
    }

    if (req.body.password) {
        data.password = md5(req.body.password)
    }
    petugas.update(data, {where: parameter})
    //berhasil
    .then(result => {
        res.json({
            message: "data has been update",
            data: result
        })
    })
    //gagal
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint DELETE
app.delete("/:id_petugas", auth, async (req, res) => {
    let param = {id_petugas: req.params.id_petugas}
    petugas.destroy({where: param})
    //berhasil
    .then(result => {
        res.json({
            message : "data has been destroyed",
            data: result
        })
    })
    //gagal
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

// endpoint POST Login petugas
app.post("/auth", async (req, res) => {
    let params = {
        username: req.body.username,
        password: md5(req.body.password)
    }
    let result = await petugas.findOne({where: params})
    if (result) {
        let payload = JSON.stringify(result)
        //generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    } else {
        res.json({
            logged: false,
            message: "Invalid Username or Password"
        })
    }
})

//export 
module.exports = app