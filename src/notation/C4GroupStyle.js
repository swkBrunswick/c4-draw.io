import {DrawIoStyle} from "./DrawIoStyle";

export class C4GroupStyle extends DrawIoStyle {
    rounded = 0;
    fillColor = "none";
    labelBackgroundColor = "none";
    fontColor = "#ffffff";
    align = "center";
    html = 1;


    toString() {
        let style = super.toString();
        style += "group;";
        return style;
    }
}