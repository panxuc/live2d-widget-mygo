// 注意：live2d_path 参数应使用绝对路径
const live2d_path = "https://cdn.jsdelivr.net/gh/panxuc/live2d-api-mygo@v0.1.0/";

// const live2d_path = 'http://localhost:11451/';

// 加载 URL 参数
const currentScriptSrc = document.currentScript.src;
const params = new URL(currentScriptSrc).searchParams;
const live2dConfig = {
  width_limit: params.get('width_limit') || 768,
  position: params.get('position') || 'left',
};

// 封装异步加载资源的方法
function loadExternalResource(url, type) {
  return new Promise((resolve, reject) => {
    let tag;
    if (type === 'css') {
      tag = document.createElement('link');
      tag.rel = 'stylesheet';
      tag.href = url;
    } else if (type === 'js') {
      tag = document.createElement('script');
      tag.src = url;
    }
    if (tag) {
      tag.onload = () => resolve(url);
      tag.onerror = () => reject(url);
      document.head.appendChild(tag);
    }
  });
}

// 加载 waifu.css live2d.min.js waifu-tips.js
if (screen.width >= live2dConfig.width_limit) {
  Promise.all([
    loadExternalResource(live2d_path + 'waifu.css', 'css'),
    loadExternalResource(live2d_path + 'live2d.min.js', 'js'),
    // loadExternalResource(live2d_path + 'live2dcubismcore.min.js', 'js'),
  ]).then(() => {
    Promise.all([
      loadExternalResource(live2d_path + 'waifu-tips.js', 'js'),
    ]).then(() => {
      if (live2dConfig.position === 'right') {
        const sheet = Array.from(document.styleSheets).find(
          (s) => s.href && s.href.includes(live2d_path + 'waifu.css')
        );
        if (sheet) {
          try {
            for (let rule of sheet.cssRules) {
              if (rule.style) {
                if (rule.selectorText === '#waifu-toggle') {
                  if (rule.style.left) {
                    rule.style.right = rule.style.left;
                    rule.style.removeProperty('left');
                  }
                  if (rule.style.marginLeft) {
                    rule.style.marginRight = rule.style.marginLeft;
                    rule.style.removeProperty('margin-left');
                  }
                }
                if (rule.selectorText === '#waifu') {
                  if (rule.style.left) {
                    rule.style.right = rule.style.left;
                    rule.style.removeProperty('left');
                  }
                }
                if (rule.selectorText === '#waifu-tips') {
                  if (rule.style.left) {
                    rule.style.right = rule.style.left;
                    rule.style.removeProperty('left');
                  }
                }
                if (rule.selectorText === '#waifu-tool') {
                  if (rule.style.right) {
                    rule.style.left = rule.style.right;
                    rule.style.removeProperty('right');
                  }
                }
              }
            }
          } catch (e) {
            console.warn(e);
          }
        }
      }
      // 配置选项的具体用法见 README.md
      initWidget({
        waifuPath: live2d_path + 'waifu-tips.json',
        cdnPath: live2d_path,

        tools: [
          // 'hitokoto',
          'switch-model',
          'switch-texture',
          'photo',
          'info',
          'quit',
        ],
      });
    });
  });
}

console.log(`
               .::.    .:::::.   :-------.
           .:=-:..-=.:-:    .=:  .::::-:        .      :-.:-:
         :=-:      ==:      .=-.--. .-      .::-==    -:.=:
       :==.       -==       -==-.   .:::. .-. ..-=:.--.--.-:
     .==:       .===-      -==:.- .-:   .--::.  -: -:.-..-    -:
    :=-         ====   :=:   :=:.-=-::=--:     -: - .: :. :.:-
   -=:          .::   :=  .-==:-=:.   =:-:  .--..: :  : :: ..
 .==:                 ==-::--:-=.   .-:  :--:. .     . :  .
.==:                   .:-=: .=-  .:-.        .    ...
-=:                 .:: :-   :====-.                 .
                  ::. .=:      .
                ::   -:
              ::   :-.
             -. .--.
            .===-.
`);
