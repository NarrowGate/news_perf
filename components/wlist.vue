<template>
    <v-list dense>
        <v-list-item-group color="primary">
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title v-text="item._name"></v-list-item-title>
                    <v-list-item-subtitle v-text="this.formatDate(item._weatherLastUpdated)"></v-list-item-subtitle>
                </v-list-item-content>
            <v-list-item-icon>
                <v-icon v-text="item._weatherTemp"></v-icon>
            </v-list-item-icon>
            </v-list-item>
        </v-list-item-group>
    </v-list>
</template>

<script>
    export default {

        props: {
            item: {
                type: Object
            }
        },
        methods: {
            formatDate(timeStamp) {
                let timestampInMs = timeStamp * 1000,
                    todate = new Date(timestampInMs).getDate(),
                    tomonth = new Date(timestampInMs).getMonth()+1,
                    toyear = new Date(timestampInMs).getFullYear();
                return `Last Updated ${ todate }/${ tomonth }/${ toyear }`;
            }
        }
        
    }
</script>