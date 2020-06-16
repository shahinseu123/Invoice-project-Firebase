<template>
    <div class="container-fluid my-4">
      <form @submit.prevent="createInvoices">
          <div class="card">   
             <div class="card-body">
                 <div class="row">
                    <div class="col-md-6">
                        <label for="customer">Customer</label>
                        <autocomplete
                           :source="customers"
                           input-class="form-control"
                           placeholder="Search Distribution Groups"
                           v-model="selectedItemsId"
                           @selected="selectNameOrId"
                           >
                           </autocomplete>
                    </div>
                  

                   <div class="col-md-6">
                       <label for="shipTo">Ship To</label> 
                        <div class="form-group">
                        <input type="text" v-model="form.shipTo" class="form-control" value="" name="shipTo" id="shipTo">
                    </div>
                   </div>
               </div>

               <div class="row">
                   <div class="col-md-6">
                       <label for="quotationDate">Quotation Date</label>
                       <div class="form-group"> 
                            <input v-model="form.quotationDate" type="date" name="quotationDate" 
                                class="form-control">
                    </div>
                   </div>                  
                   <div class="col-md-6">
                        <label for="delivaryDate">Delivary Date</label>
                       <div class="form-group"> 
                            <input v-model="form.delivaryDate" class="form-control" type="date" name="delivaryDate">
                    </div>
                   </div>
               </div>

               <div class="row">
                   <div class="col-md-6">
                       <label for="paymentMethod">Payment Methods</label>
                      <div class="form-group"> 
                            <input v-model="form.paymentMethod" type="paymentMethod" name="paymentMethod" placeholder="Enter Payment Method" class="form-control" >
                           
                    </div>
                   </div>

                   <div class="col-md-6">
                      <label for="priceInWord">Price In Word</label>
                       <div class="form-group"> 
                            <input v-model="form.priceInWord" type="text" name="priceInWord"
                                class="form-control" >
                           
                    </div>
                   </div>
                   <div class="col-md-6">
                      <label for="shippingCost">Shipping Cost</label>
                       <div class="form-group"> 
                            <input v-model="form.shippingCost" type="text" name="shippingCost" id="shippingCost" class="form-control">
                    </div>
                   </div>
                   <div class="col-md-6">
                      <label for="shippingCost">Currency</label>
                       <div class="form-group"> 
                            <select name="currency" id="currency" v-model="form.currency" class="form-control">
                                <option value="" selected> --Select Currency-- </option>
                                <option value="BDT" > BDT </option>
                                <option value="USD" > USD </option>
                                <option value="EURO" > EURO </option>
                                <option value="POUND" > POUND </option>
                            </select>
                    </div>
                   </div>
               </div>


            <label for="items" class="control-label">Items</label>
            <div class="table-responsive">
                <table class="table table-bordered" id="items">
                    <thead>
                        <tr style="background-color: #f9f9f9;">
                            <th class="text-center" width="5%">Actions</th>
                            <th class="text-left" width="10%">No.</th>
                            <th class="text-left" width="15%">Name</th>
                            <th class="text-left" width="30%">Details</th>
                            <th class="text-center" width="10%">Req. Unit</th>
                            <th class="text-right" width="10%">Unit Price</th>
                            <!-- <th class="text-right" width="15%">Shipping Cost</th> -->
                            <th class="text-right" width="15%">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                          <tr v-for="(item) in rowData" :key="item.id" id="item-row-0">
                            <td class="text-center" style="vertical-align: middle;">
                                <button @click="deleteRow"  type="button"  data-toggle="tooltip" title="Delete" class="btn btn-xs btn-danger"><i class="fa fa-trash"></i></button>
                            </td>
                           
                            <td>
                                <input class="form-control typeahead" v-model="item.id"  placeholder="No." type="text" id="item-number-0">
                            </td>
                            <td>
                                <input class="form-control typeahead" v-model="item.name"  placeholder=" Name" type="text" id="item-name-0">
                            </td>
                            <td>
                                <input  class="form-control text-center" v-model="item.details"  name="details" placeholder="Details" type="text" id="item-quantity-0">
                            </td>
                            <td>
                                <input class="form-control text-center" v-model="item.qty"  name="reqUnit" type="text" id="item-quantity-0">
                            </td>
                            <td>
                                <input @change="calculateSubtotal" class="form-control text-center" v-model="item.price"  name="price" type="text" id="item-quantity-0">
                            </td>
                            <td>
                                <p>{{item.linetotal}}</p>
                          
                            </td>
                           
                            <td class="text-right" style="vertical-align: middle;">
                        <span id="item-total-0"></span>
                            </td>
                             
                        </tr>
                         <tr id="addItem">
                            <td class="text-center"><button @click="addItemToRow" type="button"  data-toggle="tooltip" title="Add" class="btn btn-xs btn-primary" data-original-title="Add"><i class="fa fa-plus"></i></button></td>
                            <td class="text-right" colspan="5"></td>
                        </tr>
                        <tr>
                            <td class="text-right" colspan="6"><strong>Subtotal</strong></td>
                            <td class="text-right"><span id="sub-total">{{form.subtotal}}</span></td>
                        </tr>
                        <tr>
                            <td class="text-right" colspan="6"><strong>Shipping Cost</strong></td>
                            <td class="text-right"><span id="tax-total">{{this.form.shippingCost}}</span></td>
                        </tr>
                        <tr>
                            <td class="text-right" colspan="6"><strong>Total</strong></td>
                            <td class="text-right"><span id="grand-total">{{this.form.total}}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
                <label for="notes" class="control-label">Notes</label>
                <textarea class="form-control" v-model="form.details" placeholder="Enter Notes" rows="3" name="notes" cols="50" id="notes"  ></textarea> 
            </div>
              <div class="row container">

                
                     <button type="submit" class="btn btn-success m-4">Save</button>
                  <!-- </div> -->
                </div>
          
          </div>
           </form>
           </div>
           
                  <!-- <button @click="calculatePrice" class="btn btn-danger">sum</button> -->

   
