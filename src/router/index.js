import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '../views/DashboardView.vue'
import IndexSiswa from '../components/siswa/IndexSiswa.vue'
import CreateSiswa from '../components/siswa/CreateSiswa.vue'
import DetailSiswa from '../components/siswa/DetailSiswa.vue'
import EditSiswa from '../components/siswa/EditSiswa.vue'

import  IndexBuku  from '../components/buku/IndexBuku.vue'
import CreateBuku from '../components/buku/CreateBuku.vue'
import EditBuku from '../components/buku/EditBuku.vue'

import PinjamBuku from '../components/transaksi/PinjamBuku.vue'
import CreatePinjam from '../components/transaksi/CreatePinjam.vue'
import KembaliBuku from '../components/transaksi/KembaliBuku.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/user',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/siswa',
    name: 'Siswa',
    component: IndexSiswa
  },
  {
    path : '/siswa/CreateSiswa',
    name : 'CreateSiswa',
    component : CreateSiswa
  },
  {
        name : 'detailsiswa',
        path : '/siswa/detail/:id',
        component : DetailSiswa

  },
  {
    name : 'EditSiswa',
    path : '/editsiswa/:id',
    component : EditSiswa
}, 


{
  path: '/buku',
  name: 'Buku',
  component: IndexBuku
},
{
  path : '/buku/CreateBuku',
  name : 'CreateBuku',
  component : CreateBuku
},
{
  name : 'EditBuku',
  path : '/editbuku/:id',
  component : EditBuku
}, 

{
  name : 'PinjamBuku',
  path : '/pinjambuku',
  component : PinjamBuku
},
{
  name : 'CreatePinjam',
  path : '/pinjambuku/CreatePinjam',
  component : CreatePinjam
},
{
  name : 'KembaliBuku',
  path : '/kembalibuku',
  component : KembaliBuku
}

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
