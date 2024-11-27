<template>
    <Header></Header>
    <Navigation></Navigation>

    <Footer></Footer>
</template>

<script>
import Navigation from './page components/Navigation.vue'
import Header from './page components/Header.vue'
import Footer from './page components/Footer.vue';


export default {
    name: 'Basket',
    components: {
        Navigation,
        Header,
        Footer,
    },
}
</script>

<style>


</style>