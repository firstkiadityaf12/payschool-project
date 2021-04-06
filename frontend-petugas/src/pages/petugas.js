import React from "react"
import Navbar from "../component/Navbar"

export default class Petugas extends React.Component{
    constructor(){
        super()
    }
    
    render(){
        return(
            <div>
                <Navbar/>
                <h1>Ini Halaman Petugasn</h1>
            </div>
        )
    }
}
