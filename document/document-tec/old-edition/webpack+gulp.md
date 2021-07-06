# 模块化

### CommonJS

是一种为JS的表现指定的规范，它希望js可以运行在任何地方，更多的说的是服务端模块规范，Node.js采用了这个规范。

核心思想
允许模块通过 `require` 方法来同步加载所要依赖的其他模块，然后通过 `exports` 或 `module.exports` 来导出需要暴露的接口。

**优点：**服务器端模块重用，NPM中模块包多，有将近20万个。

**缺点：**加载模块是同步的，只有加载完成后才能执行后面的操作，也就是当要用到该模块了，现加载现用，不仅加载速度慢，而且还会导致性能、可用性、调试和跨域访问等问题。Node.js主要用于服务器编程，加载的模块文件一般都存在本地硬盘，加载起来比较快，不用考虑异步加载的方式，因此,CommonJS规范比较适用。然而，这并不适合在浏览器环境，同步意味着阻塞加载，浏览器资源是异步加载的，因此有了AMD CMD解决方案。

**实现**：

- 服务器端的 [Node.js](http://www.nodejs.org/)
- [Browserify](http://browserify.org/)，浏览器端的 CommonJS 实现，可以使用 NPM 的模块，但是编译打包后的文件体积可能很大
- [modules-webmake](https://github.com/medikoo/modules-webmake)，类似Browserify，还不如 Browserify 灵活
- [wreq](https://github.com/substack/wreq)，Browserify 的前身

### **AMD**

鉴于浏览器的特殊情况，又出现了一个规范，这个规范呢可以实现异步加载依赖模块，并且会提前加载那就是AMD规范。

**其核心接口是**：define(id, 『dependencies』, factory) ，它要在声明模块的时候指定所有的依赖 dependencies ，并且还要当做形参传到factory 中，对于依赖的模块**提前执行**，**依赖前置**。

```js
define("module", ["dep1", "dep2"], function(d1, d2) {
  return someExportedValue;
});
require(["module", "../file"], function(module, file) { /* ... */ });
```

**优点：**在浏览器环境中异步加载模块；并行加载多个模块；

**缺点：**开发成本高，代码的阅读和书写比较困难，模块定义方式的语义不顺畅；不符合通用的模块化思维方式，是一种妥协的实现；

### **CMD**

Common Module Definition 规范和 AMD 很相似，尽量保持简单，并与 CommonJS 和 Node.js 的 Modules 规范保持了很大的兼容性。

```text
define(function(require, exports, module) {
  var $ = require('jquery');
  var Spinning = require('./spinning');
  exports.doSomething = ...
  module.exports = ...
})
```

**优点：依赖就近，延迟执行**（对于依赖的模块延迟执行，即只在需要用到某个模块的时候再require） 可以很容易在 Node.js 中运行；
**缺点：**依赖 SPM 打包，模块的加载逻辑偏重；
**实现：Sea.js** ；coolie

### **ES6**

ECMAScript6 标准增加了 JavaScript 语言层面的模块体系定义。[ES6 模块](http://es6.ruanyifeng.com/#docs/module)的设计思想，是尽量的静态化，使得**编译**时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。**但是由于ES6目前无法在浏览器中执行，所以，我们只能通过babel将不被支持的import编译为当前受到广泛支持的 require**。

```js
import "jquery";
export function doStuff() {}
module "localModule" {}
```

优点：

- 容易进行静态分析
- 面向未来的 ECMAScript 标准

缺点：

- 原生浏览器端还没有实现该标准
- 全新的命令字，新版的 Node.js才支持

### commonjs和ES6的区别

- **CommonJS**的`require`语法是同步的，所以就导致了**CommonJS**模块规范只适合用在服务端，而ES6模块无论是在浏览器端还是服务端都是可以使用的，但是在服务端中，还需要遵循一些特殊的规则才能使用 ；

- CommonJS模块输出的是一个值的拷贝，ES6 模块输出的是值的引用；

  ```js
  // lib.js
  var counter = 3;
  function incCounter() {
    counter++;
  }
  module.exports = {
    counter: counter,
    incCounter: incCounter,
  };
  //commonjs
  var mod = require('./lib');
  console.log(mod.counter);  // 3
  mod.incCounter();
  console.log(mod.counter); // 3
  //ES6
  import { counter, incCounter } from './lib';
  console.log(counter); // 3
  incCounter();
  console.log(counter); // 4
  ```

  

- CommonJS 模块是运行时加载，Module被加载的时候执行，加载后缓存（只加载一次，第二次就直接用放到内存中的结果，不重复加载了，第一次加载的时候会执行）。ES6 模块是编译时输出接口,使得对JS的模块进行静态分析成为了可能

- `this`关键词，在ES6模块顶层，`this`指向`undefined`；而CommonJS模块的顶层的`this`指向当前模块

# webpack和gulp的区别

**前提：**

越来越多的网站已经从网页模式进化到了 Webapp 模式。它们运行在现代的高级浏览器里，使用 HTML5、 CSS3、 ES6 等更新的技术来开发丰富的功能，网页已经不仅仅是完成浏览的基本需求，并且webapp通常是一个单页面应用，每一个视图通过异步的方式加载，这导致页面初始化和使用过程中会加载越来越多的 JavaScript 代码，这给前端开发的流程和资源组织带来了巨大的挑战。

如何在开发环境组织好这些碎片化的代码和资源，并且保证他们在浏览器端快速、优雅的加载和更新，就需要一个模块化系统

## webpack打包工具定义

webpack是一个前端模块化方案，更侧重模块打包，我们可以把开发中的所有资源（图片、js文件、css文件等）都看成模块，通过loader（加载器）和plugins（插件）对资源进行处理，打包成符合生产环境部署的前端资源。

**网页中常见的静态资源**

**js**--js，jax，coffee，ts(TypeScript,需要编译为js)

**css**-- css,less,sass

**image**--jpg,png,gif,bmp,svg

**字体文件(Fonts)**--svg,ttf,eot,woff,woff2

**模板文件**--ejs,jade,vue(这是在webpack中定义的组件的方式)

![什么是webpack](https://zhaoda.net/webpack-handbook/images/what-is-webpack.png)

## gulp构建工具定义

gulp强调的是前端开发的工作流程，我们可以通过配置一系列的task，定义task处理的事务（例如文件压缩合并、雪碧图、启动server、版本控制等），然后定义执行顺序，来让gulp执行这些task，从而构建项目的整个前端开发流程。

## 相同功能

| 功能                  | gulp                                                         | webpack                                                      |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 文件合并与压缩（css） | 使用gulp-minify-css模块 gulp.task('sass',function(){    gulp.src(cssFiles)    .pipe(sass().on('error',sass.logError))    .pipe(require('gulp-minify-css')())    .pipe(gulp.dest(distFolder)); }); | 样式合并一般用到extract-text-webpack-plugin插件， 压缩则使用webpack.optimize.UglifyJsPlugin。 |
| 文件合并与压缩（js）  | 使用gulp-uglify和gulp-concat两个模块                         | js合并在模块化开始就已经做， 压缩则使用webpack.optimize.UglifyJsPlugin |
| sass/less预编译       | 使用gulp-sass/gulp-less 模块                                 | sass-loader/less-loader 进行预处理                           |
| 启动server            | 使用gulp-webserver模块 var webserver =require('gulp-webserver'); gulp.task('webserver',function(){    gulp.src('./')    .pipe(webserver({      host:'localhost',      port:8080,      livereload:true, //自动刷新      directoryListing:{         enable: true,         path:'./'      },    })); }); | 使用webpack-dev-server模块 module.exports = {    ......    devServer: {      contentBase: "build/",      port:8080,      inline: true //实时刷新    } } |
| 版本控制              | 使用gulp-rev和gulp-rev-collector两个模块                     | 将生成文件加上hash值 module.exports = {    ......   output: {     ......     filename: "[name].[hash:8].js"   },    plugins:[      ......      new ExtractTextPlugin(style.[hash].css")    ] } |

## 区别

- gulp严格上讲，模块化不是他强调的东西，他旨在规范前端开发流程。

- webpack更是明显强调模块化开发，而那些文件压缩合并、预处理等功能，不过是他附带的功能。

- Webpack 可以做到按需加载。像 Grunt、Gulp 这类构建工具，打包的思路是：遍历源文件→匹配规则→打包，这个过程中做不到按需加载，即对于打包起来的资源，到底页面用不用，打包过程中是不关心的。Webpack 跟其他构建工具本质上不同之处在于：Webpack 是从入口文件开始，经过模块依赖加载、分析和打包三个流程完成项目的构建。在加载、分析和打包的三个过程中，可以针对性的做一些解决方案，达到按需加载的目的，比如code split（拆分公共代码等）。

# webpack

```js
const path= require('path');
const webpack = require("webpack");
//导入在内存中生成html页面的插件
const htmlWebpackPlugin = require("html-webpack-plugin");
/// 导入每次删除文件夹的插件
 const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 导入抽取CSS的插件
const ExtractTextPlugin = require("extract-text-webpack-plugin")
// 导入压缩CSS的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
//配置文件就是js文件，通过node中的模块操作，向外暴露一个配置对象
module.exports = {
    //决定入口和出口
    entry:{// 配置入口节点
    app: path.join(__dirname, './src/main.js'),
    vendors1: ['jquery'] // 把要抽离的第三方包的名称，放到这个数组中
    }
    output: {
        path:__dirname+'/dist',//指定打包好的文件输出到那个目录中
        filename: 'js/bundle.js'
    },
    devServer:{
        //配置dev-server命令参数的第二种形式
        // "dev": "webpack-dev-server --open --port 3000 --contentBase src --hot"
        open:true,//自动打开浏览器
        port:3000,
        contentBase:'src',//指定托管的根目录
        hot:true,//启动热更新
        inline: true
    },
    plugins:[
        //配置插件的节点
        new webpack.HotModuleReplacementPlugin(),//new一个热更新的模块对象
        new htmlWebpackPlugin({//创建一个在内存中生成一个html的插件
            template:path.join(__dirname,"./src/index.html"),//指定模板页面，会根据路径去生成内存中的页面
            filename:'index123.html',//指定生成页面名称,使用webpack打包可以存放在output.path为dist文件夹下，并自动引用bundle.js
            title:'test',
            inline:true,//实时加载
            minify:{//压缩html文件
                removeComments:true,//移出html中的注释
                collapseWhitespace:false//删除空白符与换行符
            }
        }),
         new CleanWebpackPlugin(),
         new webpack.optimize.CommonsChunkPlugin({
      			name: 'vendors1', // 指定要抽离的入口名称
     			filename: 'js/vendors.js' // 将来再发布的时候，除了会有一个 bundle.js ，还会多一个 vendors.js 的文件，里面存放了所有的第三方包
    }),
    	new webpack.optimize.UglifyJsPlugin({
     			 compress: { // 配置压缩选项
      			  warnings: false // 移除警告
      }
    }),
   		 new webpack.optimize.DedupePlugin({ // 设置为产品上线环境，进一步压缩JS代码
      			'process.env.NODE_ENV': '"production"'
    }),
    	new ExtractTextPlugin("css/styles.css"), // 抽取CSS文件
    	new OptimizeCssAssetsPlugin()// 压缩CSS的插件
    ],
    module:{//这个节点由于配置所有的第三方模块加载器
        rules:[//所有第三方模块的匹配规则
             { test: /\.jsx?$/, use: 'babel-loader', exclude: /node_modules/ },
            {test:/\.css$/,use:['style-loader','css-loader']},
            //使用loader时是从右往左调用的，当调用完毕后会把处理的结果直接交给webpack进行打包合并，最终输出到bundle.js
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:['url-loader?limit=100&name=[hash:8]-[name].[ext]']}
            //limit是给定的值，是图片的大小，单位b，如果limit大于或等于图片的大小则会转换为base64格式的字符串
            //图片使用定义的名称而不是base64，[name].[ext]。相同图片不同路径，为了分清使用[hash:]value,value是1-32
        ]
    }
}

```

## 依赖

### webpack和webpack-dev-server的区别

**webpack**

一个模块打包器，根据entry指示webpack应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
每个依赖项随即被处理，最后输出到output字段指定的文件中

**webpack-dev-server**

webpack-dev-server：一个服务器插件，相当于webpack+apache，启动一个web服务并实时更新修改
启动webpack-dev-server后，在目标文件夹中是看不到编译后的文件的，实时编译后的文件都保存到了内存当中。

**区别**

- webpack不会实时更新修改，就只是一个打包工具，webpack-dev-server会实时自动更新修改
- webpack打包输出路径，output字段为path，webpack-dev-server打包输出路径，output字段为publicPath(此值为空时默认是项目根目录，  contentBase:'src',//指定托管的根目录)
- webpack打包输出的文件，是真的存在于物理地址path中，而webpack-dev-server打包输出的文件，是保存在内存中的，在项目目录中是找不到的。

### html-webpack-plugin插件

webpack-dev-server实现了自动编译刷新浏览器，让编译出来的bundle.js托关于服务器根路径（电脑内存）中去。

html-webpack-plugin会创建一个在内存中生成一个html的插件，帮我们自动引入在内存中打包好的bundle.js文件







