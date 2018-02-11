import {C4Notation} from "./C4Notation";

export class C4SoftwareSystem extends C4Notation {

    constructor() {
        let dimension = {
            x: 0,
            y: 70,
            width: 160,
            height: 110
        };
        let style = 'rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#1168bd;fontSize=14;font-weight:bold;fontColor=#ffffff;align=center;arcSize=7;strokeColor=#3c7fc0;';
        let label = 'name<div>[Software System]</div><div><br></div><div>Beschreibung</div>';

        super(dimension, style, label);
    }

}