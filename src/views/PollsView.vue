<template>
    <h1 class="text-electric-blue mt-3 ms-5 mb-4">Vote in polls!</h1>
    <div>
      <MoviePoll v-for="poll in polls" v-bind:key="poll.PollID" :PollData="poll" />
    </div>
    <div class="d-flex flex-column h-100 pb-5 justify-content-center align-center" v-if="!initialized">
      <v-progress-circular color="blue-lighten-1 pb-3" model-value="20" :size="128" :width="12" indeterminate></v-progress-circular>
      <h1 class="text-electric-blue" >Loading Polls. Please wait!</h1>
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
      this.initialized = true;
    },
    components: {
        MoviePoll,
    },
    data: () => ({
     polls: {},
     initialized: false
    })
  });
  </script>
  
  <style scoped>

  </style>