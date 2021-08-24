<template>
  <div :class="{ind_conBlock:true,shFooter:foBo}">
    <swiper
      class="swiper"
      :options="swiperOptionh"
    >
      <swiper-slide>
        <swiper
          class="swiper vertical"
          :options="swiperOptionv"
        >
          <swiper-slide
            v-for="img in banner"
            :key="img.id"
          >
            <div class="ind_banner">
              <div
                class="ind_baImg"
                :style="{backgroundImage:'url('+img.img+')'}"
              />
            </div>
          </swiper-slide>
          <div
            slot="pagination"
            class="pa02"
          />
        </swiper>
      </swiper-slide>
      <swiper-slide>
        <div class="ind_page">
          <div class="indB_content">
            <div class="indB_ulBl">
              <div
                v-for="b in brand"
                :key="b.id"
                class="indB_liBl"
              >
                <div
                  class="indB_bgImg"
                  :style="{backgroundImage:'url('+b.bgImg+')'}"
                >
                  <div class="after" />
                </div>
                <div class="indHo_block">
                  <div class="indHo_ulBl">
                    <div
                      v-for="li in b.ul"
                      :key="li.id"
                      class="indHo_liBl"
                    >
                      <div class="indHo_img">
                        <img :src="li.img">
                      </div>
                      <div class="indHo_teBl">
                        <div class="indHo_teTi">
                          {{ li.title }}
                        </div>
                        <router-link
                          :to="li.moHref"
                          class="indHo_more"
                        >
                          查看详情
                        </router-link>
                      </div>
                      <div class="clear" />
                    </div>
                  </div>
                  <div class="indHo_ti">
                    <div class="indHo_tCh">
                      {{ b.ti }}
                    </div>
                    <div class="indHo_tEn">
                      {{ b.eTi }}
                    </div>
                  </div>
                  <router-link
                    :to="b.moHref"
                    class="indHo_aBl"
                  >
                    {{ b.more }}
                  </router-link>
                </div>
              </div>
              <div class="indB_liBl">
                <div class="indB_block bgCol1">
                  <div class="indB_tiBl">
                    <div class="indB_ti">
                      品牌索引
                    </div>
                    <div class="indB_en">
                      Brand index
                    </div>
                  </div>
                  <div class="b2_5">
                    <img
                      class="layer"
                      data-depth="3"
                      src="images/c2_5.png"
                    >
                  </div>
                  <div class="b2_51">
                    <img
                      class="layer"
                      data-depth="1"
                      src="images/c2_51.png"
                    >
                  </div>
                  <div class="b2_52">
                    <img
                      class="layer"
                      data-depth="3"
                      src="images/c2_52.png"
                    >
                  </div>
                  <div class="b2_53">
                    <img
                      class="layer"
                      data-depth="1"
                      src="images/c2_53.png"
                    >
                  </div>
                  <div class="b2_54">
                    <img
                      class="layer"
                      data-depth="3"
                      src="images/c2_54.png"
                    >
                  </div>
                  <div class="b2_55">
                    <img
                      class="layer"
                      data-depth="1"
                      src="images/c2_55.png"
                    >
                  </div>
                </div>
              </div>
              <div class="clear" />
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div
          class="ind_page"
          @mousemove="touMove"
        >
          <div class="indC_content">
            <div class="indC_ulBl bgCol2">
              <div class="indC_tiBl">
                <div class="indB_block scene">
                  <div class="indB_tiBl">
                    <div class="indB_ti">
                      主力店铺
                    </div>
                    <div class="indB_en">
                      THE MAIN STORE
                    </div>
                  </div>
                  <div class="b2_4">
                    <img
                      class="layer"
                      data-depth="2"
                      src="/images/c2_4.png"
                    >
                  </div>
                  <div class="b2_41">
                    <img
                      class="layer"
                      data-depth="1"
                      src="/images/c2_41.png"
                    >
                  </div>
                  <div class="b2_42">
                    <img
                      class="layer"
                      data-depth="1"
                      src="/images/c2_42.png"
                    >
                  </div>
                  <div class="b2_43">
                    <img
                      class="layer"
                      data-depth="2"
                      src="/images/c2_43.png"
                    >
                  </div>
                </div>
              </div>
              <div class="indC1_ulBl">
                <div class="indC1_InBl">
                  <div
                    v-for="(st,n) in store"
                    :key="st.id"
                    class="indC_liBl"
                  >
                    <div
                      class="indC_InBlock"
                      :style="{top:oddBack(n)+'px'}"
                    >
                      <a
                        v-for="s in st"
                        :key="s.id"
                        :href="s.href"
                        class="indC_top"
                      >
                        <div
                          class="indC_bg"
                          :style="{backgroundImage:'url('+s.images+')'}"
                        />
                        <div class="indC_InBl">
                          <div class="indC_logo"><img :src="s.img"></div>
                          <div class="indC1_teBl">
                            <div class="indC1_name">{{ s.title }}</div>
                            <div class="indC1_num">店铺号：{{ s.store }} </div>
                          </div>
                          <div class="clear" />
                        </div>
                        <div class="indC1_bl">
                          <div class="indC1_logoBl">
                            <img :src="s.img">
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div class="clear" />
                </div>
              </div>
              <div class="clear" />
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="ind_page">
          <div
            class="indD_content"
            @wheel.prevent="showFooter($event)"
          >
            <div
              class="indD_conBlock"
              :style="{marginTop:-marginTop+'px'}"
            >
              <div class="indD_tiBl">
                <div class="indD_tCh">
                  最新资讯
                </div>
                <div class="indD_tEn">
                  news
                </div>
              </div>
              <div
                v-images-loaded:on.progress="imageProgress"
                class="indD_ulBl"
              >
                <a
                  v-for="n in news"
                  :key="n.id"
                  :href="n.href"
                  class="indD_liBl"
                >
                  <div class="indD_InBl">
                    <div class="indD_img"><img :src="n.img"></div>
                    <div class="indD_ti">{{ n.title }}</div>
                    <div
                      class="indD_te"
                      v-html="n.text"
                    />
                    <div class="indD_more">查看详情</div>
                  </div>
                </a>
                <div class="clear" />
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div
        slot="pagination"
        class="swiper-pagination swiper-pagination-h"
      />
    </swiper>
    <div class="pa01" />
    <transition
      name="fade"
      mode=""
    >
      <div
        v-show="foBo"
        class="fo_bgBlock"
        @wheel.prevent="showFooter($event)"
      />
    </transition>
  </div>
