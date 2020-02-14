<template>
    <v-app>
        <v-container
            class="pa-0 my-0 margin-negative">
            <v-row
                justify="center">
                <v-col
                    class="text-center font-weight-black big-text"
                    lg="12">
                    {{latency}}
                </v-col>
            </v-row>
        </v-container>
        <v-container
            fluid>
            <v-row>
                <v-col 
                    lg="4">
                    <v-text-field
                        class="centered-input"
                        label="IP-address"
                        v-model="ip"
                        regular
                    ></v-text-field>
                </v-col>
                <v-col 
                    lg="4">
                    <v-text-field
                        class="centered-input"
                        label="Interval delay"
                        v-model="intervalDelay"
                        regular
                    ></v-text-field>
                </v-col>
                <v-col 
                    lg="4">
                    <v-text-field
                        class="centered-input"
                        label="IP-address"
                        v-model="ip"
                        regular
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <chart />
            </v-row>
                <stats />
                <dataTable :stats="stats"/>
            <v-row>

            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import chart from './components/Chart';
import stats from './components/Stats';
import dataTable from './components/DataTable';

export default {
    name: 'App',

    components: {
        chart,
        stats,
        dataTable
    },

    data: () => ({
        ip: '1.1.1.1',
        latency: 0,
        runningPing: true,
        intervalDelay: 1000,

        data: [],
        stats: {
            max: 0,
            min: 0,
            count: 0,
            sum: 0,  //to calculate avg
        }
    }),
    created() {
        this.interval = setInterval(() => this.getLatency(), this.intervalDelay);
    },
    methods: {
        getLatency() {
            clearInterval(this.interval)
            fetch('http://localhost:9000')
            .then(response => response.json())
            .then(data => {
                this.latency = Number(data.time)
                if(this.stats.count == 0) {
                    this.stats.max = this.latency
                    if(this.stats.min > -1) {
                        this.stats.min = this.latency
                    }
                }
                if(this.stats.max < this.latency) {
                    this.stats.max = this.latency
                }
                if(this.stats.min > -1 && this.stats.min > this.latency) {
                    this.stats.min = this.latency
                }
                this.stats.sum += this.latency
                ++this.stats.count
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                this.interval = setInterval(() => this.getLatency(), this.intervalDelay);
            })
        }
    },
    computed: {
        avg: function() {
            return this.stats.count != 0 ? (this.stats.sum / this.stats.count).toFixed(2) : 0
        }
    }
};
</script>

<style lang="scss">
    .centered-input input {
        text-align: center
    }
    div.container {
        div.big-text {
            font-size: 24rem !important;
        }
    }
    div.v-application--wrap {
        div.container.margin-negative {
            margin-top: -90px !important;
            margin-bottom: -100px !important;
        }
    }
</style>
