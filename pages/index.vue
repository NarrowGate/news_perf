<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="10">
      <v-card>
        <v-card-title class="headline">
          Weather Info <v-chip class="ma-2" x-small> {{lastUpdated}} </v-chip>
        </v-card-title>
      </v-card>

        <v-row align="center">
          <v-col cols="8" sm="10" md="10">
            <v-tabs> 
              <v-tab nuxt>
                <nuxt-link to="/">Sort by Alphabet</nuxt-link>
              </v-tab>
              <v-tab nuxt>
                <nuxt-link to="/by-temperature">Sort by Temperature</nuxt-link>
              </v-tab>
              <v-tab nuxt>
                <nuxt-link to="/by-last-updated">Sort by Last Updated</nuxt-link>
              </v-tab>
          </v-tabs>
          </v-col>
          <v-col cols="4" sm="10" md="2">
            <w-dialog 
              :weather-conditions="weatherConditions" 
              :countries="countries"
              @filterChanged="updateWeatherWithNewFilter">
            </w-dialog>
            <v-icon dense color="cyan"  dark  @click="refresh" title="Refresh">
              mdi-refresh
            </v-icon>
          </v-col>
        </v-row>
    </v-col>    
    <v-col cols="12" sm="10" md="10">    
      <div v-if = "loading" class="text-center">   
        </br></br>
        <v-progress-circular indeterminate color="cyan" size=150></v-progress-circular>
        </br></br>
      </div>
      <div v-if="!isResults">
        </br>
        <div class="text-center no-results">No results found</div>
        </br>
      </div>  
      <NuxtChild :weather="weather"/>
    </v-col>
  </v-row>
</template>

<script>
    import WDialog from '../components/WDialog.vue';
    import weatherService from '../services/weather-service.js'

    export default {

        components: {
          WDialog
        },

        data() {
          return {
            weatherSource: [],
            weather: [],

            countries: [],
            weatherConditions:[],

            filters: {
              country:[],
              condition:[]
            },
            lastUpdated:'',

            loading: false,
            isResults: true
          }
        },

        created () { 
            weatherService.getWeather().then(res => {
              this.processData(res.data.data);
              this.weather = this.weatherSource.slice(0);
            }).catch(err => {
              console.log('Data fetch failed')
            }); 
        },

        methods: {

          processData(weatherArr) {

            this.loading = true;

            let now = new Date();
            let todate = now.getDate();
            let tomonth = now.getMonth()+1;
            let toyear = now.getFullYear();
            this.lastUpdated = `Last Updated ${ todate }/${ tomonth }/${ toyear }`;

            weatherArr.forEach(item => {

              if(item._weatherTemp && item._weatherLastUpdated) {
                this.weatherSource.push(item);
                if(item._country._name) {
                  if(this.countries.indexOf(item._country._name) == -1){
                    this.countries.push(item._country._name);
                  }
                }

                if(item._weatherCondition) {            
                  if(this.weatherConditions.indexOf(item._weatherCondition) == -1){
                    this.weatherConditions.push(item._weatherCondition);
                  }
                }

              }
            });

            this.loading = false;
          },

          refresh() {
            this.weather = [];
            this.weatherSource = [];

            weatherService.getWeather().then(res => {
              this.processData(res.data.data);
              this.weather = this.weatherSource.slice(0);
            }).catch(err => {
              console.log('Data fetch failed')
            }); 
          },

          updateWeatherWithNewFilter(newFilter) {
            this.filters.country = newFilter.country;
            this.filters.condition = newFilter.condition;

            let countryArr = this.filters.country;
            let conditionArr = this.filters.condition;

            let filteredWeather = [];

            if(!countryArr.length && !conditionArr.length) {
                this.weather = this.weatherSource;
            } else {
              this.isResults = false;
                this.weatherSource.forEach(item => {
                  if(countryArr.length) {
                    countryArr.forEach(country => {
                      if(item._country._name === country) {
                        if(conditionArr.length) {
                          conditionArr.forEach(condition => {
                            if(item._weatherCondition === condition) {
                              filteredWeather.push(item);
                            }
                          });
                        } else {
                            filteredWeather.push(item);
                        }
                      }
                    })
                  } else {
                    conditionArr.forEach(condition => {
                      if(item._weatherCondition === condition) {
                        filteredWeather.push(item);
                      }
                    });
                  }
                })
                filteredWeather.length ? this.isResults = true : this.isResults = false
                this.weather = filteredWeather;
            }
          }
        }
    }
</script>

<style>
  .col-12:last-of-type {
    margin-top: -36px;
  }
  .v-application a {
    text-decoration: none;
    text-transform: capitalize;
    height: 30px;
    line-height: 30px;
    color: cyan !important;
  }
  .v-icon:hover {
    cursor: pointer;
  }
  .v-dialog .v-card{
    background: #2b9292;
  }

  .v-tabs-slider {
    background-color: cyan;
  }
  .no-results {
    font-size: 13px;
    color: orangered;
  }
</style>