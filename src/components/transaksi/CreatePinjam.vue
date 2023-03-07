<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Form Tambah Data</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="card card-success">
                                <div class="card-header">
                                    <h3 class="card-title">Peminjaman Baru</h3>
                                </div>
                                <form @submit.prevent="addPinjam">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label>Siswa</label>
                                            <select class="form-control"  v-model="peminjaman.id_siswa">
                                                <option></option>
                                                <option v-for="s in siswa" :key="s.id" :value="s.id">{{
                                                    s.nama_siswa}}
                                                </option>
                                            </select>
                                        </div>

                                        <div class="form-group">
                                            <label>Buku</label>
                                            <select class="form-control"  v-model="peminjaman.id_buku">
                                                <option></option>
                                                <option v-for="b in buku" :key="b.id_buku" :value="b.id_buku">{{
                                                    b.judul }}
                                                </option>
                                            </select>
                                        </div>


                                        <div class="form-group">
                                            <label>Tanggal Kembali</label>
                                            <input type="date" name="tgl_lahir" v-model="peminjaman.tgl_kembali" />
                                        </div>

                                    </div>
                                    <div class="card-footer">
                                        <button type="submit" @submit.prevent="addPinjam" class="btn btn-primary">Simpan</button>
                                    </div>
                                </form>
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
            peminjaman: {},
            siswa: {},
            buku : {},
            kelas: {}
        }
    },
    created() {
        this.siswaLoad();
        this.bukuLoad();
    },
    methods: {
        siswaLoad() {
            var page = "http://localhost:8000/api/getsiswa";
            axios.get(page).then(
                ({ data }) => {
                    console.log(data);
                    this.siswa = data;
                }
            );
        },
        bukuLoad() {
            var page = "http://localhost:8000/api/getbuku";
            axios.get(page).then(
                ({ data }) => {
                    console.log(data);
                    this.buku = data;
                }
            );
        },

        
        save() {
            this.addPinjam();
        },
        addPinjam() {
            axios.post('http://localhost:8000/api/pinjambuku', this.peminjaman)
                .then(
                    ({ data }) => {
                        swal({
                            title: "Success",
                            text: " Berhasil ditambah",
                            icon: "success",
                        });
                        this.$router.push('/pinjambuku');
                        this.peminjaman = data;
                    }
                )

        }
    },

    components: {
        'navbar-component': Navbars,
        'sidebar-component': Sidebars,
    },
}

</script>

