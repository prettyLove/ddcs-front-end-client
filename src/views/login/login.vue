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
              <el-option label="中文简体" :value="language[0]" />
              <el-option label="中文繁体" :value="language[1]" />
              <el-option label="English" :value="language[2]" />
            </el-select>
          </div>
          <div class="head-box"><h3>{{ $t('login.title') }}</h3></div>
          <el-form ref="loginForm" :label-position="labelPosition" label-width="80px" :model="account" style="text-align: center;margin-top: 10px">
            <el-input v-model="account.username" style="width: 280px" :placeholder="$t('login.username')">
              <template slot="prepend">
                <font-awesome-icon icon="user" style="color: #1690ED" />
              </template>
            </el-input>

            <el-input v-model="account.password" type="password" style="width: 280px; margin: 20px 3px 0 0" :placeholder="$t('login.password')">
              <template slot="prepend">
                <font-awesome-icon icon="lock" style="color: #1690ED" />
              </template>
            </el-input>
          </el-form>

          <div style="margin: 20px 40px 0px 0px;text-align: right;vertical-align: middle">
            <el-checkbox id="remember" v-model="remember" label="1">{{ $t('login.remember') }}</el-checkbox>
            <a><font-awesome-icon :icon="['fas','info-circle']" style="color: #999999" /></a>
          </div>

          <!-- 拼命加载中 -->
          <div v-loading="loading" style="text-align: center;" element-loading-text="loading ...">
            <!--登陆-->
            <el-button type="primary" style="width: 280px;margin-top: 20px" @click="sendLogin">{{ $t('login.logIn') }}</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setToken } from '@/utils/auth'
import router from '@/router/index'
import { userLogin, getSysMenusByToken } from '../../api/login'
import { getLanguage } from '../../utils/i18n'
import { setPassWord, setUserName, getDecryptPassWord, getDecryptUserName, removeUserName, removePassWord, getUserName, getPassWord } from '../../utils/localStore/userCookie'

export default {
  components: { },
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
      userLogin({ username: _self.account.username, password: _self.account.password })
        .then((res) => {
          if (res.code === _self.$success) {
            console.log('---------------')
            // cookie中保存登录状态
            setToken(res.data.token)
            // setUser(res.data)
            this.loginSuccess(res.data.token, res.data)
            this.loading = false
          } else {
            this.loginFail(res.message || '登陆失败！')
          }
        })
        .catch((error) => {
          console.log('错误信息：' + error)
          this.loading = false
          this.$message({
            message: '登陆错误！',
            type: 'error'
          })
        })
    },
    loginSuccess(token, user) {
      // ----------- 初始化用户数据 --------------------------
      user.token = token
      this.$store.dispatch('userStoreInit', user)
      getSysMenusByToken().then(response => {
        const data = response.data
        if (data && data.length > 0) { // 验证返回的roles是否是一个非空数组
          this.$store.dispatch('GenerateRoutes', data).then(accessRoutes => {
            // 根据roles权限生成可访问的路由表
            router.addRoutes(accessRoutes) // 动态添加可访问路由表
          })
        }
      }).catch(error => {
        this.store.dispatch('FedLogOut').then(() => {
          this.message.error(error)
          this.$router.push({
            path: '/',
            query: { random: Math.random() }
          })
        })
      })

      // 排除跳转到login
      if (this.$route.query.redirect && this.$route.query.redirect.indexOf('login?') === -1) {
        // 重定向
        // this.$router.push(this.$route.query.redirect+"?v="+Math.random);
        this.$router.push({
          path: this.$route.query.redirect,
          query: { random: Math.random() }
        }) // +"?v="+Math.random);
      } else {
        // 重定向到首页
        // this.$router.push('/');
        this.$router.push({
          path: '/',
          query: { random: Math.random() }
        })
      }

      this.$message({
        message: '登录成功！',
        type: 'success'
      })
    },
    loginFail(msg) {
      this.$message.error('用户名或密码错误！')
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
      // if (this.account.username === '') {
      //   this.$message({
      //     message: this.$t('login.rulesUserName'),
      //     type: 'error'
      //   })
      //   return true
      // }
      return true
    }
  }
}

</script>

<style>
    .login { display: table; height: 100%;  width: 100%; min-height: 100%; background:#1690ED; }
    .login > .cont { display: table-cell; text-align: center; vertical-align: middle; }
    .login > .cont .logo { position: absolute; top:20px; left: 40px; }
    .login > .cont .login_main { display: inline-block; margin: 0 auto; width: 1190px; text-align: left; }
    .login > .cont .login_main > .left { width: 790px; float: left; position: relative; }
    .login > .cont .login_main > .left img { width: 400px; margin-top: 40px;  }
    .login > .cont .login_main > .left img.wen { width: 400px; position: absolute; top:10px; right: 40px;  margin-top: 0px; }

    .login > .cont .login_main > .login-box { margin-left: 830px; width: 360px;height: 420px; background-color: #fff; border-radius: 9px; }
    .login .login-box h3 {  font-weight: 500; line-height: 80px; font-size: 25px; color: #1690ED; text-align: center; }

</style>
