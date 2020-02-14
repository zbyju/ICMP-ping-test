<template>
    <v-app>
        <v-container
            class="pa-0 my-0 margin-negative">
            <v-row
                justify="center">
                <v-col
                    class="text-center font-weight-black big-text"
                    :class="latencyColor"
                    lg="12">
                    {{stats.latency}}
                </v-col>
            </v-row>
        </v-container>
        <v-container
            fluid>
            <v-row>
                <v-col 
                    lg="6">
                    <v-text-field
                        class="centered-input"
                        label="IP-address"
                        v-model="ip"
                        regular
                    ></v-text-field>
                </v-col>
                <v-col 
                    lg="6">
                    <v-text-field
                        class="centered-input"
                        label="Interval delay"
                        v-model="intervalDelay"
                        regular
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col lg="4">
                    <stats :stats="stats"></stats>
                </v-col>
                <v-col lg="8">
                    <chart :data500="data500"></chart>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import chart from './components/Chart'
import stats from './components/Stats'

import avgMixin from './mixins/avgMixin'

export default {
    name: 'App',

    components: {
        chart,
        stats,
    },

    data: () => ({
        ip: '1.1.1.1',
        runningPing: true,
        intervalDelay: 1000,

        latencyColor: 'white--text',

        data500: [],
        stats: {
            name: "Stats",
            latency: 0,
            max: 0,
            min: 0,
            count: 0,
            failed: 0,
            sum: 0,  //to calculate avg
        }
    }),
    created() {
        this.interval = setInterval(() => this.getLatency(), this.intervalDelay);
    },
    methods: {
        getLatency() {
            clearInterval(this.interval)
            fetch('http://localhost:9000/?host=' + this.ip)
            .then(response => response.json())
            .then(data => {
                this.stats.latency = Number(data.time)

                //Change text color (class) depending on the latency
                if(this.stats.latency >= 250 || this.stats.latency == -1) {
                    this.latencyColor = 'red--text'
                } else if(this.stats.latency >= 150) {
                    this.latencyColor = 'red--text text--lighten-1'
                } else if(this.stats.latency >= 100) {
                    this.latencyColor = 'red--text text--lighten-2'
                } else if(this.stats.latency >= 75) {
                    this.latencyColor = 'red--text text--lighten-3'
                } else if(this.stats.latency >= 60) {
                    this.latencyColor = 'red--text text--lighten-4'
                } else if(this.stats.latency >= 45) {
                    this.latencyColor = 'red--text text--lighten-5'
                } else {
                    this.latencyColor = 'white--text'
                }

                //Change max, mins, failed, sum
                if(this.stats.latency != -1) { //If ping was ok
                    if(this.stats.count == 0) {
                        this.stats.max = this.stats.latency
                        if(this.stats.min > -1) {
                            this.stats.min = this.stats.latency
                        }
                    }
                    if(this.stats.max < this.stats.latency) {
                        this.stats.max = this.stats.latency
                    }
                    if(this.stats.min > -1 && this.stats.min > this.stats.latency) {
                        this.stats.min = this.stats.latency
                    }
                    //Sum
                    this.stats.sum += this.stats.latency
                } else { //If ping failed
                    this.stats.latency = "Failed"
                    ++this.stats.failed
                    
                    this.stats.sum += 3000
                }

                //Add to queue
                this.addToQueue500(this.stats.latency)

                //Count
                ++this.stats.count
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                this.interval = setInterval(() => this.getLatency(), this.intervalDelay);
            })
        },
        addToQueue500(x) {
            if(this.data500.length >= 100) {
                this.data500.shift()
            }
            this.data500.push(x)
        }
    },
    computed: {
        
    },
    mixins: [avgMixin],
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
