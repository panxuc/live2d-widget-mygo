import * as PIXI from "pixi.js";
import { getModelId, getModelTexturesId, resetModelState, getConfig, setConfig, getMessageArray } from "./config.js";
import Model from "./model.js";
import showMessage from "./message.js";
import randomSelection from "./utils.js";
import tools from "./tools.js";
import modelList from "./modelList.js";
import tips from "./tips.js";

window.PIXI = PIXI;

async function loadWidget() {
    document.body.insertAdjacentHTML("beforeend", `<div id="waifu"><canvas id="live2d" width="800" height="800"></canvas><div id="waifu-tips"></div><div id="waifu-tool"></div><div id="model-selection-panel" style="display: none;"></div><div id="texture-selection-panel" style="display: none;"></div></div>`);
    const model = new Model();
    localStorage.removeItem("waifu-display");
    sessionStorage.removeItem("waifu-text");
    setTimeout(() => {
        document.getElementById("waifu").style.bottom = "-100px";
    }, 0);

    (function registerTools() {
        tools["switch-model"].callback = () => {
            const panel = document.getElementById("model-selection-panel");
            panel.style.display = panel.style.display === "none" ? "block" : "none";
        };
        // tools["switch-texture"].callback = () => {
        //     const panel = document.getElementById("texture-selection-panel");
        //     panel.style.display = panel.style.display === "none" ? "block" : "none";
        // };
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

    let selectedModelIndex = null;

    const modelPanel = document.getElementById("model-selection-panel");
    let modelButtonsHtml = '';
    modelList.forEach((textures, index) => {
        let modelName = textures[0].split('/')[0];
        let defaultTexture = textures.find(texture => texture.includes("_live_default")).split('/')[1];
        modelButtonsHtml += `<button class="model-option" data-model-index="${index}"><img src="${getConfig().cdnPath}assets/${defaultTexture}.png" alt="${modelName}"></button>`;
    });
    modelPanel.innerHTML = modelButtonsHtml;

    modelPanel.addEventListener("click", event => {
        const button = event.target.closest(".model-option");
        if (button) {
            selectedModelIndex = parseInt(button.getAttribute("data-model-index"));
            // Populate the Texture Selection Panel based on the selected model's textures
            populateTexturePanel(model.modelList[selectedModelIndex]);
            modelPanel.style.display = "none";
            document.getElementById("texture-selection-panel").style.display = "block";
        }
    });

    function populateTexturePanel(textures) {
        const texturePanel = document.getElementById("texture-selection-panel");
        let textureButtonsHtml = '';
        textures.forEach((textureStr, index) => {
            let textureName = textureStr.split('/')[1];
            if (textureName.includes("_casual-2023")) {
                textureButtonsHtml += `<button class="texture-option" data-texture-index="${index}">常服</button>`;
            } else if (textureName.includes("_school_winter-2023")) {
                textureButtonsHtml += `<button class="texture-option" data-texture-index="${index}">冬季校服</button>`;
            } else if (textureName.includes("_school_summer-2023")) {
                textureButtonsHtml += `<button class="texture-option" data-texture-index="${index}">夏季校服</button>`;
            } else if (textureName === "036_2024_furisode") {
                textureButtonsHtml += `<button class="texture-option" data-texture-index="${index}">和服</button>`;
            } else if (textureName === "040_arbeit") {
                textureButtonsHtml += `<button class="texture-option" data-texture-index="${index}">RiNG制服</button>`;
            } else if (textureName === "040_event_277_story_01") {
                textureButtonsHtml += `<button class="texture-option" data-texture-index="${index}">羽泽咖啡店制服</button>`;
            } else {
                textureButtonsHtml += `<button class="texture-option" data-texture-index="${index}"><img src="${getConfig().cdnPath}assets/${textureName}.png" alt="${textureName}"></button>`;
            }
        });
        texturePanel.innerHTML = textureButtonsHtml;
    }

    const texturePanel = document.getElementById("texture-selection-panel");
    texturePanel.addEventListener("click", async event => {
        const button = event.target.closest(".texture-option");
        if (button) {
            const selectedTextureIndex = button.getAttribute("data-texture-index");
            await model.loadModel(selectedModelIndex, selectedTextureIndex);
            texturePanel.style.display = "none";
        }
    });

    document.addEventListener("click", event => {
        if (!event.target.closest("#model-selection-panel") &&
            !event.target.closest("#texture-selection-panel") &&
            !event.target.closest("#waifu-tool")) {
            const modelPanel = document.getElementById("model-selection-panel");
            const texturePanel = document.getElementById("texture-selection-panel");
            if (modelPanel) modelPanel.style.display = "none";
            if (texturePanel) texturePanel.style.display = "none";
        }
    });

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
                // text = text.replace("{text}", event.target.innerText);
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
                // text = text.replace("{text}", event.target.innerText);
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

    (async function initModel() {
        if (getModelId() === null) {
            resetModelState();
        }
        await model.loadModel(getModelId(), getModelTexturesId());
        registerEventListener(tips);
    })();

}

async function initWidget(config) {
    setConfig(config);
    document.body.insertAdjacentHTML("beforeend", `<div id="waifu-toggle"><span>Live2D</span></div>`);
    const toggle = document.getElementById("waifu-toggle");
    toggle.addEventListener("click", async () => {
        toggle.classList.remove("waifu-toggle-active");
        if (toggle.getAttribute("first-time")) {
            await loadWidget();
            toggle.removeAttribute("first-time");
        } else {
            localStorage.removeItem("waifu-display");
            document.getElementById("waifu").style.display = "";
            setTimeout(() => {
                document.getElementById("waifu").style.bottom = "-100px";
            }, 0);
        }
    });
    if (localStorage.getItem("waifu-display") && Date.now() - localStorage.getItem("waifu-display") <= 86400000) {
        toggle.setAttribute("first-time", true);
        setTimeout(() => {
            toggle.classList.add("waifu-toggle-active");
        }, 0);
    } else {
        await loadWidget();
    }
}

window.initWidget = initWidget;
