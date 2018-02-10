export class C4SoftwareSystem {

    constructor(c4StateHandler) {
        this.handler = c4StateHandler;
    }

    create() {
        let c4SoftwareSystem = new mxCell(
            ''
            , new mxGeometry(0, 70, 160, 110), 'rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#1168bd;fontSize=14;font-weight:bold;fontColor=#ffffff;align=center;arcSize=7;strokeColor=#3c7fc0;'
        );
        c4SoftwareSystem.setVertex(true);
        c4SoftwareSystem.setValue(mxUtils.createXmlDocument().createElement('object'));
        c4SoftwareSystem.setAttribute(
            'label'
            , 'name<div>[Software System]</div><div><br></div><div>Beschreibung</div>'
        );
        c4SoftwareSystem.setAttribute('placeholders', '1');
        c4SoftwareSystem.setAttribute('c4Name', 'name');
        c4SoftwareSystem.setAttribute('c4Type', 'SoftwareSystem');
        c4SoftwareSystem.setAttribute('c4Description', 'Beschreibung');
        c4SoftwareSystem.c4 = this;
        return c4SoftwareSystem;
    }

}

// c4Utils.registCodec(C4SoftwareSystem);