</template>

<script>
    import imagesLoaded from 'vue-images-loaded' // 调用vue-images-loaded
    import $ from 'jquery'

    export default {
        directives: {
            imagesLoaded
        },
        props: {
            clDa: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                banner: [], // banner图
                brand: [{ // 品牌索引
                        bgImg: '/images/2_1.png',
                        ti: '零售',
                        eTi: 'retail',
                        more: '更多购物',
                        moHref: '/business',
                        ul: []
                    },
                    {
                        bgImg: '/images/2_2.jpg',
                        ti: '餐饮',
                        eTi: 'Restaurant',
                        more: '更多美食',
                        moHref: '/business'
                    },
                    {
                        bgImg: '/images/2_3.jpg',
                        ti: '娱乐',
                        eTi: 'entertainment',
                        more: '更多娱乐',
                        moHref: '/business'
                    }
                ],
                store: [],
                news: [], // 最新资讯
                swiperOptionh: {}, // banner
                swiperOptionv: {
                    effect: 'slide',
                    speed: 800,
                    autoplay: {
                        delay: 3000
                    },
                    pagination: {
                        el: '.pa02',
                        clickable: true
                    }
                },
                marginTop: 250,
                da: 0,
                foBo: false,
                moNum: 0 // 上下移动的值
            }
        },
        watch: {
            clDa: function () { // 关闭页尾
                this.foBo = this.clDa
            }
        },
        created() {
            const _this = this

            this.$http.get('banner').then(function (res) { // banner
                _this.banner = res.data
            }).catch(function (error) {
                console.log(error)
            })

            this.$http.get('store').then((res) => { // 品牌索引
                _this.brand.forEach((value) => {
                    value.ul = res.data.filter((item) => {
                        item.moHref = '/business/brand?id=' + item.id
                        return item.class.indexOf(value.ti) >= 0
                    })
                    value.ul = value.ul.slice(0, 3)
                })

                var da = res.data.filter((item) => {
                    return item.class.indexOf('主力店') >= 0
                })
                da.forEach((item, n) => {
                    var i = 0
                    if (n < 4) {
                        i = 0
                    } else if (n >= 4 && n < 6) {
                        i = 1
                    } else if (n >= 6 && n < 10) {
                        i = 2
                    } else if (n >= 10 ** n < 12) {
                        i = 3
                    } else {
 (
                        i = 4
                    )
}
                    item.href = '/#/business/brand?id=' + item.id
                    _this.store.push([])
                    _this.store[i].push(item)
                })
                console.log(_this.store)
            })

            this.$http.get('news').then((res) => { // 最新资讯
                _this.news = res.data.slice(0, 3)
                _this.news.forEach(function (item) {
                    item.href = '/#/activity/?id=' + item.id
                })
            })

            this.swiperOptionh = { // 放created中,解决this冲突
                direction: 'vertical',
                mousewheel: true,
                pagination: {
                    el: '.pa01',
                    clickable: true
                },
                on: {
                    transitionStart: function () {
                        let m = this.activeIndex // 返回swiper索引
                        if (m !== 3) {
                            _this.foBo = false
                        }
                    }
                }
            }
        },
        mounted() {
            const _this = this
            window.onresize = function () { // 窗口自适应
                _this.newsCenter()
            }
            $('body').on('click', function () {
                // alert(0)
            })
        },
        methods: {
            newsCenter: function () { // 新闻居中
                this.marginTop = document.getElementsByClassName('indD_conBlock')[0].clientHeight / 2
            },
            imageProgress(instance, image) { // 判断images加载完成
                image.isLoaded ? 'loaded' : 'broken'
                this.newsCenter()
            },
            showFooter: function (e) {
                if (new Date().getTime() - this.da > 500) { // 滚轮操作判断
                    this.da = new Date().getTime()
                    var delta = -e.wheelDelta || e.detail // firefox使用detail:下3上-3,其他浏览器使用wheelDelta:下-120上120//下滚
                    if (delta > 0) {
                        this.foBo = true
                    } else {
                        this.foBo = false
                    }
                    this.$emit('footerDa', this.foBo) // 页尾显示参数
                }
            },
            touMove: function (e) {
                this.moNum = -e.clientY * 1.1
            },
            oddBack: function (n) {
                if (n % 2 === 0) {
                    return this.moNum
                }
            }
        }
    }

</script>
<style>
    .swiper-container {
        width: 100%;
        height: 100%;
    }

    .swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {
        margin: 0px 12px;
        outline: none;
    }

    .swiper-pagination-fraction,
    .swiper-pagination-custom,
    .swiper-container-horizontal>.swiper-pagination-bullets {
        bottom: 30px;
    }

    .ind_body {
        position: relative;
        height: 100%;
        overflow: hidden;
    }

    .ind_body #Footer {
        top: 0px;
    }

    .ind_body .ind_conBlock.shFooter,
    .ind_body div#Footer.shFooter {
        top: -310px;
    }

</style>
