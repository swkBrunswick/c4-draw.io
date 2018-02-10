export class C4Person {

    constructor(c4StateHandler) {
        this.handler = c4StateHandler;
    }

    create() {
        let group = new mxCell(
            ''
            , new mxGeometry(0, 0, 160, 180)
            , 'group;rounded=0;labelBackgroundColor=none;fillColor=none;fontColor=#ffffff;align=center;html=1;'
        );
        group.setVertex(true);
        group.setConnectable(false);
        group.setAttribute('c4Type', 'person');
        group.c4 = this;
        let body = new mxCell(
            ''
            , new mxGeometry(0, 70, 160, 110)
            , 'rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#08427b;fontColor=#ffffff;align=center;arcSize=33;strokeColor=#3c7fc0;'
        );
        body.setParent(group);
        body.setVertex(true);
        body.setValue(mxUtils.createXmlDocument().createElement('object'));
        body.setAttribute('label', 'name<div>[Person]</div><div><br></div><div>Beschreibung</div>');
        body.setAttribute('placeholders', '1');
        body.setAttribute('c4Name', 'name');
        body.setAttribute('c4Type', 'body');
        body.setAttribute('c4Description', 'Beschreibung');
        body.c4 = this;
        var head = new mxCell(
            ''
            , new mxGeometry(40, 0, 80, 80)
            , 'rounded=1;whiteSpace=wrap;html=1;aspect=fixed;labelBackgroundColor=none;fillColor=#08427b;fontSize=14;font-weight:bold;fontColor=#ffffff;align=center;strokeColor=#3c7fc0;ellipse;'
        );
        head.setParent(group);
        head.setVertex(true);
        head.setAttribute('c4Type', 'head');
        head.c4 = this;
        group.insert(head);
        group.insert(body); // child: 0 !!
        return group;
    }

}

// c4Utils.registCodec(C4Person);