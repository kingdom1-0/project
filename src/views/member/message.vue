<template>
  <div class="bus_content me_top">
    <div class="bus_conBlock">
      <div class="mes_content">
        <div class="mes_tiBl">
          <div class="mes_ti">
            会员留言建议
          </div>
        </div>
        <div class="mes_conBlock">
          <form id="form1">
            <div class="mes_block">
              <div class="mes_inputBl">
                <input
                  v-model="name"
                  type="text"
                  class="mes_input"
                  placeholder="姓 名"
                >
                <div class="mes_ico" />
              </div>
              <div class="mes_inputBl">
                <input
                  v-model="phone"
                  type="text"
                  class="mes_input"
                  placeholder="手 机"
                >
                <div class="mes_ico" />
              </div>
              <div class="mes_inputBl">
                <input
                  v-model="Email"
                  type="text"
                  class="mes_input"
                  placeholder="邮 箱"
                >
                <div class="mes_ico" />
              </div>
              <div class="clear" />
            </div>
            <div class="mes_teBl">
              <textarea
                v-model="text"
                placeholder="内容"
                class="mes_textarea"
              />
              <div class="mes_ico" />
            </div>
            <div class="mes_block">
              <div class="mes_div">
                <input
                  v-model="verify"
                  type="text"
                  class="mes_inputB"
                  name="vercode"
                  placeholder="验证码"
                >
                <div class="mes_ico" />
              </div>
              <div class="mes_bl">
                <div
                  class="mes_img"
                  @click="verifyFun()"
                >
                  {{ verifyOn }}
                </div>
                <div class="mes_t">
                  （看不清？点击验证码刷新）
                </div>
              </div>
            </div>
            <div class="mes_buttonBlock">
              <div
                class="mes_submit"
                @click="submit()"
              >
                提 交
              </div>
              <div
                class="mes_reset"
                @click="reset()"
              >
                重 置
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                name: '',
                phone: '',
                Email: '',
                text: '',
                verify: '',
                verifyOn: ''
            }
        },
        mounted: function () {
            this.verifyFun()
        },
        methods: {
            thisDate() { // 返回当前时间
                var date = new Date()
                var month = date.getMonth() + 1
                var day = date.getDate()
                if (month < 10) {
                    month = '0' + month
                }
                if (day < 10) {
                    day = '0' + day
                }
                return date.getFullYear() + '-' + month + '-' + day + ' ' + date
                    .getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
            },
            submit: function () { // 提交
                var _this = this
                let phoneReg = new RegExp('^[1][3,4,5,7,8][0-9]{9}$')
                let EmailReg = new RegExp(
                    '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$')
                if (this.name.length < 2 || this.name.length > 6) {
                    alert('请输入正确的姓名！')
                } else if (this.phone.length < 10 || !phoneReg.test(this.phone)) {
                    alert('请输入正确的手机号！')
                } else if (this.Email.length < 10 || !EmailReg.test(this.Email)) {
                    alert('请输入正确的邮箱！')
                } else if (this.text.length < 2) {
                    alert('请输入您的留言！')
                } else if (this.verify !== this.verifyOn) {
                    alert('验证码错误!')
                } else {
                    var data = {
                        name: this.name,
                        phone: this.phone,
                        Email: this.Email,
                        text: this.text
                    }
                    data.date = _this.thisDate()
                    this.$http.post('message', data).then((res) => {
                        if (res.status === '200') {
                            alert('已留言，我们将尽快回复你的问题！')
                            _this.empty()
                        }
                    })
                }
            },
            empty: function () {
                this.name = ''
                this.phone = ''
                this.Email = ''
                this.text = ''
                this.verify = ''
            },
            reset: function () { // 重置
                this.empty()
            },
            verifyFun: function () {
                this.verifyOn = parseInt(Math.random() * 10000)
            }
        }
    }

</script>
