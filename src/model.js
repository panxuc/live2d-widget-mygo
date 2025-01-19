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
        this.model = null;
    }

    async loadModelList() {
        const response = await fetch(`${this.cdnPath}model_list.json`);
        this.modelList = await response.json();
    }

    async loadModel(modelId, modelTexturesId, message) {
        if (!this.modelList) await this.loadModelList();
        if (modelId >= this.modelList.models.length) {
            modelId %= this.modelList.models.length;
        }
        if (modelTexturesId >= this.modelList.models[modelId].length) {
            modelTexturesId %= this.modelList.models[modelId].length;
        }
        localStorage.setItem("modelId", modelId);
        localStorage.setItem("modelTexturesId", modelTexturesId);
        console.log(`Live2D 模型 ${modelId}-${modelTexturesId} 开始加载`);
        showMessage(message, 4000, 10);
        const target = this.modelList.models[modelId][modelTexturesId];
        // loadlive2d("live2d", `${this.cdnPath}model/${target}/index.json`);
        this.model = await Live2DModel.from(`${this.cdnPath}model/${target}/index.json`);
        this.app.stage.removeChildren();
        this.app.stage.addChild(this.model);
        this.model.scale.set(0.33);
        fetch(this.waifuPath)
            .then(response => response.json())
            .then(updateMessageArray);
    }

    async loadOtherModel() {
        if (!this.modelList) await this.loadModelList();
        setModelId((getModelId() + 1 >= this.modelList.models.length) ? 0 : getModelId() + 1);
        setModelTexturesId(randomSelection(this.modelList.models[getModelId()].length));
        // setModelTexturesId(0);
        this.loadModel(getModelId(), getModelTexturesId(), this.modelList.messages[getModelId()]);
    }

    async loadOtherTextureModel() {
        if (!this.modelList) await this.loadModelList();
        // setModelTexturesId((getModelTexturesId() + 1 >= this.modelList.models[getModelId()].length) ? 0 : getModelTexturesId() + 1);
        setModelTexturesId(randomSelection(this.modelList.models[getModelId()].length));
        this.loadModel(getModelId(), getModelTexturesId(), this.modelList.messages[getModelId()]);
    }
}

export default Model;
