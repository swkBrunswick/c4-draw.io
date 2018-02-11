import {C4Notation} from "./C4Notation";

export class C4Database extends C4Notation {

    constructor() {
        let dimension = {
            x: 0,
            y: 70,
            width: 160,
            height: 140
        };
        let style = 'shape=cylinder;whiteSpace=wrap;html=1;boundedLbl=1;rounded=0;labelBackgroundColor=none;fontSize=14;font-weight:bold;fillColor=#dae8fc;fontColor=#ffffff;align=center;strokeColor=#3c7fc0;';
        let label = '<span>Database</span><div>[Container:&nbsp;technology]</div><div><br></div><div>Beschreibung</div>';

        super(dimension, style, label);
    }

}