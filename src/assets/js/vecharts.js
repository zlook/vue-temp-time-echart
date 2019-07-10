//引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入折线图等组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/radar')

// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/legendScroll') //图例翻译滚动



export default {
  bind: (el) => {
    el.resizeEventHandler = () => el.echartsInstance.resize();

    if (window.attachEvent) {
      window.attachEvent('onresize', el.resizeEventHandler);
    } else {
      window.addEventListener('resize', el.resizeEventHandler, false);
    }
  },

  inserted: (el, binding) => {
    el.echartsInstance = echarts.init(el);
    el.echartsInstance.setOption(binding.value);
  },

  update: (el, binding) => {
    el.echartsInstance.setOption(binding.value);
  },

  unbind: (el) => {
    if (window.attachEvent) {
      window.detachEvent('onresize', el.resizeEventHandler);
    } else {
      window.removeEventListener('resize', el.resizeEventHandler, false);
    }

    el.echartsInstance.dispose();
  }
}
