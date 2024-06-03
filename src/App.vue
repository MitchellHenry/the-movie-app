<template>
  <v-app>
    <v-main>
      <!-- Header -->
      <div class="row header-row sticky-top border-top-0" v-electric-border>
        <div class="col-3 col-md-1 d-flex pe-0">
          <v-img src="./assets/TheMovieAppLogo.png" :aspect-ratio="1" v-electric-border
            class="border-top-0 border-bottom-0 pointer" @click="this.$router.push({ path: '/' });"
            alt="The movie app logo">
          </v-img>
          <v-img :src="MOVIE_API.API_LOGO_PATH" :aspect-ratio="1" alt="Logo of the Movie DB API">
          </v-img>
        </div>
        <div class="col-7 col-md-10 mt-md-4 mt-md-2 pe-0 me-2 me-md-0 pb-1 d-flex">
          <v-text-field label="Search for movie..." bg-color="grey-darken-2" v-model="movieSearchText"
            @keyup.enter="movieSearch" @click:append="movieSearch" type="input"></v-text-field>
          <v-btn icon="mdi-magnify" class="searchButton" color="grey-darken-2" @click="movieSearch"></v-btn>
        </div>
        <div class="col-1 d-flex justify-content-center align-items-md-center ps-4 ps-md-0">
          <v-app-bar-nav-icon class="nav" :ripple="false" variant="plain" v-electric-text @click.stop="drawer = !drawer"
            x-large></v-app-bar-nav-icon>
        </div>
      </div>
      <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : 'right'" temporary>
        <v-list v-electric-border class="h-100">
          <div>
            <v-list-item>
              <v-btn append-icon="mdi-home" v-electric-bg class="text-white"
                @click="this.$router.push({ path: '/' });">Home</v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn v-electric-bg class="text-white" @click="this.$router.push({ path: '/vote' });">Vote
                now!</v-btn>
            </v-list-item>
            <v-list-item v-if="authorised()">
              <v-btn class="text-white" v-electric-bg @click="this.$router.push({ path: '/managepolls/create' })">Manage
                polls</v-btn>
            </v-list-item>
          </div>
          <div>
            <v-list-item v-if="!Object.prototype.hasOwnProperty.call(this.$root.$User, 'Username')">
              <v-btn v-electric-bg class="text-white" @click="this.$router.push({ path: '/account/login' })">Sign
                In</v-btn>
            </v-list-item>
            <v-list-item v-if="!Object.prototype.hasOwnProperty.call(this.$root.$User, 'Username')">
              <v-btn v-electric-bg class="text-white"
                @click="this.$router.push({ path: '/account/register' })">Register</v-btn>
            </v-list-item>
            <v-list-item v-if="Object.prototype.hasOwnProperty.call(this.$root.$User, 'Username')">
              <v-btn append-icon="mdi-account-circle" class="text-white"
                @click="this.$router.push({ path: '/account/profile' })" v-electric-bg>Account</v-btn>
            </v-list-item>
            <v-list-item v-if="Object.prototype.hasOwnProperty.call(this.$root.$User, 'Username')">
              <v-btn append-icon="mdi-logout" class="text-white"
                @click="this.$root.$User = {}; this.$router.push({ path: '/' })" v-electric-bg>Logout</v-btn>
            </v-list-item>
          </div>
        </v-list>
      </v-navigation-drawer>
      <router-view />
      <!-- Footer -->
      <v-footer :app="true" :absolute="true" color="black" v-electric-border
        class="d-flex justify-content-between pt-1 w-100 border-bottom-0 p-0">
        <p v-electric-text class="ms-3 w-50"><strong>The-Movie-App</strong> Copyright © {{ new
          Date().getFullYear()
          }}</p>
        <p v-electric-text class="me-3 w-50">This website uses TMDB and the TMDB APIs but is not endorsed, certified,
          or otherwise approved by TMDB.</p>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
import { MOVIE_API } from './MovieAPI';
export default {
  name: 'App',

  data: () => ({
    MOVIE_API: MOVIE_API,
    movieSearchText: '',
    drawer: false
  }),
  methods:
  {
    //Navigates to movie search page with unique route
    movieSearch() {
      this.$router.push({ path: '/search', query: { searchParameter: this.movieSearchText, timestamp: new Date().getTime() } });
    },
    //Detemrines if a User is Authorised
    authorised() {
      if (Object.prototype.hasOwnProperty.call(this.$root.$User, 'Admin')) {
        return (this.$root.$User.Admin == "1");
      }
      return false;
    }
  }
}
</script>
<style>
.pointer {
  cursor: pointer;
}
</style>
<style scoped>
* {
  user-select: none;
  background: black;
}

:deep(.mdi-menu) {
  font-size: 3vw;
}

:deep(.v-btn__content:hover) {
  background-color: inherit;
}

:deep(.v-navigation-drawer) {
  background-color: inherit;
}

:deep(.v-navigation-drawer .v-list) {
  margin-top: 0%;
}

:deep(.v-btn--icon) {
  border-radius: 0%;
}

p {
  font-size: 1vw;
}

:deep(.v-input__details) {
  display: none;
}

.searchButton {
  height: 100%
}

:deep(.v-field) {
  box-shadow: none;
  border-radius: 0;
}

@media only screen and (min-width: 1268px) {
  :deep(.v-navigation-drawer .v-list) {
    padding-top: 50%;
  }
}

@media only screen and (max-width: 1268px) {
  :deep(.mdi-menu) {
    font-size: 4vw;
  }

}

@media only screen and (max-width: 600px) {
  p {
    font-size: 2vw;
    ;
  }

  :deep(.mdi-menu) {
    font-size: 10vw;
  }
}
</style>