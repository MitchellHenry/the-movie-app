<template>
    <div class="d-flex flex-column justify-content-between mt-1 mb-20">
      <div class="row">
        <div class="col-6 col-md-4 col-lg-3 ms-3 text-center ms-md-5 h-75">
          <h2 class="text-primary">{{movie.original_title}}</h2>
          <MoviePoster v-if="initialized" class="mb-2 mt-3 ms-5 w-75" :movie="movie"></MoviePoster>
          <h3 class="text-primary m-0">{{movie.tagline}}</h3>
          <div v-if="this.$vuetify.display.smAndDown">
            <p class="text-primary"><b>Genres:</b> {{getGenreList}}</p>
            <p class="text-primary"><b>Runtime:</b> {{movie.runtime}} minutes</p>
            <p class="text-primary"><b>Release Date:</b> {{movie.release_date}}</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <p class="text-primary"><b>Overview:</b><br> {{movie.overview}}</p>
          <div v-if="!this.$vuetify.display.smAndDown">
            <p class="text-primary"><b>Genres:</b> {{getGenreList}}</p>
            <p class="text-primary"><b>Runtime:</b> {{movie.runtime}} minutes</p>
            <p class="text-primary"><b>Release Date:</b> {{movie.release_date}}</p>
          </div>
        </div>  
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  import { getMovieDetail } from '../MovieAPI.js'
  import { MOVIE_API } from '@/MovieAPI' 
  
  // Components
  import MoviePoster from '../components/MoviePoster.vue';
  
  export default defineComponent({
    name: 'MovieSearchView',
    beforeCreate() {
      let moviePromise = getMovieDetail(this.$route.params.id);
      moviePromise.then(result => { this.movie = result; this.initialized = true;}) 
    },
    components: {
      MoviePoster
    },
    computed: 
    {
      getGenreList()
      {
        if(this.initialized)
        {
          let genres = "";

          if (Object.prototype.hasOwnProperty.call(this.movie, 'genre_ids') && Array.isArray(this.movie.genre_ids)) {
            this.movie.genres.forEach((genre) => {genres += genre.name + ", "});
            genres = genres.substring(0, genres.length - 2);
          }
          return genres
        }
        return "";
      }
    },
    data: () => ({
      MOVIE_API: MOVIE_API,
      movie: {},
      initialized: false
    })
  })
  </script>
<style scoped>

  :deep(.v-img .v-img__img)
  {
    position: initial;
  }

</style>