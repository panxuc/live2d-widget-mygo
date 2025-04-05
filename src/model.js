import * as PIXI from "pixi.js";
import { Live2DModel } from 'pixi-live2d-display/cubism2';
import { getModelId, setModelId, getModelTexturesId, setModelTexturesId, getConfig, updateMessageArray } from "./config.js";
import showMessage from "./message.js";
import randomSelection from "./utils.js";

class Model {
    constructor() {
        this.waifuPath = getConfig().waifuPath;
        this.cdnPath = getConfig().cdnPath;
        this.app = new PIXI.Application({
            view: document.getElementById("live2d"),
            autoStart: true,
            width: 800,
            height: 800,
            backgroundAlpha: 0,
        });
    }

    async loadModelList() {
        const response = await fetch(`${this.cdnPath}model_list.json`);
        this.modelList = await response.json();
    }

    async loadWaifuTips() {
        const response = await fetch(this.waifuPath);
        this.waifuTips = await response.json();
    }

    async loadModel(modelId, modelTexturesId, message) {
        if (!this.modelList) await this.loadModelList();
        if (!this.waifuTips) await this.loadWaifuTips();
        if (modelId >= this.modelList.models.length) {
            modelId %= this.modelList.models.length;
        }
        if (modelTexturesId >= this.modelList.models[modelId].length) {
            modelTexturesId %= this.modelList.models[modelId].length;
        }
        setModelId(modelId);
        setModelTexturesId(modelTexturesId);
        console.log(`Live2D Model ${modelId}-${modelTexturesId}`);
        showMessage(this, message, 4000, 10);
        const target = this.modelList.models[modelId][modelTexturesId];
        // loadlive2d("live2d", `${this.cdnPath}model/${target}/index.json`);
        let url = `${this.cdnPath}model/${target}/index.json`;
        this.modelIndex = await fetch(url).then(response => response.json());
        this.modelIndex.url = url;
        if (!this.modelIndex.motions.idle) {
            this.modelIndex.motions.idle = this.modelIndex.motions.idle01;
        }
        if (!this.modelIndex.expressions.find(expression => expression.name === "idle")) {
            this.modelIndex.expressions.push({ name: "idle", file: this.modelIndex.expressions.find(expression => expression.name === "idle01").file });
        }
        this.modelMotions = Object.keys(this.modelIndex.motions);
        this.modelExpressions = this.modelIndex.expressions.map(expression => expression.name);
        this.app.stage.removeChildren();
        this.model = await Live2DModel.from(this.modelIndex, { motionPreload: getConfig().preload });
        this.app.stage.addChild(this.model);
        this.model.scale.set(0.33);
        updateMessageArray(this.waifuTips);
    }
}

export default Model;
