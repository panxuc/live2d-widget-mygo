let modelId = parseInt(localStorage.getItem("modelId") || "0", 10);
let modelTexturesId = parseInt(localStorage.getItem("modelTexturesId") || "0", 10);
let config = {};
let messageArray = [];

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

export function getConfig() {
    return config;
}

export function setConfig(newConfig) {
    config = newConfig;
}

export function getMessageArray() {
    return messageArray;
}

export function updateMessageArray(result) {
    messageArray = result.message.default[getModelId()];
    result.seasons.forEach(({ date, text }) => {
        const now = new Date(),
            nowMonth = now.getMonth() + 1,
            nowDate = now.getDate(),
            after = date.split("-")[0],
            afterMonth = parseInt(after.split("/")[0]),
            afterDate = parseInt(after.split("/")[1]),
            before = date.split("-")[1] || after,
            beforeMonth = parseInt(before.split("/")[0]),
            beforeDate = parseInt(before.split("/")[1]);
        const isCrossYear = afterMonth > beforeMonth;
        let isInRange = false;
        if (isCrossYear) {
            isInRange =
                (nowMonth > afterMonth || (nowMonth === afterMonth && nowDate >= afterDate)) ||
                (nowMonth < beforeMonth || (nowMonth === beforeMonth && nowDate <= beforeDate));
        } else {
            isInRange =
                (nowMonth > afterMonth || (nowMonth === afterMonth && nowDate >= afterDate)) &&
                (nowMonth < beforeMonth || (nowMonth === beforeMonth && nowDate <= beforeDate));
        }
        if (isInRange) {
            for (let t of text[getModelId()]) {
                messageArray.push(t);
            }
        }
    });
    result.time.forEach(({ hour, text }) => {
        const now = new Date(),
            after = hour.split("-")[0],
            before = hour.split("-")[1] || after;
        if (after <= now.getHours() && now.getHours() <= before) {
            for (let t of text[getModelId()]) {
                messageArray.push(t);
            }
        }
    });
}
