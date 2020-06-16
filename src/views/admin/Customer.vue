<template>
  <div>
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">
          <h3>Customer's</h3>
          <div class="card-tools">
            <button @click="createUserModal" class="btn btn-primary">ADD CUSTOMER</button>
          </div>
        </div>
        <div class="card-body">
          <!-- //modal -->
          <div
            class="modal fade"
            id="userModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="userModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="userModalLabel">Modal title</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">...</div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
          <table class="table table-bordered" style="width:100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in customers" :key="item.id">
                <td>{{item.data().name}}</td>
                <td>{{item.data().email}}</td>
                <td>{{item.data().number}}</td>
                <td>{{item.data().address}}</td>
                <td>
                  <router-link :to="`/update-customer/${item.id}`">EDIT</router-link>/
                  <a @click="deleteCustomer(item.id)" href="#">Delete</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import $ from "jquery";
import { db } from "../../firebase/firebaseConfig";
// import Vue from "vue";
// const Bus = new Vue();
import Swal from "sweetalert2";
export default {
  name: "Customer",
  data() {
    return {
      customers: []
    };
  },
  methods: {
    createUserModal() {
      this.$router.replace("/create-customer");
    },
    readData() {
      db.collection("customers")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(element => {
            this.customers.push(element);
            // console.log(element.data());
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteCustomer(id) {
      db.collection("customers")
        .doc(id)
        .delete()
        .then(function() {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          // Bus.$emit("Fire");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
    }
    // editInitiaing(item) {
    //   this.$router.push({ name: "CreateUser", params: { item: item } });
    // }
  },
  created() {
    this.readData();
    // Bus.$on("Fire", () => this.readData());
    // console.log("Customer component");
  }
};
</script>

<style>
</style>