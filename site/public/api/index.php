<?php
require_once '../../lib/functions.php';

// 查询书籍
if (isset($_POST['getBooks'])) {
  $isbn = sanitizeString($_POST['getBooks']);
  $result = queryMysql("SELECT * FROM books WHERE isbn Like '%$isbn%'");
  $books = $result->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($books);
}

// 启用 session
session_start();

// 检查给定的邮箱密码是否是合法的管理员的函数
function isLegalAdmin($email, $password)
{
  // 执行数据库查询前要先清洗数据
  $email = sanitizeString($email);
  $password = sanitizeString($password);
  // 查询邮箱密码是否匹配
  $result = queryMySQL("SELECT * FROM admins
              WHERE email='$email' AND password='$password'");
  if ($result->rowCount() > 0) {
    return true;
  } else {
    return false;
  }
}

// 检查登陆是否合法
if (isset($_POST['email']) && isset($_POST['password'])) {
  if (isLegalAdmin($_POST['email'], $_POST['password'])) {
    // 设置 session，只要 session 存在，就认为处于登陆状态
    $_SESSION['email'] = $_POST['email'];
    echo "loginSuccess";    // 匹配成功就返回 loginSuccess
  } else {
    echo "loginFail";       // 匹配失败就返回 loginFail
  }
}

// 登出
if (isset($_POST['logout'])) {
  // 销毁 session
  destroySession();
}

// 检查书籍是否已存在的函数
function isBookExist($isbn)
{
  $result = queryMySQL("SELECT * FROM books WHERE isbn='$isbn'");
  if ($result->rowCount() > 0) {
    return true;
  } else {
    return false;
  }
}

// 增删改书籍只有在登陆状态下才有权限

// 新增书籍
if (isset($_POST['addBook'])) {
  if (isset($_SESSION['email'])) {
    // 先把传来的 json 字符串转为 object
    $book = json_decode($_POST['addBook'], false);
    // 如果 isbn, title 非空，且书籍不存在，则可以插入
    if ($book->isbn !== "" && $book->title !== "" && !isBookExist($book->isbn)) {
      $result = queryMysql("INSERT INTO books VALUES(
                              '$book->isbn',
                              '$book->title',
                              '$book->author',
                              '$book->coverUrl',
                              '$book->downloadLink'
                          )");
      if ($result->rowCount() > 0) {
        echo "addSuccess";
      } else {
        echo "addFail";
      }
    } else {  // 否则不可以插入
      echo "addFail";
    }
  } else {
    echo "needLogin";
  }
}

// 更新书籍
if (isset($_POST['updateBook'])) {
  if (isset($_SESSION['email'])) {
    // 先把传来的 json 字符串转为 object
    $book = json_decode($_POST['updateBook'], false);
    // 如果 isbn, title 非空，且书籍存在，则可以更新
    if ($book->isbn !== "" && $book->title !== "" && isBookExist($book->isbn)) {
      $result = queryMysql("UPDATE books SET
                              title='$book->title',
                              author='$book->author',
                              coverUrl='$book->coverUrl',
                              downloadLink='$book->downloadLink'
                            WHERE isbn='$book->isbn'
                          ");
      if ($result->rowCount() > 0) {
        echo "updateSuccess";
      } else {
        echo "updateFail";
      }
    } else {  // 否则不可以插入
      echo "updateFail";
    }
  } else {
    echo "needLogin";
  }
}

// 删除书籍
if (isset($_POST['deleteBook'])) {
  if (isset($_SESSION['email'])) {
    $isbn = $_POST['deleteBook'];
    // 如果书籍存在，则可以删除
    if (isBookExist($isbn)) {
      $result = queryMysql("DELETE FROM books WHERE isbn='$isbn'");
      if ($result->rowCount() > 0) {
        echo "deleteSuccess";
      } else {
        echo "deleteFail";
      }
    } else {  // 否则不可以删除
      echo "deleteFail";
    }
  } else {
    echo "needLogin";
  }
}
