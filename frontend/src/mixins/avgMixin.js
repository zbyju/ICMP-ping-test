export default {
    computed: {
        avg: function() {
            return this.stats.count != 0 ? (this.stats.sum / this.stats.count).toFixed(2) : 0
        }
    }
}