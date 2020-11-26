---------------------------------CSS-----------------------------------

visibility:hidden;  隐藏元素  隐藏之后还占据原来的位置。

display:none;   隐藏元素  隐藏之后不占据原来的位置。

---------------------------------CSS3-----------------------------------

before，after是伪元素选择器（用：：），因为高版本向下兼容可以用（：）表示

伪类选择器（link，active，nth-of-type(n)...）伪元素可以清除浮动，伪类可以叠加使用,有优先级

*伪类target 配合锚点使用,点击锚点时,target就被激活了*	

E:nth-child（n）选择E的父元素下的第n个子元素	

E:nth-of-type(n)选择E的父元素下的第n个E元素

opacity子元素会继承父元素的透明度

文本缩略

section:nth-of-type(4)  p{
			width: 200px;
			border: 1px solid #ccc;
			/*强制不换行 只在一行缩略  white-space: nowrap;*/
			overflow: hidden;防止文本溢出
			text-overflow: ellipsis;产生.....的效果
			display:-webkit-box;
			/*-webkit-line-clamp:n;第n行缩略*/
			-webkit-line-clamp:2;
			-webkit-box-orient:vertical;
		}

文字阴影：text-shadow

边框阴影：box-shadow：水平偏移量  垂直偏移量  模糊度  （缩展量）  颜色

box-shadow：inset(阴影向内)  水平偏移量  垂直偏移量  模糊度  （缩展量）  颜色

偏移量和模糊度可以相加计算	偏移量和缩展也是相加

模糊度x（单位px）颜色从0到x内进行逐渐透明的过程

边框：borer-radius	

border-image-source: url(border.png);	border-image-slice切割图片

盒模型：box-sizing:border-box;使width包含内容，padding，和border		content-box,width只包含内容

background-clip：padding-box;  修改背景颜色区域	background-origin: border-box;修改背景所图片所在区域

background-image: radial-gradient(120px at 50px 50px, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));	

background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));	

background-image: linear-gradient(to left, yellow 50%, green 40%, blue 50%);

	background-image: linear-gradient(
	                          135deg,
	                          green 25%,
	                          transparent 25%,
	                          transparent 50%,
	                          green 50%,
	                          green 75%,
	                          transparent 75%,
	                          transparent 100%
			);
重复渐变repeating-linear-gradient

伸缩布局：	display:flex;

​			flex-direction: column （子元素纵轴排列）  row-reverse   column-reverse   reverse交换

​			横轴justify-content: flex-start  flex-end  center  space-around  space-between

​			纵轴align-items: flex-start  flex-end   center   baseline基线（可以设置高度）  stretch

​			控制是否换行，包括wrap、nowrap	flex-wrap: nowrap换行

​			align-content: flex-start、flex-end、center、space-between、space-around、stretch

 flex-flow  	flex-direction和flex-wrap的简写形式   	flex-flow: column wrap；

flex控制子元素伸缩比例

align-self同align-items可覆盖父元素设置的algin-items，包括flex-start、flex-end、center、baseline、stretch

order控制子元素的位置



transition: property duration timing-function delay;duration过渡的时间

控制过渡的速度   transition-timing-function: 匀速linear  逐渐降速ease 加速ease-in 降速ease-out  先加速后减速ease-in-out

动画相比过渡可以控制更多细节，可以将一个动画拆成多个步骤

animation: change 5s infinite;

@keyframes change {0%{}	25%{}	100%{}}

animation-name: change;
			动画持续时间
/*			animation-duration: 1s;
			动画结束后的状态
/*			animation-fill-mode: forwards;
			无限次播放
/*			animation-iteration-count: infinite;
			动画延时
/*			animation-delay: 1s;
			动画暂停
/*			animation-play-state: paused;
			动画反方向
/*			animation-direction: alternate;
			动画速度
/*			animation-timing-function: linear;

transform: rotate(360deg);旋转   	transform-origin: left bottom;      旋转的定位点

   transform: skew(45deg);倾斜             

 transform: translate(400px) 向左移动400px	translate(-50%,-50%) 作用是，往上（x轴）,左（y轴）移动自身长宽的 50%

  transform:scale(1.5);盒子扩大1.5倍

视距perspective: 500px;	近大远小	元素定义perspective属性，其子元素会获得透视效果，而不是元素本身。只有3D才有

perspective-origin 灭点/消失点

transform-style：flat/preserve    是3D中的一个重要属性,规定所有子元素在2D还是3D中展示。添加在父元素中