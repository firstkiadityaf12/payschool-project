import React from "react"
import Navbar from "../component/Navbar"

export default class Siswa extends React.Component{
    constructor(){
        super()
    }
    
    render(){
        return(
            <div>
                <Navbar/>
                <h1>Ini Halaman Siswa</h1>
            </div>
        )
    }
}