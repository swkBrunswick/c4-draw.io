/**
 * Draw.io Plugin to create C4 Architecture Diagramms
 *
 * LOAD C4 SHAPE LIBRARY:
 *
 * https://raw.githubusercontent.com/tobiashochguertel/draw-io/master/C4-drawIO.xml
 */
import {C4Component} from "./notation/C4Component";
import {C4utils} from "./utilities/c4utils";
import {C4statehandler} from "./components/Statehandler";
import {NotationEditor} from "./components/NotationEditor";

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
            return new C4statehandler(ui, state);
        }
        return origGraphCreateHander.apply(this, arguments);
    };

    let notationEditor = new NotationEditor();
    notationEditor.create();

});
