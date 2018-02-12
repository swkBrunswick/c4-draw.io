Draw.loadPlugin(function (ui) {

    // Adds resource for action
    mxResources.parse('myInsertText=Insert text element');
    mxResources.parse('myInsertEllipse=Insert ellipse');

    ui.actions.addAction('myInsertEllipse', function () {
        let e = ui.editor.graph;
        if (e.isEnabled() && !e.isCellLocked(e.getDefaultParent())) {
            let b = e.getInsertPoint();
            b = new mxCell("",
                new mxGeometry(b.x, b.y, 80, 80),
                "ellipse;whiteSpace=wrap;html=1;");

            b.vertex = !0;
            e.setSelectionCell(e.addCell(b))
        }
    }, null, null, "Ctrl+Shift+Q");

    ui.keyHandler.bindAction(81, !0, "myInsertEllipse", !0);

    ui.actions.addAction('myInsertText', function () {
        let e = ui.editor.graph;
        if (e.isEnabled() && !e.isCellLocked(e.getDefaultParent())) {
            let b = e.getInsertPoint();
            b = new mxCell("",
                new mxGeometry(b.x, b.y, 150, 100),
                "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;overflow=auto");

            b.vertex = !0;
            e.setSelectionCell(e.addCell(b))
        }
    }, null, null, "Ctrl+Shift+T");

    ui.keyHandler.bindAction(84, !0, "myInsertText", !0);
});