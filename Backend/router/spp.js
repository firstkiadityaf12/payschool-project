const express = require("express")
const models = require("../models/index")
const spp = models.spp
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//auth
const auth = require("../auth")
app.use(auth)

//endpoint GET
app.get("/", async (req, res) => {
    spp.findAll()
    //berhasil
    .then(result => {
        res.json({
            data: result
        })
    })
    //gagal
    .catch(error => {
        res.json({message: error.message})
    })
})

//endpoint GET by ID
app.get("/:id_spp", async (req, res) => {
    let parameter = {id_spp: req.params.id_spp}
    spp.findOne({where: parameter})
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
app.post("/", async (req, res) => {
    //data yang ditampung
    let data = {
        id_spp: req.body.id_spp,
        tahun: req.body.tahun,
        nominal: req.body.nominal
    }
    spp.create(data)
    //berhasil
    .then(result => {
        res.json({
            message: "data has been inserted",
            data: result
        })
    })
    //gagal
    .catch(error => {
        res.json({message: error.message})
    })
})

//endpoint UPDATE
app.put("/", async (req, res) => {
    let parameter = {id_spp: req.body.id_spp}
    //tampungan data yang dirubah
    let data = {
        tahun: req.body.tahun,
        nominal: req.body.nominal
    }
    spp.update(data, {where: parameter})
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
app.delete("/:id_spp", async (req, res) => {
    let id_spp = req.params.id_spp
    let parameter = {id_spp: id_spp}
    spp.destroy({where: parameter})
    //berhasil
    .then(result => {
        res.json({message: "data has been destroyed"})
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
