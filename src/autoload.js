// 加载 URL 参数
const currentScriptSrc = document.currentScript.src;
const live2d_path = currentScriptSrc.substring(0, currentScriptSrc.lastIndexOf('/') + 1);
const params = new URL(currentScriptSrc).searchParams;
const live2dConfig = {
  width_limit: params.get('width_limit') || 768,
  position: ['left', 'right'].includes(params.get('position')) ? params.get('position') : 'left',
  preload: ['ALL', 'IDLE', 'NONE'].includes(params.get('preload')) ? params.get('preload') : 'IDLE',
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

// 加载 waifu.css live2d.min.js index.js
if (screen.width >= live2dConfig.width_limit) {
  Promise.all([
    loadExternalResource(live2d_path + 'waifu.css', 'css'),
    loadExternalResource(live2d_path + 'live2d.min.js', 'js'),
    // loadExternalResource(live2d_path + 'live2dcubismcore.min.js', 'js'),
  ]).then(() => {
    Promise.all([
      loadExternalResource(live2d_path + 'index.js', 'js'),
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
        cdnPath: live2d_path,
        preload: live2dConfig.preload,
        tools: [
          // 'hitokoto',
          'switch-model',
          // 'switch-texture',
          // 'photo',
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
