<template>
  <div class="p-3">
    <h4 v-electric-text>Select Poll to Edit:</h4>
    <div class="row">
      <div class="col-12 col-md-3">
        <v-select v-electric-text label="Select Poll to edit" :items="polls" item-color="#0096FF" item-title="Question"
          item-value="PollID" v-model="selectedPollID"></v-select>
      </div>
    </div>
  </div>
  <div class="d-flex flex-column w-100">
    <div class="row" v-if="currentPoll != null && PollBuilderInitialised">
      <div class="col-12">
        <PollBuilder ref="createdPollBuilder" :pollData="PollBuilderData" />
      </div>
    </div>
    <div class="row p-3 pt-0">
      <div class="col-12 col-md-3">
        <v-btn class="text-white" @click="updatePoll" type="btn" v-electric-bg block>Update Poll</v-btn>
      </div>
      <div class="col-12 col-md-6">
        <h3 v-electric-text>{{ updatedPollMessage }}</h3>
      </div>
    </div>
  </div>
</template>

<script>

import { GetPolls, PutPoll } from '@/SiteAPI';
import { defineComponent } from 'vue';
import PollBuilder from './PollBuilder.vue';
import { getMovieDetail } from '@/MovieAPI';

export default defineComponent({
  name: 'EditPoll',
  beforeCreate() {
    //Get all polls from DB before creation
    GetPolls().then(result => this.polls = result)
  },
  components:
  {
    PollBuilder
  },
  methods:
  {
    //Try update poll in DB
    updatePoll() {
      if (this.selectedPollID == null) {
        this.updatedPollMessage = "Select a poll to edit!";
        return;
      }
      if (this.$refs.createdPollBuilder.PollValid()) {
        let pollData = this.$refs.createdPollBuilder.localPollData;
        let pollOptions = Object.values(pollData.PollOptions).filter(option => Object.keys(option).length > 0);
        let poll =
        {
          Question: pollData.Question,
          MovieID1: pollOptions[0].id,
          MovieID2: pollOptions[1].id,
          MovieID3: null,
          MovieID4: null
        }
        if (pollOptions.length > 2) {
          poll['MovieID3'] = pollOptions[2].id;
          if (pollOptions.length > 3) {
            poll['MovieID4'] = pollOptions[3].id;
          }
        }
        PutPoll(poll, this.selectedPollID).then(() => {
          this.updatedPollMessage = "Successfully updated poll!"
          poll['PollID'] = this.selectedPollID;
          this.polls[this.polls.findIndex(p => p.PollID == this.selectedPollID)] = poll;
        });
      }
      else {
        this.createPollMessage = '';
      }
    },
    //Set Poll Builder data
    async getPollBuilderData(selectedPoll) {
      this.PollBuilderInitialised = false;
      this.PollBuilderData =
      {
        Question: selectedPoll.Question,
        PollOptions: {}
      }
      await getMovieDetail(selectedPoll.MovieID1).then(result => { this.PollBuilderData.PollOptions['Movie1'] = result });
      await getMovieDetail(selectedPoll.MovieID2).then(result => { this.PollBuilderData.PollOptions['Movie2'] = result });
      this.PollBuilderData.PollOptions['Movie3'] = {};
      this.PollBuilderData.PollOptions['Movie4'] = {};
      if (selectedPoll.MovieID3 != null) {
        await getMovieDetail(selectedPoll.MovieID3).then(result => { this.PollBuilderData.PollOptions['Movie3'] = result });
      }
      if (selectedPoll.MovieID4 != null) {
        await getMovieDetail(selectedPoll.MovieID4).then(result => { this.PollBuilderData.PollOptions['Movie4'] = result });
      }
      this.PollBuilderInitialised = true;
    }
  },
  data: () => ({
    polls: [],
    selectedPollID: null,
    PollBuilderData: {},
    updatedPollMessage: '',
    PollBuilderInitialised: false
  }),
  computed:
  {
    //Prepare PollBuilder Data and return the selected poll
    currentPoll: function () {
      const selectedPoll = this.polls.filter(p => p.PollID == this.selectedPollID)[0]
      if (selectedPoll != null) {
        this.getPollBuilderData(selectedPoll);
      }
      return selectedPoll;
    }
  }
})
</script>
<style scoped></style>