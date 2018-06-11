<template>
  <div>
    <qrcode-reader @decode="onDecode"></qrcode-reader>
    <router-link to="/tag/new">Crear nuevo tag</router-link>
    <br>
    <router-link to="/tags">Ver todos</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  computed: {
  },

  methods: {
    onDecode (decodedString) {
      this.$router.push('/tag/' + decodedString)
    }
  },
}
</script>


<style lang="scss">

</style>
