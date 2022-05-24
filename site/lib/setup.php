<?php
require_once 'functions.php';

// 管理员信息
$admin_email = '123456@xxx.com';   // 修改为自己的邮箱
$admin_pwd = '123456';    // 修改成自己的密码

// 创建管理员表
createTable(
  'admins',
  'email VARCHAR(32) PRIMARY KEY,
  password VARCHAR(32) NOT NULL,
  INDEX(email)'
);

// 添加管理员
queryMysql("INSERT INTO admins VALUES('$admin_email', '$admin_pwd')");

// 创建书籍表
createTable(
  'books',
  'isbn VARCHAR(13) PRIMARY KEY,
  title VARCHAR(128) NOT NULL,
  author VARCHAR(128),
  coverUrl VARCHAR(256),
  downloadLink VARCHAR(256),
  INDEX(isbn)'
);
