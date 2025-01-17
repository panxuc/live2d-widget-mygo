function randomSelection(obj) {
    if (Array.isArray(obj)) {
        return obj[Math.floor(Math.random() * obj.length)];
    } else if (typeof obj === 'number') {
        return Math.floor(Math.random() * obj);
    } else {
        return obj;
    }
}

export default randomSelection;
