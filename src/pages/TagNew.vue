<template>
  <div>

    <v-form @submit="tagCreate">
      <v-text-field
        v-model="name"
        label="Nombre"
        required
      ></v-text-field>
      <v-btn
        @click="tagCreate"
      >
        Crear
      </v-btn>
    </v-form>

  </div>
</template>

<script>
import TAG_ADD_MUTATION from '../graphql/TagAdd.gql'

export default {
  data () {
    return {
      name: '',
    }
  },

  computed: {
  },

  methods: {
    tagCreate () {
      this.$apollo.mutate({
        mutation: TAG_ADD_MUTATION,
        variables: {
          input: {
            name: this.name,
          },
        }
      }).then(data => {
        let tag = data.data.tagAdd
        this.$router.push('/tag/' + tag.id)
      })
    },
  },
}
</script>


<style lang="scss">

</style>
