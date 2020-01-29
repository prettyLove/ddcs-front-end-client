<template>
  <div class="login">

    <div class="cont">
      <div class="logo">
        <!--                <img src="../../../static/images/logo.png">-->
        <h3 style="color: #fff; font-size: 22px;">中广核工程公司-设计院</h3>
      </div>

      <div class="login_main">

        <div class="left">
          <img src="../../../static/images/login.png">
        </div>
        <div class="login-box">
          <div style="text-align: right; padding:20px 20px 0 0;">
            <el-select v-model="lang" placeholder="请选择" size="mini" style="width: 100px;" @change="handleSetLanguage">
              <el-option label="中文简体" :value="language[0]"/>
              <el-option label="中文繁体" :value="language[1]"/>
              <el-option label="English" :value="language[2]"/>
            </el-select>
          </div>
          <div class="head-box"><h3>{{ $t('login.title') }}</h3></div>
          <el-form ref="loginForm" :label-position="labelPosition" label-width="80px" :model="account"
                   style="text-align: center;margin-top: 10px">
            <el-input v-model="account.username" style="width: 280px" :placeholder="$t('login.username')">
              <template slot="prepend">
                <font-awesome-icon icon="user" style="color: #1690ED"/>
              </template>
            </el-input>

            <el-input v-model="account.password" type="password" style="width: 280px; margin: 20px 3px 0 0"
                      :placeholder="$t('login.password')">
              <template slot="prepend">
                <font-awesome-icon icon="lock" style="color: #1690ED"/>
              </template>
            </el-input>
          </el-form>

          <div style="margin: 20px 40px 0px 0px;text-align: right;vertical-align: middle">
            <el-checkbox id="remember" v-model="remember" label="1">{{ $t('login.remember') }}</el-checkbox>
            <a>
              <font-awesome-icon :icon="['fas','info-circle']" style="color: #999999"/>
            </a>
          </div>

          <!-- 拼命加载中 -->
          <div v-loading="loading" style="text-align: center;" element-loading-text="loading ...">
            <!--登陆-->
            <el-button type="primary" style="width: 280px;margin-top: 20px" @click="sendLogin">{{ $t('login.logIn') }}
            </el-button>
          </div>
        </div>
      </div>
      <!--  底部  -->
      <div v-if="$store.state.settings.showFooter" class="login_footer" style="text-align: center">
        <div style="position: relative;text-align: center;width: 100%">
          <span v-html="$store.state.settings.footerTxt"/>
          <span> ⋅ </span>
          <a href="http://www.beian.miit.gov.cn" target="_blank">{{ $store.state.settings.caseNumber }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { setToken } from '@/utils/auth'
  import router from '@/router/index'
  import { getLanguage } from '../../utils/i18n'
  import {
    setPassWord,
    setUserName,
    getDecryptPassWord,
    getDecryptUserName,
    removeUserName,
    removePassWord,
    getUserName,
    getPassWord
  } from '../../utils/localStore/userCookie'

  export default {
    components: {},
    data() {
      return {
        router,
        lang: getLanguage() || 'zh_CN',
        language: ['zh_CN', 'zh_TW', 'en_US'],
        labelPosition: 'right',
        remember: true,
        account: {
          username: '',
          password: '',
          orgName: ''
        },
        localStorageUser: '',
        localStoragePassword: '',
        OrgList: [],
        loading: false
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    created() {
    },
    mounted() {
      this.getLocalStorage()
    },
    methods: {
      sendLogin() {
        if (!this.validateLoginForm()) {
          return true
        }
        this.loading = true
        const _self = this
        // login 记录密码验证，如果记住密码状态为true，则保存至localStorage
        if (_self.remember === true) {
          _self.setLocalStorage(_self.account.username, _self.account.password)
        } else {
          _self.clearLocalStorage()
        }
        // 用户登录请求
        this.$store.dispatch('LoginByUser', this.account).then(() => {
          this.loading = false
          this.$message.success('登录成功!')
          this.$router.push({ path: this.redirect || '/' })
        }).catch(() => {
          this.$message({
            message: '服务器异常',
            type: 'error'
          })
          this.loading = false
        })
      },
      // 设置localStorage
      setLocalStorage(c_name, c_pwd) {
        // 将加密后的账号保存至cookie
        setUserName(c_name)
        setPassWord(c_pwd)
      },
      // 读取localStorage
      getLocalStorage: function() {
        let username = getUserName()
        let password = getPassWord()
        if (username && password) {
          username = getDecryptUserName()
          password = getDecryptPassWord()
          // 账号密码回显
          this.account.username = username
          this.account.password = password
        }
        this.$i18n.locale = this.lang
      },
      // 清除cookie
      clearLocalStorage: function() {
        removeUserName()
        removePassWord()
      },
      handleSetLanguage(lang) {
        this.$i18n.locale = lang
        this.$store.dispatch('setLanguage', lang)
        this.$message({
          message: 'Switch Language Success',
          type: 'success'
        })
      },
      validateLoginForm() {
        if (this.account.username === '') {
          this.$message({
            message: this.$t('login.rulesUserName'),
            type: 'error'
          })
          return false
        }
        // 测试环境不用输入密码，默认隐藏掉
        if (this.account.password === '') {
          this.$message({
            message: this.$t('login.rulesPassWord'),
            type: 'error'
          })
          return false
        }
        return true
      }
    }
  }

</script>

<style>
  .login {
    display: table;
    height: 100%;
    width: 100%;
    min-height: 100%;
    background: #1690ED;
  }

  .login > .cont {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }

  .login > .cont .logo {
    position: absolute;
    top: 20px;
    left: 40px;
  }

  .login > .cont .login_main {
    display: inline-block;
    margin: 0 auto;
    width: 1190px;
    text-align: left;
  }

  .login > .cont .login_main > .left {
    width: 790px;
    float: left;
    position: relative;
  }

  .login > .cont .login_main > .left img {
    width: 400px;
    margin-top: 40px;
  }

  .login > .cont .login_main > .left img.wen {
    width: 400px;
    position: absolute;
    top: 10px;
    right: 40px;
    margin-top: 0px;
  }

  .login > .cont .login_main > .login-box {
    margin-left: 830px;
    width: 360px;
    height: 420px;
    background-color: #fff;
    border-radius: 9px;
  }

  .login .login-box h3 {
    font-weight: 500;
    line-height: 80px;
    font-size: 25px;
    color: #1690ED;
    text-align: center;
  }

  .login .login_footer {
    width: 100%;
    position: absolute;
    bottom: 5px;
    text-align: center
  }
</style>
