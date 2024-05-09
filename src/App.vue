<template>
  <v-app>
    <v-main>
      <div class="h-100 d-flex flex-column justify-content-between">
      <!-- Header -->
      <div class="row header-row sticky-top border-bottom">
        <div class="col-3 col-md-1 d-flex pe-0">
         <v-img
         src="./assets/TheMovieAppLogo.png"
         :aspect-ratio="1"
         class="border-end pointer"
         @click="this.$router.push({path: '/'})"
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
          <v-app-bar-nav-icon class="nav" :ripple="false" variant="plain" color="grey-darken-2" @click.stop="drawer = !drawer" x-large></v-app-bar-nav-icon>
        </div>
      </div>
      <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : 'right'"
      temporary
      >    
        <v-list>
          <v-list-item>
            <v-btn color="grey-darken-2" @click="this.$router.push({path: '/'})">Home</v-btn>
          </v-list-item>  
          <v-list-item>
            <v-btn color="grey-darken-2">Vote now!</v-btn>
          </v-list-item>  
          <v-list-item v-if="!signedIn">
            <v-btn color="grey-darken-2">Sign In</v-btn>
          </v-list-item>  
          <v-list-item v-if="signedIn">
            <v-btn append-icon="mdi-account-circle" color="grey-darken-2">Account</v-btn>
          </v-list-item>  
          <v-list-item v-if="signedIn">
            <v-btn append-icon="mdi-account-circle" color="grey-darken-2">Logout</v-btn>
          </v-list-item>  
        </v-list>   
      </v-navigation-drawer>
      <router-view/>
      <!-- Footer -->
      <div class="d-flex justify-content-between pt-1 border-top">
        <p class="ms-3 text-light text-decoration-underline">The-Movie-App Copyright © 2024</p>
        <p class="me-3 pt-1 text-info">This website uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.</p>
      </div>
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
    signedIn: false,
    drawer: false
  }),
  methods: 
  {
    movieSearch()
    {
      this.$router.push({path: '/search', query : { searchParameter: this.movieSearchText}});

    }
  }
}
</script>
<style>
.pointer
{
  cursor: pointer;
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
  margin-top:8%;
}

:deep(.v-btn--icon)
{
  border-radius: 0%;
}

p
{
  font-size:1vw;;
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