export class DrawIoStyle {
    toString() {
        let asString = "";
        let pairToString = function (key, value) {
            // console.debug("pairToString: ", key, value);
            asString += `${key}=${value};`;
        };
        let convertToStringFormat = function (key, value) {
            return key !== "toString" ? pairToString(key, value) : true;
        };
        Object.entries(this).forEach(([key, value]) => convertToStringFormat(key, value));
        return asString;
    };
}