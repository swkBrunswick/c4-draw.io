export class C4NotationEditor {
    _root;
    _ui;
    _cell;
    _graph;
    _value;

    _form;
    _attrs;
    _names;
    _texts;
    _count;

    _applyButton;
    _cancelButton;
    _buttons;
    _placeholderHelpLink = null;

    /**
     * Constructs a new metadata dialog.
     */
    constructor(ui, cell) {
        this._ui = ui;
        this._cell = cell;

        this._root = document.createElement('div');
        this._graph = this._ui.editor.graph;
        // console.debug("Cell.value", this._graph.getModel().getValue(this._cell));
        this._value = C4NotationEditor.getValueConvertedAsXmlNode(this._graph.getModel().getValue(this._cell));
        // console.debug("Cell.value as XML Node", this._value);
        this.createDialogContents();
        this.createTextAreasForCellAttributes();
        this.createButtonAddProperty();
        this.createCancelButton();
        this.createApplyButton();
        this.createButtons();

        this._root.appendChild(this._buttons);
        this.container = this._root;
    }

    createButtons() {
        this._buttons = document.createElement('div');
        this._buttons.style.cssText = 'position:absolute;left:30px;right:30px;text-align:right;bottom:30px;height:40px;';

        if (this.isCellAVertex() || this.isCellAEdge()) {
            let replace = document.createElement('span');
            replace.style.marginRight = '10px';
            let input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
            input.style.marginRight = '6px';

            if (this._value.getAttribute('placeholders') === '1') {
                input.setAttribute('checked', 'checked');
                input.defaultChecked = true;
            }

            mxEvent.addListener(input, 'click', function () {
                if (this._value.getAttribute('placeholders') === '1') {
                    this._value.removeAttribute('placeholders');
                }
                else {
                    this._value.setAttribute('placeholders', '1');
                }
            });

            replace.appendChild(input);
            mxUtils.write(replace, mxResources.get('placeholders'));

            if (this._placeholderHelpLink != null) {
                let link = document.createElement('a');
                link.setAttribute('href', this._placeholderHelpLink);
                link.setAttribute('title', mxResources.get('help'));
                link.setAttribute('target', '_blank');
                link.style.marginLeft = '10px';
                link.style.cursor = 'help';

                let icon = document.createElement('img');
                icon.setAttribute('border', '0');
                icon.setAttribute('valign', 'middle');
                icon.style.marginTop = (mxClient.IS_IE11) ? '0px' : '-4px';
                icon.setAttribute('src', Editor.helpImage);
                link.appendChild(icon);

                replace.appendChild(link);
            }
            this._buttons.appendChild(replace);
        }

        if (this._ui.editor.cancelFirst) {
            this._buttons.appendChild(this._cancelButton);
            this._buttons.appendChild(this._applyButton);
        }
        else {
            this._buttons.appendChild(this._applyButton);
            this._buttons.appendChild(this._cancelButton);
        }
    }

    isCellAEdge() {
        return this._ui.editor.graph.getModel().isEdge(this._cell);
    }

    isCellAVertex() {
        return this._ui.editor.graph.getModel().isVertex(this._cell);
    }

    createButtonAddProperty() {
        let top = document.createElement('div');
        top.style.cssText = 'position:absolute;left:30px;right:30px;overflow-y:auto;top:30px;bottom:80px;';
        top.appendChild(this._form.table);

        let newProp = document.createElement('div');
        newProp.style.whiteSpace = 'nowrap';
        newProp.style.marginTop = '6px';

        let nameInput = document.createElement('input');
        nameInput.setAttribute('placeholder', mxResources.get('enterPropertyName'));
        nameInput.setAttribute('type', 'text');
        nameInput.setAttribute('size', (mxClient.IS_IE || mxClient.IS_IE11) ? '18' : '22');
        nameInput.style.marginLeft = '2px';

        newProp.appendChild(nameInput);
        top.appendChild(newProp);
        this._root.appendChild(top);

        let addPropertyButton = this.addButton('addProperty', function () {
            let name = nameInput.value;
            // Avoid ':' in attribute names which seems to be valid in Chrome
            if (name.length > 0 && name !== 'label' && name !== 'placeholders' && name.indexOf(':') < 0) {
                try {
                    let idx = mxUtils.indexOf(this._names, name);
                    if (idx >= 0 && this._texts[idx] != null) {
                        this._texts[idx].focus();
                    }
                    else {
                        // Checks if the name is valid
                        let clone = value.cloneNode(false);
                        clone.setAttribute(name, '');

                        if (idx >= 0) {
                            this._names.splice(idx, 1);
                            this._texts.splice(idx, 1);
                        }
                        this._names.push(name);
                        let text = this._form.addTextarea(name + ':', '', 2);
                        text.style.width = '100%';
                        this._texts.push(text);
                        this.addRemoveButton(text, name);
                        text.focus();
                    }
                    nameInput.value = '';
                }
                catch (e) {
                    mxUtils.alert(e);
                }
            }
            else {
                mxUtils.alert(mxResources.get('invalidName'));
            }
        });

        // Why?
        // Looks like that init() is called when the Dialog is created
        // init() set the focus to the first input field.
        this.init = function () {
            if (this._texts.length > 0) {
                this._texts[0].focus();
            }
            else {
                nameInput.focus();
            }
        };

        addPropertyButton.setAttribute('disabled', 'disabled');
        addPropertyButton.style.marginLeft = '10px';
        addPropertyButton.style.width = '144px';
        newProp.appendChild(addPropertyButton);

        /**
         * updateAddBtn is fired when a keyUp o. keyDown event happens in the name field for an new property.
         */
        function updateAddBtn() {
            console.debug("updateAddBtn fired..");
            if (nameInput.value.length > 0) {
                addPropertyButton.removeAttribute('disabled');
            }
            else {
                addPropertyButton.setAttribute('disabled', 'disabled');
            }
        }

        mxEvent.addListener(nameInput, 'keyup', updateAddBtn);

        // Catches all changes that don't fire a keyup (such as paste via mouse)
        mxEvent.addListener(nameInput, 'change', updateAddBtn);
    }

    addButton(label, funct, doc) {
        return mxUtils.button(mxResources.get(label), funct.bind(this), doc);
    }

    createApplyButton() {
        this._applyButton = this.addButton('apply', function () {
            try {
                this._ui.hideDialog.apply(this._ui, arguments);
                // Clones and updates the value
                this._value = this._value.cloneNode(true);
                let removeLabel = false;
                for (let i = 0; i < this._names.length; i++) {
                    if (this._texts[i] == null) {
                        this._value.removeAttribute(this._names[i]);
                    }
                    else {
                        this._value.setAttribute(this._names[i], this._texts[i].value);
                        removeLabel = removeLabel || (this._names[i] === 'placeholder' &&
                            this._value.getAttribute('placeholders') === '1');
                    }
                }
                // Removes label if placeholder is assigned
                if (removeLabel) {
                    this._value.removeAttribute('label');
                }
                /*
                let c4value = "";
                for (let i = 0; i < this._names.length; i++) {
                    if (!(this._texts[i] == null)) {
                        console.debug("Attribute: ", this._names[i], this._texts[i].value);
                        c4value = this._names[i] + ": " + this._texts[i].value;
                    }
                }*/
                // Updates the value of the cell (undoable)
                this._graph.getModel().setValue(this._cell, this._value);
            }
            catch (e) {
                mxUtils.alert(e);
            }
        });
        this._applyButton.className = 'geBtn gePrimaryBtn';
    }

    createCancelButton() {
        this._cancelButton = this.addButton('cancel', function () {
            this._ui.hideDialog.apply(this._ui, arguments);
        });
        this._cancelButton.className = 'geBtn';
    }

    createTextAreasForCellAttributes() {
        let attributeList = this.getAttributeList();
        for (let i = 0; i < attributeList.length; i++) {
            this.addAttributeTextArea(attributeList[i].name, attributeList[i].value);
        }
    }

    addAttributeTextArea(attributeName, attributeValue) {
        this.addTextArea(this._count, attributeName, attributeValue);
        if (attributeName === "c4Description") {
            this._texts[this._count].style.minHeight = '120px';
        }
        this._count++;
    }

    /**
     * Creates the dialog contents
     */
    createDialogContents() {
        this._form = new mxForm('properties');
        this._form.table.style.width = '100%';
        this._attrs = this._value.attributes;
        this._names = [];
        this._texts = [];
        this._count = 0;
    }

    getAttributeList() {
        let i;
        let temp = [];
        for (i = 0; i < this._attrs.length; i++) {
            if (this._attrs[i].nodeName !== 'label' && this._attrs[i].nodeName !== 'placeholders') {
                temp.push({name: this._attrs[i].nodeName, value: this._attrs[i].nodeValue});
            }
        }
        // Sorts by name
        let compareFn = function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            else if (a.name > b.name) {
                return 1;
            }
            else {
                return 0;
            }
        };
        temp.sort(compareFn);
        return temp;
    }

    addTextArea(index, name, value) {
        this._names[index] = name;
        this._texts[index] = this._form.addTextarea(this._names[this._count] + ':', value, 2);
        this._texts[index].style.width = '96%';
        // this._texts[index].style.minHeight = '40px';
        this._texts[index].style.padding = '8px';
        this.addRemoveButton(this._texts[index], name);
    }

    addRemoveButton(text, name) {
        let wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.paddingRight = '20px';
        wrapper.style.boxSizing = 'border-box';
        wrapper.style.width = '100%';

        let removeAttr = document.createElement('a');
        let img = mxUtils.createImage(Dialog.prototype.closeImage);
        img.style.height = '9px';
        img.style.fontSize = '9px';
        img.style.marginBottom = (mxClient.IS_IE11) ? '-1px' : '5px';

        removeAttr.className = 'geButton';
        removeAttr.setAttribute('title', mxResources.get('delete'));
        removeAttr.style.position = 'absolute';
        removeAttr.style.top = '4px';
        removeAttr.style.right = '0px';
        removeAttr.style.margin = '0px';
        removeAttr.style.width = '9px';
        removeAttr.style.height = '9px';
        removeAttr.style.cursor = 'pointer';
        removeAttr.appendChild(img);

        let removeAttrFn = (function (name) {
            return function () {
                let count = 0;
                for (let j = 0; j < this._names.length; j++) {
                    if (this._names[j] === name) {
                        this._texts[j] = null;
                        this._form.table.deleteRow(count);
                        break;
                    }
                    if (this._texts[j] != null) {
                        count++;
                    }
                }
            };
        }.bind(this))(name);

        mxEvent.addListener(removeAttr, 'click', removeAttrFn);

        let parent = text.parentNode;
        wrapper.appendChild(text);
        wrapper.appendChild(removeAttr);
        parent.appendChild(wrapper);
    }

    // Converts the value to an XML node
    static getValueConvertedAsXmlNode(value) {
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