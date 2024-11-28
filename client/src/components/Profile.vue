<template>
    <Header></Header>
    <Navigation></Navigation>
    <form>
        <button type="submit" @click="logout"> Выход </button>
  </form>
    <Footer></Footer>
</template>

<script>
import Navigation from './page components/Navigation.vue'
import Header from './page components/Header.vue'
import Footer from './page components/Footer.vue';


export default {
    name: 'Profile',
    components: {
        Navigation,
        Header,
        Footer,
    },methods: {
        async logout() {
            this.$store.dispatch('logout');
            this.$router.push('/login');
        }
        
    }
}
</script>

<style scoped>
button[type="submit"] {
    width: 100%;
    padding: 10px;
    background-color:#2d4485;
    border: none;
    color: white;
    border-radius: 4px;
    cursor: pointer;
}
button[type="submit"]:hover {
    background-color:#2d4485;
}

</style>