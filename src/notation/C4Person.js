import {C4Notation} from "./C4Notation";
import {C4utils} from "../utilities/C4utils";
import {C4GroupStyle} from "./C4GroupStyle";
import {C4PersonHeadStyle} from "./C4PersonHeadStyle";
import {C4PersonBodyStyle} from "./C4PersonBodyStyle";

export class C4Person extends C4Notation {

    constructor() {
        let dimension = {
            x: 0,
            y: 0,
            width: 160,
            height: 180
        };
        let label = '%c4Name%<div>[%c4Type%]</div><div><br></div><div>%c4Description%</div>';
        let c4Style = new C4GroupStyle();
        super('', dimension, c4Style.toString(), label);
    }

    init() {
        this.setVertex(true);
        this.setConnectable(false);
        this.setAttribute('c4Type', this.constructor.name);
        this.c4 = true;

        let c4PersonBodyStyle = new C4PersonHeadStyle();
        let body = new mxCell('', C4utils.createMxGeometry({
            x: 0,
            y: 70,
            width: 160,
            height: 110
        }), c4PersonBodyStyle.toString());

        body.setParent(this);
        body.setVertex(true);
        body.setValue(mxUtils.createXmlDocument().createElement('object'));

        body.setAttribute('label', this.label);
        body.setAttribute('placeholders', '1');
        body.setAttribute('c4Name', 'name');
        body.setAttribute('c4Type', 'body');
        body.setAttribute('c4Description', 'Beschreibung');

        let c4PersonHeadStyle = new C4PersonBodyStyle();
        let head = new mxCell('', C4utils.createMxGeometry({
            x: 40,
            y: 0,
            width: 80,
            height: 80
        }), c4PersonHeadStyle.toString());

        head.setParent(this);
        head.setVertex(true);
        head.setAttribute('c4Type', 'head');
        head.c4 = true;

        this.insert(head);
        this.insert(body); // child: 0 !!
    }

}