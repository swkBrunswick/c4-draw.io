export class C4utils {

    static createMxGeometry(dimension) {
        return new mxGeometry(dimension.x, dimension.y, dimension.width, dimension.height);
    }

    static isC4(cell) {
        return (cell && cell.hasOwnProperty('c4') && (cell.c4 !== null));
    }

    static isC4Model(cell) {
        return (C4utils.isC4(cell) && cell && cell.hasOwnProperty('value') && (cell.value && cell.value.hasAttribute('c4Type')));
    }

    static isC4Person(cell) {
        return (C4utils.isC4(cell) && (cell.hasOwnProperty('value') && cell.value.length === 0) &&
            cell.getChildCount() === 2 && cell.getChildAt(0).value.getAttribute('c4Type') === 'body');
    }

    static isC4SoftwareSystem(cell) {
        return (C4utils.isC4(cell) && cell.getAttribute('c4Type') === 'SoftwareSystem');
    }

    static isC4Relationship(cell) {
        return (C4utils.isC4(cell) && cell.getAttribute('c4Type') === 'Relationship');
    }

    static createSettingsIcon() {
        let img = mxUtils.createImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAACpklEQVRIS7VVMU9TURg9nWiZoF0k1MQmlKCREhhowUHaScpWdYHoINUORoKTiT+AhMnE6IDigraL2g10amGhxaFGMJHQJiWxBJcWJl6Zas4H9/leH4VKwl2a13vv+c73nfN911ar1Wq4oGVrBpzxq9VDnYLd3gKbzXYmpabAs2s5bBWKCAwOIPstJ7/dXs/5wNMrGfh6e+BytgvA4pcU3J0d6PNdRWp5FZpWxdhoSPbKlT2sb2wieHPIEszC/H08iQNNQ6m0i1DwBhwOu4BPP3kgwUo7u+CZ4MiwBMlkc3C52tDqcODeRMQUwAROVvlCEbHohFz8mFyUw2SpsuA3A/AsAblHAnPzcXi7PAiNDOsBTOBMce5tAk+nJuWCceUL2/qnt+uKaY9EXrx8h9jDcRMJS1nIqFLZx51IWAB+rP+SsjB11p2sy+V9YUwNuD4ll+B0tplY838LuHLG/YnbOnA9I5WhCrAQ/4zuLg8C/gFrzenjjZ+bKO38QWYtp4s3M/vakqq6rQI8f/ZYHPNmPoE+3zW4Oy+h93qP9IEwV+Ixutfrkbpt5YtIr6yKuI0W60z29DwD5PNF6Ye7kTHRTAf/Xdo1NQbB6Rzl55MCUAs6xNhQvHfZ3WEGpyhkTSecm3lhW9jTDDpz1pxdRifQHUrA/6k5LUz30FHsbr3mxpTr3bL0NYVHUbN/lYDhW0d2PNUtRvDGPm+XWlKbcnnP5POmwE/rUAqlVv1EpNtmZl9hemqycYcezZZtxKLjMlsoMld4NGiZLenljIj2b7YkxAwNZwuBmKKmHUrqAX8/WtVUPGZF0Rc+JBEaGcKBVkV27TtcrnY4HC1gVxvXiY8FM6BQzcxzBmPJjIxVgKZfIpaLs4Nu8g/2n/8lqu/GC31DGw6XMzb+An4I4cvYKbPGAAAAAElFTkSuQmCC');
        img.setAttribute('title', 'Settings');
        img.style.cursor = 'pointer';
        img.style.width = '16px';
        img.style.height = '16px';
        return img;
    }

    static registCodec(func) {
        let codec = new mxObjectCodec(func);
        codec.encode = function (enc, obj) {
            try {
                var data = enc.document.createElement(func.name);
            } catch (e) {
                (window.console && console.error(e));
            }
            return data
        };
        codec.decode = function (dec, node, into) {
            return func;
        };
        mxCodecRegistry.register(codec);
    }

}