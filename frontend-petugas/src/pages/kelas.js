import React from "react"
import Navbar from "../component/Navbar"

export default class Kelas extends React.Component{
    constructor(){
        super()
    }
    
    render(){
        return(
            <div>
                <Navbar/>
                <h1>Ini Halaman Kelas</h1>
            </div>
        )
    }
}
