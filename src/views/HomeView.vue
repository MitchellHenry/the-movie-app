<template>
  <MovieCarousel :moviePromise="getMovies('popular',1 , 1,'movie')" title="Popular movies" />
  <MovieCarousel :moviePromise="getMovies('top_rated',2 , 1,'movie')" title="Top rated movies" />
  <MovieCarousel :moviePromise="getMovies('movie', 3, 1, 'discover', 27)" title="Horror movies" />
  <MovieCarousel :moviePromise="getMovies('movie', 3, 1, 'discover', 53)" title="Thriller movies" />
  <MovieCarousel :moviePromise="getMovies('movie', 3, 1, 'discover', 35)" title="Comedy movies" />
  <MovieCarousel :moviePromise="getMovies('movie', 3, 1, 'discover', 28)" title="Action movies" />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import MovieCarousel from '../components/MovieCarousel.vue';
import { getMovies } from '../MovieAPI.js'

export default defineComponent({
  name: 'HomeView',
  components: {
    MovieCarousel,
  },
  methods: { 
    getMovies
  }
});
</script>