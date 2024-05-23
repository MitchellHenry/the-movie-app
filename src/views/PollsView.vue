<template>
    <MoviePoll />
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  // Components
  import MoviePoll from '../components/MoviePoll.vue';

  export default defineComponent({
    name: 'PollsView',
    components: {
        MoviePoll,
    },
    methods: { 
      getPolls: function()
      {

      }
    }
  });
  </script>