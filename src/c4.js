/**
 * Draw.io Plugin to create C4 Architecture Diagramms
 *
 * LOAD C4 SHAPE LIBRARY:
 *
 * https://raw.githubusercontent.com/tobiashochguertel/draw-io/master/C4-drawIO.xml
 *
 * DEVELOPMENT LINKS:
 * - https://jgraph.github.io/mxgraph/docs/js-api/files/util/mxResources-js.html
 * - https://jgraph.github.io/mxgraph/java/docs/com/mxgraph/util/mxResources.html
 * -- https://github.com/jgraph/drawio/search?utf8=%E2%9C%93&q=mxscript&type=
 * - https://github.com/jgraph/drawio/tree/master/src/main/webapp/connect/common/js
 * - https://jgraph.github.io/mxgraph/docs/tutorial.html
 *
 * - https://about.draw.io/features/examples/
 * - https://support.draw.io/display/DOB/2016/04/28/draw.io+API
 */
import {C4utils} from "./utilities/C4utils";
import {Statehandler} from "./components/Statehandler";
import {NotationEditor} from "./components/NotationEditor";
import {Sidebar} from "./components/Sidebar";

Draw.loadPlugin(function (ui) {
    document.querySelectorAll("body .geFooterContainer #geFooter img[title=Hide]")[0].click();

    Sidebar.create(ui);

    // Add custom handler-code for the event of data-editor instanzing to provide a custom data-editor dialog.
    let origGraphCreateHander = ui.editor.graph.createHandler;
    ui.editor.graph.createHandler = function (state) {
        if (state !== null && (this.getSelectionCells().length === 1) && C4utils.isC4(state.cell) && !C4utils.isC4Relationship(state.cell)) {
            // if (state !== null && (this.getSelectionCells().length === 1) && C4utils.isC4(state.cell) && state.cell.c4.handler && !C4utils.isC4Relationship(state.cell)) {
            return new Statehandler(ui, state);
        }
        return origGraphCreateHander.apply(this, arguments);
    };

    let notationEditor = new NotationEditor();
    notationEditor.create();

});
