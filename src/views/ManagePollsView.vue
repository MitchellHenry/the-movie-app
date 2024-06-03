<template>
    <div class="d-flex flex-column justify-content-center align-items-center mh-90">
        <h1 v-electric-text class="mb-3 me-5" >Manage Polls!</h1>
        <div class="w-90 w-md-75 mb-5" v-glow-electric-border>
        <v-tabs
        v-model="currentTab"
        bg-color="#0096FF"
      >
        <v-tab color="white" to="/managepolls/create" value="create">Create</v-tab>
        <v-tab color="white" to="/managepolls/edit"  value="edit">Edit</v-tab>
        <v-tab color="white" to="/managepolls/delete"  value="delete">Delete</v-tab>
      </v-tabs>
        <RouterView></RouterView>
    </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'ManagePolls',
    beforeCreate()
    {
        this.currentTab = this.$route.path.replace("/managepolls/","")
    }
  })
  </script>
  <style scoped>
 
  .w-90
  {
    width:90%;
  }

  .mh
  {
    max-height: 90vh;
  }
  
  </style>