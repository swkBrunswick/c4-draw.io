import {C4Notation} from "./C4Notation";

export class C4DeploymentNode extends C4Notation {

    constructor() {
        let dimension = {
            x: 0,
            y: 70,
            width: 240,
            height: 230
        };
        let style = 'rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#ffffff;fontSize=14;font-weight:bold;fontColor=#ffffff;align=left;arcSize=3;strokeColor=#000000;verticalAlign=bottom;';
        let label = '<div style="text-align: left">hostname</div><div style="text-align: left">[operationSystem]</div><div style="text-align: right">scalingFactor</div>';

        super('', dimension, style, label);
    }

    init() {
        super.init();
        this.setAttribute('c4Name', 'hostname');
        this.setAttribute('c4OperationSystem', 'operationSystem');
        this.setAttribute('c4ScalingFactor', 'scalingFactor');
    }

}
