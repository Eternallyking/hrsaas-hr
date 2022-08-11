<template>
  <el-card class="box-card">
    <el-row type="flex">
      <el-col>
        <el-tag v-if="isshowleft" :hit="true">
          <i :class="lefticon"></i>
          <slot name="left" />
        </el-tag>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="right" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'PageTooles',
  data() {
    return {}
  },
  props: {
    lefticon: {
      type: String,
      default: () => 'el-icon-info'
    },
    isshowleft: {
      type: Boolean,
      default: () => true
    }
  },

  created() {},

  methods: {}
}
</script>

<style scoped></style>
