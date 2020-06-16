<template>
     <div>
    <div class="container-fluid">
      <div class="card">
        <div class="card-header">
          <h3>Categorie's</h3>
          <div class="card-tools">
            <button  class="btn btn-primary">Add Category</button>
          </div>
        </div>
        <div class="card-body">
          <!-- //modal -->
          <div class="row">
              <div class="col-md-6">
                  <div class="card">
                      <div class="card-header">
                          <h4>Add Category</h4>
                      </div>
                      <div class="card-body">
                          <form @submit.prevent="createCategory">
                              <div class="row">
                                  <div class="col-12 from-group">

                                     <input type="text" class="form-control" name="category_name" id="category_name" v-model="form.categoty_name">
                                     <button type="submit" class="btn btn-success">Submit</button>
                                  </div>
                              </div>

                          </form>
                      </div>
                  </div>
              </div>
                 <div class="col-md-6">
                <div v-show="catPro" class="card">
                  <div class="card-header">
                    <h4>Category</h4>
                    <div class="card-tools">
                      <button @click="exitCatePro" class="btn btn-danger">EXIT</button>
                    </div>
                  </div>
                  <div class="card-body">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Company</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in catProducts" :key="item.id">
                          <td>{{item.data().name}}</td>
                          <td>{{item.data().company}}</td>
                          <td>{{item.data().price}}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
          </div>
          <table class="table table-bordered" style="width:100%">
            <thead>
              <tr>
                <th>Name</th>
                
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in catetories" :key="item.id">
                <td>{{item.data().categoty_name}}</td>
              
              
                <!-- <td>{{item.data().address}}</td> -->
                <td>
                  <!-- <router-link :to="`/update-customer/${item.id}`">EDIT</router-link>/ -->
                  <a @click="deleteCategory(item.id)" class="btn btn-danger" href="#">Delete</a>
                  <a @click="ShowProducts(item.id)" class="btn btn-info" href="#">Show Products</a>
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
import Swal from "sweetalert2";
import { db } from "../../firebase/firebaseConfig"
export default {
  name: "Category",
  data(){
      return {
          catPro: false,
          catetories: [],
          catProducts: [],
          form: {
              categoty_name: null
          }
      }
  },
  methods: {
      createCategory(){
        const catRef = db.collection('categories')
          catRef.add(this.form)
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
      getAhhCategories(){
          const catRef = db.collection('categories')
             catRef.get()
                    .then(querySnapshot => {
                    querySnapshot.forEach(element => {
                        this.catetories.push(element);
                        // console.log(element.data());
                    });
                    })

      },
      deleteCategory(id){
          const catRef = db.collection('categories')
               catRef.doc(id)
                     .delete()
                     .then(() => {
                         Swal.fire("Deleted!", "Your file has been deleted.", "success");
                     })
                     .catch((err) => {
                         console.log(err)
                     })
      },
      ShowProducts(id){
         let catRefTwo = db.collection('products').where('cat_id', '==', id)
             catRefTwo.get()
                      .then(querySnapshot => {
                        this.catPro = true
                        querySnapshot.forEach(element => {
                          this.catProducts.push(element)
                        })
                      })
                      .catch(() => console.log("Data not found"))
                      this.catProducts = []
      },
      exitCatePro(){
        this.catPro = false
         this.catProducts = []
      }
  },
  
          created(){
              this.getAhhCategories()

          }
}
</script>

<style>

</style>