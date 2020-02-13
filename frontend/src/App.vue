<template>
    <v-app>
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
        data: []
    }),
};
</script>

<style lang="scss">
    .centered-input input {
    text-align: center
    }
</style>
