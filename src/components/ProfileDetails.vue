<template>
  <div class="w-100 d-flex flex-column align-items-center mt-5 mb-20 ">
    <div class="w-90 w-md-75 p-3" v-glow-electric-border>
      <div class="d-flex justify-content-between">
        <div class="container">
          <div class="d-flex justify-content-between">
            <div class="col-8">
              <h1 v-electric-text class="text-decoration-underline">Profile Details</h1>
            </div>
            <div class="col-4 col-md-2 ">
              <v-btn class="text-white" append-icon="mdi-logout"
                @click="this.$root.$User = {}; this.$router.push({ path: '/' })" type="btn" v-electric-bg
                block>Logout</v-btn>
            </div>
          </div>
          <div class="row mb-3">
            <div class=" col-12 col-md-3 heading">
              <h4 v-electric-text>Username: {{ this.$root.$User.Username }} </h4>
            </div>
            <div class="col-12 col-md-4 heading">
              <h4 v-electric-text>Name: {{ this.$root.$User.Firstname }} {{ this.$root.$User.Lastname }}</h4>
            </div>
            <div class="col-12 col-md-3 heading">
              <h4 v-electric-text>Total Liked Movies: {{ likedMoviesCount }}</h4>
            </div>
            <div class="col-12 col-md-3 heading">
              <h4 v-electric-text>Birth Date: {{ this.$root.$User.DOB }}</h4>
            </div>
            <div class="col-12 col-md-6 heading">
              <h4 v-electric-text>Email: {{ this.$root.$User.Email }} </h4>
            </div>
            <div class="col-12 col-md-6 mt-md-3 heading">
              <h4 v-electric-text>Liked Movies:
              </h4>
              <v-autocomplete v-electric-text v-model="selectedMovieID" label="Choose Liked Movie" :items="likedMovies"
                item-color="#0096FF" item-title="original_title" item-value="id" variant="outlined"></v-autocomplete>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-2 mb-3 mb-md-1 mt-md-3" v-if="selectedMovieID != null">
              <MoviePoster :movie="currentMovie" />
            </div>
            <div class="col-12 col-md-4 mb-1 mt-md-3" v-if="selectedMovieID != null">
              <p v-electric-text><b>Overview:</b><br> {{ currentMovie.overview }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { GetLikeDislikedMovies } from '../SiteAPI.js'
import { getMovieDetail } from '../MovieAPI.js'
import MoviePoster from './MoviePoster.vue'

// Components  
export default defineComponent({
  name: 'ProfileDetails',
  //Get the liked/disliked movies to add to the dropdown as well as all their details
  beforeCreate() {
    if (!Object.prototype.hasOwnProperty.call(this.$root.$User, 'Username')) {
      this.$router.push('/');
    }
    GetLikeDislikedMovies(this.$root.$User.UserID).then(result => {
      let LikedMoviesRecords = result.filter(lm => lm.Rated == "1");
      this.likedMoviesCount = LikedMoviesRecords.length;
      LikedMoviesRecords.forEach(lm => {
        getMovieDetail(lm.MovieID).then(result => { this.likedMovies.push(result); })
      });
    });
  },
  components:
  {
    MoviePoster
  },
  data: () => ({
    likedMovies: [],
    selectedMovieID: null,
    likedMoviesCount: 0
  }),
  computed:
  {
    //Get current movie
    currentMovie: function () {
      return this.likedMovies.filter(lm => lm.id == this.selectedMovieID)[0];
    }
  }
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