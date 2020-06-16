<template>
  <div class="container">
    <div class="card-header header">
      <h3>Please Login</h3>
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
            type="password"
            class="form-control"
            name="password"
            id="password"
            v-model="form.password"
            placeholder="Enter Password"
          />
        </div>
        <button type="submit" class="sub-btn">SUBMIT</button>
        <a @click="goRegister" href="">Don't have an ID ?</a>
      </div>
    </form>
  </div>
</template>

<script>
import {fb} from '../firebase/firebaseConfig'
export default {
  name: "Login",
  data() {
    return {
      errors: [],
      errorCode: null,
      errorMessage: "",
      authUser: null,

      form: {
          email: "",
          password: ""
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.form.email && this.form.password) {
        fb.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
            .then((res) => {
                this.authUser = res.user
                // var user = firebase.auth().currentUser;
                // console.log(user.uid)
                this.$router.push({ name: "Dashboard"})
                // this.$router.push({ name: "Dashboard", params: { uid: this.authUser.uid }})
                
            })
            .catch(function(error) {
            // this.errorCode = error.code;
            // this.errorMessage = error.message;
            console.log(error.message)
            });
      }
      this.errors = [];
      if (this.form.name === "") {
        this.errors.push("Name is required");
      }
      if (this.form.email === "") {
        this.errors.push("Email is required");
      }
    },
    goRegister(){
        this.$router.push('/register')
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