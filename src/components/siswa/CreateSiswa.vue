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
                                    <h3 class="card-title">Anggota Baru</h3>
                                </div>
                                <form @submit.prevent="addSiswa">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label>Nama Anggota</label>
                                            <input type="text" class="form-control" v-model="siswa.nama_siswa">
                                        </div>
                                        <div class="form-group">
                                            <label>Tanggal Lahir</label>
                                            <input type="date" name="tgl_lahir" v-model="siswa.tanggal_lahir" />
                                        </div>

                                        <div class="form-group">
                                            <div>
                                                <label>Jenis Kelamin</label>
                                            </div>
                                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                                <label class="btn btn-secondary">
                                                    <input type="radio" value="L" v-model="siswa.gender"> Laki-laki
                                                </label>

                                                <label class="btn btn-secondary">
                                                    <input type="radio" value="P" v-model="siswa.gender"> Perempuan
                                                </label>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Alamat</label>
                                            <textarea rows="4" class="form-control" v-model="siswa.alamat"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <label>Kelas</label>
                                            <select class="form-control" v-model="siswa.id_kelas">
                                                <option v-for="k in kelas" :key="k.id_kelas" :value="k.id_kelas">{{
                                                    k.nama_kelas }}
                                                </option>
                                            </select>
                                        </div>

                                        <!-- <div class="form-group">
                                            <label>Kelas</label>
                                            <select class="form-control" v-model="peminjaman.id_siswa">
                                                <option v-for="s in siswa" :key="s.id_siswa" :value="s.id_siswa">{{
                                                    s.nama_siswa }}
                                                </option>
                                            </select>
                                        </div> -->

                                    </div>
                                    <div class="card-footer">
                                        <button type="submit" class="btn btn-primary">Simpan</button>
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
            siswa: {},
            kelas: {}
        }
    },
    created() {
        this.kelasLoad();
    },
    methods: {
        kelasLoad() {
            var page = "http://localhost:8000/api/getkelas";
            axios.get(page).then(
                ({ data }) => {
                    console.log(data);
                    this.kelas = data;
                }
            );



        },

        save() {
            this.addSiswa();
        },
        addSiswa() {
            axios.post('http://localhost:8000/api/createsiswa', this.siswa)
                .then(
                    ({ data }) => {
                        swal({
                            title: "Success",
                            text: "Siswa Berhasil ditambah",
                            icon: "success",
                        });
                        this.$router.push('/siswa');
                        this.siswa = data;
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
