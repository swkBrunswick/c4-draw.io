import {C4utils} from "../utilities/C4utils";

export class C4Notation extends mxCell {
    _dimension = {};
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

    get label() {
        return this._label;
    }

    set label(value) {
        this._label = value;
    }

    /**
     * Parameters:
     *
     * value - Optional object that represents the cell value.
     * geometry - Optional <mxGeometry> that specifies the geometry.
     * -- dimension - Optional {x: 0, y: 0, width: 120, heigth: 120} that specifies the geometry.
     * style - Optional formatted string that defines the style.
     *          e.g. "rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#dae8fc;fontSize=14;font-weight:bold;fontColor=#ffffff;align=center;arcSize=7;strokeColor=#3c7fc0;"
     *
     * label - e.g. "<span>name</span><div>[Component:&nbsp;<span>technology</span><span>]</span></div><div><br></div><div>Beschreibung</div>"
     *
     **/
    constructor(value, geometry, style) {
        super(value, (geometry instanceof Object) ? C4utils.createMxGeometry(geometry) : geometry, style);
        this.initDimension(geometry);
        this._style = style;
        if (arguments.length === 4) {
            this._label = arguments[3];
        }
        this.init();
    }

    initDimension(geometry) {
        if (geometry instanceof mxGeometry) {
            this._dimension = {
                x: geometry.getX(),
                y: geometry.getY(),
                width: geometry.getWidth(),
                height: geometry.getHeight()
            };
        }
        if (geometry instanceof Object) {
            this._dimension = geometry;
        }
    }

    init() {
        this.setVertex(true);
        this.setValue(mxUtils.createXmlDocument().createElement('object'));
        this.setAttribute('label', this._label);
        this.setAttribute('placeholders', '1');
        this.setAttribute('c4Name', 'name');
        this.setAttribute('c4Type', this.constructor.name);
        this.setAttribute('c4Technology', 'technology');
        this.setAttribute('c4Description', 'Beschreibung');
        this.c4 = true;
    }

    updateDimension() {
        this.getGeometry().setRect(this.dimension.x, this.dimension.y, this.dimension.width, this.dimension.height);
    }

}