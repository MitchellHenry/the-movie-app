<template>
    <div class="p-3">
        <h4 v-electric-text>Select Poll to Delete:</h4>
        <div class="row">
            <div class="col-12 col-md-3">
                <v-select v-electric-text label="Select Poll to delete" :items="polls" item-color="#0096FF"
                    item-title="Question" item-value="PollID" v-model="selectedPollID"></v-select>
            </div>
            <div class="col-12 col-md-3 mb-5 mb-md-0 ms-md-5">
                <v-btn class="text-white" @click="DeletePollSelected()" type="btn" v-electric-bg
                    :disabled="selectedPollID == null" block>Delete Poll</v-btn>
            </div>
        </div>
        <div class="row">
            <h2 v-if="currentPoll == null" v-electric-text>{{ responseMessage }}</h2>
            <div class="col-12 col-md-8 mt-3" v-if="currentPoll != null">
                <MoviePoll :readonly="true" :PollData="currentPoll"></MoviePoll>
            </div>
        </div>
    </div>
</template>

<script>

import { GetPolls, DeletePoll } from '@/SiteAPI';
import { defineComponent } from 'vue';
import MoviePoll from './MoviePoll.vue';


export default defineComponent({
    name: 'DeletePoll',
    components:
    {
        MoviePoll
    },
    //Before create get all polls
    beforeCreate() {
        GetPolls().then(result => this.polls = result)
    },
    methods:
    {
        //Delete the selected poll
        DeletePollSelected() {
            DeletePoll(this.selectedPollID).then(() => {
                this.polls = this.polls.filter(p => p.PollID != this.selectedPollID);
                this.selectedPollID = null;
                this.responseMessage = "Poll Successfully Deleted!";
            });
        }
    },
    data: () => ({
        polls: [],
        selectedPollID: null,
        responseMessage: ''
    }),
    computed:
    {
        //Get the currently selected poll from the dropdown
        currentPoll: function () {
            return this.polls.filter(p => p.PollID == this.selectedPollID)[0];
        }
    }
})
</script>
<style scoped></style>