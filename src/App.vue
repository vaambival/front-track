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
      text-align: left;
      color: #2c3e50;
    }
    .button-pr{
      display: block;
      text-align: center;
      width: 100%;
      background-color: #FFA011;
      background-image: linear-gradient(-180deg,#FFCB7C,#FFA011 90%);
      color: #fff;
      border: 1px solid rgba(27,31,35,.2);
      border-radius: .25em;
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
      padding: 6px 12px;
      position: relative;
      vertical-align: middle;
      white-space: nowrap;
    }
    input{
        display: block;
        background-color: #FFF;
        font-size: 14px;
        border: 1px solid #d1d5da;
        border-radius: 3px;
        box-shadow: inset 0 1px 2px rgba(27,31,35,.075);
        color: #24292e;
        line-height: 20px;
        min-height: 20px;
        outline: none;
        padding: 6px 8px;
        vertical-align: middle;
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


