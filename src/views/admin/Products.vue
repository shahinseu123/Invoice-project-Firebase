<template>
   <div>
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">
          <h3>Product's's</h3>
          <div class="card-tools">
            <button  class="btn btn-primary">Add Product</button>
          </div>
        </div>
        <div class="card-body">
          <!-- //modal -->
          <div class="row">
              <div class="col-md-6">
                  <div class="card">
                      <div class="card-header">
                          <h4>Add Product</h4>
                      </div>
                      <div class="card-body">
                          <form @submit.prevent="createProduct">
                              <div class="row">
                                  <div class="col-12 from-group">

                                     <input type="text" class="form-control" name="name" id="name" v-model="form.name" placeholder="Enter product name">
                                     <input type="text" class="form-control mt-4" name="company" id="company" v-model="form.company" placeholder="Product company">
                                     <input type="number" class="form-control mt-4" name="price" id="price" v-model="form.price" placeholder="Product price">
                                     <input type="radio" class="mt-4" name="isAvailable" id="isAvailable" v-model="form.isAvailable" value="true"><span>Aavaiable</span><br>
                                     <input type="radio" class="mt-4" name="isAvailable" id="isAvailable" v-model="form.isAvailable" value="false"><span>Not available</span>
                                     <select class=" mt-4 form-control" name="category" id="category" v-model="form.cat_id">
                                       <option value="">--Select Category--</option>
                                       <option v-for="item in catetories" :key="item.id" :value="item.id">{{item.data().categoty_name}}</option>
                                     </select>
                                     <button type="submit" class="mt-4 btn btn-success btn-block">Submit</button>
                                  </div>
                              </div>

                          </form>
                      </div>
                  </div>
              </div>
           
          </div>
          <table class="table table-bordered" style="width:100%">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Price</th>
                <th>Available</th>
                
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in products" :key="item.id">
                <td>{{item.data().name}}</td>
                <td>{{item.data().company}}</td>
                <td>{{item.data().price}}</td>
                <td>{{item.data().isAvailable}}</td>
              
              
                <!-- <td>{{item.data().address}}</td> -->
                <td>
                  <!-- <router-link :to="`/update-customer/${item.id}`">EDIT</router-link>/ -->
                  <a  href="#">Delete</a>
                 
                  <!-- <a @click="deleteCustomer(item.id)" href="#">Delete</a> -->
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
import { db } from "../../firebase/firebaseConfig";
import Swal from "sweetalert2";
export default {
  name: "Products",
 data(){
   return {
        catetories: [], 
        products: [],
        form: {
          name: null,
          company: null,
          price: null,
          isAvailable: false,
          cat_id: null
    }
   }
 },
 methods: {
   createProduct(){
       let productRef = db.collection('products')
           productRef.add(this.form)
                     .then(() => {
                           Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: "Your work has been saved",
                              showConfirmButton: false,
                              timer: 1500
                            });
                     })
                     .catch((err) => console.log(err))
                     
   },
   loadCategory(){
         const catRef = db.collection('categories')
             catRef.get()
                    .then(querySnapshot => {
                    querySnapshot.forEach(element => {
                        this.catetories.push(element);
                        // console.log(element.data());
                    });
                    })
   },
   loadProducts(){
       const prodRef = db.collection('products')
             prodRef.get()
                    .then( querySnapshot => {
                      querySnapshot.forEach(element => {
                        this.products.push(element)
                      })
                    })
   },
  
 }
 ,
 created(){
   this.loadCategory()
   this.loadProducts()
 }
}
</script>

<style>

</style>