<template>
  <div class="container" v-if="initalised">
    <div class="p-3 p-md-3 glow-border mb-5">
      <div class="row">
        <div class="col-12">
          <h1 class="text-electric-blue mb-3">{{ this.PollData.Question }}</h1>
        </div>
      </div>
      <div class="row">
        <v-radio-group v-model="movieVoted" inline>
          <div class="col-4">
            <MoviePoster class="ms-md-5" :movie="Movie1"></MoviePoster>
            <v-radio :label="Movie1.original_title" @click="Voted(Movie1.id)" color="var(--electric-blue)" base-color="var(--electric-blue)"
              class="ms-md-5 mt-1" :value="Movie1.id"></v-radio>
            <v-progress-linear class="w-90 float-end" buffer-opacity="1" :buffer-value="percentages[0]" bg-color="var(--electric-blue)" height="25">
              <strong class="linear-content">{{ percentages[0] }}%</strong>
            </v-progress-linear>
          </div>
          <div class="col-4">
            <MoviePoster class="ms-md-5" :movie="Movie2"></MoviePoster>
            <v-radio :label="Movie2.original_title" @click="Voted(Movie2.id)" color="var(--electric-blue)" base-color="var(--electric-blue)"
              class="ms-md-5 mt-1" :value="Movie2.id"></v-radio>
              <v-progress-linear class="w-90 float-end" buffer-opacity="1" :buffer-value="percentages[1]" bg-color="var(--electric-blue)" height="25">
            <strong  class="linear-content">{{ percentages[1] }}%</strong>
          </v-progress-linear>
          </div>
          <div class="col-4">
            <MoviePoster class="ms-md-5" :movie="Movie3"></MoviePoster>
            <v-radio :label="Movie3.original_title" @click="Voted(Movie3.id)" color="var(--electric-blue)" base-color="var(--electric-blue)"
              class="ms-md-5 mt-1" :value="Movie3.id"></v-radio>
            <v-progress-linear class="w-90 float-end" buffer-opacity="1" :buffer-value="percentages[2]" bg-color="var(--electric-blue)" height="25">
            <strong  class="linear-content">{{ percentages[2] }}%</strong>
          </v-progress-linear>
          </div>
        </v-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { getMovieDetail } from '../MovieAPI.js';
import { GetVotes, PostVote } from '../SiteAPI.js';

// Components
import MoviePoster from '../components/MoviePoster.vue';

export default defineComponent({
  name: 'MovieSearchView',
  props: ["PollData"],
  data: () => ({
    Movie1: {},
    Movie2: {},
    Movie3: {},
    answers: [],
    movieVoted: null,
    initalised: false
  }),
  async beforeCreate() {
    let votes = await GetVotes(this.PollData.PollID);
    if (votes == null) {
      votes = [];
    }

    // Set the selected movie if the user has previously voted
    if (Object.prototype.hasOwnProperty.call(this.$root.$User, 'Username')) {
      let priorVote = votes.filter(v => v.UserID == this.$root.$User.UserID);
      if (priorVote.length > 0) {
        console.log(priorVote[0].VotedForMovieID);
        this.movieVoted = priorVote[0].VotedForMovieID;
      }
    }

    // Get movie details and set up the answers array
    this.Movie1 = await getMovieDetail(this.PollData.MovieID1);
    this.answers.push({ MovieId: this.Movie1.id, text: this.Movie1.original_title, votes: votes.filter(v => v.VotedForMovieID == this.Movie1.id).length });

    this.Movie2 = await getMovieDetail(this.PollData.MovieID2);
    this.answers.push({ MovieId: this.Movie2.id, text: this.Movie2.original_title, votes: votes.filter(v => v.VotedForMovieID == this.Movie2.id).length });

    this.Movie3 = await getMovieDetail(this.PollData.MovieID3);
    this.answers.push({ MovieId: this.Movie3.id, text: this.Movie3.original_title, votes: votes.filter(v => v.VotedForMovieID == this.Movie3.id).length });

    this.initalised = true; 
  },
  components: {
    MoviePoster
  },
  methods: {
    getPercentage(votes) {
      const totalVotes = this.answers.reduce((acc, curr) => acc + curr.votes, 0);
      if (totalVotes === 0) {
        return 0;
      }
      return (votes / totalVotes) * 100;
    },
    async Voted(movieID) {
      if (Object.prototype.hasOwnProperty.call(this.$root.$User, 'Username')) {
        let newVote = {
          PollID: this.PollData.PollID,
          UserID: this.$root.$User.UserID,
          VotedForMovieID: movieID
        };
        PostVote(newVote).then(async () => {
          this.movieVoted = movieID;
          let votes = await GetVotes(this.PollData.PollID);
          this.answers[0].votes = votes.filter(v => v.VotedForMovieID == this.Movie1.id).length;
          this.answers[1].votes = votes.filter(v => v.VotedForMovieID == this.Movie2.id).length;
          this.answers[2].votes = votes.filter(v => v.VotedForMovieID == this.Movie3.id).length;
        });
      } else {
        alert('Sign in to vote!');
      }
    },
    async priorVote()
    {

    }
  },
  computed: {
    percentages() {
      return this.answers.map(answer => this.getPercentage(answer.votes));
    }
  }
});
</script>
<style scoped>
:deep(.v-img .v-img__img) {
  position: initial;
}

:deep(.v-label) {

  color: var(--electric-blue);
}

.w-90
{
  width:90%;
}

.linear-content
{
  color: #EEE8AA
}

</style>