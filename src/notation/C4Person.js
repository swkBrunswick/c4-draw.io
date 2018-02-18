import {C4Notation} from "./C4Notation";
import {C4utils} from "../utilities/C4utils";
import {C4NotationStyleAbstraction} from "../components/C4NotationStyleAbstraction";

export class C4Person extends C4Notation {

    constructor() {
        let dimension = {
            x: 0,
            y: 0,
            width: 160,
            height: 180
        };
        // let style = 'group;rounded=0;labelBackgroundColor=none;fillColor=none;fontColor=#ffffff;align=center;html=1;';
        let label = 'name<div>[Person]</div><div><br></div><div>Beschreibung</div>';

        let c4Style = new C4NotationStyleAbstraction();
        c4Style.fillColor = "#438dd5";
        let style = c4Style.toString();

        super('', dimension, style, label);
    }

    init() {
        this.setVertex(true);
        this.setConnectable(false);
        this.setAttribute('c4Type', this.constructor.name);
        this.c4 = true;

        let body = new mxCell('', C4utils.createMxGeometry({
            x: 0,
            y: 70,
            width: 160,
            height: 110
        }), "rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#08427b;fontColor=#ffffff;align=center;arcSize=33;strokeColor=#3c7fc0;");

        body.setParent(this);
        body.setVertex(true);
        body.setValue(mxUtils.createXmlDocument().createElement('object'));

        body.setAttribute('label', this.label);
        body.setAttribute('placeholders', '1');
        body.setAttribute('c4Name', 'name');
        body.setAttribute('c4Type', 'body');
        body.setAttribute('c4Description', 'Beschreibung');


        let head = new mxCell('', C4utils.createMxGeometry({
            x: 40,
            y: 0,
            width: 80,
            height: 80
        }), "rounded=1;whiteSpace=wrap;html=1;aspect=fixed;labelBackgroundColor=none;fillColor=#08427b;fontSize=14;font-weight:bold;fontColor=#ffffff;align=center;strokeColor=#3c7fc0;ellipse;");

        head.setParent(this);
        head.setVertex(true);
        head.setAttribute('c4Type', 'head');
        head.c4 = true;

        this.insert(head);
        this.insert(body); // child: 0 !!
    }

}