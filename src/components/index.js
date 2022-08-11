import PageTooles from '@/components/PageTooles'
const components = [PageTooles]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
