import {C4Notation} from "./C4Notation";
import {C4AbstractionStyle} from "./C4AbstractionStyle";

export class C4Component extends C4Notation {

    constructor() {
        let dimension = {
            x: 0,
            y: 70,
            width: 160,
            height: 110
        };
        let label = '<span>name</span><div>[Component:&nbsp;<span>technology</span><span>]</span></div><div><br></div><div>Beschreibung</div>';
        let c4Style = new C4AbstractionStyle();
        c4Style.fillColor = "#438dd5";
        let style = c4Style.toString();
        super('', dimension, style, label);
    }

}