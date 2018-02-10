export class C4Database {

    constructor(c4StateHandler) {
        this.handler = c4StateHandler;
    }

    create() {
        let c4Database = new mxCell(
            ''
            , new mxGeometry(0, 70, 160, 140)
            , 'shape=cylinder;whiteSpace=wrap;html=1;boundedLbl=1;rounded=0;labelBackgroundColor=none;fontSize=14;font-weight:bold;fillColor=#dae8fc;fontColor=#ffffff;align=center;strokeColor=#3c7fc0;'
        );
        c4Database.setVertex(true);
        c4Database.setValue(mxUtils.createXmlDocument().createElement('object'));
        c4Database.setAttribute(
            'label'
            , '<span>Database</span><div>[Container:&nbsp;technology]</div><div><br></div><div>Beschreibung</div>'
        );
        c4Database.setAttribute('placeholders', '1');
        c4Database.setAttribute('c4Type', 'Database');
        c4Database.setAttribute('c4Technology', 'technology');
        c4Database.setAttribute('c4Description', 'Beschreibung');
        c4Database.c4 = this;
        return c4Database;
    }

}

// c4Utils.registCodec(C4Database);
