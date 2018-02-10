/**
 * Draw.io Plugin to create C4 Architecture Diagramms
 *
 * LOAD C4 SHAPE LIBRARY:
 *
 * https://raw.githubusercontent.com/tobiashochguertel/draw-io/master/C4-drawIO.xml
 */
import {C4Component} from "./notation/component";
import {C4utils} from "./utilities/c4utils";
import {C4statehandler} from "./components/C4statehandler";

Draw.loadPlugin(function (ui) {

    let sidebar_id = 'c4';
    let sidebar_title = 'C4 Notation';

    // notations
    let c4Component = new C4Component();
    C4utils.registCodec(c4Component);

    // Adds custom sidebar entry
    ui.sidebar.addPalette(sidebar_id, sidebar_title, true, function (content) {
        // let verticies = [C4Person, C4SoftwareSystem, C4Container, C4Component, C4ExecutionEnvironment, C4DeploymentNode, C4Database];
        /*        let verticies = [c4Component];
                for (let i in verticies) {
                    let cell = verticies[i].prototype.create();
                    content.appendChild(ui.sidebar.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, cell.label));
                }*/
        let c4ComponentVerticy = c4Component.create();
        content.appendChild(
            ui.sidebar.createVertexTemplateFromCells(
                [c4ComponentVerticy],
                c4ComponentVerticy.geometry.width,
                c4ComponentVerticy.geometry.height,
                c4ComponentVerticy.label
            )
        )
        // content.appendChild(ui.sidebar.createEdgeTemplateFromCells([C4Relationship.prototype.create()], 160, 0, 'C4 Relationship'));
        // , C4DynamicRelationship];
    });

    // Add custom handler-code for the event of data-editor instanzing to provide a custom data-editor dialog.
    let origGraphCreateHander = ui.editor.graph.createHandler;
    ui.editor.graph.createHandler = function (state) {
        if (state !== null && (this.getSelectionCells().length === 1) && C4utils.isC4(state.cell) && !C4utils.isC4Relationship(state.cell)) {
            // if (state !== null && (this.getSelectionCells().length === 1) && C4utils.isC4(state.cell) && state.cell.c4.handler && !C4utils.isC4Relationship(state.cell)) {
            return new C4statehandler(state);
            // return new state.cell.c4.handler(state);
        }
        return origGraphCreateHander.apply(this, arguments);
    };

    // START -> CUSTOM EDITOR MENU!
    let origEditDataDialog = EditDataDialog;
    EditDataDialog = function (ui, cell) {
        if (!C4utils.isC4(cell)) {
            return origEditDataDialog.apply(this, arguments);
        }
        let div = document.createElement('div');
        let graph = ui.editor ? ui.editor.graph : ui.graph;
        div.style.height = '100%'; //'310px';
        div.style.overflow = 'auto';
        let value = graph.getModel().getValue(cell);
        // Converts the value to an XML node
        if (!mxUtils.isNode(value)) {
            let obj = mxUtils.createXmlDocument().createElement('object');
            obj.setAttribute('label', value || '');
            value = obj;
        }
        // Creates the dialog contents
        let form = new mxForm('properties');
        form.table.style.width = '100%';
        form.table.style.paddingRight = '20px';
        let colgroupName = document.createElement('colgroup');
        colgroupName.width = '120';
        form.table.insertBefore(colgroupName, form.body);
        let colgroupValue = document.createElement('colgroup');
        form.table.insertBefore(colgroupValue, form.body);
        let attrs = value.attributes;
        let names = [];
        let texts = [];
        let count = 0;
        let addTextArea = function (index, name, value, tabIndex) {
            names[index] = name;
            texts[index] = form.addTextarea(names[count] + ':', value, 2);
            texts[index].style.width = '100%';
            texts[index].tabIndex = tabIndex;
            return texts[index];
        };
        let addText = function (index, name, value, tabIndex) {
            names[index] = name;
            texts[index] = form.addText(names[count] + ':', value);
            texts[index].style.width = '100%';
            texts[index].tabIndex = tabIndex;
            return texts[index];
        };
        let addAttribute = function (index, name, value) {
            names[index] = name;
            texts[index] = document.createElement('textarea');
            texts[index].value = value;
            return texts[index];
        };
        for (let i = 0; i < attrs.length; i++) {
            let nodeName = attrs[i].nodeName;
            let nodeValue = attrs[i].nodeValue;
            // if (cell.awssf.hiddenAttributes && cell.awssf.hiddenAttributes.indexOf(nodeName) >= 0) continue;
            if (nodeName === 'c4Type') {
                let span = document.createElement('span');
                mxUtils.write(span, nodeValue);
                form.addField('c4Type:', span);
            } else if (nodeName === 'label') {
                addAttribute(count, nodeName, nodeValue);
                count++;
                let labelDiv = document.createElement('div');
                labelDiv.setAttribute('style', 'border: 1px dashed #c2c2c2; margin-bottom: 4px;');
                labelDiv.innerHTML = nodeValue;
                div.appendChild(labelDiv);
            }
            else if (nodeName !== 'placeholders') {
                addTextArea(count, nodeName, nodeValue, i);
                count++;
            }
        }
        div.appendChild(form.table);
        this.init = function () {
            function getIndexOfC4Type(c4type) {
                for (let i = 0; i < names.length; i++) {
                    if (names[i] === c4type) { //'c4Name'
                        return i;
                    }
                }
            }

            let firstInputField = -1;
            switch (cell.getAttribute('c4Type')) {
                case 'body':
                case 'SoftwareSystem':
                case 'Container':
                case 'Component':
                case 'ExecutionEnvironment':
                case 'DeploymentNode':
                    firstInputField = getIndexOfC4Type('c4Name');
                    break;
                case 'Relationship':
                    firstInputField = getIndexOfC4Type('c4Description');
                    break;
                case 'DynamicRelationship':
                    firstInputField = getIndexOfC4Type('c4Step');
                    break;
                case 'Database':
                    firstInputField = getIndexOfC4Type('c4Technology');
                    break;
            }
            if (texts.length > 0 && firstInputField !== -1) {
                texts[firstInputField].focus();
            }
        };
        let cancelBtn = mxUtils.button(mxResources.get('cancel'), function () {
            ui.hideDialog.apply(ui, arguments);
        });
        cancelBtn.className = 'geBtn';
        let applyBtn = mxUtils.button(mxResources.get('apply'), function () {
            try {
                ui.hideDialog.apply(ui, arguments);
                // Clones and updates the value
                value = value.cloneNode(true);
                let removeLabel = false;
                let c4NotationUpdate = function () {
                    let c4Name = '';
                    let c4Description = '';
                    let c4Technology = '';
                    let c4OperationSystem = '';
                    let c4Application = '';
                    let c4ScalingFactor = '';
                    let c4Step = 1;
                    let labelIndex = -1;
                    for (let i = 0; i < names.length; i++) {
                        if (names[i] === 'c4Name') {
                            c4Name = texts[i].value;
                        }
                        if (names[i] === 'c4Description') {
                            c4Description = texts[i].value;
                        }
                        if (names[i] === 'c4Technology') {
                            c4Technology = texts[i].value;
                        }
                        if (names[i] === 'c4OperationSystem') {
                            c4OperationSystem = texts[i].value;
                        }
                        if (names[i] === 'c4Application') {
                            c4Application = texts[i].value;
                        }
                        if (names[i] === 'c4ScalingFactor') {
                            c4ScalingFactor = texts[i].value;
                        }
                        if (names[i] === 'c4Step') {
                            c4Step = texts[i].value;
                        }
                        if (names[i] === 'label') {
                            labelIndex = i;
                        }
                    }
                    if (labelIndex >= 0) {
                        switch (cell.getAttribute('c4Type')) {
                            case 'body':
                                texts[labelIndex].value = c4Name + '<div>[Person]</div><div><br></div><div>' + c4Description;
                                break;
                            case 'SoftwareSystem':
                                texts[labelIndex].value = c4Name + '<div>[Software System]</div><div><br></div><div>' + c4Description;
                                break;
                            case 'Container':
                                texts[labelIndex].value = '<span>' + c4Name + '</span><div>[Container:&nbsp;<span>' + c4Technology + '</span><span>]</span></div><div><br></div><div>' + c4Description + '</div>';
                                break;
                            case 'Component':
                                texts[labelIndex].value = '<span>' + c4Name + '</span><div>[Component:&nbsp;<span>' + c4Technology + '</span><span>]</span></div><div><br></div><div>' + c4Description + '</div>';
                                break;
                            case 'Relationship':
                                texts[labelIndex].value = '<div style="text-align: left"><div style="text-align: center"><b>' + c4Description + '</b></div><div style="text-align: center">[' + c4Technology + ']</div></div>';
                                break;
                            case 'ExecutionEnvironment':
                                texts[labelIndex].value = '<div style="text-align: left">' + c4Name + '</div><div style="text-align: left">[' + c4Application + ']</div>';
                                break;
                            case 'DeploymentNode':
                                texts[labelIndex].value = '<div style="text-align: left">' + c4Name + '</div><div style="text-align: left">[' + c4OperationSystem + ']</div><div style="text-align: right">' + c4ScalingFactor + '</div>';
                                break;
                            case 'DynamicRelationship':
                                texts[labelIndex].value = '<bold>' + c4Step + ': </bold><bold>' + c4Description + '</bold>' + '<div>[' + c4Technology + ']</div><div><br></div><div>';
                                break;
                            case 'Database':
                                texts[labelIndex].value = '<span>Database</span><div>[Container:&nbsp;' + c4Technology + ']</div><div><br></div><div>' + c4Description + '</div>';
                                break;
                        }
                    }
                }();
                for (let i = 0; i < names.length; i++) {
                    if (cell.c4 && cell.c4.applyForm) {
                        removeLabel = removeLabel || cell.c4.applyForm(value, names[i], texts[i]);
                    } else {
                        if (texts[i] === null) {
                            value.removeAttribute(names[i]);
                        }
                        else {
                            value.setAttribute(names[i], texts[i].value);
                            removeLabel = removeLabel || (names[i] === 'placeholder' &&
                                value.getAttribute('placeholders') === '1');
                        }
                    }
                }
                // Removes label if placeholder is assigned
                if (removeLabel) {
                    value.removeAttribute('label');
                }
                // Updates the value of the cell (undoable)
                graph.getModel().setValue(cell, value);
            }
            catch (e) {
                mxUtils.alert(e);
            }
        });
        applyBtn.className = 'geBtn gePrimaryBtn';
        applyBtn.tabIndex = 10;
        let buttons = document.createElement('div');
        buttons.style.marginTop = '18px';
        buttons.style.textAlign = 'right';

        if (graph.getModel().isVertex(cell) || graph.getModel().isEdge(cell)) {
            let replace = document.createElement('span');
            replace.style.marginRight = '10px';
            let input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
            input.style.marginRight = '6px';
            if (value.getAttribute('placeholders') === '1') {
                input.setAttribute('checked', 'checked');
                input.defaultChecked = true;
            }
            mxEvent.addListener(input, 'click', function () {
                if (value.getAttribute('placeholders') === '1') {
                    value.removeAttribute('placeholders');
                }
                else {
                    value.setAttribute('placeholders', '1');
                }
            });
            replace.appendChild(input);
            mxUtils.write(replace, mxResources.get('placeholders'));
            if (EditDataDialog.placeholderHelpLink !== null) {
                let createHelpIcon = function () {
                    let link = document.createElement('a');
                    link.setAttribute('href', EditDataDialog.placeholderHelpLink);
                    link.setAttribute('title', mxResources.get('help'));
                    link.setAttribute('target', '_blank');
                    link.style.marginLeft = '10px';
                    link.style.cursor = 'help';
                    let icon = document.createElement('img');
                    icon.setAttribute('border', '0');
                    icon.setAttribute('valign', 'middle');
                    icon.style.marginTop = '-4px';
                    icon.setAttribute('src', Editor.helpImage);
                    link.appendChild(icon);
                    replace.appendChild(link);
                }();
            }
            buttons.appendChild(replace);
        }
        if (ui.editor && ui.editor.cancelFirst) {
            buttons.appendChild(cancelBtn);
            buttons.appendChild(applyBtn);
        }
        else {
            buttons.appendChild(applyBtn);
            buttons.appendChild(cancelBtn);
        }
        div.appendChild(buttons);
        this.container = div;
    }
    ///// END <- CUSTOM EDITOR FORM
});
