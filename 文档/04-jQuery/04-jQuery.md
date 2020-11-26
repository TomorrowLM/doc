1.jQuery([selector,[context]])如果指定了 context 参数，如一个 DOM 元素集或 jQuery 对象，那就会在这个 context 中查找

在文档的第一个表单中，查找所有的单选按钮(即: type 值为 radio 的 input 元素)。

jQuery 代码:$("input:radio", document.forms[0]);

```11
2.jQuery(html,[ownerDocument])动态创建由 jQuery 对象包装的 DOM 元素。同时设置一系列的属性、事件等。
创建一个 span ，可以用$("<span/>") 或 $("<span></span>") ，但不推荐 $("<span>")。
$("<input>", {
  type: "text",
  val: "Test",
  focusin: function() {
    $(this).addClass("active");
  },
  focusout: function() {
    $(this).removeClass("active");
  }
}).appendTo("form");

3.jQuery.holdReady(hold) 暂停或恢复.ready() 事件的执行。 
```

要延迟ready事件，第一次调用的$.holdReady(true)。

4.each(callback)

迭代两个图像，并设置它们的 src 属性。其中i从0依次增加

```
$("img").each(function(i){		
   this.src = "test" + i + ".jpg";
 });
5.计算文档中所有图片数量，$("img").size(); $("img").length;
6.get(index) 取得第 index 个位置上的元素 
get()取得所有匹配的 DOM 元素集合。
```

DOM对象转jQuery：$("").eq(index)

jQuery转DOM对象：$("").get(index),DOM对象不能使用jQuery中的函数eg,css(),click().......

