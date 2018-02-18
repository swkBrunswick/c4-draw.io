import {C4Notation} from "./C4Notation";
import {C4ComponentStyle} from "./C4ComponentStyle";

export class C4Component extends C4Notation {

    constructor() {
        let dimension = {
            x: 0,
            y: 70,
            width: 160,
            height: 110
        };
        let label = '<span>%c4Name%</span><div>[%c4Type%:&nbsp;<span>%c4Technology%</span><span>]</span></div><div><br></div><div>%c4Description%</div>';
        let c4Style = new C4ComponentStyle();
        super('', dimension, c4Style.toString(), label);
    }

}