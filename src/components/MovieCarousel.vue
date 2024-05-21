<template>
  <div class="border-bottom">
    <RouterLink class="carousel_link" to="/">{{title}} &#10148;</RouterLink>
      <Carousel v-bind="settings" :breakpoints="breakpoints" :wrap-around="true" :transition="300" :autoplay="5000" >
      <Slide v-for="movie in movies" :key="movie.id">
        <MoviePoster :movie="movie"></MoviePoster>
    </Slide>
     <template #addons>
      <navigation>
        <template #next>
          <v-img class="carousel_navigation"  src="../assets/CarouselNavigation.png" :aspect-ratio=1></v-img>
        </template>
        <template #prev>
          <v-img class="carousel_navigation" src="../assets/CarouselNavigation.png" :aspect-ratio=1></v-img>
        </template>
      </navigation>
      </template>
    </Carousel>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import { Carousel, Navigation, Slide } from 'vue3-carousel'
import { MOVIE_API } from '@/MovieAPI' 

// Components
import MoviePoster from './MoviePoster.vue';

//Stylesheet
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
    MoviePoster
  },
  data: () => ({
    MOVIE_API: MOVIE_API,
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
  })
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

:deep(.v-img .v-img__img)
{
    position: initial;
}

.carousel{
  position: relative;
}

:deep(.carousel .carousel_navigation)
{
  box-shadow: 0px 0px 5px 5px var(--electric-blue);
  border-radius: 40%!important;
}

:deep(.carousel .carousel__prev)
{
  transform: rotate(180deg);
}

.carousel::v-deep() .carousel__viewport
{
  padding-top: 2%;
  padding-bottom: 2%;
}

.carousel__slide {
  padding: 5px;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(-20deg) scale(1.1);
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel_link
{
  text-decoration: none;
  font-weight: bold;
  position: absolute;
  z-index: 2;
  font-size: 1vw;
}
.carousel_link:hover
{
  color:#00A1FF;
  text-decoration: underline;
}

@media only screen and (max-width: 600px) {
  .carousel_link
  {
    position: initial;
    font-size: 3vw;
    margin: 1vw;
  }
}

</style>