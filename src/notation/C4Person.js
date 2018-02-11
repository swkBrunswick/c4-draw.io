import {C4Notation} from "./C4Notation";
import {C4utils} from "../utilities/C4utils";

export class C4Person extends C4Notation {

    constructor() {
        let dimension = {
            x: 0,
            y: 0,
            width: 160,
            height: 180
        };
        let style = '';
        let label = '';

        super(dimension, style, label);
    }

    init() {
        let group = new mxCell('', C4utils.createMxGeometry(this.dimension), 'group;rounded=0;labelBackgroundColor=none;fillColor=none;fontColor=#ffffff;align=center;html=1;');
        group.setVertex(true);
        group.setConnectable(false);
        group.setAttribute('c4Type', this.constructor.name);
        group.c4 = true;

        let body = new mxCell('', C4utils.createMxGeometry({
            x: 0,
            y: 70,
            width: 160,
            height: 110
        }), "rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#08427b;fontColor=#ffffff;align=center;arcSize=33;strokeColor=#3c7fc0;");

        body.setParent(group);
        body.setVertex(true);
        body.setValue(mxUtils.createXmlDocument().createElement('object'));

        body.setAttribute('label', "name<div>[Person]</div><div><br></div><div>Beschreibung</div>");
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

        head.setParent(group);
        head.setVertex(true);
        head.setAttribute('c4Type', 'head');
        head.c4 = true;

        group.insert(head);
        group.insert(body); // child: 0 !!

        this.mxcell = group;
    }

}