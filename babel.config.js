const prodPlugins = [];
if (process.env.NODE_ENV === 'proeuction') { //判断运行阶段加执行参数
  prodPlugins.push('transform-remove-console');
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ...prodPlugins //写入参数
  ]
}