export const site = {
  name: '安可萌',
  navbar: {
    home: '首页',
    explore: '发现',
    about: '关于',
    login: '登录',
    register: '注册'
  }
}

export const home = {
  index: {
    title: ' 首页'
  },
  explore: {
    title: '发现'
  }
}

export const user = {
  login: {
    title: ' 登录',
    accountPlaceholder: '你的邮箱',
    passwordPlaceholder: '密码',
    remember: '记住我',
    forget: '忘记密码？',
    submit: '登录'
  },
  register: {
    title: '注册',
    nicknamePlaceholder: '昵称',
    mailPlaceholder: '电子邮箱',
    passwordPlaceholder: '密码（6-16个字符组成，区分大小写）',
    repeatPasswordPlaceholder: '确认你的密码',
    regionSelectPlaceholder: '选择地区',
    mobilePlaceholder: '填写手机号',
    authCodePlaceholder: '验证码',
    getAuthCode: '点击获取',
    term: {
      text: '我已同意',
      and: '和',
      userTerm: '《用户使用协议》',
      accountTerm: '《账号中心规范》'
    },
    submit: '立即注册'
  },
  forget: {
    title: ' 忘记密码',
    accountPlaceholder: '你的手机号/邮箱',
    getAuthCode: '点击获取',
    authCodePlaceholder: '验证码',
    submit: '提交'
  },
  confirmMail: {
    title: '确认邮箱'
  },
  authShow: {
    followTitle: '关注',
    subscribeNumTitle: '订阅数',
    feeSubscribe: '付费订阅'
  },
  index: {
    title: '个人主页',
    balance: '余额',
    follow: '关注',
    subscribe: '订阅',
    mainPage: '主页',
    dynamic: '动态',
    recharge: '充值',
    setting: '设置',
    comicTitle: '条漫标题',
    comicViews: '阅读量',
    subscription: '订阅量',
    updateTime: '更新时间'
  }
}

export const account = {
  home: {
    dynamic: {
      title: '动态'
    },
    bill: {
      title: '我的账单'
    },
    subscribes: {
      title: '我的订阅'
    }
  },
  setting: {
    profile: {
      title: '个人资料设置'
    },
    safe: {
      title: '安全设置'
    }
  }
}

export const error = {
  LOGIN_ACCOUNT_EMPTY: '邮箱不能为空',
  LOGIN_ACCOUNT_INVALID: '邮箱格式无效',
  LOGIN_PASSWORD_EMPTY: '密码不能为空',
  REGISTER_NICKNAME_EMPTY: '昵称不能为空',
  REGISTER_MAIL_INVALID: '邮箱格式无效',
  REGISTER_PASSWORD_INVALID: '请输入6-16位密码',
  REGISTER_REPEAT_PASSWORD_INVALID: '两次输入的密码不一致'
}
