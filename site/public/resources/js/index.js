let share = new Vue({
  el: "#book-share",
  data: {
    books: [],
    isAfterSearch: false,
    imageUrl: "./resources/images/bookShare.svg",
    http: new XMLHttpRequest(),
    queryUrl: "./api/index.php",
  },
  methods: {
    // 显示查询结果
    showResult: function (isbn) {
      this.isAfterSearch = true;
      this.imageUrl = "./resources/images/bookIsbn.svg";  // 更改图片
      this.getBooks(isbn);
    },

    // 获取书籍
    getBooks: function (isbn) {
      let app = this;
      let params = `getBooks=${isbn}`;
      app.http.onload = function () {
        // 注意赋给 onload 的 function 里的 this 指向的是 XMLHttpRequest 对象
        app.books = JSON.parse(this.responseText);
      }
      // 发送数据
      app.queryServer(params);
    },

    // 向服务器发送数据
    queryServer: function (params) {
      this.http.open('POST', this.queryUrl, true);
      this.http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      // 发送请求
      this.http.send(params);
    }
  }
})
