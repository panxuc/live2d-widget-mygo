// 注意：live2d_path 参数应使用绝对路径
const live2d_path = "https://cdn.jsdelivr.net/gh/panxuc/live2d-api-mygo@main/";

// const live2d_path = 'http://localhost:11451/';

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
if (screen.width >= 768) {
  Promise.all([
    loadExternalResource(live2d_path + 'live2d.min.js', 'js'),
    loadExternalResource(live2d_path + 'waifu-tips.js', 'js'),
  ]).then(() => {
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
