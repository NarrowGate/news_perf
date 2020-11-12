<template>
    <v-dialog v-model="dialog" max-width="650px" dark>
        <template v-slot:activator="{ on, attrs }">
          <v-icon dense color="cyan"  dark v-bind="attrs" v-on="on" title="Filter">
            mdi-filter
          </v-icon>
        </template>
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-card-title>
                    <span class="headline">Filter by Country</span>
                  </v-card-title>
                  <v-divider></v-divider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" sm="4" md="4" 
                  v-for="country in countries" 
                  :key="country">
                    <v-checkbox
                      hide-details="true"
                      color="cyan"
                      :label="country"
                      :value="country"
                      v-model="filter.country"
                      @click="filterFn"
                    ></v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card-title>
                    <span class="headline">Filter by Weather Condition</span>
                  </v-card-title>
                  <v-divider></v-divider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" sm="4" md="4" 
                  v-for="condition in weatherConditions" 
                  :key="condition">
                    <v-checkbox
                      hide-details="true"
                      color="cyan"
                      :label="condition"
                      :value="condition"
                      v-model="filter.condition"
                      @click="filterFn">
                    </v-checkbox>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="cyan"
              text
              @click="dialog = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
    export default {

        data() {
            return {
                dialog: false,
                filter:{
                  country:[],
                  condition: [],
                }            
            }
        },

        props: ['countries', 'weatherConditions'],

        methods: {
          filterFn() {
            this.$emit('filterChanged', this.filter);
          }
        }
        
    }
</script>