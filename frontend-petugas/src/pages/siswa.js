//import React from "react"
import Navbar from "../component/Navbar"
import { base_url } from "../config"
import axios from "axios"
import $ from "jquery"

// export default class Siswa extends React.Component{
//     constructor(){
//         super()
//         this.state = {
//             siswa: [],
//             token: '',
//             action: '',
//             nisn: '',
//             nis: '',
//             nama: '',
//             id_kelas: '',
//             alamat: '',
//             no_telp: '',
//             id_spp: '',
//             password: '',
//             fillPassword: true
//         }
//         if (localStorage.getItem("token")) {
//             this.state.token = localStorage.getItem("token")
//         } else {
//             window.location = '/login'
//         }
//         this.headerConfig.bind(this)
//     }

//     //headerconfig
//     headerConfig = () => {
//         let header = {
//             headers: {Authorization: `Bearer ${this.state.token}`}
//         }
//         return header
//     }

//     //getsiswa
//     getSiswa = () => {
//         let url = base_url + "/siswa"
//         axios.get(url, this.headerConfig())
//         //berhasil
//         .then(response => {
//             this.setState(response.data)
//         })
//         //gagal
//         .catch(error => {
//             if (error.response) {
//                 if (error.response.status) {
//                     window.alert(error.response.data.message)
//                     this.props.history.push("/login")
//                 }
//             } else {
//                 console.log(error);
//             }
//         })
//     }

//     //component di mount
//     componentDidMount(){
//         this.getSiswa()
//     }

//     //add siswa
//     Add = () => {
//         $("#modal_siswa").modal("show")
//         this.setState({
//             action: "insert",
//             nisn: "",
//             nis: "",
//             nama: "",
//             id_kelas: "",
//             alamat: "",
//             no_telp: "",
//             id_spp: "",
//             password: "",
//             fillPassword: true
//         })
//     }

//     //delete siswa
//     DropSiswa = selectionItem => {
//         if (window.confirm("are you sure to delete?")) {
//             let url = base_url + "/siswa/" + selectionItem
//             axios.delete(url, this.headerConfig())
//             .then(response => {
//                 window.alert(response.data.message)
//                 this.getSiswa()
//             })
//             .catch(error => {console.log(error)})
//         }
//     }

//     //edit siswa
//     Edit = selectionItem => {
//         $("#modal_siswa").modal("show")
//         this.setState({
//             action: "update",
//             nisn: selectionItem.nisn,
//             nis: selectionItem.nis,
//             nama: selectionItem.nama,
//             id_kelas: selectionItem.id_kelas,
//             alamat: selectionItem.alamat,
//             no_telp: selectionItem.no_telp,
//             id_spp: selectionItem.id_spp,
//         })
//     }

//     //save
//     saveSiswa = event => {
//         event.preventDefault()
//         $("#modal_siswa").modal("hide")
//         let form = {
//             nis: this.state.nis,
//             nama: this.state.nama,
//             id_kelas: this.state.id_kelas,
//             alamat: this.state.alamat,
//             no_telp: this.state.no_telp,
//             id_spp: this.state.id_spp
//         }

//         let url = base_url + "/siswa"
//         if (this.state.action === "insert") {
//             axios.post(url, form, this.headerConfig())
//             //berhasil
//             .then(response => {
//                 window.alert(response.data.message)
//                 this.getSiswa()
//             })
//             //gagal
//             .catch(error => console.log(error))
//         } else if(this.state.action === "update"){
//             axios.put(url, form, this.headerConfig())
//             //true
//             .then(response => {
//                 window.alert(response.data.message)
//                 this.getSiswa()
//             })
//             //false
//             .catch(error => console.log(error))
//         }
//     }

//     render(){
//         return(
//             <div>
//                 <Navbar/>
//                 <div className="container">
//                     <h3 className="text-bold text-dark mt-2">Daftar Siswa</h3>
//                     <div className="row">
//                         <table className="table table-bordered table-hover text-center">
//                             <thead>
//                                 <tr>
//                                     <th>NISN</th>
//                                     <th>NIS</th>
//                                     <th>NAMA</th>
//                                     <th>ID KELAS</th>
//                                     <th>ALAMAT</th>
//                                     <th>NO TELP</th>
//                                     <th>ID SPP</th>
//                                     <th>ACTION</th>
//                                 </tr>
//                             </thead>
//                             { this.state.siswa.map( item => (
//                                 <tbody>
//                                     <tr>
//                                         <td>{item.nisn}</td>
//                                         <td>{item.nis}</td>
//                                         <td>{item.nama}</td>
//                                         <td>{item.id_kelas}</td>
//                                         <td>{item.alamat}</td>
//                                         <td>{item.no_telp}</td>
//                                         <td>{item.id_spp}</td>
//                                         <td>
//                                             <div class="btn-group btn-group-toggle">
//                                                 <label class="btn btn-warning" onClick={() => this.Edit(item)}>
//                                                     Edit
//                                                 </label>
//                                                 <label class="btn btn-danger" onClick={() => this.DropSiswa(item)}>
//                                                     Hapus
//                                                 </label>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 </tbody>
//                             ))}
//                         </table>
//                     </div>
//                         <button className="btn btn-primary" onClick={() => this.Add()}>
//                             Tambah Siswa
//                         </button>
//                 </div>
                
