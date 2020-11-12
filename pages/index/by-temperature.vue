<template>
    <div>
      <w-list 
        v-for="item in sortedByTemperature" 
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
          sortedByTemperature() {
            let sortedData = this.weather.sort((a, b) => parseFloat(a._weatherTemp) - parseFloat(b._weatherTemp));
            return sortedData; 
          }
        }

    }
</script>