7.$(").index([selector|element])搜索匹配的元素，并返回相应元素的索引值，从0开始计数。

```1
$('#bar').index('li'); //1，传递一个选择器，返回#bar在所有li中的索引位置
$('#bar').index(); //1，不传递参数，返回这个元素在同辈中的索引位置。 
8.data([key],[value])	key储存的数据名	$("").removeData("key");  
在一个div上存取名/值对数据 $("div").data("test", { first: 16, last: "pizza!" });
----------选择器------
1.parent>child,在给定的父元素下匹配所有的子元素
2.prev+next,匹配所有紧接在 prev 元素后的同辈 next 元素
3.prev~sibling,匹配 prev 元素之后的所有同辈 siblings 元素
----------属性-------
1.attr(name|properties|key,value|fn)设置或返回被选元素的属性值。removeAttr(name)
```

为所有图像设置src和alt属性。$("img").attr({ src: "test.jpg", alt: "Test Image" });

获取文档中所有图像的src属性值。$("img").attr("src");

2.addclass(class|fn)为每个匹配的元素添加指定的类名。removeClass

```
$('ul li:last').addClass(function() {
  return 'item-' + $(this).index();
});
```

3.toggleclass(class|fn)如果存在（不存在）就删除（添加）一个类。

每点击三下加上一次 'highlight' 类

```
 var count = 0;
  $("p").click(function(){
      $(this).toggleClass("highlight", count++ % 3 == 0);
  });
```

4.html(val|fn)	val用于设定HTML内容的值  function(index,html)index为元素在集合中的索引位置，html为原先的HTML值。

返回p元素的内容。$('p').html();

设置所有 p 元素的内容 $("p").html("Hello <b>world</b>!");

使用函数来设置所有匹配元素的内容。

```
$("p").html(function(n){
    return "这个 p 元素的 index 是：" + n;
    });
```

5.text(val|fn)取得所有匹配元素的内容。function(index,text)index为元素在集合中的索引位置，text为原先的text值。

6.val(val|fn|arr)获得匹配元素的当前值。

-----------筛选----------

eq(index)获取第N个元素,从0算起。

map(fn)将一组元素转换成其他数组（不论是否是元素数组）用这个函数来建立一个列表，不论是值、属性还是CSS样式，

```
$("p").append( $("input").map(function(){
  return $(this).val();
}).get().join(", ") );get()jQuery转DOM对象
```

children(expr),取得一个包含匹配的元素集合中每一个元素的所有子元素的元素集合。expr用以过滤子元素的表达式

find(expr|obj|ele),搜索所有与指定表达式匹配的元素。这个函数是找出正在处理的元素的后代元素的好方法。与$("p span")相同。

next(expr),取得一个包含匹配的元素集合中每一个元素紧邻的后面同辈元素的元素集合。

nextAll(expr),查找当前元素之后所有的同辈元素。

prev(expr)取得一个包含匹配的元素集合中每一个元素紧邻的前一个同辈元素的元素集合。

siblings(expr)取得一个包含匹配的元素集合中每一个元素的所有唯一同辈元素的元素集合。可以用可选的表达式进行筛选。

-----------文档处理--------------

1.$('ele').append(content|fn),要插入到目标元素内部后端的内容。function(index|fn)

2.$('ele').appendTo(content),把所有匹配的元素追加到另一个指定的元素元素集合中。

```
把所有段落追加到div的元素中。
$("p").appendTo("div");
3.pretend(content)要插入到目标元素内部前端的内容
$("p").prepend("<b>Hello</b>");
4.prependTo(content)
5.after(content|fn),在每个匹配的元素之后插入内容。before()
6.insertAfter(content),把所有匹配的元素插入到另一个、指定的元素元素集合的后面。insertBefore()
7.wrap(html|ele|fn)
把所有的段落用一个新创建的div包裹起来
$("p").wrap("<div class='wrap'></div>");
8.remove(expr)从DOM中删除所有匹配的元素。
从DOM中把带有hello类的段落删除$("p").remove(".hello");
-------css-----------
样式属性name,properties,,val
1.$(").offset(coordinates),coordinates{top,left},获取匹配元素在当前视口的相对偏移。
var p = $("p:last");
var offset = p.offset();
p.html( "left: " + offset.left + ", top: " + offset.top );
2.position(),获取匹配元素相对父元素的偏移。
3.scrollTop,scrollLeft
4.height()  width()
把所有段落的高设为 20:$("p").height(20);
---------效果------
1.show(speed,easing,fn)  hide(),speed动画时常的毫秒数，fn动画完成时执行的函数
2.slideDown(speed,easing,fn) slideUp(),通过高度变化（向下增大）来动态地显示所有匹配的元素，在显示完成后可选地触发一个回调函数。
3.slideToggle(speed,easing,fn)通过高度变化来切换所有匹配元素的可见性，并在切换完成后可选地触发一个回调函数。
4.fadeIn(speed,easing,fn)通过不透明度的变化来实现所有匹配元素的淡入效果，并在动画完成后可选地触发一个回调函数。fadeOut
5.fadeTo(speed,opacity,easing,fn)把所有匹配元素的不透明度以渐进方式调整到指定的不透明度，并在动画完成后可选地触发一个回调函数。
6.fadeToggle(speed,easing,fn)通过不透明度的变化来开关所有匹配元素的淡入和淡出效果，并在动画完成后可选地触发一个回调函数。元素隐藏，则显示。元素显示则开启隐藏效果
7.animate(params,[speed],[easing],[fn])
params:一组包含作为动画属性和终值的样式属性和及其值的集合
$("#go").click(function(){
  $("#block").animate({ 
    width: "90%",
    height: "100%", 
    fontSize: "10em", 
    borderWidth: 10
  }, 1000 );
});
8.stop(clearQueue,jumpToEnd),停止所有在指定元素上正在运行的动画。如果队列中有等待执行的动画(并且clearQueue没有设为true)，他们将被马上执行
clearQueue:如果设置成true，则清空队列。可以立即结束动画。
jumpToEnd:如果设置成true，则完成队列。可以立即完成动画。
9.delay(duration,queueName)设置一个延时来推迟执行队列中之后的项目。
duration:延时时间，单位：毫秒
queueName:队列名词，默认是Fx，动画队列。
10.finish([queue])停止当前正在运行的动画，删除所有排队的动画，并完成匹配元素所有的动画。
--------工具---------
1.$.each(object,[callback])通用例遍方法，可用于例遍对象和数组。回调函数拥有两个参数：第一个为对象的成员或数组的索引，第二个为对应变量或内容。
$().each() 是来遍历DOM对象的
2.$.extend([deep],target,object,[object n])用一个或多个其他对象来扩展一个对象，返回被扩展的对象。target:待修改对象。object1:待合并到第一个对象的对象。合并 settings 和 options，修改并返回 settings。
var settings = { validate: false, limit: 5, name: "foo" };
var options = { validate: true, name: "bar" };
jQuery.extend(settings, options);
settings == { validate: true, limit: 5, name: "bar" }
3.$.grep(array,callback)使用过滤函数过滤数组元素。callback:此函数将处理数组每个元素。第一个参数为当前元素，第二个参数而元素索引值。此函数应返回一个布尔值。过滤数组中小于 0 的元素。
$.grep( [0,1,2], function(n,i){
  return n > 0;
});
4.$.map(arr|obj,callback)将一个数组中的元素转换到另一个数组中。array: 待转换数组。将原数组中每个元素加 4 转换为一个新数组。
$.map( [0,1,2], function(n){
  return n + 4;
});
5.$.inArray(value,array,[fromIndex])确定第一个参数在数组中的位置，从0开始计数(如果没有找到则返回 -1 )。
var arr = [ 4, "Pete", 8, "John" ];
jQuery.inArray("John", arr);  //3
jQuery.inArray(4, arr);  //0
6.$.trim(str),去掉字符串起始和结尾的空格。
---------事件对象---------

















```