//                 {/* modal siswa */}
//                 <div className="modal fade" id="modal_siswa">
//                      <div className="modal-dialog">
//                          <div className="modal-content">
//                              <div className="modal-header">
//                                  <h4>Form Siswa</h4>
//                              </div>
//                              <div className="modal-body">
//                                  <form onSubmit={ev => this.saveSiswa(ev)}>
//                                      NIS
//                                      <input type="text" className="form-control mb-1"
//                                      value={this.state.nis}
//                                      onChange={ev => this.setState({nis: ev.target.value})}
//                                      required
//                                      />
//                                      Nama
//                                      <input type="text" className="form-control mb-1"
//                                      value={this.state.nama}
//                                      onChange={ev => this.setState({nama: ev.target.value})}
//                                      required
//                                      />
//                                      ID Kelas
//                                      <input type="text" className="form-control mb-1"
//                                      value={this.state.id_kelas}
//                                      onChange={ev => this.setState({id_kelas: ev.target.value})}
//                                      required placeholder="1 - 9"
//                                      />
//                                      Alamat
//                                      <input type="text" className="form-control mb-1"
//                                      value={this.state.alamat}
//                                      onChange={ev => this.setState({alamat: ev.target.value})}
//                                      required
//                                      />
//                                      No Telp
//                                      <input type="text" className="form-control mb-1"
//                                      value={this.state.no_telp}
//                                      onChange={ev => this.setState({no_telp: ev.target.value})}
//                                      required
//                                      />
//                                      ID SPP
//                                      <input type="text" className="form-control mb-1"
//                                      value={this.state.id_spp}
//                                      onChange={ev => this.setState({id_spp: ev.target.value})}
//                                      required placeholder="2-5"
//                                      />
//                                     <button type="submit" className="btn btn-block btn-dark">
//                                         Simpan
//                                     </button>
//                                  </form>
//                              </div>
//                          </div>
//                      </div>
//                  </div>
//             </div>
//         )
//     }
// }
import React, {Component} from "react"

export default class Siswa extends Component {
    constructor() {
      super()
      this.state = {
        siswa: [],
        token: '',
        action: '',
        nisn: '',
        nis: '',
        nama: '',
        password: '',
        id_kelas: 0,
        alamat: '',
        no_telp: '',
        id_spp: 0,
        fillPassword: true,
      }
      if (localStorage.getItem("token")) {
        this.state.token = localStorage.getItem("token")
      } else {
        window.location = '/login'
      }
      this.headerConfig.bind(this)
    }
  
    headerConfig = () => {
      let header = {
        headers: { Authorization: `Bearer ${this.state.token}` }
      }
      return header
    }
  
    getSiswa = () => {
      let url = base_url + "/siswa"
      axios.get(url, this.headerConfig())
        .then(response => {
          this.setState({siswa: response.data.data})
          console.log("pesan : ", response.data.data)
        })
  
        .catch(error => {
          if (error.response) {
            if (error.response.status) {
              window.alert = error.response.data.message
              this.props.history.push("/login")
            }
          } else {
            console.log(error)
          }
        })
    }
  
    componentDidMount() {
      this.getSiswa()
    }
  
    Add = () => {
      $("#modal_siswa").modal('show')
      this.setState({
        action: 'insert',
        nisn: '',
        nis: '',
        nama: '',
        password: '',
        id_kelas: 0,
        alamat: '',
        no_telp: '',
        id_spp: 0,
        fillPassword: true,
      })
    }
  
    Edit = (selectedItem) => {
      $("#modal_siswa").modal('show')
      this.setState ({
        action: 'update',
        nisn: selectedItem.nisn,
        nis: selectedItem.nis,
        nama: selectedItem.nama,
        password: selectedItem.password,
        id_kelas: selectedItem.id_kelas,
        alamat: selectedItem.alamat,
        no_telp: selectedItem.no_telp,
        id_spp: selectedItem.id_spp,
        fillPassword: false,
      })
    }
  
    saveSiswa = (ev) => {
      ev.preventDefault()
      $("#modal_siswa").modal('hide')
      let form = {
        nisn: this.state.nisn,
        nis: this.state.nis,
        nama: this.state.nama,
        id_kelas: this.state.id_kelas,
        alamat: this.state.alamat,
        no_telp: this.state.no_telp,
        id_spp: this.state.id_spp,
      }
      if(this.state.password){
        form.password = this.state.password
    }
      let url = base_url + "/siswa"
      if (this.state.action === "insert") {
        axios.post(url, form, this.headerConfig())
          .then(response => {
            window.alert(response.data.message)
            this.getSiswa()
          })
          .catch(error => console.log(error))
      } else if (this.state.action === 'update') {
        axios.put(url, form, this.headerConfig())
          .then(response => {
            window.alert(response.data.message)
            this.getSiswa()
          })
          .catch(error => console.log(error))
      }
    }
  
