import {C4NotationEditor} from "./C4NotationEditor";

export class C4ModelMenu {
    _ui;
    static _label_c4_notationeditor = 'c4_notationeditor';
    static _label_c4_modelmenu = 'c4_modelmenu';

    static initResources() {
        // Adds resources for actions
        mxResources.parse(C4ModelMenu._label_c4_notationeditor + '=Open C4 Notation Editor');
        mxResources.parse(C4ModelMenu._label_c4_modelmenu + '=C4-Model');
    }

    get ui() {
        return this._ui;
    }

    set ui(ui) {
        this._ui = ui;
    }

    constructor(ui) {
        if (!(ui instanceof EditorUi)) {
            throw Error("parameter ui isn't an instance of EditorUi!");
        }
        this._ui = ui;

        C4ModelMenu.initResources();
        this.init();
    }

    /**
     * addNotationEditor
     *
     *  '>' = . + Shift = 190 + Shift
     *  On MAC OS: Ctrl is also available as CMD!
     *   - http://keycode.info/
     *   - https://www.mediaevent.de/javascript/Extras-Javascript-Keycodes.html
     */
    addNotationEditor() {
        let shortcut = mxClient.IS_MAC ? "CMD+Shift+>" : "Ctrl+Shift+>";
        this.ui.actions.addAction(C4ModelMenu._label_c4_notationeditor, function () {
            let ui = this._ui;
            let notationEditor = new C4NotationEditor(ui, ui.editor.graph.getSelectionCell());
            ui.showDialog(notationEditor.container, 480, 480, true, false, null, false);
            notationEditor.init();
        }.bind(this), null, null, shortcut);
        this.ui.keyHandler.bindAction(190, !0, C4ModelMenu._label_c4_notationeditor, !0);
    }

    init() {
        this.addNotationEditor();
        this.ui.menubar.addMenu(mxResources.get(C4ModelMenu._label_c4_modelmenu), function (menu, parent) {
            this.ui.menus.addMenuItem(menu, C4ModelMenu._label_c4_notationeditor);
        }.bind(this));
        this.reorderMenubar();
    }

    reorderMenubar() {
        let lastChild = this.ui.menubar.container.lastChild;
        this.ui.menubar.container.insertBefore(lastChild, lastChild.previousSibling.previousSibling);
    }
}