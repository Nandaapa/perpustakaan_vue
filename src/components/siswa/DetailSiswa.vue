<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Detail</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="m-0">Detail Anggota</h4>
                                </div>
                                <div class="card-body text-justify">
                                    <h5 class="mb-3">{{nama_siswa}}</h5>

                                    <h6>Tanggal Lahir</h6>
                                    <input type="date" class="form-control" v-model="tanggal_lahir" id="tgl_lahir">

                                    <h6>Jenis Kelamin</h6>
                                    <p class="card-text">{{gender}}</p>

                                    <h6>Alamat</h6>
                                    <p class="card-text">{{alamat}}</p>

                                    <h6>Kelas</h6>
                                    
                                    <select v-model="id_kelas" id="kelas" class="form-control">
                                    <option v-for="k in kelas" :key="k.id_kelas" :value="k.id_kelas">{{ k.nama_kelas }}</option>
                                        </select>

                                    <router-link class="btn btn-primary" to="/siswa">Kembali</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Vue from 'vue';
import axios from 'axios';

Vue.use(axios);

import Navbars from "../template/UserNavbars.vue";
import Sidebars from "../template/UserSidebars.vue";

export default {

    data: function (){
        return{
                siswa: [],
                    id: "",
                    id_kelas: "",
                    nama_siswa: "",
                    tanggal_lahir: "",
                    gender: "",
                    alamat: "",
                kelas: {},
        }
   },
    methods: {
        GetSiswa (){
            axios.get('http://127.0.0.1:8000/api/getsiswa')
            .then(
                ({data}) => {
                    this.siswa = data
                }
            );
        },
        DataKelas(){
            axios.get('http://127.0.0.1:8000/api/getkelas')
            .then(
            ({data}) => {
                this.kelas = data
            }
        );
        },
        getdetail(id){
            axios.get('http://127.0.0.1:8000/api/getsiswaid/' + id)
            .then((response) => {
                console.log(response.data[0])
                this.id = response.data[0].id
                this.id_kelas = response.data[0].id_kelas
                this.nama_siswa = response.data[0].nama_siswa
                this.tanggal_lahir = response.data[0].tanggal_lahir
                this.gender = response.data[0].gender
                this.alamat = response.data[0].alamat
            })
        },
    },
    mounted(){
    this.GetSiswa(),
    this.getdetail(this.$route.params.id),
    this.DataKelas()
   },

    components: {
            'navbar-component': Navbars,
            'sidebar-component': Sidebars,
        }
    }

</script> --> 