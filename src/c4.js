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
 * - https://webapps.stackexchange.com/questions/82354/add-keyboard-shortcuts-to-draw-io-to-insert-a-given-element
 * -- https://plus.google.com/+DrawIo1/posts/CXEvmL16mjp
 * -- https://de.wikipedia.org/wiki/American_Standard_Code_for_Information_Interchange
 *
 * - https://about.draw.io/features/examples/
 * - https://support.draw.io/display/DOB/2016/04/28/draw.io+API
 */
import {Palette} from "./components/Sidebar";
import {C4ModelMenu} from "./components/C4ModelMenu";

Draw.loadPlugin(function (ui) {
    document.querySelectorAll("body .geFooterContainer #geFooter img[title=Hide]")[0].click();

    Palette.create(ui);

    // Add custom handler-code for the event of data-editor instanzing to provide a custom data-editor dialog.
    /*    let origGraphCreateHander = ui.editor.graph.createHandler;
        ui.editor.graph.createHandler = function (state) {
            if (!C4utils.isSingularSelection(this, state)) {
                return origGraphCreateHander.apply(this, arguments);
            }

            if (C4utils.isC4Relationship(state.cell)) {
                return origGraphCreateHander.apply(this, arguments);
            }
            return new Statehandler(ui, state);
        };*/

    let c4ModelMenu = new C4ModelMenu(ui);

});
