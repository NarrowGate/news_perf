<template>
    <div>
      <w-list 
        v-for="item in sortedByAlphabet" 
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
          sortedByAlphabet() {
            let sortedData = this.weather.sort(function(a, b){
                if(a._name < b._name) { return -1; }
                if(a._name > b._name) { return 1; }
                return 0;
            });
            return sortedData;
          }
        }

    }
</script>