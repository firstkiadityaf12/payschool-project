import React from "react"
import Navbar from "../component/Navbar"
import { base_url } from "../config"
import axios from "axios"

export default class Pembayaran extends React.Component{
    constructor(){
        super()
    }
    
    render(){
        return(
            <div>
                <Navbar/>
                <h1>Ini Halaman Pembayaran</h1>
            </div>
        )
    }
}