import Vue from "vue";
import VueRouter from "vue-router";
import { fb } from '../firebase/firebaseConfig'
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Customer from '../views/admin/Customer.vue';
import Dashboard from '../views/admin/Dashboard.vue';
import Invoice from '../views/admin/Invoice.vue';
import CreateUser from '../views/admin/CreateUser.vue';
import UpdateCustomer from '../views/admin/UpdateCustomer.vue';
import Category from '../views/admin/Category.vue';
import Product from '../views/admin/Products.vue';
import CreateInvoice from '../views/admin/CreateInvoice.vue';
import ShowInvoice from '../views/admin/ShowInvoice.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
    // beforeEnter: (to, from, next) => {
    //   if (from.params.uid === null) {
    //     next('/')
    //   } else {
    //     next()
    //   }
    // },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        // props: true,
        // meta: {
        //   currentUser: true
        // },
        // beforeEnter: (to, from, next) => {
        //   if (currentUser === true) {
        //     next()
        //   } else {
        //     next('/login')
        //   }
        // },
      },
      {
        path: '/customer',
        name: "Customer",
        component: Customer,
        // meta: {
        //   currentUser: true
        // },
        // beforeEnter: (to, from, next) => {
        //   if (currentUser === true) {
        //     next()
        //   } else {
        //     next('/')
        //   }
        // },
      },
      {
        path: '/invoice',
        name: "Invoice",
        component: Invoice,
      },
      {
        // path: '/create-customer/:customer_id',
        path: '/create-customer',
        name: "CreateUser",
        component: CreateUser,
        // props: (route) => ({
        //   user: route.item,
        //   ...route.params
        // })
      },
      {
        path: '/update-customer/:customer_id',
        // path: '/create-customer',
        name: "UpdateCustomer",
        component: UpdateCustomer,
        // props: (route) => ({
        //   user: route.item,
        //   ...route.params
        // })
      },
      {
        path: '/category',
        name: "Category",
        component: Category,
      },
      {
        path: '/products',
        name: "Product",
        component: Product,
      },
      {
        path: '/create-invoice',
        name: "CreateInvoice",
        component: CreateInvoice,
      },
      {
        path: '/show-invoice/:invoice_id',
        name: "ShowInvoice",
        component: ShowInvoice,
      },
    ]
  },
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = fb.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})


export default router;
