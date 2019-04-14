<template>
  <div id="app">
      <Nav v-show="isAuthenticated"></Nav>
    <router-view/>
  </div>
</template>

<script>
    import Nav from './components/Nav'
    export default {
        name: 'app',
        components: {
            'Nav': Nav
        },
        data: function() {
            return {
                isAuthenticated: true
            }
        }
    }
</script>

<style lang="scss">
  body{
    background-color: #f9f9f9;
      margin: 0;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>


