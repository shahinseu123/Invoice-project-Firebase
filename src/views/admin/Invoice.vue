<template>
  <div class="container-fluid">
    <div class="card">
      <div class="card-header">
        <h3>Invoice</h3>
          <div class="card-tools">
            <router-link class="btn btn-success" to="/create-invoice">Create Invoice</router-link>
          </div>
      </div>
          <div class="card-body">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Address</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="invoice in invoices" :key="invoice.id">
                  <td>{{invoice.data().customer}}</td>
                  <td>{{invoice.data().shipTo}}</td>
                  <td><a class="btn" style="color:red" href="#">Delete</a></td>
                  <td><router-link  class="btn" style="color:green" :to="`/show-invoice/${invoice.id}`">Show</router-link></td>
                </tr>
              </tbody>
            </table>
          </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase/firebaseConfig"
export default {
  name: "Invoice",
  data(){
    return {
      invoices: []
    }
  },
  methods: {
    loadInvoices(){
      db.collection('invoices')
        .get()
        .then( querySnapShot => {
          querySnapShot.forEach(element => {
            this.invoices.push(element)
          });
        })
        .catch( err => console.log(err))
    }
  },
  created(){
    this.loadInvoices()
  }
};
</script>

<style>
</style>
