<template>
  <div class="container">
    <div class="card-header header">
      <h3>Please Register</h3>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="login-card">
        <p v-if="errors.length">
            <ul style="padding-left: 0; list-style-type:none">
               <li style="color: red" v-for="error in errors" class="alert alert-danger" :key="error">{{ error }}</li>
            </ul>
        </p>

        <div class="form-group">
          <input
            type="text"
            class="form-control"
            name="name"
            id="name"
            v-model="form.name"
            aria-describedby="emailHelp"
            placeholder="Enter name"
          />
        </div>
        <div class="form-group">
          <input
            type="email"
            name="email"
            v-model="form.email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
         <div class="form-group">
          <input
            type="text"
            name="phone"
            v-model="form.phone"
            class="form-control"
            id="phone"
            placeholder="Enter Phone"
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            name="text"
            v-model="form.address"
            class="form-control"
            id="address"
            placeholder="Enter Address"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            name="text"
            v-model="form.password"
            class="form-control"
            id="password"
            placeholder="Enter password"
          />
        </div>
        <button type="submit" class="sub-btn">SUBMIT</button>
      </div>
    </form>
  </div>
</template>

<script>
import {fb} from '../firebase/firebaseConfig'
export default {
  name: "Register",
  data() {
    return {
      errors: [],
      form: {
        name: null,
        email: null,
        phone: null,
        address: null,
        password: null
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.form.name && this.form.email && this.form.phone && this.form.address) {
        fb.auth().createUserWithEmailAndPassword(this.form.email, this.form.password)
                .then(() => {
                    this.$router.replace('/dashboard')
                })
                .catch(function(error) {
                 console.log(error.code);
                 console.log(error.message);
                });
      }
      this.errors = [];
      if (this.form.name === "") {
        this.errors.push("Name is required");
      }
      if (this.form.email === "") {
        this.errors.push("Email is required");
      }
      if (this.form.phone === "") {
        this.errors.push("Phone is required");
      }
      if (this.form.address === "") {
        this.errors.push("Address is required");
      }
    }
  }
};
</script>

<style scoped>
.login-card {
  width: 600px;
  padding: 20px;
  margin: 0 auto;
  /* border: 1px solid black; */
  background: #fcfcfc;
  border-radius: 10px;
}

.header {
  margin: 0 auto;
  width: 600px;
}
.sub-btn {
  padding: 7px 30px;
  background: teal;
  color: white;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  border: none;
}
</style>