<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Data Siswa </h1>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="card card-primary card-outline">
                                <div class="card-body">
                                    <router-link class="btn btn-info mb-2" to="siswa/CreateSiswa">
                                        <i class="fas fa-plus"></i> Tambah
                                    </router-link>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th style="width: 10px">#</th>
                                                <th>Nama Lengkap</th>
                                                <th>Kelas</th>
                                                <th>Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(siswa, index) in result" :key="siswa.id">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ siswa.nama_siswa }}</td>
                                                <td>{{ siswa.nama_kelas }}</td>
                                                <td>
                                                    <div class="btn-group">
                                                        <router-link class="btn btn-success"
                                                            :to="'/siswa/detail/' + siswa.id">Detail</router-link>

                                                        <router-link :to="{ path: '/editsiswa/' + siswa.id }"
                                                            class="btn btn-warning">Edit</router-link>

                                                        <button type="button" class="btn btn-danger" @click="remove(siswa)">
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
import swal from 'sweetalert';

Vue.use(axios);

import Navbars from "../template/UserNavbars.vue";
import Sidebars from "../template/UserSidebars.vue";

export default {
    data() {
        return {
            result: {},
            siswa: {},
            kelas: {},
        }
    },
    created() {
        this.userLoad();
    },
    methods: {
        userLoad() {
            var page = "http://localhost:8000/api/getsiswa";
            axios.get(page).then(
                ({ data }) => {
                    console.log(data);
                    this.result = data;
                }
            );

        },
        remove(siswa) {
            var url = 'http://localhost:8000/api/deletesiswa/' + siswa.id;
            axios.delete(url);
            swal({
                title: "Hapus Data siswa?",
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
                
                this.$router.push('/siswa');
            this.userLoad;
        }


    },
    components: {
        'navbar-component': Navbars,
        'sidebar-component': Sidebars,
    },
}
</script>
