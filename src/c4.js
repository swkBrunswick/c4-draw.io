/**
 * Draw.io Plugin to create C4 Architecture Diagramms
 *
 * LOAD C4 SHAPE LIBRARY:
 *
 * https://raw.githubusercontent.com/tobiashochguertel/draw-io/master/C4-drawIO.xml
 */
import {C4utils} from "./utilities/c4utils";
import {C4statehandler} from "./components/Statehandler";
import {NotationEditor} from "./components/NotationEditor";
import {Sidebar} from "./components/Sidebar";

Draw.loadPlugin(function (ui) {

    Sidebar.create(ui);

    // Add custom handler-code for the event of data-editor instanzing to provide a custom data-editor dialog.
    let origGraphCreateHander = ui.editor.graph.createHandler;
    ui.editor.graph.createHandler = function (state) {
        if (state !== null && (this.getSelectionCells().length === 1) && C4utils.isC4(state.cell) && !C4utils.isC4Relationship(state.cell)) {
            // if (state !== null && (this.getSelectionCells().length === 1) && C4utils.isC4(state.cell) && state.cell.c4.handler && !C4utils.isC4Relationship(state.cell)) {
            return new C4statehandler(ui, state);
        }
        return origGraphCreateHander.apply(this, arguments);
    };

    let notationEditor = new NotationEditor();
    notationEditor.create();

});
