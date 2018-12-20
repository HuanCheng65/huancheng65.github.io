Bmob.initialize("9602b490ca92389fd6cc9069c67fd251", "17cc6a11b0fb76dc3fdeb61b1c8cefe6");
Vue.prototype.Bmob = Bmob
Vue.component("form-edit", {
  props: ["data"],
  data: () => {
    return {
      addForm: {
        order: null,
        name: null,
        fighter: null,
        middle: "0",
        second: "0",
        final: "0"
      }
    }
  },
  methods: {
    add() {
      if (!this.isEditMode) {
        query.set("order", parseInt(this.addForm.order))
        query.set("name", this.addForm.name)
        query.set("fighter", this.addForm.fighter)
        query.set("middle", parseInt(this.addForm.middle))
        query.set("second", parseInt(this.addForm.second))
        query.set("final", parseInt(this.addForm.final))
        query.save().then(res => {
          this.$root.refresh()
          this.$refs.addForm.clear()
          this.addForm = {
            order: (parseInt(this.addForm.order) + 1).toString(),
            name: null,
            fighter: null,
            middle: "0",
            second: "0",
            final: "0"
          };
        }).catch(err => {
          console.log(err)
        })
      } else {
        query.get(this.data.objectId).then(res => {
          res.set("order", parseInt(this.addForm.order))
          res.set("name", this.addForm.name)
          res.set("fighter", this.addForm.fighter)
          res.set("middle", parseInt(this.addForm.middle))
          res.set("second", parseInt(this.addForm.second))
          res.set("final", parseInt(this.addForm.final))
          res.save().then(res => {
            this.$root.refresh()
          });
        }).catch(err => {
          console.log(err)
        });
      }
    },
  },
  computed: {
    isEditMode() {
      if (this.data != null) {
        this.addForm = this.data;
        this.addForm.middle = this.addForm.middle.toString();
        this.addForm.second = this.addForm.second.toString();
        this.addForm.final = this.addForm.final.toString();
        return true
      }
      return false
    }
  },
  template: '<mu-form label-width="100" label-position="right" ref="addForm" :model="addForm"><mu-form-item label="学号" prop="order"><mu-text-field v-model="addForm.order" prop="order"></mu-text-field></mu-form-item><mu-form-item label="姓名" prop="name"><mu-text-field v-model="addForm.name" prop="name"></mu-text-field></mu-form-item><mu-form-item label="对手" prop="fighter"><mu-text-field v-model="addForm.fighter" prop="fighter"></mu-text-field></mu-form-item><mu-form-item prop="middle" label="期中考试"><mu-radio v-model="addForm.middle" value="0" label="无"></mu-radio><mu-radio v-model="addForm.middle" value="1" label="胜"></mu-radio><mu-radio v-model="addForm.middle" value="2" label="败"></mu-radio></mu-form-item><mu-form-item prop="second" label="第二次月考"><mu-radio v-model="addForm.second" value="0" label="无"></mu-radio><mu-radio v-model="addForm.second" value="1" label="胜"></mu-radio><mu-radio v-model="addForm.second" value="2" label="败"></mu-radio></mu-form-item><mu-form-item prop="final" label="期末考试"><mu-radio v-model="addForm.final" value="0" label="无"></mu-radio><mu-radio v-model="addForm.final" value="1" label="胜"></mu-radio><mu-radio v-model="addForm.final" value="2" label="败"></mu-radio></mu-form-item><mu-form-item><mu-button color="primary" @click="add">{{!isEditMode ? "添加" : "保存"}}</mu-button></mu-form-item></mu-form>'
});
const query = Bmob.Query('Score');
MuseUIToast.config({
  "position": "top-end"
})
Vue.use(MuseUI);
var app = new Vue({
  el: '#app',
  data: {
    loading: false,
    sort: {
      name: 'order',
      order: 'asc'
    },
    columns: [{
        title: '学号',
        name: 'order',
        sortable: true,
      },
      {
        title: '姓名',
        name: 'name',
        sortable: true,
        align: "center"
      },
      {
        title: '对手',
        name: 'fighter',
        sortable: true,
        align: "center"
      },
      {
        title: '期中考试',
        name: 'middle',
        sortable: true,
        align: "center"
      },
      {
        title: '第二次月考',
        name: 'second',
        sortable: true,
        align: "center"
      },
      {
        title: '期末考试',
        name: 'final',
        sortable: true,
        align: "center"
      },
      {
        title: '结果',
        name: 'result',
        sortable: true,
        align: "center"
      }
    ],
    list: [],
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
    handleSortChange({
      name,
      order
    }) {
      this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
    },
    getUser() {
      return Bmob.User.current()
    },
    refresh() {
      this.loading = true;
      query.order("order");
      query.find().then(res => {
        this.list = res;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        console.log(err)
      })
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
            }, 2000);
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
    getResult(value) {
      value = parseInt(value);
      switch (value) {
        case 2:
          return "败"
        case 1:
          return "胜"
        case 0:
          return "无"
      }
    },
    getTotalResult(middle, second, final) {
      var win = 0,
        lose = 0;
      if (middle === 1) {
        win += 1;
      } else if (middle === 2) {
        lose += 1;
      }
      if (second === 1) {
        win += 1;
      } else if (second === 2) {
        lose += 1;
      }
      if (final === 1) {
        win += 1;
      } else if (final === 2) {
        lose += 1;
      }
      if (win >= 2) {
        return "胜"
      } else if (lose >= 2) {
        return "败"
      }
      return "无"
    },
    isAdmin() {
      if (this.getUser() != null) {
        if (this.getUser().isAdmin) {
          return true;
        }
      }
      return false;
    }
  }
});
app.refresh();