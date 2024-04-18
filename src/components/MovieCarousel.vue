<template>
    <h1>{{title}}</h1>
    <Carousel v-bind="settings" :breakpoints="breakpoints" :wrap-around="true" :transition="500" :autoplay="1000000" >
    <Slide v-for="movie in movies" :key="movie.poster_path">
            <v-img
            :aspect-ratio="1"
            :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
            height="auto"
            class="border border-2 border-dark"
            @click="movieClicked(movie.original_title)"
        ></v-img>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  props: ["moviePromise","title"],
  beforeCreate() {
    //wait for promise
    this.moviePromise.then(result => { this.movies = result })
  },
  name: 'MovieCarousel',
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data: () => ({
    movies: {},
    // carousel settings
    settings: {
      itemsToShow: 1
    },
    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    breakpoints: {
      // 700px and up
      350: {
        itemsToShow: 3.5
      },
      // 1024 and up
      1024: {
        itemsToShow: 8
      },
    },
  }),
  methods: {
    movieClicked(title)
    {
        alert('You clicked ' + title);
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.carousel__slide {
    padding: 5px;
}

.v-responsive__sizer{
    padding:0;
}

.carousel__track {
    transform-style: preserve-3d;
}

.carousel__slide--sliding {
    transition: 0.5s;
}

.carousel__slide {
    opacity: 0.9;
    transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
    transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--active {
    opacity: 1;
    transform: rotateY(0) scale(1.1);
    padding-bottom: 2%;
}

</style>
<style>
.v-img__img
{
    position: initial;
}
</style>