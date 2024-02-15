import { LWWMap } from "./lww-map";
export class PixelData {
    constructor(id, pixelData) {
        this._id = id;
        this._pixelData = new LWWMap(id, pixelData);
    }
    // get pixelData() {
    //     return this._pixelData;
    // }

    get value() {
        return this._pixelData.value;
    }

    get state() {
        return this._pixelData.state;
    }

    getPixelColor(index) {
        const register = this.pixelData.get(index);
        return register ? register : "#FFFFFF";
    }
    setPixelColor(index, color) {
        this._pixelData.set(index, color);
    }

    delete(index) {
        this._pixelData.delete(index);
    }

    merge(pixelData) {
        if (pixelData) {
            this._pixelData.merge(pixelData);
        }
    }

    deletePixel(index) {
        this.pixelData.delete(index);
    }
}

