<template>
  <div>

    <ApolloQuery
      :query="require('../graphql/Tags.gql')"
    >
      <ApolloSubscribeToMore
        :document="require('../graphql/TagAdded.gql')"
        :update-query="onTagAdded"
      />

      <div slot-scope="{ result: { data } }">
        <template v-if="data">
          <div
            v-for="tag of data.tags"
            :key="tag.id"
            class="tag"
          >
            {{ tag.id }} {{ tag.name }}
          </div>
        </template>
      </div>
    </ApolloQuery>

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

  },
}
</script>


<style lang="scss">

</style>
