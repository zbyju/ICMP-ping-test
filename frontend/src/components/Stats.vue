<template>
    <div id="Stats">

        <v-card>
            <v-card-title class="subheading font-weight-bold">{{ stats.name }}</v-card-title>

            <v-divider></v-divider>

            <v-list dense>
                <v-list-item>
                    <v-list-item-content>Current latency:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ stats.latency }}ms</v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>Count:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ stats.count }}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>Failed:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ stats.failed }}</v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>Highest latency:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ stats.max }}ms</v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>Lowest latency:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ stats.min }}ms</v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>Average latency:</v-list-item-content>
                    <v-list-item-content class="align-end">{{ avg }}ms</v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card>

    </div>
</template>

<script>

import avgMixin from '../mixins/avgMixin'

export default {
    name: 'Stats',
    props: ['stats'],
    data () {
        return {
            items: [{
                name: "test"
            }]
        }
    },
    mixins: [avgMixin],
}
</script>

<style lang="scss">
</style>