</template>

<script>
// import Vue from 'vue'
import { db } from "../../firebase/firebaseConfig"
import Autocomplete from 'vuejs-auto-complete'
import Swal from "sweetalert2";
export default {
   name: "CreateInvoice",
    components: {
        Autocomplete,
      },
   data(){
     return {
         customers: [],
         selectedItemsId: 1,
            // myArray: [
            //     { id:1, name:'Shahin' },
            //     { id:2, name:'Babu' },
            //     { id:3, name:'Nishat' },
            //     { id:4, name:'Bonna' },
            //     { id:7, name:'Konna' },
            //     { id:11, name:'Lovely' },
            // ],
         rowData: [],
         form: {
                    customer: '',
                    shipTo: '',
                    quotationDate: '',
                    // quotationNumber: '',
                    paymentMethod: '',
                    shippingCost: '',
                    subtotal: '',
                    total: '',
                    priceInWord: '',
                    // authorisedBy: '', 
                    delivaryDate: '', 
                    currency: '',
                    invoiceproducts: this.rowData
         }
     }
   },
  methods: {
     addItemToRow(){
     this.rowData.push({
       id: Math.random().toString(),
       name: null,
       details: null,
       qty: null,
       price: null,
       linetotal: null,
     })
   },
   deleteRow(){
     this.rowData.pop()
   },
   calculateTotal(){
                var total, subtotal, preTotal
               
                subtotal = this.rowData.reduce(function(sum, product){

                    var linetotal = parseFloat(product.qty*product.price)
                       if(!isNaN(linetotal)){
                          product.linetotal = linetotal.toFixed(2)
                          return sum + linetotal
                       }
                       return linetotal
                }, 0)
                if(this.form.shippingCost){
                    preTotal =  subtotal+this.catculateShipping()
                    total =  preTotal.toFixed(2)

                }else{
                    total =  subtotal.toFixed(2)
                }
                    this.form.total = total
                    setTimeout(() => {
                        // this.numToWord()
                        // console.log("Number in Word")
                    }, 1000)
                // ---------------------------------------------------------------------------------------------------------------
            },
            catculateShipping(){
                var shipCost = parseFloat(this.form.shippingCost)
                return shipCost;
            },
   calculateSubtotal(){
                this.calculateTotal()
                var sub_total, linetotal
                sub_total = this.rowData.reduce((sum, product) => {
                     linetotal = parseFloat(product.qty*product.price)
                       if(!isNaN(linetotal)){
                          return sum + linetotal
                       }
                       return linetotal 
                }, 0)
                // this.rowData.lineTotal = linetotal
                this.form.subtotal = sub_total.toFixed(2)
                this.calculateTotal()
            },
  selectNameOrId(){
            setTimeout(() => {
                let name_id =  this.selectedItemsId
                this.customers.forEach((item) => {
                     if(name_id == item.id){
                        // this.form.customer = item.data().name
                        setTimeout(() => {
                            this.form.customer = item.name
                            this.form.email = item.email
                            this.form.number = item.number
                            this.form.shipTo = item.address
                        }, 500)
                     }
                })
            },500)
        },
    loadCustomer(){
        db.collection('customers')
          .get()
          .then(querySnapShot => {
              querySnapShot.forEach( element => {
                  this.customers.push({
                      id: element.id,
                      name: element.data().name,
                      email: element.data().email,
                      number: element.data().number,
                      address: element.data().address,
                  })
              })
          })
          .catch((err) => console.log(err))
    },
    createInvoices(){
        // var prodRef = db.collection('invoices').doc().collection('invoiceproducts')
        db.collection('invoices')
        //   .add(this.form)
          .add({
                    customer: this.form.customer,
                    shipTo: this.form.shipTo,
                    quotationDate: this.form.quotationDate,
                    // quotationNumber: '',
                    paymentMethod: this.form.paymentMethod,
                    shippingCost: this.form.shippingCost,
                    subtotal: this.form.subtotal,
                    total: this.form.total,
                    priceInWord: this.form.priceInWord,
                    // authorisedBy: '', 
                    delivaryDate: this.form.delivaryDate, 
                    currency: this.form.currency,
                    invoiceproducts: this.rowData
          })
          .then(() => {
            //   this.rowData.forEach(item => {
            //       prodRef.add(item)
            //              .then(() => {
                              Swal.fire({
                                     position: "top-end",
                                     icon: "success",
                                     title: "Your work has been saved",
                                     showConfirmButton: false,
                                     timer: 1500
                                 });
                             this.$route.push("/invoice")
            //              })
            //              .catch(err => console.log(err))
            //   })
               
          })
          .catch( err => console.log(err))
    }    
  },
 
created(){
    this.loadCustomer()
},
  updated(){
       
  }
}
</script>

<style>

</style>