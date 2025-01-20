# Live2D API feat. MyGO!!!!!

个人自用的Live2D API，用于在任意网页上引入MyGO!!!!!的Live2D模型。

该仓库中所有Live2D相关资源均来自于网络，仅供学习交流，请勿用于商业用途，如有侵权，请联系删除。

[**点击查看示例网页**](https://live2d-api-mygo.panxuc.com/)。示例网页中模型位于左下角。

## 介绍

- 本项目API搭建方式参考自[nova1751/live2d-api](https://github.com/nova1751/live2d-api)。
  - 该项目API搭建方式参考自[fghrsh/live2d_api](https://github.com/fghrsh/live2d_api)。
  - 该项目代码参考自[stevenjoezhang/live2d-widget](https://github.com/stevenjoezhang/live2d-widget)。
  - 该项目模型来自[Eikanya/Live2d-model](https://github.com/Eikanya/Live2d-model)，仅供学习交流，请勿用于商业用途，如有侵权，请联系删除。
- 本项目使用[PixiJS](https://github.com/pixijs/pixijs)重写了Live2D渲染部分。Live2D部分使用[pixi-live2d-display](https://github.com/guansss/pixi-live2d-display)进行渲染。
- 本项目模型来自[Bestdori](https://bestdori.com/)提供的《BanG Dream! 少女乐团派对》游戏数据包资源。为了适配此项目，对Live2D模型进行了一些必要的修改。仅供学习交流，请勿用于商业用途，如有侵权，请联系删除。
- 本项目完全移除了[stevenjoezhang/live2d-widget](https://github.com/stevenjoezhang/live2d-widget)中的下头文本，为每位角色设计了单独的一套台词，大多数出自动画台词和游戏日常对话。

## 模型

当前包含以下模型：

<table style="text-align: center;">
  <colgroup>
    <col style="width: auto;">
    <col style="width: 20%;">
    <col style="width: 20%;">
    <col style="width: 20%;">
    <col style="width: 20%;">
    <col style="width: 20%;">
  </colgroup>
  <thead>
    <tr>
      <th></th>
      <th><img src="assets/chara_icon_36.png" alt="tomori"><br lang="ja">高松 燈</th>
      <th><img src="assets/chara_icon_37.png" alt="anon"><br lang="ja">千早 愛音</th>
      <th><img src="assets/chara_icon_38.png" alt="rana"><br lang="ja">要 楽奈</th>
      <th><img src="assets/chara_icon_39.png" alt="soyo"><br lang="ja">長崎 そよ</th>
      <th><img src="assets/chara_icon_40.png" alt="taki"><br lang="ja">椎名 立希</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>casual-2023</td>
      <td>春季休闲</td>
      <td>春季休闲</td>
      <td>春季休闲</td>
      <td>春季休闲</td>
      <td>春季休闲</td>
    </tr>
    <tr>
      <td>school_winter-2023</td>
      <td>冬季校服</td>
      <td>冬季校服</td>
      <td>冬季校服</td>
      <td>冬季校服</td>
      <td>冬季校服</td>
    </tr>
    <tr>
      <td>school_summer-2023</td>
      <td>夏季校服</td>
      <td>夏季校服</td>
      <td>夏季校服</td>
      <td>夏季校服</td>
      <td>夏季校服</td>
    </tr>
    <tr>
      <td>live_default</td>
      <td><img src="assets/036_live_default.png" alt="036_live_default"><br lang="ja">一生を、はじめよう</td>
      <td><img src="assets/037_live_default.png" alt="037_live_default"><br lang="ja">一生を、はじめよう</td>
      <td><img src="assets/038_live_default.png" alt="038_live_default"><br lang="ja">一生を、はじめよう</td>
      <td><img src="assets/039_live_default.png" alt="039_live_default"><br lang="ja">一生を、はじめよう</td>
      <td><img src="assets/040_live_default.png" alt="040_live_default"><br lang="ja">一生を、はじめよう</td>
    </tr>
    <tr>
      <td>live_sr_01</td>
      <td><img src="assets/036_live_sr_01.png" alt="036_live_sr_01"><br lang="ja">不思議な小動物</td>
      <td><img src="assets/037_live_sr_01.png" alt="037_live_sr_01"><br lang="ja">仲良くする相手は…</td>
      <td><img src="assets/038_live_sr_01.png" alt="038_live_sr_01"><br lang="ja">爪弾く猫</td>
      <td><img src="assets/039_live_sr_01.png" alt="039_live_sr_01"><br lang="ja">調停者は心静かに</td>
      <td><img src="assets/040_live_sr_01.png" alt="040_live_sr_01"><br lang="ja">守るのは、過去</td>
    </tr>
    <tr>
      <td><img src="assets/banner_memorial_event235.png" alt="banner_memorial_event235"><br>live_event_235</td>
      <td><img src="assets/036_live_event_235_ur.png" alt="036_live_event_235_ur"><br lang="ja">心の叫び</td>
      <td><img src="assets/037_live_event_235_ur.png" alt="037_live_event_235_ur"><br lang="ja">迷いながら</td>
      <td><img src="assets/038_live_event_235_sr.png" alt="038_live_event_235_sr"><br lang="ja">気の向くままに</td>
      <td><img src="assets/039_live_event_235_ur.png" alt="039_live_event_235_ur"><br lang="ja">終わらせてあげる</td>
      <td><img src="assets/040_live_event_235_sr.png" alt="040_live_event_235_sr"><br lang="ja">理想に届かない</td>
    </tr>
    <tr>
      <td><img src="assets/banner_memorial_event240.png" alt="banner_memorial_event240"><br>live_event_240</td>
      <td><img src="assets/036_live_event_240_ssr.png" alt="036_live_event_240_ssr"><br lang="ja">立希ちゃんのとなりで</td>
      <td><img src="assets/037_live_event_240_sr.png" alt="037_live_event_240_sr"><br lang="ja">リーダー推薦</td>
      <td><img src="assets/038_live_event_240_ur.png" alt="038_live_event_240_ur"><br lang="ja">コインパーキングの猫</td>
      <td><img src="assets/039_live_event_240_r.png" alt="039_live_event_240_r"><br lang="ja">肩の力を抜いて</td>
      <td><img src="assets/040_live_event_240_ur.png" alt="040_live_event_240_ur"><br lang="ja">私と、取引しよう</td>
    </tr>
    <tr>
      <td><img src="assets/banner_memorial_event250.png" alt="banner_memorial_event250"><br>live_event_250</td>
      <td><img src="assets/036_live_event_250_ur.png" alt="036_live_event_250_ur"><br lang="ja">運命の一枚</td>
      <td><img src="assets/037_live_event_250_r.png" alt="037_live_event_250_r"><br lang="ja">シックな花と</td>
      <td><img src="assets/038_live_event_250_sr.png" alt="038_live_event_250_sr"><br lang="ja">ひま。</td>
      <td><img src="assets/039_live_event_250_ur.png" alt="039_live_event_250_ur"><br lang="ja">雨はずっと</td>
      <td><img src="assets/040_live_event_250_ssr.png" alt="040_live_event_250_ssr"><br lang="ja">買い出しよりも</td>
    </tr>
    <tr>
      <td><img src="assets/banner_memorial_event253.png" alt="banner_memorial_event253"><br>live_event_253</td>
      <td></td>
      <td><img src="assets/037_live_event_253_ur.png" alt="037_live_event_253_ur"><br lang="ja">お花見の記念に！</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td><img src="assets/banner_memorial_event277.png" alt="banner_memorial_event277"><br>live_event_277</td>
      <td></td>
      <td><img src="assets/037_live_event_277_sr.png" alt="037_live_event_277_sr"><br lang="ja">注文、いつもの</td>
      <td></td>
      <td></td>
      <td><img src="assets/040_live_event_277_ur.png" alt="040_live_event_277_ur"><br lang="ja">お待たせいたしました</td>
    </tr>
    <tr>
      <td>birthday_2024</td>
      <td><img src="assets/036_birthday_2024_ssr.png" alt="036_birthday_2024_ssr"><br lang="ja">Hopeful birthday！</td>
      <td><img src="assets/037_birthday_2024_ssr.png" alt="037_birthday_2024_ssr"><br lang="ja">Hopeful birthday！</td>
      <td></td>
      <td><img src="assets/039_birthday_2024_ssr.png" alt="039_birthday_2024_ssr"><br lang="ja">Hopeful birthday！</td>
      <td><img src="assets/040_birthday_2024_ssr.png" alt="040_birthday_2024_ssr"><br lang="ja">Hopeful birthday！</td>
    </tr>
    <tr>
      <td>dream_festival_3</td>
      <td><img src="assets/036_dream_festival_3_ur.png" alt="036_dream_festival_3_ur"><br lang="ja">迷い星、ひとつ</td>
      <td></td>
      <td><img src="assets/038_dream_festival_3_ur.png" alt="038_dream_festival_3_ur"><br lang="ja">帰り道、雪舞う中で</td>
      <td><img src="assets/039_dream_festival_3_ur.png" alt="039_dream_festival_3_ur"><br lang="ja">この繋がりの名前は</td>
      <td></td>
    </tr>
    <tr>
      <td>collabo_d_3</td>
      <td><img src="assets/036_collabo_d_3_ur.png" alt="036_collabo_d_3_ur"><br lang="ja">のんびりダイアログ</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>其他常服</td>
      <td>和服</td>
      <td></td>
      <td></td>
      <td></td>
      <td>RiNG制服、羽泽咖啡店制服</td>
    </tr>
  </tbody>
</table>

## 使用

使用`jsdelivr`引入，只需在html页面的`head`或`body`中添加一行代码即可：

```html
<script src="https://cdn.jsdelivr.net/gh/panxuc/live2d-api-mygo@v0.1.0/autoload.js"></script>
```

默认情况下，只在浏览器宽度大于768px时显示模型，以防止模型对手机端网页阅读造成不便；模型默认显示在左下角。你也可以通过URL传递参数修改这个配置：

```html
<script src="https://cdn.jsdelivr.net/gh/panxuc/live2d-api-mygo@v0.1.0/autoload.js?width_limit=0&position=right"></script>
```

- `width_limit`：宽度限制，单位为像素，当浏览器宽度大于此值时显示模型，默认为768。
- `position`：模型位置，可选值为`left`和`right`，默认为`left`。

也可以下载js和css文件来进行自定义配置，详细请参考[live2d-widget配置](https://github.com/stevenjoezhang/live2d-widget#%E9%85%8D%E7%BD%AE-configuration)。

## TODO

- [x] 添加更多模型。
- [x] 添加更多文本。
- [ ] 添加动作和表情。
