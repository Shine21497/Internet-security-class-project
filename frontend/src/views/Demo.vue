<template>
    <p>Original message: "{{ message }}"</p>
</template>

<script>
    export default {
        data() {
            return {
                message: "demo"
            }
        },
        mounted () {
            this.$axios
                .get('/api/users/udemo1')
                .then(response => (this.message = response.data))
        },
        created() {


        },
        methods: {


        }
    }
</script>

<style scoped>

</style>