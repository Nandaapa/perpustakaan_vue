<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Dashboard</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="card card-info">
                                <div class="card-header">
                                    <h3 class="card-title">Selamat Datang</h3>

                                    <div class="card-tools">

                                        <button type="button" class="btn btn-tool" data-card-widget="maximize">
                                            <i class="fas fa-expand"></i>
                                        </button>
                                        <button type="button" class="btn btn-tool" data-card-widget="collapse">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                    <!-- /.card-tools -->
                                </div>
                                <!-- /.card-header -->
                                <div class="card-body">
                                    Website informasi sistem perpustakaan
                                </div>
                                <!-- /.card-body -->
                            </div>
                            <!-- /.card -->
                        </div>

                        <div class="col-lg-3 col-6">
                            <!-- small box -->
                            <div class="small-box bg-success">
                                <div class="inner">
                                    <h3>{{ siswa }}</h3>

                                    <p>Data Siswa</p>
                                </div>
                                <div class="icon">
                                    <i class='fas fa-user-alt'></i>
                                </div>
                                <a href="/siswa" class="small-box-footer">More info <i
                                        class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>

                        <div class="col-lg-3 col-6">
                            <!-- small box -->
                            <div class="small-box bg-primary">
                                <div class="inner">
                                    <h3>{{ buku }}</h3>

                                    <p>Data Buku</p>
                                </div>
                                <div class="icon">
                                    <i class='fas fa-book-open'></i>
                                </div>
                                <a href="/buku" class="small-box-footer">More info <i
                                        class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>


                    </div>

                    <div class="row">
                        <!-- /.col -->

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>


import Vue from 'vue';
import axios from 'axios';

import Navbars from "../components/template/UserNavbars.vue";

import Sidebars from "../components/template/UserSidebars.vue";


Vue.use(axios);
export default {
    data() {
        return {
            result: {},
            siswa: {},
            kelas: {},
            buku: {},
        }
    },
    created() {
        this.siswaLoad();
        this.bukuLoad();
    },

    methods: {
        siswaLoad() {
            var page = "http://localhost:8000/api/jumlahsiswa";
            axios.get(page).then(
                ({ data }) => {
                    console.log(data);
                    this.siswa = data;
                }
            );

        },
        bukuLoad() {
            var page = "http://localhost:8000/api/jumlahbuku";
            axios.get(page).then(
                ({ data }) => {
                    console.log(data);
                    this.buku = data;
                }
            );

        },



    },
    components: {
        'navbar-component': Navbars,
        'sidebar-component': Sidebars,
    },
}
</script>
