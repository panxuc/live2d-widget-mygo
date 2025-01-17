import { getModelId, setModelId, getModelTexturesId, setModelTexturesId, resetModelState } from "./config.js";
import showMessage from "./message.js";

class Model {
    constructor(config) {
        let { apiPath, cdnPath } = config;
        this.cdnPath = cdnPath;
    }

    async loadModelList() {
        const response = await fetch(`${this.cdnPath}model_list.json`);
        this.modelList = await response.json();
    }

    async loadModel(modelId, modelTexturesId, message) {
        localStorage.setItem("modelId", modelId);
        localStorage.setItem("modelTexturesId", modelTexturesId);
        console.log(`Live2D 模型 ${modelId}-${modelTexturesId} 开始加载`);
        showMessage(message, 4000, 10);
        if (!this.modelList) await this.loadModelList();
        const target = this.modelList.models[modelId][modelTexturesId];
        loadlive2d("live2d", `${this.cdnPath}model/${target}/model.json`);
    }

    async loadOtherModel() {
        if (!this.modelList) await this.loadModelList();
        setModelId((getModelId() + 1 >= this.modelList.models.length) ? 0 : getModelId() + 1);
        // setModelTexturesId(0);
        this.loadModel(getModelId(), getModelTexturesId(), this.modelList.messages[getModelId()]);
    }

    async loadOtherTextureModel() {
        if (!this.modelList) await this.loadModelList();
        setModelTexturesId((getModelTexturesId() + 1 >= this.modelList.models[getModelId()].length) ? 0 : getModelTexturesId() + 1);
        this.loadModel(getModelId(), getModelTexturesId(), this.modelList.messages[getModelId()]);
    }
}

export default Model;
