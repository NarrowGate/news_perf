<template>
    <v-list dense>
    <v-list-item-group color="primary">
        <v-list-item>
        <v-list-item-content>
            <v-list-item-title v-text="item._name"></v-list-item-title>
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
}
</script>

<style>

</style>