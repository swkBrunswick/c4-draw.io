import {C4Notation} from "./C4Notation";
import {C4Style} from "../components/C4Style";

export class C4Component extends C4Notation {

    constructor() {
        let dimension = {
            x: 0,
            y: 70,
            width: 160,
            height: 110
        };
        // let style = 'rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#dae8fc;fontSize=14;font-weight=bold;fontColor=#ffffff;align=center;arcSize=7;strokeColor=#3c7fc0;';
        // console.debug(styleString.toString());
        let label = '<span>name</span><div>[Component:&nbsp;<span>technology</span><span>]</span></div><div><br></div><div>Beschreibung</div>';
        let c4Style = new C4Style();
        c4Style.fillColor = "#438dd5";
        let style = c4Style.toString();
        super('', dimension, style, label);
    }

}