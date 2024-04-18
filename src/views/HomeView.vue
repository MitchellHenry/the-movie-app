<template>
  <MovieCarousel :moviePromise="getMovies('popular', 1)" title="Popular" />
  <MovieCarousel :moviePromise="getMovies('top_rated', 1)" title="Top rated" />
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


