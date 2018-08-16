<template>
<section>
  <el-row :butter="10">
    <el-col :span="8"><div class="grid-content bg-purple">
      <div class="group">
        <input type="text" required :value="value"   v-bind="$attrs"   @input="updateModel" ref="input" />
        <label>{{ input_bank }}</label>
      </div>
    </div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple-light">
      <div class="group">
        <input type="text" required :value="value"   v-bind="$attrs"   @input="updateModel" ref="input" />
        <label>{{ input_category }}</label>
      </div>
    </div></el-col>
    <el-col :span="8"><div class="grid-content bg-purple">
      <div class="group">
        <input type="text" required :value="value"   v-bind="$attrs"   @input="updateModel" ref="input" />
        <label>{{ input_customer }}</label>
      </div>
    </div></el-col>
  </el-row>
</section>
</template>

<script>
export default {
  props: ['label', 'value'],
  data () {
    return {
      input_bank: '',
      input_category: '',
      input_customer: ''
    }
  },
  methods: {
    updateModel () {
      this.$emit('search', this.$refs.input.value.toString())
    }
  },
  created () {
    console.log('this.$parent', this.$parent)
    this.input_bank = this.$parent.note_input_search.bank
    this.input_category = this.$parent.note_input_search.category
    this.input_customer = this.$parent.note_input_search.customer
  }
}
</script>

<style lang="scss" scoped>
  .group {
    position:relative;
    margin-right: 5px
  }
  input {
    font-size: 14px;
    padding: 20px 0 10px 0;
    display: block;
    width: 100%;
    color: #495057;
    border: 1px solid #e7e7e7;
    border-radius: 5px;
    text-indent: 20px;
    background: #fcfcfc;
  }
  input:focus {
    outline:none;
    background: #fff;
  }

  /* LABEL ======================================= */
  label {
    color:#999;
    font-size: 13px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 20px;
    top: 13px;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  /* active state */
  input:focus ~ label, input:valid ~ label {
    top: 3px;
    font-size: 11px;
    color: #676767;
    font-weight: bold;
  }

  input:focus {
    border-color: #0088cc;
  }
</style>
