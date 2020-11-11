<template>
    <div>
            <v-subheader>By Last Updated</v-subheader>
      <wlist v-for="item in sortedByLastUpdated" :item ="item" :key="item._venueID">
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
        sortedByLastUpdated() {
          let sortedData = this.weather.sort((a, b) => parseFloat(b._weatherLastUpdated) - parseFloat(a._weatherLastUpdated));
          return sortedData;
        }
      },
    }
</script>

<style>
</style>
