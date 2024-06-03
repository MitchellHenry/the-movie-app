<template>
    <div class="p-3">
        <div class="row">
            <div class="col-12 col-md-4">
                <h3 v-electric-text>Enter the poll Question:</h3>
            </div>
            <div class="col-12 col-md-6">
                <v-text-field v-model="localPollData.Question" label="Poll question"
                    bg-color="grey-darken-2"></v-text-field>
            </div>
        </div>
        <div class="row mt-md-3">
            <div class="col-12 col-md-4">
                <h3 v-electric-text>Search for movies to add to poll: </h3>
            </div>
            <div class="col-12 col-md-6">
                <v-text-field @keyup.enter="GetMoviesForPolls" v-model="searchParameter"
                    label="Search for movies to add" bg-color="grey-darken-2"></v-text-field>
            </div>
            <div class="col-12 col-md-2 mb-3 mb-md-0">
                <v-btn class="text-white" @click="GetMoviesForPolls" type="btn" v-electric-bg block>Search</v-btn>
            </div>
        </div>
        <div class="row grid-container-wrapper mt-3 p-3 m-1" v-glow-electric-border>
            <div class="col-12 col-md-6">
                <h4 v-electric-text>Select Movie to add to poll: </h4>
            </div>
            <div class="col-12 grid-container" v-if="searchingForMovies">
                <div v-for="movie in moviesFound" class="m-md-3" :key="movie.id">
                    <v-checkbox-btn class="h-15" v-model="selectedMovie" :value="movie" v-electric-text:
                        :label="movie.original_title" density="compact"></v-checkbox-btn>
                    <MoviePoster class="mb-3 mt-3" :readonly="true" :movie="movie" />
                </div>
            </div>
            <div class="d-flex flex-column align-center" v-if="moviesFound.length == 0">
                <h1 v-electric-text>No Movies found be more specific</h1>
            </div>
            <div class="d-flex flex-column h-50 align-center pb-5 justify-content-center" v-if="!searchingForMovies">
                <v-progress-circular color="blue-lighten-1 pb-3" model-value="20" :size="128" :width="12"
                    indeterminate></v-progress-circular>
                <h1 v-electric-text>Searching</h1>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12 col-md-4">
                <h4 v-electric-text>Choose Movie number to change: </h4>
            </div>
            <div class="col-12 col-md-8">
                <v-radio-group v-model="movieToChange" inline>
                    <div v-for="(option, key) in localPollData.PollOptions" v-bind:key="option.id"
                        class="col-3 d-flex justify-content-between">
                        <v-radio v-electric-text :value="Object.keys(localPollData.PollOptions).indexOf(key)"
                            :label="'Movie ' + (Object.keys(localPollData.PollOptions).indexOf(key) + 1).toString()">
                        </v-radio>
                    </div>
                </v-radio-group>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-3 mb-3 mb-md-0">
                <v-btn class="text-white" @click="AddMovieToPoll" type="btn" v-electric-bg block>Add movie to
                    Poll</v-btn>
            </div>
            <div class="col-12 col-md-9 ">
                <h4 v-electric-text>{{ errorAddingMovie }}</h4>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-6 col-md-3 mt-auto">
                <div v-if="Object.keys(this.localPollData.PollOptions.Movie1).length > 0">
                    <p class="h-15" v-electric-text>{{ this.localPollData.PollOptions.Movie1.original_title }}</p>
                    <MoviePoster :readonly="true" :movie="this.localPollData.PollOptions.Movie1" />
                    <v-btn class="text-white mt-3" @click="RemoveFromPoll(this.localPollData.PollOptions.Movie1.id)"
                        type="btn" v-electric-bg block>Remove</v-btn>
                </div>
            </div>
            <div class="col-6 col-md-3 mt-auto">
                <div v-if="Object.keys(this.localPollData.PollOptions.Movie2).length > 0">
                    <p class="h-15" v-electric-text>{{ this.localPollData.PollOptions.Movie2.original_title }}</p>
                    <MoviePoster :readonly="true" :movie="this.localPollData.PollOptions.Movie2" />
                    <v-btn class="text-white mt-3" @click="RemoveFromPoll(this.localPollData.PollOptions.Movie2.id)"
                        type="btn" v-electric-bg block>Remove</v-btn>
                </div>
            </div>
            <div class="col-6 col-md-3 mt-auto">
                <div v-if="Object.keys(this.localPollData.PollOptions.Movie3).length > 0">
                    <p class="h-15" v-electric-text>{{ this.localPollData.PollOptions.Movie3.original_title }}</p>
                    <MoviePoster :readonly="true" :movie="this.localPollData.PollOptions.Movie3" />
                    <v-btn class="text-white mt-3" @click="RemoveFromPoll(this.localPollData.PollOptions.Movie3.id)"
                        type="btn" v-electric-bg block>Remove</v-btn>
                </div>
            </div>
            <div class="col-6 col-md-3 mt-auto">
                <div v-if="Object.keys(this.localPollData.PollOptions.Movie4).length > 0">
                    <p class="h-15" v-electric-text>{{ this.localPollData.PollOptions.Movie4.original_title }}</p>
                    <MoviePoster :readonly="true" :movie="this.localPollData.PollOptions.Movie4" />
                    <v-btn class="text-white mt-3" @click="RemoveFromPoll(this.localPollData.PollOptions.Movie4.id)"
                        type="btn" v-electric-bg block>Remove</v-btn>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <h4 v-electric-text class="mb-0">{{ errorValidatingPoll }}</h4>
            </div>
        </div>
    </div>
