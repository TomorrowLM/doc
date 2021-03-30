## mock

https://github.com/nuysoft/Mock/wiki/Syntax-Specification

https://www.freesion.com/article/74291291096/#RAP2_214

**数据模板中的每个属性由 3 部分构成：属性名、生成规则、属性值：**

```json
// 属性名   name
// 生成规则 rule
// 属性值   value
'name|rule': value
```

*生成规则* 有 7 种格式：    "dev": "cross-env APP_CLIENT_ID=npjs1ubfnbxqqhmjxazbfy0cosfq4s4 API_BASE_URL=https://rap2.mez100.com/rapserver/app/mock/17 webpack-dev-server --config scripts/webpack.config.dev.js",

1. `'name|min-max': value`
2. `'name|count': value`
3. `'name|min-max.dmin-dmax': value`
4. `'name|min-max.dcount': value`
5. `'name|count.dmin-dmax': value`
6. `'name|count.dcount': value`
7. `'name|+step': value`

#### 1. 属性值是字符串 **String**

1. `'name|min-max': string`

   通过重复 `string` 生成一个字符串，重复次数大于等于 `min`，小于等于 `max`。

2. `'name|count': string`

   通过重复 `string` 生成一个字符串，重复次数等于 `count`。

#### 2. 属性值是数字 **Number**

1. `'name|+1': number`

   属性值自动加 1，初始值为 `number`。

2. `'name|min-max': number`

   生成一个大于等于 `min`、小于等于 `max` 的整数，属性值 `number` 只是用来确定类型。

3. `'name|min-max.dmin-dmax': number`

   生成一个浮点数，整数部分大于等于 `min`、小于等于 `max`，小数部分保留 `dmin` 到 `dmax` 位。

```
Mock.mock({
    'number1|1-100.1-10': 1,
    'number2|123.1-10': 1,
    'number3|123.3': 1,
    'number4|123.10': 1.123
})
// =>
{
    "number1": 12.92,
    "number2": 123.51,
    "number3": 123.777,
    "number4": 123.1231091814
}
```

#### 3. 属性值是布尔型 **Boolean**

1. `'name|1': boolean`

   随机生成一个布尔值，值为 true 的概率是 1/2，值为 false 的概率同样是 1/2。

2. `'name|min-max': value`

   随机生成一个布尔值，值为 `value` 的概率是 `min / (min + max)`，值为 `!value` 的概率是 `max / (min + max)`。

#### 4. 属性值是对象 **Object**

1. `'name|count': object`

   从属性值 `object` 中随机选取 `count` 个属性。

2. `'name|min-max': object`

   从属性值 `object` 中随机选取 `min` 到 `max` 个属性。

#### 5. 属性值是数组 **Array**

1. `'name|1': array`

   从属性值 `array` 中随机选取 1 个元素，作为最终值。

   ```json
   Mock.mock({
     "array|1": [
       "AMD",
       "CMD",
       "UMD"
     ]
   })
   ```

2. `'name|+1': array`

   从属性值 `array` 中**顺序**选取 1 个元素，作为最终值。

3. `'name|min-max': array`

   通过重复属性值 `array` 生成一个新数组，重复次数大于等于 `min`，小于等于 `max`。

4. `'name|count': array`

   通过重复属性值 `array` 生成一个新数组，重复次数为 `count`。

#### 6. 属性值是函数 **Function**

1. `'name': function`

   执行函数 `function`，取其返回值作为最终的属性值，函数的上下文为属性 `'name'` 所在的对象。

#### 7. 属性值是正则表达式 **RegExp**

1. `'name': regexp`

   根据正则表达式 `regexp` 反向生成可以匹配它的字符串。用于生成自定义格式的字符串。

   ```
   Mock.mock({
       'regexp1': /[a-z][A-Z][0-9]/,
       'regexp2': /\w\W\s\S\d\D/,
       'regexp3': /\d{5,10}/
   })
   // =>
   {
       "regexp1": "pJ7",
       "regexp2": "F)\fp1G",
       "regexp3": "561659409"
   }
   ```



#### 8.占位符

http://mockjs.com/examples.html

- *属性值* 中可以含有 `@占位符`。
- *属性值* 还指定了最终值的初始值和类型。

*占位符* 的格式为：

```
@占位符
@占位符(参数 [, 参数])
```

| 分类          | 方法（@占位符）                                              |
| ------------- | ------------------------------------------------------------ |
| Basic         | boolean, natural, integer, float, character, string, range, date, time, datetime, now |
| Image         | image, dataImage                                             |
| Color         | color                                                        |
| Text          | paragraph, sentence, word, title, cparagraph, csentence, cword, ctitle |
| Name          | first, last, name, cfirst, clast, cname                      |
| Web           | url, domain, email, ip, tld                                  |
| Address       | area, region                                                 |
| Helper        | capitalize, upper, lower, pick, shuffle                      |
| Miscellaneous | guid, id                                                     |

@title(4, 10)	@string(5)	@word(5)

@datetime('T')	@date 	@time	@now

@natural(60, 100)	 @range(3, 7)

name---@first @last @name

@url	@email	@id

## 规范

### rap2示例

http://rap2.taobao.org/account/login

**请求参数**

| **类型** | **生成规则** | **初始值** | **简介**                                                     |
| -------- | ------------ | ---------- | ------------------------------------------------------------ |
| number   |              |            | 分页的参数，开始的id，默认值为0, 正常会传递(当前页-1)*limit， 比如，要请求第5页的数据，每页10条，那么这里应该传入(5 - 1) * 10 |
| number   |              | 10         | 每页条数                                                     |
| string   |              | updatedAt  | 排序的字段<br/>["companyName",<br/>"updatedAt"<br/>]         |
| string   |              | DESC       | 'DESC'或'ASC'                                                |
| string   |              |            | 搜索关键字                                                   |
|          |              |            |                                                              |

**响应内容**

| **名称** | **类型** | **生成规则** | **初始值** | **简介** |
| -------- | -------- | ------------ | ---------- | -------- |
| code     | number   |              | 200        |          |
| message  | string   |              | success    |          |
| array    | Array    | 10           |            |          |
| id       | string   |              | @id        |          |

### 请求类型

增post删delete改put查get

### 参数规范

1. url资源名一般都是复数

2. createdAt - 创建时间

   updatedAt  更新时间

   这是针对response

   request中时间筛选用beginDateAt和endDateAt

   sorBy按什么字段排序

   orderBy排序（正向，反向）

   groupBy按什么字段聚合

3. invoice csv export可以全量导出，也可以筛选导出，因此应该有筛选参数

4. 枚举字段和表示True or False的字段我们统一用数字，所以在rap2中是number类型；不是string或array或Boolen

5. Response中的data字段究竟是array还是object需要再仔细检查，一般获取列表的接口返回array，获取详细的接口返回object









