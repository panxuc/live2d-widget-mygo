# Live2D API feat. MyGO!!!!!

个人自用的 Live2D API，用于网页端引入 MyGO!!!!! 的 Live2D 模型。

该仓库中所有Live2D相关资源均来自于网络，仅供学习交流，请勿用于商业用途，如有侵权，请联系删除。

[**点击查看示例网页**](https://live2d-api-mygo.panxuc.com/)。示例网页中模型位于左下角。

## 声明

- 本项目 API 搭建方式参考自 [nova1751/live2d-api](https://github.com/nova1751/live2d-api)。
  - 该项目 API 搭建方式参考自 [fghrsh/live2d_api](https://github.com/fghrsh/live2d_api)。
  - 该项目代码参考自 [stevenjoezhang/live2d-widget](https://github.com/stevenjoezhang/live2d-widget)。
  - 该项目模型来自 [Eikanya/Live2d-model](https://github.com/Eikanya/Live2d-model)，仅供学习交流，请勿用于商业用途，如有侵权，请联系删除。
- 本项目模型来自《BanG Dream! 少女乐团派对》解包所得资源，仅供学习交流，请勿用于商业用途，如有侵权，请联系删除。

## 使用

使用 `jsdelivr` 引入。

```html
<script src="https://cdn.jsdelivr.net/gh/panxuc/live2d-api-mygo@main/autoload.js"></script>
<!-- 左下角 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/panxuc/live2d-api-mygo@main/css/left.css"/>
<!-- 右下角 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/panxuc/live2d-api-mygo@main/css/right.css"/>
```

也可以下载 js 和 css 文件来进行自定义配置，详细请参考[live2d-widget配置](https://github.com/stevenjoezhang/live2d-widget#%E9%85%8D%E7%BD%AE-configuration)。

## 成果

1. 目前可以使用灯、爱音、乐奈、爽世、立希的常服、2 套校服、5 套 Live 演出服。
2. 完全移除了[stevenjoezhang/live2d-widget](https://github.com/stevenjoezhang/live2d-widget)中的下头文本。
3. 为每个人设计了自己的一套文本，不再使用通用文本。

## TODO

- [ ] 添加更多模型。
- [ ] 添加更多文本。
- [ ] 添加动作和表情。
