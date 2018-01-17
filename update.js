/**
 * Update plugin. Use updateUrl and updateInterval (optional, default is 60000ms)
 * in the meta data of the diagram to configure the plugin. (Alternatively, the
 * update-url and update-interval URL parameters may be used instead.)
 *
 * It will send the XML of the current page to the given URL as a POST request
 * (with a parameter called xml) and allows for the following type of XML response
 * (with CORS headers):
 *
 * <updates>
 * <update ...>
 * <model>...</model>
 * <view ...>
 * <fit ...>
 * </updates>
 *
 * The outermost updates node may contain an optional url and interval property
 * to change the current updateUrl and updateInterval.
 *
 * Where update must contain an id attribute to reference the cell in the diagram.
 *
 * - An optional value attribute that contains XML markup is used as the value for
 * the cell, with label and tooltip for the label and tooltip, respectively.
 * Additionally, placeholders="1" can be used to enable placeholders in the label
 * or tooltip of the cell.
 *
 * Example: <object label="Hello, %var1%!" var1="World" tooltip=
 *        "Click <a href=\"https://www.draw.io\">here</a>" placeholders="1">
 *
 * - An optional replace-value attribute that contains 1 can be specified to
 * replace the value of the cell. Default is to add the attributes of the XML
 * value specified above to the existing value of the cell. (Attributes with
 * an empty string value are removed.)
 *
 * - An optional style attribute that contains the cell style is used to replace
 * the existing cell style.
 *
 * Example: fillColor=red;gradientColor=white;"
 *
 * - An optional icon attribute that contains JSON is used to add an icon to the
 * given cell. The object value that the icon attribute is parsed and may contain
 * a tooltip (string), align ("left"|"center"|"right", default is "right"), valign
 * (top|middle|bottom, default is bottom) and append (true|false, default is false)
 * for adding or replacing existing icons. The image attribute is an object value
 * with src, width and height for defining the icon to be displayed (default is
 * mxGraph.warningImage). An empty string for the attribute removes all icons.
 *
 * Example: JSON.stringify({tooltip: 'Locked', append: true, image:
 * 		{src: IMAGE_PATH + '/locked.png', width: 26, height:26}}
 *
 * - An optional geometry attribute that contains a JSON mxGeometry object can be used
 * to replace the current geometry of the refenced cell. In addition to the existing
 * field names in mxGeometry, dx and dy can be used to define a vector for moving the
 * shape, and dh and dw can be used to resize the cell.
 *
 * Example: JSON.stringify({dx: (Math.random() * 100) - 50, dh: (Math.random() * 100) - 50}))
 *
 * - Additionally a model node may be specified to set the current graph model.
 *
 * Example: <model><mxGraphModel><root><mxCell id="0"/></mxCell>...</root></mxGraphModel></model>
 *
 * - A view node may be specified with a scale, dx and dy attribute to change the current
 * scale and translate.
 *
 * Example: <view scale="0.5" dx="100" dy="100"/>
 *
 * - A fit node may be specified with a max-scale property to fit the diagram to the
 * available viewport with the specified max-scale.
 */
