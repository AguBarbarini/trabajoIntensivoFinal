<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/clientes">Clientes</router-link> |
      <router-link to="/compras">Compras</router-link> |
    </nav>
    <router-view />
  </div>
</template>
<script>
/* eslint-disable */ 
  export default {
    name: 'App',
  };
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  background-color: rgba(160, 190, 179, 0.452);
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: black
}
</style>
