export class C4Relationship {

    create() {
        let label = '<div style="text-align: left"><div style="text-align: center"><b>Beschreibung</b></div><div style="text-align: center">[technology]</div></div>';
        let cell = new mxCell(
            ''
            , new mxGeometry(0, 0, 160, 0)
            , 'edgeStyle=none;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;strokeColor=#A8A8A8;strokeWidth=2;fontSize=12;font-weight:bold;fontColor=#707070;jumpStyle=none;dashed=1;'
        );
        cell.setValue(mxUtils.createXmlDocument().createElement('object'));
        cell.geometry.setTerminalPoint(new mxPoint(0, 0), true);
        cell.geometry.setTerminalPoint(new mxPoint(160, 0), false);
        cell.geometry.relative = true;
        cell.edge = true;
        cell.value.setAttribute('label', label);
        cell.value.setAttribute('c4Type', 'Relationship');
        cell.value.setAttribute('c4Description', 'Beschreibung');
        cell.value.setAttribute('c4Technology', 'technology');
        cell.c4 = this;
        return cell;
    }

}

// c4Utils.registCodec(C4Relationship);