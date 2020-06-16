<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>Create User</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="createCustomer">
          <div class="row">
            <div class="col-md-8 form-group offset-2">
              <label for="name">Enter name</label>
              <input
                type="text"
                class="form-control"
                v-model="form.name"
                id="name"
                placeholder="Enter Customer name"
              />
            </div>
            <div class="col-md-8 form-group offset-2">
              <label for="email">Enter Email</label>
              <input
                type="email"
                class="form-control"
                v-model="form.email"
                id="email"
                placeholder="Enter Customer email"
              />
            </div>
            <div class="col-md-8 form-group offset-2">
              <label for="number">Enter Phone Number</label>
              <input
                type="text"
                class="form-control"
                v-model="form.number"
                id="number"
                placeholder="Enter Customer number"
              />
            </div>
            <div class="col-md-8 form-group offset-2">
              <label for="address">Enter Address</label>
              <input
                type="text"
                class="form-control"
                v-model="form.address"
                id="address"
                placeholder="Enter Customer address"
              />
            </div>
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase/firebaseConfig";
import Swal from "sweetalert2";
export default {
  name: "CreateUser",
  data() {
    return {
      // customer_id: this.$route.params.customer_id,
      // customer: null,
      // edit: false,
      form: {
        name: null,
        email: null,
        number: null,
        address: null
      }
    };
  },
  methods: {
    createCustomer() {
      //   console.log("customer created");
      db.collection("customers")
        .add({
          name: this.form.name,
          email: this.form.email,
          number: this.form.number,
          address: this.form.address
        })
        .then(() => {
          this.$router.replace("/customer");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
    }
  }
};
</script>

<style>
</style>