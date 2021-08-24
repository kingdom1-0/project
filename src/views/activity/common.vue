<template>
  <div class="com_content">
    <div class="com_bgImg bgImg_1">
      <img
        class="b6_1"
        src="/images/6_1.png"
      >
      <img
        class="b6_2"
        src="/images/6_2.png"
      >
      <img
        class="b6_3"
        src="/images/6_3.png"
      >
    </div>
    <div class="com_conBlock">
      <div class="bus_ul">
        <router-link
          v-for="(item, n) in nav"
          :key="item.id"
          :to="item.href"
          :class="{ bus_li: true, current: n == active }"
        >
          {{ item.name }}
        </router-link>
        <div class="clear" />
      </div>
      <transition name="fad">
        <router-view ref="child" />
      </transition>
    </div>
    <news-content />
  </div>
</template>

<script>
import newsContent from '../components/news.vue'
export default {
  components: {
    newsContent,
  },
  data: function() {
    return {
      nav: [
        {
          id: 1,
          name: '活动资讯',
          href: '/activity/',
        },
        {
          id: 2,
          name: '活动回顾',
          href: '/activity/review',
        },
      ],
    }
  },
  watch: {
    $route() {
      this.navActive()
    },
  },
  created() {
    this.navActive()
  },
  methods: {
    initCh: function() {
      this.$refs.child.bo = false // 通过ref操作子组件
    },
    navActive: function() {
      var href = location.href
      if (href.includes('/activity/review')) {
        this.active = 1
      } else {
        this.active = 0
      }
    },
  },
}
</script>
