<template>
  <div class="d-flex flex-column w-100">
    <div class="row">
      <div class="col-12">
        <PollBuilder ref="createdPollBuilder" />
      </div>
    </div>
    <div class="row p-3 pt-0">
      <div class="col-12 col-md-3">
        <v-btn class="text-white" @click="createPoll" type="btn" v-electric-bg block>Create poll</v-btn>
      </div>
      <div class="col-12 col-md-6">
        <h3 v-electric-text>{{ createPollMessage }}</h3>
      </div>
    </div>
  </div>
</template>

<script>

import { defineComponent } from 'vue';
import PollBuilder from './PollBuilder.vue'
import { PostPoll } from '@/SiteAPI';

export default defineComponent({
  name: 'CreatePoll',
  components:
  {
    PollBuilder
  },
  methods:
  {
    //Try create poll
    createPoll() {
      if (this.$refs.createdPollBuilder.PollValid()) {
        let pollData = this.$refs.createdPollBuilder.localPollData;
        let pollOptions = Object.values(pollData.PollOptions).filter(option => Object.keys(option).length > 0);
        let poll =
        {
          Question: pollData.Question,
          MovieID1: pollOptions[0].id,
          MovieID2: pollOptions[1].id,
        }
        if (pollOptions.length > 2) {
          poll['MovieID3'] = pollOptions[2].id;
          if (pollOptions.length > 3) {
            poll['MovieID4'] = pollOptions[3].id;
          }
        }
        PostPoll(poll).then(this.createPollMessage = "Successfully created new poll!");
      }
      else {
        this.createPollMessage = '';
      }
    }
  },
  data: () => ({
    createPollMessage: ''
  })
})
</script>
<style scoped></style>