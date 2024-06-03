<template>
  <v-img :aspect-ratio="1" :src="MOVIE_API.POSTER_PATH + movie.poster_path" lazy-src="../assets/MoviePlaceholder.jpg"
    :alt="movie.title" @click="movieClicked()" :style="{ 'cursor': readonly ? 'default' : 'pointer' }"></v-img>
</template>

<script>

import { MOVIE_API } from '@/MovieAPI'

export default {
  props: {
    "movie": {
      type: Object,
      required: true
    },
    "readonly":
    {
      type: Boolean,
      required: false,
      default: false
    }
  },
  name: 'MoviePoster',
  data: () => ({
    MOVIE_API: MOVIE_API
  }),
  methods: {
    //If movie clicked navigate to its detailed page
    movieClicked() {
      if (!this.readonly) {
        this.$router.push({ path: '/movie/' + this.movie.id });
      }
    }
  }
}
</script>
<style scoped>
.v-img {
  box-shadow: 0px 0px 5px 5px #EEE8AA;
  max-height: inherit;
}

:deep(.v-img__img) {
  position: initial;
}
</style>