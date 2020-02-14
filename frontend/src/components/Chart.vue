<template>
    <div id="Chart">
        <chartist
            ratio="ct-major-twelfth"
            type="Line"
            :data="chartData"
            :options="chartOptions"
            :event-handlers="eventHandlers">
        </chartist>
    </div>
</template>

<script>

export default {
    name: 'Chart',
    props: ['data500'],
    data () {
        return {
            chartData: {
                series: [this.data500]
            },
            chartOptions: {
                lineSmooth: true,
                high:200,
                low: 0,
            }
        }
    }
}
</script>

<style lang="scss">
div#Chart {
    line {
        stroke: #1e1e1e;
    }
    line.ct-point {
        stroke: #fff
    }
    path {
        stroke: #fff
    }
    span {
        color: #fff
    }
}
</style>
