<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container">
                <h1>Creating Beautiful Charts Using Vue.js Wrapper For Cjart.js</h1>
                <ul>
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link to="realtime">Realtime</router-link></li>
                    <li><router-link to="log">Log</router-link></li>
                </ul>

            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.hero {
  width: 100%;
  height: 10%;
}
.container {
  display: 100%;
  align-items: center;
  align-content: center;
  justify-content: center;
}
h1,h2 {
  font-weight: none;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
