export class C4Component {
    constructor() {

    }

    create() {
        let c4Component = new mxCell(
            ''
            , new mxGeometry(0, 70, 160, 110)
            , 'rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#dae8fc;fontSize=14;font-weight:bold;fontColor=#ffffff;align=center;arcSize=7;strokeColor=#3c7fc0;'
        );
        c4Component.setVertex(true);
        c4Component.setValue(mxUtils.createXmlDocument().createElement('object'));
        c4Component.setAttribute(
            'label'
            , '<span>name</span><div>[Component:&nbsp;<span>technology</span><span>]</span></div><div><br></div><div>Beschreibung</div>'
        );
        c4Component.setAttribute('placeholders', '1');
        c4Component.setAttribute('c4Name', 'name');
        c4Component.setAttribute('c4Type', 'Component');
        c4Component.setAttribute('c4Technology', 'technology');
        c4Component.setAttribute('c4Description', 'Beschreibung');
        c4Component.c4 = this; //-> new c4.handler();... new C4statehandler();
        return c4Component;
    }

}