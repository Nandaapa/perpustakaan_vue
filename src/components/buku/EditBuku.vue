<template>
    <div>
        <navbar-component></navbar-component>
        <sidebar-component></sidebar-component>
        <div class="content-wrapper">
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Edit Buku</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content">
                <div class="container-fluid">
                    <div class="card card-primary card-outline">
                        <div class="card-body">
                            <form @submit.prevent="save_edit">
                                <input type="hidden" v-model="id_buku">
                                <label for="judul" class="form-label">Judul :</label>
                                <input type="text" class="form-control" v-model="judul" id="judul" autocomplete="off"
                                    placeholder="Masukkan judul..">
                                <br>
                                <label for="pengarang" class="form-label">Pengarang :</label>
                                <input type="text" class="form-control" v-model="pengarang" id="pengarang" autocomplete="off"
                                    placeholder="Masukkan nama pengarang..">
                                    <br>
                                <input type="submit" @click.prevent="save_edit" class="btn btn-primary">

                            </form>
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

import Navbars from '../template/UserNavbars.vue'
import Sidebars from '../template/UserSidebars.vue'

export default {
    components: {
        'navbar-component': Navbars,
        'sidebar-component': Sidebars,
    },
    data: function () {
        return {
            buku: [],
            id_buku: "",
            judul: "",
            pengarang: "",
            
        }
    },
    mounted() {
        this.GetBuku(),
            this.getdetail(this.$route.params.id)
    },
    methods: {
        GetBuku() {
            axios.get('http://127.0.0.1:8000/api/getbuku')
                .then(
                    ({ data }) => {
                        this.buku = data
                    }
                );
        },
        getdetail(id_buku) {
            axios.get('http://127.0.0.1:8000/api/getbukuid/'+id_buku)
                .then((response) => {
                    console.log(response.data[0])
                    this.id_buku = response.data[0].id_buku
                    this.judul = response.data[0].judul
                    this.pengarang = response.data[0].pengarang
                   
                })
        },
        save_edit: function () {
            let DataBuku = {
                id_buku: this.id_buku,
                judul: this.judul,
                pengarang: this.pengarang
            }
            axios.put("http://127.0.0.1:8000/api/updatebuku/" + this.id, DataBuku)
                .then(
                    res => {
                        swal({
                            title: "Success",
                            text: "Buku Berhasil diubah",
                            icon: "success",
                        });
                        console.log(res)
                        this.$router.push('/buku')
                    }

                )
        },
    }
}


</script>