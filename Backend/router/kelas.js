const express = require("express")
const models = require("../models/index")
const kelas = models.kelas
const app = express()

//auth
const auth = require("../auth")
//with auth
app.use(auth)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//endpoint GET
app.get("/", (req, res) => {
    kelas.findAll()
    .then(result => {
        res.json({
            data: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint POST
app.post("/", async (req, res) => {
    //tampung data
    let data= {
        id_kelas: req.body.id_kelas,
        nama_kelas: req.body.nama_kelas,
        kompetensi_keahlian: req.body.kompetensi_keahlian
    }
    kelas.create(data)
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
app.put("/", async (req, res) => {
    //id / data yang dirubah
    let paramater = {id_kelas : req.body.id_kelas}
    //menampung daata 
    let data = {
        nama_kelas: req.body.nama_kelas,
        kompetensi_keahlian: req.body.kompetensi_keahlian
    }
    kelas.update(data, {where : paramater})
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
app.delete("/:id_kelas", async (req, res) => {
    let id_kelas = req.params.id_kelas
    let paramater = {
        id_kelas: id_kelas
    } 
    kelas.destroy({where: paramater})
    //berhasil
    .then(result => {
        res.json({
            message: "data has been deleted",
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

//export
module.exports = app
