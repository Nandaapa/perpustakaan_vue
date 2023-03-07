<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component active="active"></sidebar-component>
        <div class="content-wrapper">            
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Data Buku</h1>
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
                                    <router-link class="btn btn-info mb-2" to="buku/CreateBuku">
                                        <i class="fas fa-plus"></i> Tambah
                                    </router-link>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                            <th style="width: 10px">ID  </th>
                                            <th>Judul</th>
                                            <th>Pengarang</th>
                                            <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="buku in result" :key="buku.id_buku">
                                                <td>{{ buku.id_buku }}</td>
                                                <td>{{ buku.judul }}</td>
                                                <td>{{ buku.pengarang }}</td>
                                                <td>
                                                    <div class="btn-group">
                                                        <router-link class="btn btn-success"
                                                            :to="'/buku/detail/' + buku.id_buku">Detail</router-link>                                                    
                                                        
                                                            <router-link :to="{ path: '/editbuku/' + buku.id_buku }"
                                                            class="btn btn-warning">Edit</router-link> 

                                                        
                                                        <button type="button" class="btn btn-danger" @click="remove(buku)">
                                                            Hapus </button>                                                     
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

Vue.use(axios);

import Navbars from "../template/UserNavbars.vue";
import Sidebars from "../template/UserSidebars.vue";
import swal from "sweetalert";

export default {
    data() {
        return {
            result: {}
        }
    },
    created() {
        this.userLoad();
    },
    methods: {
        userLoad() {
            var page = "http://localhost:8000/api/getbuku";
            axios.get(page).then(
                ({ data }) => {
                    console.log(data);
                    this.result = data;
                }
            );

        },

        
        remove(buku) {
            var url = 'http://localhost:8000/api/deletebuku/' + buku.id_buku;
            axios.delete(url);
            swal({
                title: "Hapus Data buku?",
                text: "Data ini akan terhapus secara otomaris",
                icon: "warning",
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        swal("Data berhasil dihapus", {
                            icon: "success",
                        });
                    }
                });
                
                this.$router.push('/buku');
            this.userLoad;
        }
        
    },
    components: {
            'navbar-component': Navbars,
            'sidebar-component': Sidebars,
        },
}
</script>
