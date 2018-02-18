import {C4PersonHeadStyle} from "./C4PersonHeadStyle";

export class C4PersonBodyStyle extends C4PersonHeadStyle {
    fillColor = "#08427b";
    arcSize = 7;
    aspect = "fixed";

    toString() {
        let style = super.toString();
        style += "ellipse;";
        return style;
    }
}