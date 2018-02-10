export class C4Container {

    constructor(c4StateHandler) {
        this.handler = c4StateHandler;
    }

    create() {
        let c4Container = new mxCell(
            ''
            , new mxGeometry(0, 70, 160, 110)
            , 'rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#438dd5;fontSize=14;font-weight:bold;fontColor=#ffffff;align=center;arcSize=6;strokeColor=#3c7fc0;'
        );
        c4Container.setVertex(true);
        c4Container.setValue(mxUtils.createXmlDocument().createElement('object'));
        c4Container.setAttribute(
            'label'
            , '<span>name</span><div>[Container:&nbsp;<span>technology</span><span>]</span></div><div><br></div><div>Beschreibung</div>'
        );
        c4Container.setAttribute('placeholders', '1');
        c4Container.setAttribute('c4Name', 'name');
        c4Container.setAttribute('c4Type', 'Container');
        c4Container.setAttribute('c4Technology', 'technology');
        c4Container.setAttribute('c4Description', 'Beschreibung');
        c4Container.c4 = this;
        return c4Container;
    }

}

// c4Utils.registCodec(C4Container);