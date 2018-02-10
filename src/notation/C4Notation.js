export class C4Notation {
    _dimension = {};
    _mxcell;
    _style;

    get dimension() {
        return this._dimension;
    }

    set dimension(value) {
        if (!value instanceof Object) {
            console.error("can't set dimension. value is not of type object.", value);
        }
        this._dimension = value;
        // this.updateDimension();
    }

    get style() {
        return this._style;
    }

    set style(value) {
        this._style = value;
    }

    get mxcell() {
        return this._mxcell;
    }

    set mxcell(value) {
        this._mxcell = value;
    }

    constructor(dimension, style) {
        this._dimension = dimension;
        this._style = style;
    }

    /*    updateDimension() {
            this._mxcell.getGeometry().setRect(this.dimension.x, this.dimension.y, this.dimension.width, this.dimension.height);
        }*/

    static createMxGeometry(dimension) {
        return new mxGeometry(dimension.x, dimension.y, dimension.width, dimension.height);
    }
}