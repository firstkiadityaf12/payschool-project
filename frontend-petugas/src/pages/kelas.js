import React from "react"
import Navbar from "../component/Navbar"
import { base_url } from "../config"
import axios from "axios"

export default class Kelas extends React.Component{
    constructor(){
        super()
        this.state = {
            kelas: [],
            id_kelas: "",
            nama_kelas: "",
            kompetensi_keahlian: "",
            token: "",
            action: ""
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
        } else {
            window.location = "/login"
        }
    }

    //headerconfig
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }

    //get kelas
    getKelas = () => {
        let url = base_url + "/kelas"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({kelas: response.data.data})
            console.log(response.data.data)
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

    //componentdidmount
    componentDidMount(){
        this.getKelas
    }

    //add
    Add = () => {
        $("#modal_kelas").modal("show")
        this.setState({
            action: "insert",
            id_kelas: 0,
            nama_kelas: "",
            kompetensi_keahlian: ""
        })
    }

    Edit = selectionItem => {
        $("modal_kelas").modal(show)
        this.setState({
            action: "update",
            id_kelas: selectionItem.id_kelas,
            nama_kelas: selectionItem.nama_kelas,
            kompetensi_keahlian: selectionItem.kompetensi_keahlian
        })
    }
    
    render(){
        return(
            <div>
                <Navbar/>
                <div className="container">
                    <h3 className="text-bold text-info mt-2">KELAS</h3>
                    <table className="table table-bordered">
                        <thead className="bg-info">
                            <tr>
                                <th>ID KELAS</th>
                                <th>NAMA KELAS</th>
                                <th>KEAHLIAN</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.kelas.map(item => 
                                <tr>
                                    <td>{item.id_kelas}</td>
                                    <td>{item.nama_kelas}</td>
                                    <td>{item.kompetensi_keahlian}</td>
                                    <td>
                                        <button className="btn btn-sm btn-warning m-1">
                                            Edit
                                        </button>
                                        <button className="btn btn-sm btn-danger m-1">
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <button className="btn btn-success">
                        Tambah Kelas
                    </button>
                </div>
            </div>
        )
    }
}

