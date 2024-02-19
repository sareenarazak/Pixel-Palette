import { LwwMap } from "./lww-map.js";
export class PixelData {
    constructor(id, pixelData) {
        this._id = id;
        this._pixelData = new LwwMap(id, pixelData);
    }

    get value() {
        return this._pixelData.value;
    }

    get state() {
        return this._pixelData.state;
    }

    get pixelData() {
        return this._pixelData;
    }

    getPixelColor(index) {
        // Should I return #FFFFF instead of undefined ?
        if(!this.pixelData.has(index)) return undefined;
        const register = this.pixelData.get(index);
        return register ? register : "#FFFFFF";
    }
    setPixelColor(index, color) {
        this.pixelData.set(index, color);
    }

    merge(pixelData) {
        if (pixelData) {
            this.pixelData.merge(pixelData);
        }
    }

    deletePixel(index) {
        this.pixelData.delete(index);
    }
}
