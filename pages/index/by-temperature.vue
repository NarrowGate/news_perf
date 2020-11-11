<template>
    <div>
        <v-subheader>By Temperature</v-subheader>
      <wlist v-for="item in sortedByTemperature" :item ="item" :key="item._venueID">
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
        sortedByTemperature() {
          let sortedData = this.weather.sort((a, b) => parseFloat(a._weatherTemp) - parseFloat(b._weatherTemp));
          return sortedData; 
        }
      },
    }
</script>

<style>
</style>
