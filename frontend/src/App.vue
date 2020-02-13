<template>
    <v-app>
        <h1 
            class="display-2"
            >Ping: {{latency}}ms</h1>
        <h2 
            class="display-3"
            >Max: {{max}}ms</h2>
        <h2 
            class="display-3"
            >Min: {{min}}ms</h2>
        <h2 
            class="display-3"
            >Count: {{count}}</h2>
        <h2 
            class="display-3"
            >Sum: {{sum}}ms</h2>
        <h2 
            class="display-3"
            >Avg: {{avg}}ms</h2>
        <v-text-field
            class="centered-input"
            label="IP-address"
            v-model="ip"
            solo
          ></v-text-field>
          <chart />
          <stats />
          <dataTable />
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
        data: [],
        max: 0,
        min: 0,
        count: 0,
        sum: 0,  //to calculate avg
    }),
    created() {
        this.interval = setInterval(() => this.getLatency(), 5000);
    },
    methods: {
        getLatency() {
            clearInterval(this.interval)
            console.log("get ping")
            fetch('http://localhost:9000')
            .then(response => response.json())
            .then(data => {
                this.latency = Number(data.time)
                if(this.count == 0) {
                    this.max = this.latency
                    this.min = this.latency
                }
                if(this.max < this.latency) {
                    this.max = this.latency
                }
                if(this.min > this.latency) {
                    this.min = this.latency
                }
                this.sum += this.latency
                ++this.count

                this.interval = setInterval(() => this.getLatency(), 5000);
            })
        }
    },
    computed: {
        avg: function() {
            return this.count != 0 ? (this.sum / this.count).toFixed(2) : 0
        }
    }
};
</script>

<style lang="scss">
    .centered-input input {
    text-align: center
    }
</style>
