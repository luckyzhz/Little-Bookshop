let bookAdmin = new Vue({
  el: "#book-admin",
  data: {
    books: [],
    email: "",
    password: "",
    isLogined: sessionStorage.getItem("email"),
    http: new XMLHttpRequest(),
    queryUrl: "http://localhost/bookshop/public/api/index.php",
    coverUrl: ""    // 左边书籍管理组件的封面
  },
  methods: {
    // 登入
    tryLogin: function () {
      let app = this;
      let params = `email=${app.email}&password=${app.password}`;
      app.http.onload = function () {
        // 注意赋给 onload 的 function 里的 this 指向的是 XMLHttpRequest 对象
        if (this.responseText === "loginFail") {
          alert("Wrong Password.")
        }
        if (this.responseText === "loginSuccess") {
          app.email = "";
          app.password = "";
          sessionStorage.setItem("email", true);
          app.isLogined = true;
        }
      }
      // 发送数据
      app.queryServer(params);
    },

    // 登出
    logout: function () {
      let app = this;
      let params = `logout=true`;
      app.http.onload = function () {
        // 注意赋给 onload 的 function 里的 this 指向的是 XMLHttpRequest 对象
        sessionStorage.clear();
        app.isLogined = false;
        alert("Logout successfully.");
      }
      // 发送数据
      app.queryServer(params);
    },

    // 添加书籍
    addBook: function (book) {
      let app = this;
      let params = "addBook=" + JSON.stringify(book);
      app.http.onload = function () {
        // 注意赋给 onload 的 function 里的 this 指向的是 XMLHttpRequest 对象
        if (this.responseText === "addSuccess") {
          alert("Add book " + book.title + " successfully.");
        }
        if (this.responseText === "addFail") {
          alert("Fail to add book " + book.title);
        }
        if (this.responseText === "needLogin") {
          alert("Please Login first.");
        }
      }
      // 发送数据
      app.queryServer(params);
    },

    // 更新书籍
    updateBook: function (book) {
      let app = this;
      let params = "updateBook=" + JSON.stringify(book);
      app.http.onload = function () {
        // 注意赋给 onload 的 function 里的 this 指向的是 XMLHttpRequest 对象
        if (this.responseText === "updateSuccess") {
          alert("Update book " + book.title + " successfully.");
        }
        if (this.responseText === "updateFail") {
          alert("Fail to update book " + book.title);
        }
        if (this.responseText === "needLogin") {
          alert("Please Login first.");
        }
      }
      // 发送数据
      app.queryServer(params);
    },

    // 删除书籍
    deleteBook: function (book) {
      let app = this;
      let params = `deleteBook=${book.isbn}`;
      app.http.onload = function () {
        // 注意赋给 onload 的 function 里的 this 指向的是 XMLHttpRequest 对象
        if (this.responseText === "deleteSuccess") {
          alert("Delete book " + book.title + " successfully.");
        }
        if (this.responseText === "deleteFail") {
          alert("Fail to delete book " + book.title);
        }
        if (this.responseText === "needLogin") {
          alert("Please Login first.");
        }
      }
      // 发送数据
      app.queryServer(params);
    },

    // 显示查询结果
    showResult: function (isbn) {
      this.isAfterSearch = true;
      this.getBooks(isbn);
      if (this.books.length > 0) {
        this.coverUrl = this.books[0].coverUrl;
      }
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
