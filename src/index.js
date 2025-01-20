import * as PIXI from "pixi.js";
import { getModelId, getModelTexturesId, resetModelState, getConfig, setConfig, getMessageArray } from "./config.js";
import Model from "./model.js";
import showMessage from "./message.js";
import randomSelection from "./utils.js";
import tools from "./tools.js";

window.PIXI = PIXI;

function loadWidget() {
    document.body.insertAdjacentHTML("beforeend", `<div id="waifu"><canvas id="live2d" width="800" height="800"></canvas><div id="waifu-tips"></div><div id="waifu-tool"></div></div>`);
    const model = new Model();
    localStorage.removeItem("waifu-display");
    sessionStorage.removeItem("waifu-text");
    // setTimeout(() => {
    //     document.getElementById("waifu").style.bottom = 0;
    // }, 0);

    (function registerTools() {
        tools["switch-model"].callback = () => model.loadOtherModel();
        tools["switch-texture"].callback = () => model.loadOtherTextureModel();
        if (!Array.isArray(getConfig().tools)) {
            getConfig().tools = Object.keys(tools);
        }
        for (let tool of getConfig().tools) {
            if (tools[tool]) {
                const { icon, callback } = tools[tool];
                document.getElementById("waifu-tool").insertAdjacentHTML("beforeend", `<span id="waifu-tool-${tool}">${decodeURIComponent(icon).replace('data:image/svg+xml,', '')}</span>`);
                document.getElementById(`waifu-tool-${tool}`).addEventListener("click", callback);
            }
        }
    })();

    // function welcomeMessage(time) {
    // if (location.pathname === "/") { // 如果是主页
    // }
    // const text = `欢迎阅读<span>「${document.title.split(" - ")[0]}」</span>`;
    // let from;
    // if (document.referrer !== "") {
    //     const referrer = new URL(document.referrer),
    //         domain = referrer.hostname.split(".")[1];
    //     const domains = {
    //         "google": "Google",
    //         "baidu": "百度",
    //         "so": "360搜索",
    //     };
    //     if (location.hostname === referrer.hostname) return text;

    //     if (domain in domains) from = domains[domain];
    //     else from = referrer.hostname;
    //     return `欢迎来自 <span>${from}</span> 的朋友<br>${text}`;
    // }
    // return text;
    // }

    function registerEventListener(result) {
        // 检测用户活动状态，并在空闲时显示消息
        let userAction = false,
            userActionTimer,
            lastHoverElement;
        window.addEventListener("mousemove", () => userAction = true);
        window.addEventListener("keydown", () => userAction = true);
        setInterval(() => {
            if (userAction) {
                userAction = false;
                clearInterval(userActionTimer);
                userActionTimer = null;
            } else if (!userActionTimer) {
                userActionTimer = setInterval(() => {
                    showMessage(model, getMessageArray(), 6000, 9);
                }, 18000);
            }
        }, 1000);
        // showMessage(model, welcomeMessage(result.time), 7000, 11);
        window.addEventListener("mouseover", event => {
            if (event.target.closest("#live2d")) {
                showMessage(model, getMessageArray(), 4000, 9);
                return;
            }
            for (let { selector, text } of result.mouseover) {
                if (!event.target.closest(selector)) continue;
                if (lastHoverElement === selector) return;
                lastHoverElement = selector;
                text = randomSelection(text[getModelId()]);
                text = text.replace("{text}", event.target.innerText);
                showMessage(model, text, 4000, 10);
                return;
            }
        });
        window.addEventListener("click", event => {
            if (event.target.closest("#live2d")) {
                showMessage(model, getMessageArray(), 4000, 9);
                return;
            }
            for (let { selector, text } of result.mouseover) {
                if (!event.target.closest(selector)) continue;
                text = randomSelection(text[getModelId()]);
                text = text.replace("{text}", event.target.innerText);
                showMessage(model, text, 4000, 10);
                return;
            }
        });

        window.addEventListener("resize", () => {
            let threshold = 160;
            let widthDiff = Math.abs(window.outerWidth - window.innerWidth);
            let heightDiff = Math.abs(window.outerHeight - window.innerHeight);
            if (widthDiff > threshold || heightDiff > threshold) {
                showMessage(model, result.message.console[getModelId()], 6000, 9);
            }
        });
        window.addEventListener("copy", () => {
            showMessage(model, result.message.copy[getModelId()], 6000, 9);
        });
        window.addEventListener("visibilitychange", () => {
            if (!document.hidden) showMessage(model, result.message.visibilitychange[getModelId()], 6000, 9);
        });
    }

    (function initModel() {
        if (getModelId() === null) {
            // 首次访问加载 指定模型 的 指定材质
            resetModelState();
        }
        model.loadModel(getModelId(), getModelTexturesId());
        fetch(getConfig().waifuPath)
            .then(response => response.json())
            .then(registerEventListener);
    })();
}

function initWidget(config) {
    setConfig(config);
    document.body.insertAdjacentHTML("beforeend", `<div id="waifu-toggle"><span>Live2D</span></div>`);
    const toggle = document.getElementById("waifu-toggle");
    toggle.addEventListener("click", () => {
        toggle.classList.remove("waifu-toggle-active");
        if (toggle.getAttribute("first-time")) {
            loadWidget();
            toggle.removeAttribute("first-time");
        } else {
            localStorage.removeItem("waifu-display");
            document.getElementById("waifu").style.display = "";
            setTimeout(() => {
                document.getElementById("waifu").style.bottom = 0;
            }, 0);
        }
    });
    if (localStorage.getItem("waifu-display") && Date.now() - localStorage.getItem("waifu-display") <= 86400000) {
        toggle.setAttribute("first-time", true);
        setTimeout(() => {
            toggle.classList.add("waifu-toggle-active");
        }, 0);
    } else {
        loadWidget();
    }
}

export default initWidget;
