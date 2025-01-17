let modelId = parseInt(localStorage.getItem("modelId") || "0", 10);
let modelTexturesId = parseInt(localStorage.getItem("modelTexturesId") || "0", 10);

console.log("modelId", modelId);
console.log("modelTexturesId", modelTexturesId);

export function getModelId() {
    if (modelId === null | modelId === undefined | modelId === NaN) {
        resetModelState();
    }
    return modelId;
}

export function setModelId(newModelId) {
    modelId = newModelId;
    localStorage.setItem("modelId", newModelId.toString());
}

export function getModelTexturesId() {
    if (modelTexturesId === null | modelTexturesId === undefined | modelTexturesId === NaN) {
        resetModelState();
    }
    return modelTexturesId;
}

export function setModelTexturesId(newModelTexturesId) {
    modelTexturesId = newModelTexturesId;
    localStorage.setItem("modelTexturesId", newModelTexturesId.toString());
}

export function resetModelState() {
    modelId = 0;
    modelTexturesId = 0;
    localStorage.setItem("modelId", "0");
    localStorage.setItem("modelTexturesId", "0");
}
