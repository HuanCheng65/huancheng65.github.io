Bmob.initialize("9602b490ca92389fd6cc9069c67fd251", "17cc6a11b0fb76dc3fdeb61b1c8cefe6");
const query = Bmob.Query('Student');
MuseUIToast.config({
  "position": "top-end"
})
Vue.use(MuseUI);
var app = new Vue({
  el: '#app',
  data: {
    first: true,
    loading: false,
    list: [],
    realList: [],
    isStart: false,
    result: null,
    realResult: null,
    title: "暂无结果",
    subtitle: "点击按钮开始",
    number: 0,
    openLogin: false,
    usernameRules: [{
        validate: (val) => !!val,
        message: '必须填写用户名'
      },
      {
        validate: (val) => val.length >= 3,
        message: '用户名长度大于3'
      }
    ],
    passwordRules: [{
        validate: (val) => !!val,
        message: '必须填写密码'
      },
      {
        validate: (val) => val.length >= 3 && val.length <= 10,
        message: '密码长度大于3小于10'
      }
    ],
    validateForm: {
      username: '',
      password: '',
    },
  },
  methods: {
    refresh() {
      this.loading = true;
      query.order("order");
      query.find().then(res => {
        this.list = res;
        this.result = null;
        this.realResult = null;
        this.refreshRealResult()
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        console.log(err)
      })
    },
    refreshRealResult() {
      this.realList = [];
      this.list.forEach(element => {
        if (element.except != true) {
          for (var i = 1; i <= element.weight; i++) {
            this.realList.push(element);
          }
        }
      });
    },
    newResult() {
      this.result = this.list[Math.round(Math.random() * (this.list.length - 1))]
    },
    newRealResult() {
      this.realResult = this.realList[Math.round(Math.random() * (this.realList.length - 1))]
    },
    start() {
      if (!this.isStart) {
        this.isStart = true;
        this.number = 0;
        this.newTimeout()
      }
    },
    newTimeout() {
      var timeout = 0;
      if (this.number >= 0 & this.number <= 30) {
        timeout = 1 * (30 + ((30 - this.number) * 10));
      } else if (this.number > 30 & this.number <= 135) {
        timeout = 50;
      } else if (this.number > 135) {
        timeout = 1 * (30 - ((135 - this.number) * 25));
      }
      console.log(this.number, timeout);
      setTimeout(() => {
        this.number += 1;
        app.newResult()
        app.newRealResult()
        if (this.number <= 150) {
          this.newTimeout()
        } else {
          app.newResult()
          app.newRealResult()
          this.result = this.realResult
          this.list.splice(this.list.indexOf(this.result), 1)
          this.refreshRealResult()
          this.isStart = false;
          this.number = 0;
        }
      }, timeout);
    },
    openLoginDialog() {
      this.openLogin = true;
    },
    closeLoginDialog() {
      this.openLogin = false;
    },
    submit() {
      this.$refs.form.validate().then((result) => {
        if (result) {
          Bmob.User.login(this.validateForm.username, this.validateForm.password).then(res => {
            MuseUIToast.success("登录成功");
            setTimeout(() => {
              location.reload();
            }, 1000);
          }).catch(err => {
            console.log(err)
          });
        }
      });
    },
    clear() {
      this.$refs.form.clear();
      this.validateForm = {
        username: '',
        password: ''
      };
    },
    getUser() {
      return Bmob.User.current()
    },
    isAdmin() {
      if (this.getUser() != null) {
        if (this.getUser().isAdmin) {
          return true;
        }
      }
      return false;
    },
  }
});
app.refresh();