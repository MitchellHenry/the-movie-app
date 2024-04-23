<template>
  <v-app>
    <v-main>
      <div class="d-flex flex-column justify-content-between h-100">
      <!-- Header -->
      <div class="row header-row">
        <div class="col-4 col-md-2 d-flex">
         <v-img
         src="./assets/TheMovieAppLogo.png"
         :aspect-ratio="1"
         class="border-end"
         alt="The movie app logo">
         </v-img>
         <v-img
         :src="MOVIE_API.API_LOGO_PATH"
         :aspect-ratio="1"
         alt="Logo of the Movie DB API">
         </v-img>
       </div>
       <div class="col-8 col-md-6 d-flex align-items-center">
          <v-text-field label="Search for movie..." bg-color="grey-darken-2" v-model="movieSearchText" type="input" append-inner-icon="mdi-magnify" @click:append-inner="movieSearch"></v-text-field>
       </div>
       <div>

       </div>
      </div>
      <router-view/>
      <!-- Footer -->
      <div class="d-flex border-top border-light mt-2 justify-content-between pt-1">
        <p class="ms-3 text-light  text-decoration-underline">The-Movie-App Copyright © 2024</p>
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
    movieSearchText: ''
  }),
  methods: 
  {
    movieSearch()
    {
      alert(this.movieSearchText);
    }
  }
}
</script>
<style scoped>

*
{
  background-color: black;
}

p
{
  font-size:1vw;;
}
.header-row
{
  height:20%;
}
@media only screen and (max-width: 600px) {
  p
  {
    font-size:2vw;;
  }
}
</style>