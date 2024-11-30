<template>
    <Header></Header>
    <Navigation></Navigation>

    <Footer></Footer>
</template>

<script>
import Navigation from '../components/Navigation.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue';


export default {
    name: 'Basket',
    components: {
        Navigation,
        Header,
        Footer,
    },
}
</script>

<style scoped>


</style>