    dropSiswa = (selectedItem) => {
      if(window.confirm("are you sure will delete this item?")){
        let url = base_url + "/siswa/" + selectedItem.id_siswa
        axios.delete(url, this.headerConfig())
        .then(response => {
          window.alert (response.data.message)
          this.getSiswa()
        })
        .catch(error => console.log(error))
      }
    }
  
    render() {
      return (
        <div>
          <Navbar />
          <div className="container">
            <h3 className="text-bold text-info mt-2">Siswa List</h3>
            <table className="table table-bordered">
              <thead className="bg-info">
                <tr>
                  <td>#</td>
                  <td>NISN</td>
                  <td>NIS</td>
                  <td>Nama</td>
                  <td>Alamat</td>
                  <td>No Telp</td>
                  <td>Option</td>
                </tr>
              </thead>
              <tbody>
                {this.state.siswa.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.nisn}</td>
                    <td>{item.nis}</td>
                    <td>{item.nama} </td>
                    <td>{item.alamat}</td>
                    <td>{item.no_telp}</td>
                    <td>
                      <button className="btn btn-sm btn-success m-1" data-toggle="modal"
                      data-target={`#modalDetail${item.nisn}`}>
                        Details
                      </button>
                      <button className="btn btn-sm btn-info m-1"
                        onClick={() => this.Edit(item)}>
                        Edit
                      </button>
                      <button className="btn btn-sm btn-danger m-1"
                        onClick={() => this.dropSiswa(item)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-success"
              onClick={() => this.Add()}>
              Tambah Siswa
                </button>
            {/* Modal Siswa */}
            <div className="modal fade" id="modal_siswa">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header bg-info text-white">
                    <h4>Form Siswa</h4>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={ev => this.saveSiswa(ev)}>
                      NISN
                      {this.state.action === 'update' ? (
                      <input type="text" className="form-control mb-1"
                        value={this.state.nisn}
                        onChange={ev => this.setState({ nisn: ev.target.value })}
                        disabled
                      />
                      ):(null)}
                      {this.state.action === 'insert' ? (
                      <input type="text" className="form-control mb-1"
                        value={this.state.nisn}
                        onChange={ev => this.setState({ nisn: ev.target.value })}
                        required
                      />
                      ):(null)}
                      NIS
                      <input type="text" className="form-control mb-1"
                        value={this.state.nis}
                        onChange={ev => this.setState({ nis: ev.target.value })}
                      />
                      Nama
                      <input type="text" className="form-control mb-1"
                        value={this.state.nama}
                        onChange={ev => this.setState({ nama: ev.target.value })}
                        required />
                      {this.state.action === "update" && this.state.fillPassword === false ? (
                          <button className="btn btn-sm btn-secondary mb-1 btn-block"
                          onClick={()=>this.setState({fillPassword: true})}>
                            Change Password
                          </button>
                      ) : (
                          <div>
                              Password
                              <input type="password" className="form-control mb-1"
                              value={this.state.password}
                              onChange={ev => this.setState({password: ev.target.value})}
                              required/>
                          </div>
                      )}
                      ID Kelas
                      <input type="number" className="form-control mb-1"
                        value={this.state.id_kelas}
                        onChange={ev => this.setState({ id_kelas: ev.target.value })}
                        required />
                      Alamat
                      <input type="text" className="form-control mb-1"
                        value={this.state.alamat}
                        onChange={ev => this.setState({ alamat: ev.target.value })}
                        required />
                      No Telp
                      <input type="text" className="form-control mb-1"
                        value={this.state.no_telp}
                        onChange={ev => this.setState({ no_telp: ev.target.value })}
                        required />
                      ID Spp
                      <input type="text" className="form-control mb-1"
                        value={this.state.id_spp}
                        onChange={ev => this.setState({ id_spp: ev.target.value })}
                        required />
                      <button type="submit" className="btn btn-block btn-success">
                        Simpan
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.state.siswa.map((item, index) => (
            <div className="modal fade" id={`modalDetail${item.nisn}`}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header bg-success text-white">
                  <h5>Detail of Siswa</h5>
                </div>
                <div className="modal-body">
                  <h5>Siswa:{item.nama} </h5>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>ID Kelas</th>
                        <th>Kelas</th>
                        <th>ID Spp</th>
                        <th>Nominal Spp</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr key={item.key}>
                          <td>{item.username}</td>
                          <td>{item.password}</td>
                          <td>{item.id_kelas}</td>
                          <td>{item.id_spp}</td>
                        </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          ))}
          
        </div>
      )
    }
  }