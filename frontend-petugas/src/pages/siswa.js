import React from "react"
import Navbar from "../component/Navbar"
import { base_url } from "../config"
import axios from "axios"
import SiswaList from "../component/SiswaList"
import $ from "jquery"

export default class Siswa extends React.Component{
    constructor(){
        super()
        this.state = {
            siswa: [],
            token: "",
            action: "",
            nisn: "",
            nis: "",
            nama: "",
            id_kelas: "",
            alamat: "",
            no_telp: "",
            id_spp: "",
            password: "",
            fillPassword: true
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
        this.headerConfig.bind(this)
    }

    //headerconfig
    headerConfig = () => {
        let header = {
            headers: {Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }

    //fungsi get
    getSiswa = () => {
        let url = base_url + "/siswa"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({siswa: response.data})
        })
        .catch(error => {
            if (error.response) {
                if (error.response.status) {
                    window.alert(error.response.data.message)
                    this.props.history.push("/login")
                }
            } else {
                console.log(error)
            }
        })
    }

    //componendidmount menjalankan setelah di render
    componentDidMount(){
        this.getSiswa()
    }

    //fungsi add
    Add = () => {
        $("#modal_product").modal("show")
        this.setState({
            action: "insert",
            nisn: "",
            nis: "",
            nama: "",
            id_kelas: "",
            alamat: "",
            no_telp: "",
            id_spp: "",
            password: "",
            fillPassword: true
        })
    }

    //fungsi edit
    Edit = selectionItem => {
        this.setState({
            action: "update",
            nisn: selectionItem.nisn,
            nis: selectionItem.nis,
            nama: selectionItem.nama,
            id_kelas: selectionItem.id_kelas,
            alamat: selectionItem.alamat,
            no_telp: selectionItem.no_telp,
            id_spp: selectionItem.id_spp,
            password: "",
            fillPassword: true
        })
    }

    //save
    saveSiswa = event => {
        event.preventDefault()
        $("#modal_product").modal("hide")
            let form = new FormData()
            form.append("nisn", this.state.nisn)
            form.append("nis", this.state.nis)
            form.append("nama", this.state.nama)
            form.append("id_kelas", this.state.id_kelas)
            form.append("alamat", this.state.alamat)
            form.append("no_telp", this.state.no_telp)
            form.append("id_spp", this.state.id_spp)
        if (this.state.fillPassword) {
            form.append("password", this.state.password)
        }
        let url = base_url + "/siswa"
        if (this.state.action === "insert") {
            axios.post(url, form, this.headerConfig())
            //berhasil
            .then(response => {
                window.alert(response.data.message)
                this.getSiswa()
            })
            //gagal
            .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            axios.put( url, form, this.headerConfig())
            //berhasil
            .then(response => {
                window.alert(response.data.message)
                this.getSiswa()
            })
            //gagal
            .catch(error => console.log(error))
        }
    }

    //drop data / deleted data
    dropSiswa = selectionItem => {
        if (window.confirm("are you sure delete this data?")) {
            let url = base_url + "/siswa/" + selectionItem.nisn
            axios.delete(url, this.headerConfig())
            //berhasil
            .then(response => {
                window.alert(response.data.message)
                this.getSiswa()
            })
            //gagal
            .catch(error => console.log(error))
        }
    }

    
    render(){
        return(
            <div>
                <Navbar/>
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Student</h3>
                    <div className="row">
                        { this.state.siswa.map( item => (
                            <SiswaList
                                nisn = {item.nisn}
                                nis = {item.nis}
                                nama = {item.nama}
                                id_kelas = {item.id_kelas}
                                alamat = {item.alamat}
                                no_telp = {item.no_telp}
                                id_spp = {item.id_spp}
                                onEdit = {() => this.Edit(item)}
                                onDrop = {() => this.dropSiswa(item)}
                            />
                        ))}
                    </div>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                        Add New
                    </button>
                </div>

                {/** modal product */}
                <div className="modal fade" id="modal_product">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h4>Form</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.saveSiswa(ev)}>
                                    NISN
                                    <input
                                        type="text" className="form-control mb-1"
                                        value={this.state.nisn}
                                        onChange = {ev => this.setState({nisn: ev.target.value})}
                                        required
                                    />
                                    NIS
                                    <input
                                        type="text" className="form-control mb-1"
                                        value={this.state.nis}
                                        onChange = {ev => this.setState({nis: ev.target.value})}
                                        required
                                    />
                                    NAMA
                                    <input
                                        type="text" className="form-control mb-1"
                                        value={this.state.nama}
                                        onChange = {ev => this.setState({nama: ev.target.value})}
                                        required
                                    />
                                    KELAS ID
                                    <input
                                        type="text" className="form-control mb-1"
                                        value={this.state.id_kelas}
                                        onChange = {ev => this.setState({id_kelas: ev.target.value})}
                                        required
                                    />
                                    ALAMAT
                                    <input
                                        type="text" className="form-control mb-1"
                                        value={this.state.alamat}
                                        onChange = {ev => this.setState({alamat: ev.target.value})}
                                        required
                                    />
                                    NO TELPON
                                    <input
                                        type="text" className="form-control mb-1"
                                        value={this.state.no_telp}
                                        onChange = {ev => this.setState({no_telp: ev.target.value})}
                                        required
                                    />
                                    SPP ID
                                    <input
                                        type="text" className="form-control mb-1"
                                        value={this.state.id_spp}
                                        onChange = {ev => this.setState({id_spp: ev.target.value})}
                                        required
                                    />

                                    { this.state.action === "update" && this.state.fillPassword === false ? (
                                        <button className="btn btn-sm btn-secondary mb-1 btn-block"
                                            onClick={() => this.setState({fillPassword: true})}>
                                            Change Password
                                        </button>
                                    ) : (
                                        <div>
                                            Password
                                            <input type="password" className="form-control mb-1"
                                            value={this.state.password}
                                            onChange={ev => this.setState({password: ev.target.value})}
                                            required
                                            />
                                        </div>
                                    ) }

                                    <button type="submit" className="btn btn-block btn-success">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}