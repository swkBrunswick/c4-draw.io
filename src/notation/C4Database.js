import {C4Notation} from "./C4Notation";
import {C4Style} from "../components/C4Style";

export class C4Database extends C4Notation {

    constructor() {
        let dimension = {
            x: 0,
            y: 70,
            width: 160,
            height: 140
        };
        // let style = 'shape=cylinder;whiteSpace=wrap;html=1;boundedLbl=1;rounded=0;labelBackgroundColor=none;fontSize=14;font-weight:bold;fillColor=#dae8fc;fontColor=#ffffff;align=center;strokeColor=#3c7fc0;';
        let label = '<span>Database</span><div>[Container:&nbsp;technology]</div><div><br></div><div>Beschreibung</div>';

        let c4Style = new C4Style();
        c4Style.fillColor = "#438dd5";
        c4Style.shape = "cylinder";
        c4Style.boundedLbl = 1;
        c4Style.rounded = 0;
        let style = c4Style.toString();

        super('', dimension, style, label);
    }

}