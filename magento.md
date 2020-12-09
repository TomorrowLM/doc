

## 指向模块和主题的路径的常规表示法

<theme_dir> [主题](https://glossary.magento.com/theme)目录。通常在自定义主题或一般主题时使用。 

- `app/design/frontend/<Vendor>/<theme>`
- `vendor/magento/theme-frontend-<theme>`

<module_dir> 模块目录。在谈论特定的Magento模块时，使用以下表示法：` <Magento_X_module_dir> `，其中**`X`将指示模块的名称**。 

- `app/code/Magento/X`
- `vendor/magento/module-x`

## Magento缓存概述

缓存是提高网站性能的最有效方法之一。一般来说，有两种缓存内容的方法：

- 客户端（浏览器）
- 服务器端

 Magento页面缓存库包含一个简单的PHP反向代理，可立即使用全页面缓存。反向代理充当访问者和您的应用程序之间的中介，并且可以减少服务器上的负载。 

#### 可缓存和不可缓存页面

可缓存和不可缓存是我们用来指示是否应完全缓存页面的术语。（默认情况下，所有页面都是可缓存的。）如果在layout中的任何一个块是被指定为不可缓存的，则整个页面都是不可缓存的。

要创建不可缓存的页面，请使用将该页面上的任何块在布局中标记为不可缓存`cacheable="false"`。 

#### 公共和私人内容

反向代理向多个用户提供“公共”或共享内容。但是，大多数Magento网站生成的动态和个性化“私有”内容仅应提供给一个用户，这对缓存提出了独特的挑战。为了应对这些挑战，Magento可以区分两种类型的内容：

- **[公用](https://devdocs.magento.com/guides/v2.4/extension-dev-guide/cache/page-caching/public-content.html)**-公用内容存储在反向代理缓存存储中的服务器端（例如，文件系统，数据库，Redis或Varnish），可供多个客户使用。公共内容的示例包括页眉，页脚和类别列表。
- **[私有](https://devdocs.magento.com/guides/v2.4/extension-dev-guide/cache/page-caching/private-content.html)**-私有内容存储在客户端（例如浏览器），并且特定于单个客户。私人内容的示例包括愿望清单，购物车，客户名称和地址。您应该将存储的私人内容限制为页面总内容的一小部分。

#### 缓存类型

以下缓存类型主要影响前端开发过程：

| 缓存类型     | 缓存类型代码名称 | 描述                                                         |
| :----------- | :--------------- | :----------------------------------------------------------- |
| 布局         | `layout`         | 编译的页面布局（即所有组件中的布局组件）。修改布局文件后，清除或刷新此缓存类型。 |
| 阻止HTML输出 | `block_html`     | 每个块的HTML页面片段。修改视图层后，清除或刷新此缓存类型。   |
| 页面缓存     | `full_page`      | 生成的HTML页面。如有必要，Magento会自动清除此缓存，但是第三方开发人员可以将任何数据放入缓存的任何段中。修改影响HTML输出的代码级别后，清除或刷新此缓存类型。建议启用此缓存，因为缓存HTML可以显着提高性能。 |
| 翻译         | `translate`      | 合并所有模块的翻译。                                         |

要清除缓存，请运行

```
$	php	bin/magento cache:clean <type> ... <type>
```

要查看缓存的状态，请运行：

```
$	php bin/magento cache:status
```

## 主题开发最佳做法

1.   从默认的Magento主题继承时，请扩展默认样式，而不要覆盖它们。尽可能将您的自定义项放在_extend.less或_theme.less文件中，而不要从父主题覆盖.less文件。

2.	自定义或创建新的`.xml`布局文件，而不是自定义和覆盖`.phtml`模板。例如，如果您需要创建一个新容器，则添加`.xml`文件比覆盖现有模板更好。可以使用布局说明执行的其他一些自定义包括：

   - 使用更改块或容器的位置 `<move>`。
   - 通过将`remove`或`display`属性设置为`true`或`false`在中添加或删除块或容器`/`。
   - 使用` referenceContainer `元素更改现有容器的HTML标签或CSS类。
   - 在 `<theme_dir>/web/` 目录中添加字体，图像和JavaScript文件
   
3.	使用`<theme_dir>/etc/view.xml`来改变图像类型或大小，或添加自己的类型。有关详细信息，请参见[配置图像属性](https://devdocs.magento.com/guides/v2.4/frontend-dev-guide/themes/theme-images.html)。使用此文件还可以[自定义产品画廊窗口小部件](https://devdocs.magento.com/guides/v2.4/javascript-dev-guide/widgets/widget_gallery.html)。

4. 始终保持文本可翻译。为了确保您的Magento模板中使用的文本可以被翻译，请将其包装在translation函数中：示例：

   ```
   <a href="#"><?= __('Click to download'); ?></a>
   ```

5. 继承blank或Luma主题时，请使用移动优先方法。

6. 造型时请勿重复工作。而是创建一个类或mixin并在需要时调用它们。

7. 在设置任何**自定义模块的样式**时，请在模块内添加样式，而不是将其添加到设计主题中。这样，除非调用模块，否则不会加载样式。例如`app/code/Company/Module/view/frontend/web/css/source/_module.less`。

8. 设置**自定义主题**的样式时，请添加样式以分隔更少的文件，而不是附加到单个文件。这样，样式更易于跟踪和调试。作为参考，请检查`[Magento_Blank_Theme_Path]/web/css/_styles.less`：

   ```less
   @import 'source/lib/_lib.less'; // Global lib
   @import 'source/_sources.less'; // Theme styles
   @import 'source/_components.less'; // Components styles (modal/sliding panel)
   ```

    **Magento样式或现成的组件**：检查在 **blank theme** 找到的现有组件的**列表**：`[Magento_Blank_Theme_Path]/web/css/source/_sources.less`并且 `[Magento_Blank_Theme_Path]/web/css/source/_components.less`，Magento添加其现成的组件通过`@import`。 

    如果要添加自定义组件或扩展现有组件，请复制`[Magento_Blank_Theme_Path]/web/css/source/_components.less`到自定义主题中。例如，使用`app/design/frontend/Company/Theme/web/css/source/_components.less` 为新的/现有的组件添加/导入您的自定义样式。 

   ```
    空白主题路径
   [Magento_Blank_Theme_Path] =vendor/magento/theme-frontend-blank或		  app/design/frontend/Magento/blank
   ```

   ```
   //  Custom style for new components
   //  _____________________________________________
   
   @import 'components/_[CUSTOM_COMPONENT_1].less';
   @import 'components/_[CUSTOM_COMPONENT_2].less';
   
   
   //  Custom style for existing components
   //  _____________________________________________
   
   @import 'components/_[CUSTOM_COMPONENT_1]_extend.less';
   @import 'components/_[CUSTOM_COMPONENT_2]_extend.less';
   
   ```

    接下来，在单独的文件中为各个组件（新组件或扩展组件）添加样式。例如，对于一个新的滑块组件：`app/code/Company/Module/view/frontend/web/css/source/components/_sliders.less`。要扩展或覆盖现有的按钮样式：`app/code/Company/Module/view/frontend/web/css/source/components/_buttons_extend.less`。 

## 主题

### 找到模板，布局和样式

#### 找到模板

使用`bin/magento dev:template-hints:enable`命令启用模板提示，并使用`bin/magento dev:template-hints:disable`命令禁用模板提示。**运行命令后，不要忘记清除缓存**（php bin/magento cache:clean）![1604479760380](X:\Users\silk\AppData\Roaming\Typora\typora-user-images\1604479760380.png)

#### 找到布局

就像模板一样，布局是按模块保存的。您可以通过确定感兴趣的元素的模板位于哪个模块中来轻松找到[布局](https://glossary.magento.com/layout)文件。

确定模块后，可以在以下位置搜索布局：

1. `<current_theme_dir>/<Namespace>_<Module>/layout/`
2. `<parent_theme(s)_dir>/<Namespace>_<module>/layout/`
3. `<module_dir>/view/frontend/layout/`
4. `<module_dir>/view/base/layout/`





# 项目

## 目录结构

