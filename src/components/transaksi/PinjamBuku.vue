<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component active="active"></sidebar-component>
        <div class="content-wrapper">            
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Data Pinjam Buku</h1>
                        </div>          
                    </div>
                </div>
            </div>
 
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-10">
                            <div class="card card-primary card-outline">
                                <div class="card-body">
                                    <router-link class="btn btn-info mb-2" to="pinjambuku/CreatePinjam">
                                        <i class="fas fa-plus"></i> Tambah
                                    </router-link>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                            <th style="width: 10px">ID  </th>
                                            <th>Nama siswa</th>
                                            <th>Judul</th>
                                            <th>Tanggal Pinjam</th>
                                            <th>Tanggal kembali</th>
                                            <th>Status</th>
                                            <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(p, index) in result" :key="p.id_peminjaman">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ p.nama_siswa }}</td>
                                                <td>{{ p.judul }}</td>
                                                <td>{{ p.tgl_pinjam }}</td>
                                                <td>{{ p.tgl_kembali }}</td>
                                                <td>
                                                    <span v-if="p.status == 'kembali'" class="badge bg-success">Kembali</span>
                                                    <span v-else class="badge bg-danger">Dipinjam</span>
                                                </td>

                                                <td>
                                                    <div class="btn-group">
                                                        <router-link class="btn btn-success" :to="{ name : 'detailpinjam' , params : { id : p.id } }">Detail</router-link>                                                        
                                                        <router-link class="btn btn-warning" :to="{ name : 'editpinjam' , params : { id : p.id } }">Edit</router-link>  
                                                        <button type="button" class="btn btn-danger" @click="remove(p)"> Hapus </button>                                                 
                                                    </div>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
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
import swal from 'sweetalert';

Vue.use(axios);

import Navbars from "../template/UserNavbars.vue";
import Sidebars from "../template/UserSidebars.vue";

export default {
    data() {
        return {
            peminjaman : {},
            result: {},
            siswa: {},
            kelas: {},
            buku: {},
        }
    },
    created() {
        this.userLoad();
    },
    methods: {
        userLoad() {
            var page = "http://localhost:8000/api/getpinjam";
            axios.get(page).then(
                ({ data }) => {
                    console.log(data);
                    this.result = data;
                }
            );

            },
            remove(p) {
                swal({
                title: "Hapus Data ?",
                text: "Data ini akan terhapus secara otomatis",
                icon: "warning",
                buttons : true,
                dangerMode: true,
            })
            
                .then((willDelete) => {
                    if (willDelete) {
                        var url = 'http://localhost:8000/api/deletepinjam/' + p.id_peminjaman;
            axios.delete(url);
            
                        swal("Data berhasil dihapus", {
                            icon: "success",
                            buttons : false
                        });
                        setTimeout(() => {
                            window.location.reload()
                        }, 1200);
                    }else{
                        swal("gagal menghapus data", {
                            icon: 'success'
                        })
                    }
                });
                
                this.$router.push('/pinjambuku');
            this.userLoad;
        }
        },
    components: {
        'navbar-component': Navbars,
        'sidebar-component': Sidebars,
    },
}
</script>
