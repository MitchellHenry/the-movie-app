<template>
  <div class="d-flex flex-column justify-content-between h-100 m-3">
    <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4 d-flex align-center">
      <h3 class="text-light me-3 mb-4">Filter by genre: </h3>
      <v-select
      clearable
      :items="genres"
      item-title="name"
      item-value="id"
      v-model="selectedGenre"
      @update:modelValue="$refs.paginate.selectFirstPage();"
      variant="outlined"
    ></v-select>
    </div>
    <div class="d-flex flex-column align-center" v-if="!initialized">
      <v-progress-circular color="blue-lighten-1" model-value="20" :size="128" :width="12" indeterminate></v-progress-circular>
      <h1 class="text-primary" >Searching</h1>
    </div>
    <div class="d-flex flex-column align-center" v-if="filterMovies().length == 0">
      <h1 class="text-primary" >No Movies found be more specific</h1>
    </div>
    <div class="grid-container">
      <MoviePoster
        class="m-2"
        v-for="movie in paginatedMovies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
    <paginate
      class="mt-3"
      ref="paginate"
      :page-count="totalPages"
      :v-model="currentPage"
      :click-handler="setCurrentPage"
      :container-class="'pagination'" 
      :active-class="'currentPage'"
      :prev-text="'Previous'"
      :page-range="getPageRange"
      :next-text="'Next'"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import { getMovies, searchMovies, getGenres, MOVIE_API } from '../MovieAPI.js'

// Components
import MoviePoster from '../components/MoviePoster.vue';
import Paginate from "vuejs-paginate-next";

export default defineComponent({
  name: 'MovieSearchView',
  beforeCreate() {
    if(this.genres != [])
    {
      getGenres().then(result => {this.genres = result;});
    }
    let moviePromise;
    if(this.$route.query.searchParameter == "")
    {
      moviePromise = getMovies('discover', 1, 10, 'movie', this.selectedGenre)
    }
    else
    {
      moviePromise = searchMovies(1, 10, this.$route.query.searchParameter)
    }
    moviePromise.then(result => { this.movies = result; this.currentPage = 1; this.initialized = true;}) 
  },
  watch: {
  '$route.query': {
    handler: function() {
      this.movies = {};
      this.initialized = false;
      if(this.genres != [])
      {
        getGenres().then(result => {this.genres = result;});
      }
      let moviePromise;
      if(this.$route.query.searchParameter == "")
      {
        moviePromise = getMovies('discover', 1, 10, 'movie', this.selectedGenre)
      }
      else
      {
        moviePromise = searchMovies(1, 10, this.$route.query.searchParameter)
      }
     //wait for promise
     moviePromise.then(result => { this.movies = result; this.currentPage = 1; this.initialized = true;})
    }}
  },
  components: {
    MoviePoster,
    paginate: Paginate
  },
  computed: {
    totalPages() {
      if(this.initialized)
      {
        return Math.ceil(this.filterMovies().length / this.MoviesPerPage);
      }
      return 0;
    },
    paginatedMovies() {
      if(this.initialized)
      {
        let startIndex = (this.currentPage - 1) * this.MoviesPerPage;
        let endIndex = startIndex + this.MoviesPerPage;
        return this.filterMovies().slice(startIndex, endIndex);
      }
      return {};
    },
    getPageRange() 
    {
      if(this.$vuetify.display.mdAndDown)
      {
        if(this.$vuetify.display.smAndDown)
        {
          return 3;
        }
        return 5;
      }
      return 10;
    }
  },
  methods: {
    setCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
      scroll(0,0);
    },
    filterMovies() 
    {
      let filteredMovies = this.movies;
        if(this.selectedGenre !== undefined && this.selectedGenre !== null) 
        {   //Filter by Genre
          try
          {
            filteredMovies = filteredMovies.filter(m => {
              if (Object.prototype.hasOwnProperty.call(m, 'genre_ids') && Array.isArray(m.genre_ids)) {
                return m.genre_ids.includes(this.selectedGenre);
              } else {
                return false;
              }
          });
          }
          catch(err)
          {
            console.log(err)
          }
        }
      return filteredMovies;
    },
    getMovies,
    searchMovies,
    getGenres
  },
  data: () => ({
    MOVIE_API: MOVIE_API,
    movies: {},
    genres: [],
    selectedGenre: null,
    initialized: false,
    currentPage: 1,
    MoviesPerPage: 24
  })
})
</script>
<style scoped>

:deep(.v-input .v-field)
{
  background-color: gray;
  
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
}

.pagination {   /* style for the whole pagination  */
  text-align: center;
  display: flex;
  justify-content: center;
}
 
:deep(.pagination a) {  /* style for the anchor */
  color: black;
  border: 1px solid #ddd;  
  float: left;
  padding: 8px 16px;
  text-decoration: none;
   
} 
:deep(.currentPage a) { 	  /* style to indicate the current page  */
  background-color: lightskyblue ;  
}

:deep(.v-img .v-img__img)
{
    position: initial;
}

@media only screen and (max-width: 1200px) {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
  }
}

@media only screen and (max-width: 600px) {
  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
  }
  h3
  {
    font-size: 4vw;
  }
}

</style>