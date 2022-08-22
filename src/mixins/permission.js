import permissionsPoint from '@/constant/permission'

export default {
  data() {
    return {
      point: permissionsPoint
    }
  },
  methods: {
    isHas(point) {
      return this.$store.state.premission.points.includes(point)
    }
  }
}
