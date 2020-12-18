<template>
    <div class="bus_content me_top">
      <div class="bus_conBlock">
        <div class="mes_content">
            <div class="mes_tiBl">
                <div class="mes_ti">会员留言建议</div>
            </div>
            <div class="mes_conBlock">
                <form id="form1">
                    <div class="mes_block">
                        <div class="mes_inputBl">
                            <input type="text" class="mes_input" placeholder="姓 名" name="M_Value1" lay-verify="required" lay-reqtext="请输入姓名" >
                            <div class="mes_ico"></div>
                        </div>
                        <div class="mes_inputBl">
                            <input type="text" class="mes_input" placeholder="手 机" name="M_Value2" lay-verify="required|phone" lay-reqtext="请输入手机" >
                            <div class="mes_ico"></div>
                        </div>
                        <div class="mes_inputBl">
                            <input type="text" class="mes_input" placeholder="邮 箱" name="M_Value3" lay-verify="required|email" lay-reqtext="请输入邮箱" >
                            <div class="mes_ico"></div>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <textarea placeholder="内容" class="mes_textarea" name="M_Value4" lay-verify="required" lay-reqtext="请输入内容" ></textarea>
                    <div class="mes_block">
                        <input type="text" class="mes_inputB" name="vercode" placeholder="验证码" lay-verify="required" lay-reqtext="请输入验证码"  >
                        <div class="mes_bl">
                            <div class="mes_img"><img src="../../images/GetAuthCode.jpg"></div>
                            <div class="mes_t">（看不清？点击验证码刷新）</div>
                        </div>
                    </div>
                    <div class="mes_buttonBlock">
                        <div class="mes_submit">提 交</div>
                        <div class="mes_reset">重 置</div>
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
          
        }
      }
    }
  </script>