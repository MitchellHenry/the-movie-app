<template>
  <v-app>
    <v-main>
      <div>
      <!-- Header -->
      <div class="row header-row sticky-top border-bottom">
        <div class="col-3 col-md-1 d-flex pe-0">
         <v-img
         src="./assets/TheMovieAppLogo.png"
         :aspect-ratio="1"
         class="border-end pointer"
         @click="this.$router.push({path: '/'});"
         alt="The movie app logo">
         </v-img>
         <v-img
         :src="MOVIE_API.API_LOGO_PATH"
         :aspect-ratio="1"
         alt="Logo of the Movie DB API">
         </v-img>
        </div>
        <div class="col-7 col-md-10 mt-md-5 mt-1 pe-0 d-flex">
          <v-text-field label="Search for movie..." class="h-25" bg-color="grey-darken-2" v-model="movieSearchText" @keyup.enter="movieSearch" type="input"></v-text-field>
          <v-btn icon="mdi-magnify" class="mt-2" color="grey-darken-2" @click="movieSearch"></v-btn>
        </div>
        <div class="col-1 d-flex justify-content-end align-items-md-center pe-4">
          <v-app-bar-nav-icon class="nav" :ripple="false" variant="plain" color="var(--electric-blue)" @click.stop="drawer = !drawer" x-large></v-app-bar-nav-icon>
        </div>
      </div>
      <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : 'right'"
      class="border-electric"
      temporary
      >    
        <v-list>
          <div>
          <v-list-item>
            <v-btn append-icon="mdi-home" color="var(--electric-blue)" class="text-white" @click="this.$router.push({path: '/'});">Home</v-btn>
          </v-list-item>  
          <v-list-item>
            <v-btn color="var(--electric-blue)" class="text-white" @click="this.$router.push({path: '/vote'});">Vote now!</v-btn>
          </v-list-item>  
          <v-list-item v-if="authorised()">
            <v-btn  class="text-white" color="var(--electric-blue)">Manage polls</v-btn>
          </v-list-item>
        </div>
        <div>
          <v-list-item v-if="!Object.prototype.hasOwnProperty.call(this.$root.$User, 'Username')">
            <v-btn color="var(--electric-blue)" class="text-white" @click="this.$router.push({path: '/account/login'})">Sign In</v-btn>
          </v-list-item>  
          <v-list-item v-if="!Object.prototype.hasOwnProperty.call(this.$root.$User, 'Username')">
            <v-btn color="var(--electric-blue)" class="text-white" @click="this.$router.push({path: '/account/register'})">Register</v-btn>
          </v-list-item>  
          <v-list-item v-if="Object.prototype.hasOwnProperty.call(this.$root.$User, 'Username')">
            <v-btn append-icon="mdi-account-circle" class="text-white"  @click="this.$router.push({path: '/account/profile'})" color="var(--electric-blue)">Account</v-btn>
          </v-list-item>  
          <v-list-item v-if="Object.prototype.hasOwnProperty.call(this.$root.$User, 'Username')">
            <v-btn append-icon="mdi-logout" class="text-white"  @click="this.$root.$User = {}; this.$router.push({ path: '/' })" color="var(--electric-blue)">Logout</v-btn>
          </v-list-item>  
        </div>
        </v-list>   
      </v-navigation-drawer>
      <router-view/>
      <!-- Footer -->
      <v-footer :app="true" :absolute="true"  color="black" class="d-flex justify-content-between pt-1 w-100 border-top">
        <p class="ms-3 colorElectricBlue"><strong>The-Movie-App</strong> Copyright © {{ new Date().getFullYear() }}</p>
        <p class="me-3 pt-1 colorElectricBlue">This website uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.</p>
      </v-footer>
    </div>
    </v-main>
  </v-app>
</template>

<script>
import { MOVIE_API } from './MovieAPI';
export default {
  name: 'App',

  data: () => ({
    MOVIE_API: MOVIE_API,
    movieSearchText: '',
    drawer: false
  }),
  methods: 
  {
    movieSearch()
    {
      this.$router.push({path: '/search', query : { searchParameter: this.movieSearchText,timestamp: new Date().getTime()}});
    },
    authorised()
    {
      if(Object.prototype.hasOwnProperty.call(this.$root.$User, 'Admin'))
      {
        return (this.$root.$User.Admin == "1");
      }
      return false; 
    }
  }
}
</script>
<style>
.glow-border {
  box-shadow: 0px 0px 5px 5px var(--electric-blue);
}

.border-electric
{
  border-color: var(--electric-blue);
}

.pointer
{
  cursor: pointer;
}

:root {
  --electric-blue: #0096FF; 
}

.colorElectricBlue
{
  color: var(--electric-blue);
}

</style>
<style scoped>



*
{
  user-select: none;
  background: black;
}

:deep(.mdi-menu)
{
  font-size: 3vw;
}

:deep(.v-btn__content:hover)
{
  background-color:  inherit;
}

:deep(.v-navigation-drawer)
{
  background-color:  inherit;
}

:deep(.v-navigation-drawer .v-list)
{
  margin-top: 0%;
}

:deep(.v-btn--icon)
{
  border-radius: 0%;
}

p
{
  font-size:1vw;;
}

@media only screen and (min-width: 1268px) {
  :deep(.v-navigation-drawer .v-list)
  {
    margin-top: 50%;
  }
}

@media only screen and (max-width: 600px) {
  p
  {
    font-size:2vw;;
  }
  :deep(.v-btn__content)
  {
    font-size: 4vw;
  }
  :deep(.mdi-menu)
  {
    font-size: 15vw;
  }
}
</style>