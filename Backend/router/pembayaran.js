const express = require("express")
const models = require("../models/index")
const pembayaran = models.pembayaran
const app = express()

//auth
const auth = require("../auth")
app.use(auth)

//json
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//endpoint GET by User CLIENT


//endpoint GET
app.get("/", (req, res) => {
    pembayaran.findAll()
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

//endpoint GET by ID
app.get("/:id_pembayaran", async (req, res) => {
    let parameter = {id_pembayaran: req.params.id_pembayaran}
    pembayaran.findOne({where: parameter})
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
    //tampung data
    let data = {
        id_pembayaran: req.body.id_pembayaran,
        id_petugas: req.body.id_petugas,
        nisn: req.body.nisn,
        tgl_bayar: new Date().toISOString().split('T')[0],
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar
    }
    pembayaran.create(data)
    //true
    .then(result => {
        res.json({
            message: "data has been inserted",
            data: result
        })
    })
    //false
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint UPDATE
app.put("/", async (req, res) => {
    // id yang mau dirubah
    let parameter = {id_pembayaran: req.body.id_pembayaran}
    //menampung data
    let data = {
        id_petugas: req.body.id_petugas,
        nisn: req.body.nisn,
        tgl_bayar: req.body.tgl_bayar,
        id_spp: req.body.id_spp,
        jumlah_bayar: req.body.jumlah_bayar
    }
    pembayaran.update(data, {where: parameter})
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
app.delete("/:id_pembayaran", async (req, res) => {
    let parameter = {id_pembayaran: req.params.id_pembayaran}
    pembayaran.destroy({where: parameter})
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

//export
module.exports = app
