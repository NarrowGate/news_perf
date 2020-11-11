<template>
    <div>
      <v-subheader>By Alphabets</v-subheader>
      <wlist v-for="item in sortedByAlphabet" :item ="item" :key="item._venueID">
      </wlist>
    </div>
</template>

<script>
    import wlist from '../../components/wlist.vue';

    export default {
      components: {
        wlist
      },
      props: {
        weather: {
          type: Array
        }
      },
      computed: {
        sortedByAlphabet() {
          let sortedData = this.weather.sort(function(a, b){
              if(a._name < b._name) { return -1; }
              if(a._name > b._name) { return 1; }
              return 0;
          });
          return sortedData;
        }
      },
    }
</script>

<style>
</style>
