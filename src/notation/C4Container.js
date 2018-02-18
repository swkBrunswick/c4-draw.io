import {C4Notation} from "./C4Notation";
import {C4Style} from "../components/C4Style";

export class C4Container extends C4Notation {

    constructor() {
        let dimension = {
            x: 0,
            y: 70,
            width: 160,
            height: 110
        };
        let label = '<span>name</span><div>[Container:&nbsp;<span>technology</span><span>]</span></div><div><br></div><div>Beschreibung</div>';

        let c4Style = new C4Style();
        c4Style.fillColor = "#438dd5";
        c4Style.arcSize = 6;

        let style = c4Style.toString();
        super('', dimension, style, label);
    }

}