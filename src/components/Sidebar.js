import {C4utils} from "../utilities/c4utils";
import {C4Component} from "../notation/C4Component";
import {C4Container} from "../notation/C4Container";

export class Sidebar {

    static create(ui) {
        let sidebar_id = 'c4';
        let sidebar_title = 'C4 Notation';

        // notations
        let c4Component = new C4Component();
        C4utils.registCodec(c4Component);

        let c4Container = new C4Container();
        C4utils.registCodec(c4Container);


        // Adds custom sidebar entry
        ui.sidebar.addPalette(sidebar_id, sidebar_title, true, function (content) {
            // let verticies = [C4Person, C4SoftwareSystem, C4Container, C4Component, C4ExecutionEnvironment, C4DeploymentNode, C4Database];
            /*        let verticies = [c4Component];
                    for (let i in verticies) {
                        let cell = verticies[i].prototype.create();
                        content.appendChild(ui.sidebar.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, cell.label));
                    }*/
            /*            let c4ComponentVerticy = c4Component.mxcell;
                        content.appendChild(
                            ui.sidebar.createVertexTemplateFromCells(
                                [c4ComponentVerticy],
                                c4ComponentVerticy.geometry.width,
                                c4ComponentVerticy.geometry.height,
                                c4ComponentVerticy.label
                            )
                        );*/
            let verticies = [c4Component, c4Container];
            for (let i in verticies) {
                let c4notationMxCell = verticies[i].mxcell;
                content.appendChild(
                    ui.sidebar.createVertexTemplateFromCells(
                        [c4notationMxCell],
                        c4notationMxCell.geometry.width,
                        c4notationMxCell.geometry.height,
                        c4notationMxCell.label
                    )
                );
            }

            // content.appendChild(ui.sidebar.createEdgeTemplateFromCells([C4Relationship.prototype.create()], 160, 0, 'C4 Relationship'));
            // , C4DynamicRelationship];
        });
    }
}