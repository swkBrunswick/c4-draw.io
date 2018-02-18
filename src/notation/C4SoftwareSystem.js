import {C4Notation} from "./C4Notation";
import {C4SoftwareSystemStyle} from "./C4SoftwareSystemStyle";

export class C4SoftwareSystem extends C4Notation {

    constructor() {
        let dimension = {
            x: 0,
            y: 70,
            width: 160,
            height: 110
        };
        let label = 'name<div>[Software System]</div><div><br></div><div>Beschreibung</div>';
        let c4Style = new C4SoftwareSystemStyle();
        super('', dimension, c4Style.toString(), label);
    }

}