</template>

<script>

import { defineComponent } from 'vue';
import MoviePoster from './MoviePoster.vue';
import { getMovies, searchMovies } from '../MovieAPI'

export default defineComponent({
    name: 'PollBuilder',
    props: {
        "pollData":
        {
            type: Object,
            required: false,
            default: () => ({
                Question: '',
                PollOptions:
                {
                    Movie1: {},
                    Movie2: {},
                    Movie3: {},
                    Movie4: {}
                }
            })
        }
    },
    components:
    {
        MoviePoster
    },
    methods:
    {
        //search movies for polls
        GetMoviesForPolls() {
            this.searchingForMovies = false;
            let moviePromise;
            if (this.searchParameter == "") {
                moviePromise = getMovies('discover', 1, 1, 'movie');
            }
            else {
                moviePromise = searchMovies(1, 1, this.searchParameter);
            }
            this.selectedMovie = {};
            //wait for promise
            moviePromise.then(result => { this.moviesFound = result; this.searchingForMovies = true; })
        },
        //Add movie to poll
        AddMovieToPoll() {
            if (Object.keys(this.selectedMovie).length === 0) {
                this.errorAddingMovie = "Please select a movie to add!";
                return;
            }
            if (Object.values(this.localPollData.PollOptions).some(movie => movie.id === this.selectedMovie.id)) {
                this.errorAddingMovie = "Please choose another movie. Selected movie is already on poll.";
                return;
            }
            let entries = Object.entries(this.localPollData.PollOptions);
            let key = entries[this.movieToChange][0];
            this.localPollData.PollOptions[key] = this.selectedMovie;
            this.selectedMovie = {};
        },
        //Remove movie from poll
        RemoveFromPoll(id) {
            let key = Object.keys(this.localPollData.PollOptions).find(k => this.localPollData.PollOptions[k].id === id);
            if (key) {
                this.localPollData.PollOptions[key] = {};
            }
        },
        //Is poll builder valid for submission to a POST, PUT?
        PollValid() {
            if (this.localPollData.Question == '') {
                this.errorValidatingPoll = "Please provide a poll question!";
                return false;
            }
            let pollOptions = Object.values(this.localPollData.PollOptions).filter(option => Object.keys(option).length > 0);
            if (pollOptions < 2) {
                this.errorValidatingPoll = "At least two movies must be picked!";
                return false;
            }
            this.errorValidatingPoll = '';
            return true;
        }
    },
    data: () => ({
        moviesFound: {},
        movieToChange: 0,
        searchParameter: '',
        searchingForMovies: true,
        selectedMovie: {},
        errorAddingMovie: '',
        localPollData: {},
        errorValidatingPoll: ''
    }),
    //Assign localpolldata and do a default get movies search
    created() {
        this.localPollData = this.pollData;
        this.GetMoviesForPolls();
    }
})
</script>
<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
}

.grid-container-wrapper {
    max-height: 50vh;
    overflow-y: auto;
}

:deep(.v-checkbox .v-input__details) {
    display: none;
}

:deep(.v-checkbox-btn .v-label) {
    font-size: 1vw;
}

h3,
h4 {
    font-size: 1.5vw;
}

@media only screen and (max-width: 1200px) {
    .grid-container {
        grid-template-columns: repeat(3, 1fr);
    }

    .grid-container .v-checkbox-btn {
        font-size: 2vw;
    }

    :deep(.v-checkbox-btn .v-label) {
        font-size: 1.25vw;

    }
}

@media only screen and (max-width: 600px) {
    .grid-container {
        grid-template-columns: repeat(2, 1fr);
    }

    h3,
    h4 {
        font-size: 4vw;
    }

    .grid-container .v-checkbox-btn {
        font-size: 3vw;
    }

    :deep(.v-label) {
        font-size: 2.5vw;
    }
}

.h-15 {
    height: 15%;
}
</style>