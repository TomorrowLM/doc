# 认识MySQL

MySQL的层次结构

```
DBMS	DataBase Management System数据库管理系统

DB		DataBase					数据库

Table	数据表(对应现实中的表格)

Record	数据表中的一行

Fields	数据表中的一列
```

## 数据库

```
每一条语句后必须使用;
```

- 查看数据库
  show databases;

- 创建数据库
  create database 数据库名  【库选项】

  - 【库选项】
    charset 		用于设置存储字符集
     	collate		用于设置校验集

- 删除数据库

  drop database 数据库名;

- 选择数据库

  use 数据库名;

## 数据表

- 查看数据表
  show tables;

- 创建数据表(当创建一个表后，仅是创建了一个表的结构(表头))

  ​	create  table  表名(

  ​	字段名 列类型 【列属性】,

  ​	字段名 列类型 【列属性】,

  ​    ….

  )【表选项】

   【表选项】

  ​		charset		设置存储字符集

  ​		collate 		设置校验集

  ​		engine		存储引擎

  ![image-20201127102147103](/home/silk/.config/Typora/typora-user-images/image-20201127102147103.png)

- 查看表结构（只能查看字段信息）

  desc 表名;

- 查看表的创建语句


  show create table 表名;

- 删除表

​	   drop table 表名;

- 增加数据

  insert  into 表名【(字段列表)】 values(值列表)

  ```
  字段列表中字段名不需要加引号
  
  值列表中的字符型的值必须加引号。
  
  字段列表中字段的个数要与值列表中值的个数一致，而且顺序也一要致。
  
  字段列表也可以省略，如果省略那表示全部字段插入数据。值列表中值的顺序要与表中的字段的顺序一致。
  ```

  

- 查看数据

  ①、语法：
  select *|字段列表 from 表名 【where子句】【group by子句】【having子句】【order by子     句】【limit子句】

  ```
  *   				所有的字段
  
  字段列表	用于查看部分字段。
  ```

  ```
  where子句
  根据where子句的表达式，对记录进行筛选。即是表达式，就会涉及到运算符。
  MySQL的运算符：
  >、<、>=、<=、<>、=、and、or、not、between m and n、in(值列表)、is null、like
  =										 用于判断是不相等，同也是赋值运算符
  and、or					   		逻辑与、逻辑或
  between m and n	 	  字段的值介于m与n之间
  in(值列表)				     	  字段的值等于值列表中的某一个
  is null					         	  专用于判断null值的运算符
  like						       		用于模糊查询，必须与两个占位符进匹配使用
  			占位符：%、_
  			%			代表当前位置及其后0个或多个字符
  			_			代表当前位置的1个字符
  
  列子：select * from 	表名 	where	字段列表	like	' value%'
  ```

- 修改数据

  update 表名 set 字段1=值, 字段2=值,… 【where 子句】

  ```
  mysql> update  'runoob_tbl'  set  'submission_date'='2016-05-06' where  'runoob_id'=3;
  ```

- 删除数据

  delete from 表名 【where子句】

## 修改表结构

- 增加字段

  alter table 表名 add 【column】 字段名 列类型 列属性 【first| afterp字段名】

- 删除字段

  alter table 表名 drop 【column】 字段名;

- 修改字段名

  alter table 表名 change 原字段名 新字段名 列类型 列属性。

- 修改表名

  alter table 表名 rename to 新名

## 视图