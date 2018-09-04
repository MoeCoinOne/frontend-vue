function handleTitle (value) {
  let siteName = '安可萌'
  if (typeof value === 'string') {
    // String 类型直接设置站点标题
    document.title = `${value} - ${siteName}`
  } else if (typeof value === 'object') {
    // 站点标题选项
    let pageTitle = ''
    // if ('showSiteName' in value && value.showSiteName === false) {
    if (!value.showSiteName) { // quick fix by @raphaelsoul due to chrome bug
      pageTitle = value.title
    } else {
      pageTitle = `${value.title} - ${siteName}`
    }
    document.title = pageTitle
  }
}

export default {
  inserted: function (el, binding) {
    handleTitle(binding.value)
  },
  componentUpdated: function (el, binding) {
    handleTitle(binding.value)
  }
}
