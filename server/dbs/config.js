export default {
  dbs: 'mongodb://127.0.0.1:27017/student',
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  },
  smtp: {
    get host() {
      return 'smtp.qq.com'
    },
    get user() {
      return '244189981@qq.com'
    },
    get pass() {
      return 'fhiwgdrjbwmmcbda'
    },
    get code() { // 生成4位手机验证码
      return () => {
        return Math.random().toString(16).slice(2, 6).toUpperCase()
      }
    },
    get expire() { // 设置有效时间
      return () => {
        return new Date().getTime() + 60 * 60 * 1000
      }
    }
  }
}