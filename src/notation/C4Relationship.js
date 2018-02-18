import {C4Notation} from "./C4Notation";
import {C4RelationshipStyle} from "./C4RelationshipStyle";

export class C4Relationship extends C4Notation {

    constructor() {
        let dimension = {
            x: 0,
            y: 0,
            width: 160,
            height: 0
        };
        let label = '<div style="text-align: left"><div style="text-align: center"><b>%c4Description%</b></div><div style="text-align: center">[%c4Technology%]</div></div>';
        let c4Style = new C4RelationshipStyle();
        super('', dimension, c4Style.toString(), label);
    }

    init() {
        super.init();
        console.debug("C4Relationship.init()");
        this.geometry.setTerminalPoint(new mxPoint(0, 0), true);
        this.geometry.setTerminalPoint(new mxPoint(160, 0), false);
        this.geometry.relative = true;
        this.edge = true;
    }

}
