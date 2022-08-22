import store from '@/store'
export const imgError = {
  inserted(el, { value }) {
    if (el.src) {
      el.onerror = function () {
        el.src = value
      }
    } else {
      el.src = value
    }
  },
  update(el, { value }) {
    if (el.src) {
      el.onerror = function () {
        el.src = value
      }
    } else {
      el.src = value
    }
  }
}

export const isHas = {
  inserted(el, binding) {
    const has = store.state.premission.points.includes(binding.value)
    if (!has) {
      el.remove()
    }
  }
}
