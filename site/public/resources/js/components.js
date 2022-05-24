// 搜索框组件
Vue.component("search-box", {
  data: function () {
    return {
      targetIsbn: ""
    }
  },
  template: `
  <form class="search-box">
    <input type="text" v-model=targetIsbn placeholder="Input ISBN"
    v-on:keyup.enter="$emit('searched', targetIsbn)">
    <button v-on:click.prevent="$emit('searched', targetIsbn)">
      <img src="resources/images/icon-search.svg">
    </button>
  </form>
  `
})

// 书籍组件，用于显示搜索结果
Vue.component("book", {
  template: `
  <div class="book">
    <img v-bind:src="bookobject.coverUrl">
    <div class="book-info">
      <p>{{ bookobject.title }}</p>
      <p>Author: {{ bookobject.author }}</p>
      <p>ISBN: {{ bookobject.isbn }}</p>
    </div>
    <a v-bind:href="bookobject.downloadLink">
      <img src="resources/images/icon-download-cloud.svg">
    </a>
    <slot></slot>
  </div>
  `,
  props: ["bookobject"]
})

// 书籍组件，用于管理书籍
Vue.component("admin-book", {
  data: function () {
    return {
      targetBook: {
        isbn: "",
        title: "",
        author: "",
        coverUrl: "",
        downloadLink: ""
      }
    }
  },
  template: `
  <form class="admin-book-component">
    <div class="image-box">
      <img v-bind:src="coverurl">
    </div>
    <table class="book-info">
      <tr>
        <td>ISBN: </td>
        <td>
          <input type="text" v-model=targetBook.isbn
          v-on:focusout="$emit('searched', targetBook.isbn)">
        </td>        
      </tr>
      <tr>
        <td>Title: </td>
        <td>
          <input type="text" v-model=targetBook.title>
        </td>
      </tr>
      <tr>
        <td>Author: </td>
        <td>
          <input type="text" v-model=targetBook.author>
        </td>
      </tr>
      <tr>
        <td>Cover Url: </td>
        <td>
          <input type="text" v-model=targetBook.coverUrl>
        </td>
      </tr>
      <tr>
        <td>Download Link: </td>
        <td>
          <input type="text" v-model=targetBook.downloadLink>
        </td>
      </tr>
    </table>
    <div class="button-box">
      <button type=button v-on:click="$emit('add', targetBook)">Add</button>
      <button type=button v-on:click="$emit('update', targetBook)">Update</button>
    </div>
  </form>
  `,
  props: ["coverurl"]
})
