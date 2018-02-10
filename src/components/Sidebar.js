import {C4utils} from "../utilities/c4utils";
import {C4Component} from "../notation/C4Component";

export class Sidebar {

    static create(ui) {
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
    }
}