Draw.loadPlugin(function (editorUi) {

    var graph = editorUi.editor.graph;
    var updateInterval = parseInt(urlParams['update-interval'] || 60000);
    var updateUrlParam = urlParams['update-url'];
    var updateUrl = null;

    if (updateUrlParam !== null) {
        updateUrl = decodeURIComponent(updateUrlParam);

        // Creates empty file if update URL is in URL parameter
        if (editorUi.createFile !== null && editorUi.getCurrentFile() === null) {
            editorUi.createFile(editorUi.defaultFilename, null, null, null, null, null, null, true);
        }
    }

    function createOverlay(desc) {
        var overlay = new mxCellOverlay(desc.image || graph.warningImage,
            desc.tooltip, desc.align, desc.valign, desc.offset);

        // Installs a handler for clicks on the overlay
        overlay.addListener(mxEvent.CLICK, function (sender, evt) {
            editorUi.alert(desc.tooltip);
        });

        return overlay;
    }

    function parseResponse(xml) {
        if (xml !== null && xml.length > 0) {
            var doc = mxUtils.parseXml(xml);
            var node = (doc != null) ? doc.documentElement : null;

            if (node !== null && node.nodeName === 'updates') {
                if (node.hasAttribute('url')) {
                    updateUrl = node.getAttribute('url');
                }

                if (node.hasAttribute('interval')) {
                    updateInterval = node.getAttribute('interval');
                }

                var model = graph.getModel();
                model.beginUpdate();
                var fit = null;

                try {
                    node = node.firstChild;

                    while (node !== null) {
                        if (node.nodeName === 'update') {
                            // Resolves the cell ID
                            var cell = model.getCell(node.getAttribute('id'));

                            if (cell !== null) {
                                // Changes the value
                                try {
                                    var value = node.getAttribute('value');

                                    if (value !== null) {
                                        var valueNode = mxUtils.parseXml(value).documentElement;

                                        if (valueNode !== null) {
                                            if (valueNode.getAttribute('replace-value') === '1') {
                                                model.setValue(cell, valueNode);
                                            }
                                            else {
                                                var attrs = valueNode.attributes;

                                                for (var j = 0; j < attrs.length; j++) {
                                                    graph.setAttributeForCell(cell, attrs[j].nodeName,
                                                        (attrs[j].nodeValue.length > 0) ? attrs[j].nodeValue : null);
                                                }
                                            }
                                        }
                                    }
                                }
                                catch (e) {
                                    console.log('Error in value for ' + cell.id + ': ' + e);
                                }

                                // Changes the style
                                try {
                                    var style = node.getAttribute('style');

                                    if (style !== null) {
                                        graph.model.setStyle(cell, style);
                                    }
                                }
                                catch (e) {
                                    console.log('Error in style for ' + cell.id + ': ' + e);
                                }

                                // Adds or removes an overlay icon
                                try {
                                    var icon = node.getAttribute('icon');

                                    if (icon !== null) {
                                        var desc = (icon.length > 0) ? JSON.parse(icon) : null;

                                        if (desc === null || !desc.append) {
                                            graph.removeCellOverlays(cell);
                                        }

                                        if (desc !== null) {
                                            graph.addCellOverlay(cell, createOverlay(desc));
                                        }
                                    }
                                }
                                catch (e) {
                                    console.log('Error in icon for ' + cell.id + ': ' + e);
                                }

                                // Replaces the geometry
                                try {
                                    var geo = node.getAttribute('geometry');

                                    if (geo !== null) {
                                        geo = JSON.parse(geo);
                                        var curr = graph.getCellGeometry(cell);

                                        if (curr !== null) {
                                            curr = curr.clone();

                                            // Partially overwrites geometry
                                            for (key in geo) {
                                                var val = parseFloat(geo[key]);

                                                if (key === 'dx') {
                                                    curr.x += val;
                                                }
                                                else if (key === 'dy') {
                                                    curr.y += val;
                                                }
                                                else if (key === 'dw') {
                                                    curr.width += val;
                                                }
                                                else if (key === 'dh') {
                                                    curr.height += val;
                                                }
                                                else {
                                                    curr[key] = parseFloat(geo[key]);
                                                }
                                            }

                                            graph.model.setGeometry(cell, curr);
                                        }
                                    }
                                }
                                catch (e) {
                                    console.log('Error in icon for ' + cell.id + ': ' + e);
                                }
                            } // if cell != null
                        } // if node.nodeName == 'update
                        else if (node.nodeName === 'model') {
                            // Finds first child element
                            var dataNode = node.firstChild;

                            while (dataNode !== null && dataNode.nodeType !== mxConstants.NODETYPE_ELEMENT) {
                                dataNode = dataNode.nextSibling;
                            }

                            if (dataNode !== null) {
                                var dec = new mxCodec(node.firstChild);
                                dec.decode(dataNode, model);
                            }
                        }
                        else if (node.nodeName === 'view') {
                            if (node.hasAttribute('scale')) {
                                graph.view.scale = parseFloat(node.getAttribute('scale'));
                            }

                            if (node.hasAttribute('dx') || node.hasAttribute('dy')) {
                                graph.view.translate = new mxPoint(parseFloat(node.getAttribute('dx') || 0),
                                    parseFloat(node.getAttribute('dy') || 0));
                            }
                        }
                        else if (node.nodeName === 'fit') {
                            if (node.hasAttribute('max-scale')) {
                                fit = parseFloat(node.getAttribute('max-scale'));
                            }
                            else {
                                fit = 1;
                            }
                        }

                        node = node.nextSibling;
                    } // end of while
                }
                finally {
                    model.endUpdate();
                }

                if (fit !== null && editorUi.chromelessResize) {
                    editorUi.chromelessResize(true, fit);
                }
            }
        }
    }

    var currentThread = null;

    function scheduleUpdates() {
        var page = editorUi.currentPage;
        var root = editorUi.editor.graph.getModel().getRoot();
        var result = false;

        if (urlParams['update-url'] || (root.value !== null && typeof(root.value) === 'object')) {
            if (root.value !== null && typeof(root.value) === 'object') {
                updateInterval = parseInt(root.value.getAttribute('updateInterval') || updateInterval);
                updateUrl = root.value.getAttribute('updateUrl') || updateUrl;
            }

            if (updateUrl !== null) {
                var currentXml = mxUtils.getXml(editorUi.editor.getGraphXml());

                function doUpdate() {
                    if (updateUrl === 'demo') {
                        parseResponse(mxUtils.getXml(createDemoResponse().documentElement));
                        schedule();
                    }
                    else {
                        mxUtils.post(updateUrl, 'xml=' + encodeURIComponent(currentXml), function (req) {
                            if (page === editorUi.currentPage) {
                                if (req.getStatus() >= 200 && req.getStatus() <= 300) {
                                    parseResponse(mxUtils.getXml(req.getDocumentElement()));
                                    schedule();
                                }
                                else {
                                    editorUi.handleError({
                                        message: mxResources.get('error') + ' ' +
                                        req.getStatus()
                                    });
                                }
                            }
                        }, function (err) {
                            editorUi.handleError(err);
                        });
                    }
                }

                function schedule() {
                    currentThread = window.setTimeout(doUpdate, updateInterval);
                }

                doUpdate();
                result = true;
            }
        }

        return result;
    }

    function startUpdates() {
        var result = scheduleUpdates();

        if (result) {
            editorUi.editor.addListener('pageSelected', function () {
                window.clearTimeout(currentThread);
                scheduleUpdates();
            });
        }

        return result;
    }

    function createDemoResponse() {
        var doc = mxUtils.createXmlDocument();
        var status = doc.createElement('updates');

        for (var id in graph.model.cells) {
            var cell = graph.model.cells[id];

            if (graph.model.isEdge(cell)) {
                // Ignores short edges
                var state = graph.view.getState(cell);

                if (Math.random() > 0.5 && state.length > 50) {
                    var update = doc.createElement('update');
                    update.setAttribute('id', cell.id);
                    update.setAttribute('value', '<object label="%load% minutes" load="' +
                        Math.round(Math.random() * 100) + '" placeholders="1">');
                    update.setAttribute('style', cell.style + ';strokeColor=red;strokeWidth=' +
                        Math.round(Math.random() * 5) + ';');
                    status.appendChild(update);
                }
                else {
                    var update = doc.createElement('update');
                    update.setAttribute('id', cell.id);
                    update.setAttribute('value', '<object label="" load="' +
                        Math.round(Math.random() * 100) + '" placeholders="1">');
                    update.setAttribute('style', cell.style + ';strokeColor=black;strokeWidth=;');
                    status.appendChild(update);
                }
            }
            else if (graph.model.isVertex(cell)) {
                // For the purpose of the demo we flag stuff to update with update="1".
                // This is not needed for the general case.
                if (cell.value !== null && typeof(cell.value) === 'object' &&
                    cell.value.getAttribute('update') === '1') {
                    // Restores original style in demo roundtrip
                    if (cell.prevStyle === null) {
                        cell.prevStyle = cell.style;
                    }

                    if (Math.random() > 0.5) {
                        var update = doc.createElement('update');
                        update.setAttribute('id', cell.id);
                        update.setAttribute('value', '<object tooltip="%load%% Done" load="' +
                            Math.round(Math.random() * 100) + '" placeholders="1">');
                        update.setAttribute('style', cell.prevStyle + ';fillColor=red;gradientColor=white;');
                        update.setAttribute('icon', JSON.stringify({
                            tooltip: 'Alert', align: 'right',
                            valign: 'top', image: {src: 'https://www.draw.io/mxgraph/images/warning.gif', width: 26, height: 26}
                        }));
//							update.setAttribute('geometry', JSON.stringify({dx: (Math.random() * 100) - 50,
//								y: cell.geometry.y + (Math.random() * 100) - 50, dh: (Math.random() * 100) - 50}));
                        status.appendChild(update);

                        // Adds another icon
                        if (Math.random() > 0.5) {
                            var update = doc.createElement('update');
                            update.setAttribute('id', cell.id);
                            update.setAttribute('icon', JSON.stringify({
                                tooltip: 'Busy', append: true,
                                image: {src: IMAGE_PATH + '/spin.gif', width: 26, height: 26}
                            }));
                            status.appendChild(update);
                        }
                    }
                    else {
                        var update = doc.createElement('update');
                        update.setAttribute('id', cell.id);
                        update.setAttribute('style', cell.prevStyle + ';fillColor=#d4e1f5;gradientColor=white;');
                        update.setAttribute('value',
                            '<object tooltip="Click <a href=\"https://www.draw.io\">here</a>">');
                        update.setAttribute('icon', '');
                        status.appendChild(update);
                    }
                }
            }
        }

        doc.appendChild(status);

        return doc;
    }

    // Wait for file to be loaded if no animation data is present
    if (!startUpdates()) {
        editorUi.editor.addListener('fileLoaded', startUpdates);
    }

});
