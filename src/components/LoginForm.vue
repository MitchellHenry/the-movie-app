<template>
  <div class="d-flex flex-column align-items-center w-100">
    <div class="col-10">
      <div class="mb-3 mt-5 mt-md-0">
        <h1 v-electric-text>Login!</h1>
      </div>
      <div class="p-3 border border-info" v-glow-electric-border>
        <v-form fast-fail @submit.prevent>
          <v-text-field v-model="form.username" required label="Username" :rules="usernameRules"
            bg-color="grey-darken-2" class="mb-2"></v-text-field>
          <v-text-field v-model="form.password" type="password" required :rules="passwordRules" label="Password"
            bg-color="grey-darken-2"></v-text-field>

          <v-btn class="mt-2 text-white" type="submit" @click="tryLogin" v-electric-bg block>Login</v-btn>
        </v-form>
        <P class="text-electric-blue">{{ errorMessage }}</P>
      </div>
      <div class="mb-5 pb-5">
        <v-btn class="mt-5 mb-5 text-white" @click="this.$router.push({ path: '/account/register' })" type="btn"
          v-electric-bg block>Register Here!</v-btn>
      </div>
    </div>
  </div>
</template>

<script>

import { GetUser } from '../SiteAPI.js'
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'LoginForm',
  methods:
  {
    //Try login user
    tryLogin: async function () {
      if (this.form.username != '') {
        GetUser(this.form.username).then(data => {
          if (data != null) {
            if (this.form.username == data.Username && this.form.password == data.Password) {
              this.$root.$User = data;
              this.$router.push({ path: '/account/profile' })
            }
            else {
              this.errorMessage = "Incorrect username and/or password!";
            }
          }
          else {
            this.errorMessage = "Incorrect username and/or password!";
          }
        });
      }
    }
  },
  data: () => ({
    form:
    {
      username: '',
      password: '',
    },
    usernameRules: [value => {
      if (value?.length > 0) return true

      return 'Username is required'
    }],
    passwordRules: [value => {
      if (value?.length > 0) return true

      return 'Password is required'
    }],
    errorMessage: ''
  })
})
</script>
<style scoped></style>