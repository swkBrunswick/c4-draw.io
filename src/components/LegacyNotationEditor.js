import {C4Notation} from "../notation/C4Notation";

export class LegacyNotationEditor {
    create() {
        // START -> CUSTOM EDITOR MENU!
        let origEditDataDialog = EditDataDialog;
        EditDataDialog = function (ui, cell) {
            let isC4Notation = cell instanceof C4Notation;
            if (!isC4Notation) {
                return origEditDataDialog.apply(this, arguments);
            }
            let div = LegacyNotationEditor.createPreviewWindow();
            let graph = ui.editor ? ui.editor.graph : ui.graph;
            let value = LegacyNotationEditor.getConvertedValueAsXmlNode(graph, cell);
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

            if (graph.getModel().isCellAVertex(cell) || graph.getModel().isEdge(cell)) {
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
    }

    // Converts the value to an XML node
    static getConvertedValueAsXmlNode(value) {
        if (!mxUtils.isNode(value)) {
            let doc = mxUtils.createXmlDocument();
            let obj = doc.createElement('object');
            obj.setAttribute('label', value || '');
            value = obj;
        }
        return value
    }

    static createPreviewWindow() {
        let div = document.createElement('div');
        div.style.height = '100%'; //'310px';
        div.style.overflow = 'auto';
        return div;
    }

}