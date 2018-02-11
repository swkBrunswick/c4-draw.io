import {C4utils} from "../utilities/C4utils";
import {C4Component} from "../notation/C4Component";
import {C4Container} from "../notation/C4Container";
import {C4Database} from "../notation/C4Database";
import {C4DeploymentNode} from "../notation/C4DeploymentNode";
import {C4ExecutionEnvironment} from "../notation/C4ExecutionEnvironment";
import {C4Person} from "../notation/C4Person";
import {C4SoftwareSystem} from "../notation/C4SoftwareSystem";

export class Sidebar {

    static create(ui) {
        let sidebar_id = 'c4';
        let sidebar_title = 'C4 Notation';

        // notations
        let c4Component = new C4Component();
        C4utils.registCodec(c4Component);

        let c4Container = new C4Container();
        C4utils.registCodec(c4Container);

        let c4Database = new C4Database();
        C4utils.registCodec(c4Database);

        let c4DeploymentNode = new C4DeploymentNode();
        C4utils.registCodec(c4DeploymentNode);

        let c4ExecutionEnvironment = new C4ExecutionEnvironment();
        C4utils.registCodec(c4ExecutionEnvironment);

        let c4Person = new C4Person();
        C4utils.registCodec(c4Person);

        let c4SoftwareSystem = new C4SoftwareSystem();
        C4utils.registCodec(c4SoftwareSystem);

        // Adds custom sidebar entry
        ui.sidebar.addPalette(sidebar_id, sidebar_title, true, function (content) {
            let verticies = [c4Component, c4Container, c4Database, c4DeploymentNode, c4ExecutionEnvironment, c4Person, c4SoftwareSystem];
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