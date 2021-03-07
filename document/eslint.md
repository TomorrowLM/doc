ESLint 是一个开源的 JavaScript 代码检查工具，代码检查是一种静态的分析，常用于寻找有问题的模式或者代码，并且不依赖于具体的编码风格。JavaScript 是一个动态的弱类型语言，在开发中比较容易出错。因为没有编译程序，为了寻找 JavaScript 代码错误通常需要在执行过程中不断调试。像 ESLint 这样的可以让程序员在编码的过程中发现问题而不是在执行的过程中。

ESLint 的初衷是为了让程序员可以创建自己的检测规则。ESLint 的所有规则都被设计成可插拔的。为了便于人们使用，ESLint 内置了一些规则，当然，你可以在使用过程中自定义规则。所有的规则默认都是禁用的。

ESLint 使用 Node.js 编写。

#### eslint配置

###### 配置方式

1. 一般都采用.eslintrc.*的配置文件进行配置, 如果放在项目的根目录中，则会作用于整个项目。如果在项目的子目录中也包含着.eslintrc文件，则对于子目录中文件的检查会忽略掉根目录中的配置，而直接采用子目录中的配置，这就能够在不同的目录范围内应用不同的检查规则，显得比较灵活。ESLint采用逐级向上查找的方式查找.eslintrc.*文件，当找到带有"root": true配置项的.eslintrc.*文件时，将会停止向上查找。
2. 在 package.json文件里的 eslintConfig 字段进行配置。

# eslintrc.js

## `parserOptions` 

属性设置。可用的选项有：

- `ecmaVersion` - 默认设置为 3，5（默认）， 你可以使用 6、7、8、9 或 10 来指定你想要使用的 ECMAScript 版本。你也可以用使用年份命名的版本号指定为 2015（同 6），2016（同 7），或 2017（同 8）或 2018（同 9）或 2019 (same as 10)
- `sourceType` - 设置为 `"script"` (默认) 或 `"module"`（如果你的代码是 ECMAScript 模块)。
- ecmaFeatures这是个对象，表示你想使用的额外的语言特性:
  - `globalReturn` - 允许在全局作用域下使用 `return` 语句
  - `impliedStrict` - 启用全局 [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) (如果 `ecmaVersion` 是 5 或更高)
  - `jsx` - 启用 [JSX](http://facebook.github.io/jsx/)
  - `experimentalObjectRestSpread` - 启用实验性的 [object rest/spread properties](https://github.com/sebmarkbage/ecmascript-rest-spread) 支持。(**重要：**这是一个实验性的功能,在未来可能会有明显改变。 建议你写的规则 **不要** 依赖该功能，除非当它发生改变时你愿意承担维护成本。)