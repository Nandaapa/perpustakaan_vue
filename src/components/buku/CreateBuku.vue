<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Form Tambah Buku</h1>
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
                                    <h3 class="card-title">Buku Baru</h3>
                                </div>
                                <form @submit.prevent="addBuku">
                                    <div class="card-body">
                                        <div class="form-group">
                                            <label>Judul Buku</label>
                                            <input type="text" name="judul" class="form-control" v-model="buku.judul">
                                        </div>
                                        <div class="form-group">
                                            <label>Pengarang</label>
                                            <input type="text" name="pengarang" v-model="buku.pengarang"/>
                                        </div>

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

Vue.use(axios);

import Navbars from "../template/UserNavbars.vue";
import Sidebars from "../template/UserSidebars.vue";


export default {
    data() {
        return {
            buku : {},
      
        }
    },

    methods : {
        save(){
            this.addBuku();
        },
        addBuku(){
            axios.post('http://localhost:8000/api/createbuku', this.buku)
                    .then(
                        ({ data }) => {
                            alert("buku berhasil ditambah")
                            this.$router.push('/user');
                            this.buku = data;
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
