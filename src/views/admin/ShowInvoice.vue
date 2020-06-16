<template>
  <h1>Invoice id: {{$route.params.invoice_id}}</h1>
</template>

<script>
import { db } from "../../firebase/firebaseConfig"
export default {
  name: "ShowInvoice",
  data(){
      return {
          invoice: null,
          invoice_id:this.$route.params.invoice_id
      }
  },
  methods: {
      getInvoice(){
         db.collection("invoices").doc(this.invoice_id)
           .then(querySnapShot => {
              this.invoice = querySnapShot
            //   console.log(invoice)
           })
           .catch(err => console.log(err))
      }
  }
}
</script>

<style>

</style>