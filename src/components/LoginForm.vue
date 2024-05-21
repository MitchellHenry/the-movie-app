<template>
  <div class="d-flex flex-column align-items-center w-100">
    <div class="col-10">
      <div class="mb-3 mt-5 mt-md-0">
        <h1 class="colorElectricBlue">Login!</h1>
      </div>
      <div class="p-3 border border-info glow-border">
        <v-form fast-fail @submit.prevent>
          <v-text-field v-model="username" required label="Username" :rules="usernameRules" bg-color="grey-darken-2"
            class="mb-2"></v-text-field>
          <v-text-field v-model="password" type="password" required :rules="passwordRules" label="Password"
           bg-color="grey-darken-2" ></v-text-field>

          <v-btn class="mt-2 text-white" text-color="white" type="submit" @click="tryLogin" color="var(--electric-blue)"
            block>Login</v-btn>
        </v-form>
        <P class="text-primary">{{ errorMessage }}</P>
      </div>
      <div class="mb-5 pb-5">
        <v-btn class="mt-5 mb-5 text-white" @click="this.$router.push({path: '/account/register'})" type="btn" color="var(--electric-blue)" block>Register Here!</v-btn>
      </div>
    </div>
  </div>
</template>

<script>

import { SITE_API } from '../SiteAPI.js'
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'LoginForm',
  methods:
  {
    tryLogin: async function () {  
      if(this.username != '')
      {
        let url = SITE_API.PATH + SITE_API.USER_PATH + 'username/' + this.username;
        fetch(url)   
              .then(response => {
                  return response.json();
              })
              .then(data => {
                  if(data != null)
                  {
                    if(this.username == data.Username && this.password == data.Password)
                    {
                      this.$root.$User = data;
                      this.$router.push({path: '/account/profile'})
                    }
                  }
              });
      }
      this.errorMessage = "Incorrect username and/or password!";
    }
  },
  data: () => ({
    SITE_API: SITE_API,
    username: '',
    usernameRules: [value => {
      if (value?.length > 0) return true

      return 'Username is required'
    }],
    password: '',
    passwordRules: [value => {
      if (value?.length > 0) return true

      return 'Password is required'
    }],
    errorMessage: ''
  })
})
</script>
<style scoped>

.glow-border {
  box-shadow: 0px 0px 5px 5px var(--electric-blue);
}

</style>