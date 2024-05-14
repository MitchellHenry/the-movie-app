<template>
    <v-img
        :aspect-ratio="1"
        :src="MOVIE_API.POSTER_PATH + movie.poster_path"
        lazy-src="../assets/MoviePlaceholder.jpg"
        height="auto"
        :alt="movie.title"
        @click="movieClicked()"
        ></v-img>
</template>

<script>

import { MOVIE_API } from '@/MovieAPI' 


export default {
  props: ["movie"],
  name: 'MoviePoster',
  data: () => ({
    MOVIE_API: MOVIE_API
  }),
  methods: {
    movieClicked()
    {
      this.$router.push({path: '/movie/' + this.movie.id});
    }
  }
}
</script>
<style scoped>
.v-img
{
  box-shadow: 0px 0px 5px 5px #EEE8AA;
}

.v-img__img
{
  position: initial;
  
}
</style>