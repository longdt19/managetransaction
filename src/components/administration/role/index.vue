<template>
  <h1>role</h1>
</template>

<script>
import { ROLE_URL } from '@/constants/endpoints'

export default {
  methods: {
    async load_role_list () {
      const response = await this.$services.do_request('get', ROLE_URL)
      console.log('response', response)
    }
  },
  created () {
    this.load_role_list()
  }
}
</script>

<style lang="css">
</style>
