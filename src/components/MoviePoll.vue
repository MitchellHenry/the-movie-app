<template>
    <div class="d-flex flex-column justify-content-between mt-1">
  
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  import { getMovieDetail } from '../MovieAPI.js'
  import { MOVIE_API } from '@/MovieAPI' 
  import { SITE_API } from '@/SiteAPI.js';

  // Components
  //import VuePoll from 'vue-poll'
 // import MoviePoster from '../components/MoviePoster.vue';
  
  export default defineComponent({
    name: 'MovieSearchView',
    props: ["PollData"],
    beforeCreate() {
    },
    components: {
     // MoviePoster,
     // VuePoll
    },
    methods: {
        getMovieDetail
    },
    data: () => ({
      MOVIE_API: MOVIE_API,
      SITE_API: SITE_API,
      Poll_Data: {},
      initialized: false
    })
  })
  </script>
<style scoped>


</style>