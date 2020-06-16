<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h3>Create User</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="updateCustomer">
          <div class="row">
            <div class="col-md-8 form-group offset-2">
              <label for="name">Enter name</label>
              <input
                type="text"
                class="form-control"
                v-model="form.name"
                id="name"
                value
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
          <button class="btn btn-success" type="submit">Update</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase/firebaseConfig";
import Swal from "sweetalert2";
export default {
  name: "UpdateCustomer",
  data() {
    return {
      customer_id: this.$route.params.customer_id,
      customer: null,
      form: {
        name: null,
        email: null,
        number: null,
        address: null
      }
    };
  },
  methods: {
    getSingleCustomer() {
      var docRef = db.collection("customers").doc(this.customer_id);

      docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            this.customer = doc.data();
            this.form.name = doc.data().name;
            this.form.email = doc.data().email;
            this.form.number = doc.data().number;
            this.form.address = doc.data().address;
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    },
    updateCustomer() {
      var washingtonRef = db.collection("customers").doc(this.customer_id);

      // Set the "capital" field of the city 'DC'
      return washingtonRef
        .update(this.form)
        .then(function() {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been updated",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    }
  },
  created() {
    this.getSingleCustomer();
  }
};
</script>

<style>
</style>