<template>
  <div class="d-flex flex-column align-items-center w-100">
    <div class="col-10">
      <h1 class="colorElectricBlue mb-3">Register!</h1>
      <div class="p-3 border border-info glow-border">
        <v-form fast-fail @submit.prevent>

          <div class="row">
            <div class="col-12">
              <v-text-field v-model="form.username" required label="Username" :rules="usernameRules"
                bg-color="grey-darken-2" class="mb-2"></v-text-field>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6">
              <v-text-field v-model="form.password" type="password" required :rules="passwordRules" label="Password"
                bg-color="grey-darken-2" class="mb-2"></v-text-field>
            </div>
            <div class="col-12 col-md-6">
              <v-text-field v-model="form.confirmPassword" type="password" required :rules="confirmPasswordRules()"
                label="Re-Enter Password" bg-color="grey-darken-2" class="mb-2"></v-text-field>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6">
              <v-text-field v-model="form.firstname" required label="First Name" :rules="firstNameRules"
                bg-color="grey-darken-2" class="mb-2"></v-text-field>
            </div>
            <div class="col-12 col-md-6">
              <v-text-field v-model="form.lastname" required label="Last Name" :rules="LastNameRules"
                bg-color="grey-darken-2" class="mb-2"></v-text-field>
            </div>
          </div>
          <v-date-input v-model="this.form.dateOfBirth" :max="new Date()" :rules="dateRules" prepend-icon=""
            bg-color="grey-darken-2" required label="Click to enter Date of birth"></v-date-input>

          <v-text-field v-model="form.email" type="email" required :rules="emailRules" label="Email"
            bg-color="grey-darken-2" class="mb-2 mt-2"></v-text-field>

          <v-btn class="mt-2 text-white" type="submit" @click="tryRegister" color="var(--electric-blue)"
            block>Register</v-btn>
        </v-form>
        <P class="text-primary">{{ errorMessage }}</P>
      </div>
      <div class="d-flex align-items-center mt-4 mb-5">
        <h4 class="colorElectricBlue me-3 text-white">Already have an account?</h4>
        <v-btn color="var(--electric-blue)" class="text-white"
          @click="this.$router.push({ path: '/account/login' })">Sign in</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { GetUser, PostRegister } from '../SiteAPI.js'

// Components

export default defineComponent({
  name: 'RegisterForm',
  beforeCreate() { },
  components: {},
  computed: {},
  methods:
  {
    tryRegister: function () {
      let uniqueUsername = true;
      GetUser(this.form.username).then(data => {
        if (data != null) {
          uniqueUsername = false;
          this.errorMessage = "Username is already taken!"
        }
      });
      if (uniqueUsername) {
        let newUser =
        {
          Username: this.form.username,
          Password: this.form.password,
          Admin: false,
          DOB: this.form.dateOfBirth.toISOString().slice(0, 10),
          Email: this.form.email
        }
        PostRegister(newUser).then(() => {
          this.$root.$User = newUser;
          this.$router.push({ path: '/account/profile' });
        }).catch(error => {
          this.errorMessage = 'There was an error!' + error;
        });
      }
    }
  },
  data: () => ({
    form: {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      dateOfBirth: null,
      email: ''
    },
    LastNameRules: [
      v => !!v || 'Last name required',
      v => /[a-zA-Z]$/.test(v) || 'Name must be letters only'
    ],
    firstNameRules: [
      v => !!v || 'First name required',
      v => /[a-zA-Z]$/.test(v) || 'Name must be letters only'
    ],
    usernameRules: [
      v => !!v || 'Username is required',
      v => v.length > 10 || 'Username must be minimum 10 characters long'
    ],
    passwordRules: [v => !!v || 'Password is required',
    v => v.length > 7 || 'Password must be minimum 8 characters long',
    v => /^(?=.*?[$%^&*]).{8,}$/.test(v) || 'Password must contain at least 1 special character'],
    confirmPasswordRules() {
      return [
        v => v === this.form.password || 'Does not match password entered above'
      ]
    },
    dateRules: [v => !!v || 'Date of birth is required'],
    emailRules: [v => !!v || 'Email is required',
    v => /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(v) || 'Email must be valid'],
    errorMessage: ''
  })
})
</script>
<style scoped>
@media only screen and (max-width: 600px) {
  h4 {
    font-size: 4vw;
  }
}
</style>

<style>
.v-date-picker-month__day-btn .v-btn__content {
  color: black;
}
</style>