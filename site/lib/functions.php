<?php
/* 包括的函数：
建表
执行 MySQL 语句
销毁 session
净化消毒字符串
*/

// 数据库信息
$host = 'localhost';    // 数据库主机地址
$data = 'bookshare';    // 数据库名
$user = 'bookshare';    // 用户名
$pass = '123456';     // 密码
$chrs = 'utf8mb4';
$attr = "mysql:host=$host;dbname=$data;charset=$chrs";
$opts =
  [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
  ];

try {
  $pdo = new PDO($attr, $user, $pass, $opts);
} catch (PDOException $e) {
  throw new PDOException($e->getMessage(), (int)$e->getCode());
}

// 用于建表的函数
function createTable($name, $query)
{
  queryMysql("CREATE TABLE IF NOT EXISTS $name($query)");
  echo "Table '$name' created or already exists.<br>";
}

// 执行 SQL 语句的函数
function queryMysql($query)
{
  global $pdo;
  return $pdo->query($query);
}

// 销毁 session 的函数
function destroySession()
{
  $_SESSION = array();

  if (session_id() != "" || isset($_COOKIE[session_name()]))
    setcookie(session_name(), '', time() - 2592000, '/');

  session_destroy();
}

// 净化消毒字符串的函数
function sanitizeString($var)
{
  global $pdo;

  $var = strip_tags($var);
  $var = htmlentities($var);

  // if (get_magic_quotes_gpc())
  //   $var = stripslashes($var);

  $result = $pdo->quote($var);          // This adds single quotes
  return str_replace("'", "", $result); // So now remove them
}
