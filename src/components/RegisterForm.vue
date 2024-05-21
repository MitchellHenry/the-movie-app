<template>
  <div class="d-flex flex-column align-items-center w-100">
    <div class="col-10">
      <h1 class="colorElectricBlue mb-3">Register!</h1>
      <div class="p-3 border border-info glow-border">
        <v-form fast-fail @submit.prevent>
            
           <v-text-field v-model="username" required label="Username" :rules="usernameRules" bg-color="grey-darken-2"
            class="mb-2"></v-text-field>
            
            <v-text-field v-model="password" type="password" required :rules="passwordRules" label="Password"
            bg-color="grey-darken-2" class="mb-2"></v-text-field>
            
            <v-text-field v-model="reenteredPassword" type="password" required :rules="reenteredPasswordRules"
            label="Re-Enter Password" bg-color="grey-darken-2" class="mb-2"></v-text-field>
             
            <v-date-input v-model="dateOfBirth" bg-color="grey-darken-2" required label="Date input" class="mb-2"></v-date-input>

            <v-text-field v-model="email" type="email" required :rules="emailRules"
            label="Email" bg-color="grey-darken-2" class="mb-2"></v-text-field>
            
            <v-btn class="mt-2 text-white" text-color="white" type="submit" @click="tryRegister" color="var(--electric-blue)"
            block>Register</v-btn>
          </v-form>
        <P class="text-primary">{{ errorMessage }}</P>
      </div>
      <div class="d-flex align-items-center mt-4">
        <h4 class="colorElectricBlue me-3">Already have an account?</h4>
        <v-btn color="var(--electric-blue)" @click="this.$router.push({ path: '/account/login' })">Sign in</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { SITE_API } from '../SiteAPI.js'

// Components

export default defineComponent({
  name: 'RegisterForm',
  beforeCreate() { },
  components: {},
  computed: {},
  methods: 
  {
    tryRegister: function()
    {

    }
  },
  data: () => ({
    SITE_API: SITE_API,
    username: '',
    usernameRules: [value => {
      if (value?.length > 10) return true

      return 'Username is required'
    }],
    password: '',
    passwordRules: [value => {
      if (value?.length > 8) return true

      return 'Password is required'
    }],
    reenteredPassword: '',
    reenteredPasswordRules: [],
    dateOfBirth: [],
    email: '',
    emailRules: [],
    errorMessage: ''
  })
})
</script>
<style scoped>
.glow-border {
  box-shadow: 0px 0px 5px 5px var(--electric-blue);
}
:deep(.v-input__prepend)
{
  background-color: #616161;
  margin-inline-end:0px;
  padding-right: 4px;
  border-bottom: white 1px;
}
:deep(.v-btn__content)
{
  color:black;
}
</style>

<style>
.v-date-picker-month__day-btn .v-btn__content
{
  color:black;
}
.v-field
{
  border-radius: 0px;
}
</style>