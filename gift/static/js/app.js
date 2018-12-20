Bmob.initialize("9602b490ca92389fd6cc9069c67fd251", "17cc6a11b0fb76dc3fdeb61b1c8cefe6");
const query = Bmob.Query('Student');
MuseUIToast.config({
  "position": "top-end"
})
Vue.use(MuseUI);
var app = new Vue({
  el: '#app',
  data: {
    loading: false,
    list: [],
    realList: [],
    isStart: false,
    result: null,
    realResult: null,
    title: "暂无结果",
    subtitle: "点击按钮开始"
  },
  methods: {
    refresh() {
      this.loading = true;
      this.realList = [];
      query.order("order");
      query.find().then(res => {
        this.list = res;
        this.loading = false;
        res.forEach(element => {
          if (element.except != true) {
            for (var i = 1; i <= element.weight; i++) {
              this.realList.push(element);
            }
          }
        });
      }).catch(err => {
        this.loading = false;
        console.log(err)
      })
    },
    newResult() {
      this.result = this.list[Math.round(Math.random() * (this.list.length - 1))]
    },
    newRealResult() {
      this.realResult = this.realList[Math.round(Math.random() * (this.realList.length - 1))]
    },
    start() {
      this.isStart = true;
      var i = setInterval(() => {
        app.newResult()
        app.newRealResult()
      }, 100);
      var j, k;
      setTimeout(() => {
        clearInterval(i);
        j = setInterval(() => {
          app.newResult()
          app.newRealResult()
        }, 50);
      }, 2000);
      setTimeout(() => {
        clearInterval(j);
        k = setInterval(() => {
          app.newResult()
          app.newRealResult()
        }, 100);
      }, 5000);
      setTimeout(() => {
        clearInterval(k);
        app.newResult()
        app.newRealResult()
        this.result = this.realResult
        this.isStart = false;
      }, 7000);
    }
  }
});
app.refresh();