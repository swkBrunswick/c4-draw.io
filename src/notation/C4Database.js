import {C4Notation} from "./C4Notation";
import {C4DatabaseStyle} from "./C4DatabaseStyle";

export class C4Database extends C4Notation {

    constructor() {
        let dimension = {
            x: 0,
            y: 70,
            width: 160,
            height: 140
        };
        let label = '<span>%c4Name%</span><div>[%c4Type%:&nbsp;%c4Technology%]</div><div><br></div><div>%c4Description%</div>';
        let c4Style = new C4DatabaseStyle();
        super('', dimension, c4Style.toString(), label);
    }

}