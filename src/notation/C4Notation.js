export class C4Notation {
    _dimension = {};
    _mxcell;
    _label;
    _style;

    get dimension() {
        return this._dimension;
    }

    set dimension(value) {
        if (!value instanceof Object) {
            console.error("can't set dimension. value is not of type object.", value);
        }
        this._dimension = value;
        this.updateDimension();
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

    get label() {
        return this._label;
    }

    set label(value) {
        this._label = value;
    }

    constructor(dimension, style, label) {
        this._dimension = dimension;
        this._style = style;
        this._label = label;
        this.init();
    }

    init() {
        this._mxcell = new mxCell('', C4Notation.createMxGeometry(this.dimension), this.style);
        this._mxcell.setVertex(true);
        this._mxcell.setValue(mxUtils.createXmlDocument().createElement('object'));
        this._mxcell.setAttribute('label', this._label);
        this._mxcell.setAttribute('placeholders', '1');
        this._mxcell.setAttribute('c4Name', 'name');
        this._mxcell.setAttribute('c4Type', 'Component');
        this._mxcell.setAttribute('c4Technology', 'technology');
        this._mxcell.setAttribute('c4Description', 'Beschreibung');
        this._mxcell.c4 = true;
    }

    updateDimension() {
        this._mxcell.getGeometry().setRect(this.dimension.x, this.dimension.y, this.dimension.width, this.dimension.height);
    }

    static createMxGeometry(dimension) {
        return new mxGeometry(dimension.x, dimension.y, dimension.width, dimension.height);
    }
}