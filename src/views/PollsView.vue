<template>
    <h1 class="text-electric-blue mt-3 ms-5 mb-2">Vote in polls!</h1>
    <div>
      <MoviePoll v-for="poll in polls" v-bind:key="poll.PollID" :PollData="poll" />
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { GetPolls } from '../SiteAPI.js';

  // Components
  import MoviePoll from '../components/MoviePoll.vue';

  export default defineComponent({
    name: 'PollsView',
    async beforeCreate()
    {
      await GetPolls().then( response => {this.polls = response;});
    },
    components: {
        MoviePoll,
    },
    methods: { 
      GetPolls
    },
    data: () => ({
     polls: {}
    })
  });
  </script>
  
  <style scoped>

  </style>