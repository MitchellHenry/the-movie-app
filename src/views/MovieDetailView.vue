<template>
  <div class="d-flex flex-column justify-content-between mt-1 mb-20" v-if="this.initialized">
    <div class="row">
      <div class="col-12 col-md-4 col-xl-3 ms-3 text-center ms-md-5 h-75">
        <h2 v-electric-text>{{ movie.original_title }}</h2>
        <MoviePoster class="mb-2 mt-3 ms-5 w-75" :movie="movie"></MoviePoster>
        <div class="d-flex justify-content-center mb-3 mt-3">
          <v-btn append-icon="mdi-thumb-up-outline" @click="LikeDislikedMovie(true)" :variant="LikedVariant"
            color="#2ECC71" class="me-2 w-30 border border-success text-white">Like</v-btn>
          <v-btn append-icon="mdi-thumb-down-outline" @click="LikeDislikedMovie(false)" :variant="disLikedVariant"
            color="#E74C3C" class="w-30 border border-danger text-white">Dislike</v-btn>
        </div>
        <h3 v-electric-text class="m-0">{{ movie.tagline }}</h3>
        <div v-if="this.$vuetify.display.smAndDown">
          <p v-electric-text><b>Genres:</b> {{ getGenreList }}</p>
          <p v-electric-text><b>Runtime:</b> {{ movie.runtime }} minutes</p>
          <p v-electric-text><b>Release Date:</b> {{ movie.release_date }}</p>
          <p v-electric-text><b>Budget:</b> {{ formattedBudget }}</p>
          <p v-electric-text><b>Revenue:</b> {{ formattedRevenue }}</p>
        </div>
      </div>
      <div class="col-11 col-md-3 ms-2">
        <p v-electric-text><b>Overview:</b><br> {{ movie.overview }}</p>
        <div v-if="!this.$vuetify.display.smAndDown">
          <p v-electric-text><b>Genres:</b> {{ getGenreList }}</p>
          <p v-electric-text><b>Runtime:</b> {{ movie.runtime }} minutes</p>
          <p v-electric-text><b>Release Date:</b> {{ movie.release_date }}</p>
          <p v-electric-text><b>Budget:</b> {{ formattedBudget }} </p>
          <p v-electric-text><b>Revenue:</b> {{ formattedRevenue }}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="d-flex flex-column h-100 pb-5 justify-content-center align-center" v-if="!initialized">
    <v-progress-circular color="blue-lighten-1 pb-3" model-value="20" :size="128" :width="12"
      indeterminate></v-progress-circular>
    <h1 v-electric-text>Retrieving movie details. Please wait!</h1>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import { getMovieDetail } from '@/MovieAPI'
import { PostLikeDislikeMovie, GetLikeDislikedMovies } from '@/SiteAPI'

// Components
import MoviePoster from '../components/MoviePoster.vue';

export default defineComponent({
  name: 'MovieSearchView',
  //Get all movie details and determine if the user has signed in and provided a liked/disliked rating
  async beforeCreate() {
    let moviePromise = getMovieDetail(this.$route.params.id);
    await moviePromise.then(result => { this.movie = result; });
    if (Object.prototype.hasOwnProperty.call(this.$root.$User, 'Username')) {
      let MoviesLikedPromise = GetLikeDislikedMovies(this.$root.$User.UserID);
      MoviesLikedPromise.then(result => {
        if (result.length > 0) {
          let currentMovie = result.filter(lm => lm.MovieID == this.movie.id)[0];
          if (currentMovie != null) {
            if (Object.prototype.hasOwnProperty.call(currentMovie, 'Rated')) {
              if (currentMovie.Rated == "1") {
                this.disLikedVariant = "text";
              }
              else {
                this.LikedVariant = "text";
              }
            }
          }
        }
      })
    }
    this.initialized = true;
  },
  components: {
    MoviePoster
  },
  computed:
  {
    //Get the string of Genres to display for movie details
    getGenreList() {
      let genres = "";
      if (Object.prototype.hasOwnProperty.call(this.movie, 'genres') && Array.isArray(this.movie.genres)) {
        this.movie.genres.forEach((genre) => { genres += genre.name + ", " });
        genres = genres.substring(0, genres.length - 2);
      }
      return genres
    },
    //format the budget the movie made
    formattedBudget() {
      return "$" + (this.movie.budget / 1000000).toFixed(2) + 'M';
    },
    //format the revenue the movie made
    formattedRevenue() {
      return "$" + (this.movie.revenue / 1000000).toFixed(2) + 'M';
    }
  },
  data: () => ({
    movie: {},
    LikedVariant: "flat",
    disLikedVariant: "flat",
    initialized: false
  }),
  methods:
  {
    //Like/Dislike the movie 
    LikeDislikedMovie(rating) {
      if (Object.prototype.hasOwnProperty.call(this.$root.$User, 'Username')) {
        let newRating = {
          MovieID: this.movie.id,
          UserID: this.$root.$User.UserID,
          Rated: rating
        };
        PostLikeDislikeMovie(newRating).then(() => {
          this.LikedVariant = "text";
          this.disLikedVariant = "text";
          if (rating) {
            this.LikedVariant = "flat";
          }
          else {
            this.disLikedVariant = "flat";
          }
        });
      }
      else {
        alert('Sign in to Like and Dislike!')
      }
    }
  }
})
</script>
<style scoped>
:deep(.v-img .v-img__img) {
  position: initial;
}

@media only screen and (max-width: 600px) {
  h1 {
    font-size: 5vw;
  }
}

.w-30 {
  width: 30%;
}
</style>