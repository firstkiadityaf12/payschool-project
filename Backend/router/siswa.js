const express = require("express")
const models = require("../models/index")
const siswa = models.siswa
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//auth
const md5 = require("md5")
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "pembayaranspp"

//endpoint GET
app.get("/", auth, async (req, res) => {
    siswa.findAll()
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
app.get("/:id_siswa", auth, async (req, res) => {
    siswa.findOne({where: {id_siswa: req.params.id_siswa}})
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
    //tampunga data
    let data = {
        nisn: req.body.nisn,
        nis: req.body.nis,
        nama: req.body.nama,
        id_kelas: req.body.id_kelas,
        alamat: req.body.alamat,
        no_telp: req.body.no_telp,
        password: md5(req.body.password)
    }
    siswa.create(data)
    //behasil
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
    let parameter = {nisn: req.body.nisn}
    //tampung data update
    let data = {
        nis: req.body.nis,
        nama: req.body.nama,
        id_kelas: req.body.id_kelas,
        alamat: req.body.alamat,
        no_telp: req.body.no_telp
    }
    //if request password
    if (req.body.password) {
        data.password = md5(req.body.password)
    }

    siswa.update(data, {where: parameter})
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
app.delete("/:nisn", auth, async (req, res) => {
    siswa.destroy({where : {nisn: req.params.nisn}})
    //berhasil
    .then(result => {
        res.json({
            message: "data has been destroyed"
        })
    })
    //gagal
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint Login Siswa
app.post("/auth", async (req, res) => {
    let params = {
        nisn: req.body.username,
        password: md5(req.body.password)
    }
    let result = await siswa.findOne({where: params})
    if (result) {
        let payload = JSON.stringify(result)
        //generate token
        let token = jwt.sign(payload, SECRET_KEY)
        Response.JSON({
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

//module export
module.exports = app
