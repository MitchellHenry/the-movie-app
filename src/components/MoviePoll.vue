<template>
  <div v-if="initalised">
    <div class="p-3 p-md-3 moviepoll" v-glow-electric-border>
      <div class="row">
        <div class="col-12">
          <h4 v-electric-text class="mb-3">{{ this.PollData.Question }}</h4>
        </div>
      </div>
      <div class="row">
        <v-radio-group v-model="movieVoted" inline>
          <div v-for="option in pollOptions" v-bind:key="option.position"
            class="col-6 col-lg-3 mb-3 mb-lg-0 d-flex flex-column justify-content-between">
            <MoviePoster class="m-2" :readonly="readonly" :movie="option.Movie"></MoviePoster>
            <v-radio :disabled="readonly" :label="option.Movie.original_title" @click="Voted($event, option.Movie.id)"
              v-electric-text base-color="#0096FF" class="mt-1" :value="option.Movie.id"></v-radio>
            <v-progress-linear class="w-90" buffer-opacity="1" :buffer-value="percentages[option.position]"
              v-electric-text height="25">
              <strong class="linear-content">{{ percentages[option.position] }}%</strong>
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
  name: 'MoviePoll',
  props: {
    "PollData":
    {
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
  data: () => ({
    pollOptions: [],
    movieVoted: null,
    initalised: false
  }),
  //On created get poll votes
  created() {
    this.getPollVotes();
  },
  components: {
    MoviePoster
  },
  watch: {
    PollData: {
      handler() {
        // Reload the component when PollData changes
        this.getPollVotes();
      }
    }
  },
  methods:
  {
    //Get poll votes
    async getPollVotes() {
      this.initalised = false;
      this.pollOptions = [];
      let votes = [];
      votes = await GetVotes(this.PollData.PollID);
      if (votes == null) {
        votes = [];
      }

      // Set the selected movie if the user has previously vote
      if (Object.prototype.hasOwnProperty.call(this.$root.$User, 'Username')) {
        let priorVote = votes.filter(v => v.UserID == this.$root.$User.UserID);
        if (priorVote.length > 0) {
          this.movieVoted = parseInt(priorVote[0].VotedForMovieID);
        }
      }

      // Get movie details and set up the answers array
      this.Movie1 = await getMovieDetail(this.PollData.MovieID1);
      this.pollOptions.push({ position: 0, Movie: this.Movie1, votes: votes.filter(v => v.VotedForMovieID == this.Movie1.id).length });

      this.Movie2 = await getMovieDetail(this.PollData.MovieID2);
      this.pollOptions.push({ position: 1, Movie: this.Movie2, votes: votes.filter(v => v.VotedForMovieID == this.Movie2.id).length });
      if (this.PollData.MovieID3 != null) {
        this.Movie3 = await getMovieDetail(this.PollData.MovieID3);
        this.pollOptions.push({ position: 2, Movie: this.Movie3, votes: votes.filter(v => v.VotedForMovieID == this.Movie3.id).length });
      }
      if (this.PollData.MovieID4 != null) {
        this.Movie4 = await getMovieDetail(this.PollData.MovieID4);
        this.pollOptions.push({ position: 3, Movie: this.Movie4, votes: votes.filter(v => v.VotedForMovieID == this.Movie4.id).length });
      }
      this.initalised = true;
    },
    //Get the percentage of votes for each option
    getPercentage(votes) {
      const totalVotes = this.pollOptions.reduce((acc, curr) => acc + curr.votes, 0);
      if (totalVotes === 0) {
        return 0;
      }
      return (votes / totalVotes) * 100;
    },
    //Vote for a particular movie
    async Voted(event, movieID) {
      if (!Object.prototype.hasOwnProperty.call(this.$root.$User, 'Username')) {
        event.preventDefault();
        return alert('Sign In to vote!');
      }
      let newVote = {
        PollID: this.PollData.PollID,
        UserID: this.$root.$User.UserID,
        VotedForMovieID: movieID
      };
      PostVote(newVote).then(async () => {
        let votes = await GetVotes(this.PollData.PollID);
        this.pollOptions.forEach(option => {
          option.votes = votes.filter(v => v.VotedForMovieID == option.Movie.id).length;
        })
      });
    }
  },
  computed: {
    //Compute the percentage 
    percentages() {
      return this.pollOptions.map(option => this.getPercentage(option.votes).toFixed(2));
    }
  }
});
</script>
<style scoped>
:deep(.v-label) {

  color: var(--electric-blue);
}

.w-90 {
  width: 90%;
}

.linear-content {
  color: #EEE8AA
}

@media only screen and (max-width: 800px) {
  h4 {
    font-size: 3vw;
  }

  :deep(.v-label--clickable) {
    font-size: 2vw;
  }
}
</style>