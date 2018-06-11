<template>
  <div>
    <ApolloQuery
      :query="require('../graphql/Tag.gql')"
      :variables="{ id }"
    >
      <div slot-scope="{ result: { data } }">
        <template v-if="data">
          <div>
            {{ data.tag.name }}
          </div>
          <img :src="qr" />
          <div>
            {{ data.tag.id }}
          </div>
        </template>
      </div>
    </ApolloQuery>
  </div>
</template>

<script>
import QRCode from 'qrcode';

export default {
  data () {
    return {
    }
  },

  computed: {
    id: function() { return this.$route.params.id },
    qr: function() {
      let codeUrl;
      let str = this.$route.params.id
      QRCode.toDataURL(str, { errorCorrectionLevel: 'H' }, (err, url) => {
        codeUrl = url;
      })
      return codeUrl
    }
  },

  methods: {
  },
}
</script>


<style lang="scss">

</style>
