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
    isStart: false,
    result: null,
    title: "暂无结果",
    subtitle: "点击按钮开始"
  },
  methods: {
    refresh() {
      this.loading = true;
      query.order("order");
      query.equalTo("except", "!=", "true");
      query.find().then(res => {
        this.list = res;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        console.log(err)
      })
    },
    newResult() {
      this.result = this.list[Math.round(Math.random() * (this.list.length - 1))]
    },
    start() {
      this.isStart = true;
      var i = setInterval(() => {
        app.newResult();
      }, 100);
      var j, k;    
      setTimeout(() => {
        clearInterval(i);
        j = setInterval(() => {
          app.newResult();
        }, 30);
      }, 2000);
      setTimeout(() => {
        clearInterval(j);
        k = setInterval(() => {
          app.newResult();
        }, 100);
      }, 5000);
      setTimeout(() => {
        clearInterval(k);
        app.newResult();
        this.isStart = false;
      }, 7000);
    }
  }
});
app.refresh();