import {C4Notation} from "./C4Notation";

export class C4Relationship extends C4Notation {

    constructor() {
        let dimension = {
            x: 0,
            y: 0,
            width: 160,
            height: 0
        };
        let style = 'edgeStyle=none;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;strokeColor=#A8A8A8;strokeWidth=2;fontSize=12;font-weight:bold;fontColor=#707070;jumpStyle=none;dashed=1;';
        let label = '<div style="text-align: left"><div style="text-align: center"><b>Beschreibung</b></div><div style="text-align: center">[technology]</div></div>';

        super(dimension, style, label);
    }

    init() {
        super.init();
        this.mxcell.geometry.setTerminalPoint(new mxPoint(0, 0), true);
        this.mxcell.geometry.setTerminalPoint(new mxPoint(160, 0), false);
        this.mxcell.geometry.relative = true;
        this.mxcell.edge = true;
    }

}
