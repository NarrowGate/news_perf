<template>
    <div>
      <w-list 
        v-for="item in sortedByLastUpdated" 
        :item ="item" 
        :key="item._venueID">
      </w-list>
    </div>
</template>

<script>
    import WList from '../../components/WList.vue';

    export default {
      components: {
        WList
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
