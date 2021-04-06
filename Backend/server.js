const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())

//import router
const kelas = require("./router/kelas")
const pembayaran = require("./router/pembayaran")
const spp = require("./router/spp")
const petugas = require("./router/petugas")
const siswa = require("./router/siswa")

//app.use
app.use("/payschool/spp/v1/kelas", kelas)
app.use("/payschool/spp/v1/pembayaran", pembayaran)
app.use("/payschool/spp/v1/spp", spp)
app.use("/payschool/spp/v1/petugas", petugas)
app.use("/payschool/spp/v1/siswa", siswa)

//app.use(express.static(__dirname))

//app.listen
app.listen(8080, () => {
    console.log("Server run on port 8080")
})
