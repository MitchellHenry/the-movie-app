<template>
  <MovieCarousel :moviePromise="getMovies('movie', 1, 1, 'popular')" title="Popular movies" />
  <MovieCarousel :moviePromise="getMovies('movie', 2, 1, 'top_rated')" title="Top rated movies" />
  <MovieCarousel :moviePromise="getMovies('discover', 3, 1, 'movie', 27)" title="Horror movies" />
  <MovieCarousel :moviePromise="getMovies('discover', 3, 1, 'movie', 53)" title="Thriller movies" />
  <MovieCarousel :moviePromise="getMovies('discover', 3, 1, 'movie', 35)" title="Comedy movies" />
  <MovieCarousel :moviePromise="getMovies('discover', 3, 1, 'movie', 28)" title="Action movies" />
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