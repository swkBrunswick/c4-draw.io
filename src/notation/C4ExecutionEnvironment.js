import {C4Notation} from "./C4Notation";
import {C4NotationStyleSupplementary} from "../components/C4NotationStyleSupplementary";

export class C4ExecutionEnvironment extends C4Notation {

    constructor() {
        let dimension = {
            x: 0,
            y: 70,
            width: 240,
            height: 230
        };
        let label = '<div style="text-align: left">hostname</div><div style="text-align: left">[operationSystem]</div><div style="text-align: right">scalingFactor</div>';

        let c4Style = new C4NotationStyleSupplementary();
        let style = c4Style.toString();

        super('', dimension, style, label);
    }

    init() {
        super.init();
        this.setAttribute('c4Name', 'hostname');
        this.setAttribute('c4OperationSystem', 'operationSystem');
        this.setAttribute('c4ScalingFactor', 'scalingFactor');
    }

}