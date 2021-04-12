import React from "react"
import Navbar from "../component/Navbar"
import { base_url } from "../config"
import axios from "axios"
import $ from "jquery"

export default class Pembayaran extends React.Component{
    constructor(){
        super()
        this.state = {
            pembayaran: [],
            id_pembayaran: "",
            id_petugas: "",
            nisn: "",
            tgl_bayar: "",
            id_spp: "",
            jumlah_bayar: ""
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
            headers: { Authorization: `Bearer ${this.state.token}`}
        }
        return header
    }

    //get pembayaran
    getPembayaran = () => {
        let url = base_url + "/pembayaran"
        axios.get(url, this.headerConfig())
        .then(response => {
            this.setState({pembayaran: response.data.data})
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
        this.getPembayaran()
    }

    //add
    Add = () => {
        $("modal_pembayaran").modal("show")
        this.setState({
            action: "insert",
            id_pembayaran: 0,
            id_petugas: "",
            nisn: "",
            tgl_bayar: "",
            id_spp: "",
            jumlah_bayar: ""
        })
    }

    //edit

    //save

    //delete
    
    render(){
        return(
            <div>
                <Navbar/>
                <h1>Ini Halaman Pembayaran</h1>
            </div>
        )
    }
}