<template>
    <div class="d-flex flex-column justify-content-between mt-1 mb-20">
      <div class="row">
        <div class="col-12 col-md-4 col-xl-3 ms-3 text-center ms-md-5 h-75">
          <h2 class="text-primary">{{movie.original_title}}</h2>
          <MoviePoster v-if="initialized" class="mb-2 mt-3 ms-5 w-75" :movie="movie"></MoviePoster>
          <div class="d-flex justify-content-center mb-3 mt-3">
            <v-btn append-icon="mdi-thumb-up-outline" @click="LikeDislikedMovie(true)" :variant="LikedVariant"  color="#2ECC71" class="me-2 w-30 border border-success text-white">Like</v-btn>
            <v-btn append-icon="mdi-thumb-down-outline" @click="LikeDislikedMovie(false)" :variant="disLikedVariant" color="#E74C3C"  class="w-30 border border-danger text-white">Dislike</v-btn>
          </div>
          <h3 class="text-primary m-0">{{movie.tagline}}</h3>
          <div v-if="this.$vuetify.display.smAndDown">
            <p class="text-primary"><b>Genres:</b> {{getGenreList}}</p>
            <p class="text-primary"><b>Runtime:</b> {{movie.runtime}} minutes</p>
            <p class="text-primary"><b>Release Date:</b> {{movie.release_date}}</p>
            <p class="text-primary"><b>Budget:</b> {{formattedBudget}}</p>
            <p class="text-primary"><b>Revenue:</b> {{formattedRevenue}}</p>
          </div>
        </div>
        <div class="col-11 col-md-3 ms-2">
          <p class="text-primary"><b>Overview:</b><br> {{movie.overview}}</p>
          <div v-if="!this.$vuetify.display.smAndDown">
            <p class="text-primary"><b>Genres:</b> {{getGenreList}}</p>
            <p class="text-primary"><b>Runtime:</b> {{movie.runtime}} minutes</p>
            <p class="text-primary"><b>Release Date:</b> {{movie.release_date}}</p>
            <p class="text-primary"><b>Budget:</b> {{formattedBudget}} </p>
            <p class="text-primary"><b>Revenue:</b> {{formattedRevenue}}</p>
          </div>
        </div>  
      </div>
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
    async beforeCreate() {
      let moviePromise = getMovieDetail(this.$route.params.id);
      await moviePromise.then(result => { this.movie = result; this.initialized = true;});
      if(Object.prototype.hasOwnProperty.call(this.$root.$User, 'Username'))
      {
        this.initialized = false;
        let MoviesLikedPromise = GetLikeDislikedMovies(this.$root.$User.UserID); 
        MoviesLikedPromise.then(result => {
          if(Array.isArray(result))
          {
            let currentMovie = result.filter(lm => lm.MovieID == this.movie.id)[0];
            if(Object.prototype.hasOwnProperty.call(currentMovie, 'Rated'))
            {
              console.log(currentMovie.Rated)
              if(currentMovie.Rated == "1")
              {
                this.disLikedVariant = "text";
              }
              else
              {
                this.LikedVariant = "text";
              }
            }
          }
          this.initialized = true;
      })
      }
    },
    components: {
      MoviePoster
    },
    computed: 
    {
      getGenreList()
      {
          let genres = "";
          if (Object.prototype.hasOwnProperty.call(this.movie, 'genres') && Array.isArray(this.movie.genres)) {
            this.movie.genres.forEach((genre) => {genres += genre.name + ", "});
            genres = genres.substring(0, genres.length - 2);
          }
          return genres
      },
      formattedBudget() {
        return "$" + (this.movie.budget / 1000000).toFixed(2) + 'M';
      },
      formattedRevenue() {
        return "$" + (this.movie.revenue / 1000000).toFixed(2) + 'M';
      }
    },
    data: () => ({
      movie: {},
      initialized: false,
      LikedVariant: "flat",
      disLikedVariant: "flat"
    }),
    methods: 
    {
      LikeDislikedMovie(rating)
      {
        if(Object.prototype.hasOwnProperty.call(this.$root.$User, 'Username'))
        {
          let newRating = {
            MovieID: this.movie.id,
            UserID: this.$root.$User.UserID,
            Rated: rating
          };
          PostLikeDislikeMovie(newRating).then( () => 
          {
            this.LikedVariant = "text";
            this.disLikedVariant = "text";
            if(rating)
            {
              this.LikedVariant = "flat";
            }
            else
            {
              this.disLikedVariant = "flat";
            }
          });
        }
        else
        {
          alert('Sign in to Like and Dislike!')
        }
      }
    }
  })
  </script>
<style scoped>

  :deep(.v-img .v-img__img)
  {
    position: initial;
  }

  .w-30
  {
    width:30%;
  }
</style>