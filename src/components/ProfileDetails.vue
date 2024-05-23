<template>
  <div class="w-100 d-flex flex-column align-items-center mt-5 mb-20 ">
    <div class="w-90 w-md-75 p-3 glow-border">
      <div class="d-flex justify-content-between">
        <div class="container">
          <div class="d-flex justify-content-between">
            <div class="col-8">
              <h1 class="colorElectricBlue text-decoration-underline">Profile Details</h1>
            </div>
            <div class="col-4 col-md-2 ">
              <v-btn class="text-white" append-icon="mdi-logout" @click="this.$root.$User = {};this.$router.push({ path: '/' })" type="btn"
                color="var(--electric-blue)" block>Logout</v-btn>
            </div>
          </div>
          <div class="row mb-3">
            <div class=" col-12 col-md-3 heading">
              <h4 class="colorElectricBlue">Username: {{ this.$root.$User.Username }} </h4>
            </div>
            <div class="col-12 col-md-4 heading">
              <h4 class="colorElectricBlue">Name: {{ this.$root.$User.Firstname }} {{ this.$root.$User.Lastname }}</h4>
            </div>
            <div class="col-12 col-md-3 heading">
              <h4 class="colorElectricBlue">Total Liked Movies: </h4>
            </div>
            <div class="col-12 col-md-3 heading">
              <h4 class="colorElectricBlue">Birth Date: {{ this.$root.$User.DOB }}</h4>
            </div>
            <div class="col-12 col-md-6 heading">
              <h4 class="colorElectricBlue">Email: {{ this.$root.$User.Email }} </h4>
            </div>
            <div class="col-12 col-md-6 mt-md-3 heading">
              <h4 class="colorElectricBlue">Liked Movies: 
              </h4>
              <v-autocomplete
                class="colorElectricBlue"
                label=""
                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                variant="outlined"
              ></v-autocomplete>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';


// Components  
export default defineComponent({
  name: 'ProfileDetails',
  beforeCreate() {
  },
  components: {},
  computed: {},
  methods: {},
  data: () => ({
  })
})
</script>
<style scoped>
.w-90 {
  width: 90%;
}

.mb-20 {
  margin-bottom: 20%;
}

@media only screen and (max-width: 600px) {
  h4 {
    font-size: 4vw;
  }
}
</style>