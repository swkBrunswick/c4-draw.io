import {C4Notation} from "./C4Notation";

export class C4Component extends C4Notation {

    constructor() {
        super({
            x: 0,
            y: 70,
            width: 160,
            height: 110
        }, 'rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#dae8fc;fontSize=14;font-weight:bold;fontColor=#ffffff;align=center;arcSize=7;strokeColor=#3c7fc0;');
    }

    getMxCell() {
        let cell = new mxCell(
            ''
            , C4Notation.createMxGeometry(this.dimension)
            , this.style
        );
        cell.setVertex(true);
        cell.setValue(mxUtils.createXmlDocument().createElement('object'));
        cell.setAttribute(
            'label'
            , '<span>name</span><div>[Component:&nbsp;<span>technology</span><span>]</span></div><div><br></div><div>Beschreibung</div>'
        );
        cell.setAttribute('placeholders', '1');
        cell.setAttribute('c4Name', 'name');
        cell.setAttribute('c4Type', 'Component');
        cell.setAttribute('c4Technology', 'technology');
        cell.setAttribute('c4Description', 'Beschreibung');
        cell.c4 = this; //-> new c4.handler();... new C4statehandler();
        return cell;
    }

}