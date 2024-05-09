<template>
  <div class="d-flex flex-column justify-content-between h-100 m-3">
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
      :page-count="totalPages"
      :v-model="currentPage"
      :click-handler="setCurrentPage"
      :container-class="'pagination'" 
      :active-class="'currentPage'"
      :prev-text="'Previous'"
      :page-range="10"
      :next-text="'Next'"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import { searchMovies } from '../MovieAPI.js'
import { MOVIE_API } from '@/MovieAPI' 

// Components
import MoviePoster from '../components/MoviePoster.vue';
import Paginate from "vuejs-paginate-next";

export default defineComponent({
  name: 'MovieSearchView',
  beforeCreate() {
    let moviePromise = searchMovies(1, 10, undefined, this.$route.query.searchParameter)
     //wait for promise
     moviePromise.then(result => { this.movies = result; this.currentPage = 1; this.initialized = true;}) 
  },
  watch: {
  '$route.query': {
    handler: function() {
      this.initialized = false;
      let moviePromise = searchMovies(1, 10, undefined, this.$route.query.searchParameter)
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
        return Math.ceil(this.movies.length / this.MoviesPerPage);
      }
      return 0;
    },
    paginatedMovies() {
      if(this.initialized)
      {
        let startIndex = (this.currentPage - 1) * this.MoviesPerPage;
        let endIndex = startIndex + this.MoviesPerPage;
        return  this.movies.slice(startIndex, endIndex);
      }
      return {};
    }
  },
  methods: {
    setCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
      scroll(0,0);
    },
    searchMovies
  },
  data: () => ({
    MOVIE_API: MOVIE_API,
    movies: {},
    initialized: false,
    currentPage: 1,
    MoviesPerPage: 24
  })
})
</script>
<style scoped>

.carousel__pagination
{
  background-color: aqua;
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

</style>