import {C4Component} from "../notation/C4Component";
import {C4Container} from "../notation/C4Container";
import {C4Database} from "../notation/C4Database";
import {C4DeploymentNode} from "../notation/C4DeploymentNode";
import {C4ExecutionEnvironment} from "../notation/C4ExecutionEnvironment";
import {C4Person} from "../notation/C4Person";
import {C4SoftwareSystem} from "../notation/C4SoftwareSystem";
import {C4Relationship} from "../notation/C4Relationship";

export class Palette {

    static create(ui) {
        let sidebar_id = 'c4';
        let sidebar_title = 'C4 Notation';

        // notations
        let c4Component = new C4Component();
        let c4Container = new C4Container();
        let c4Database = new C4Database();
        let c4DeploymentNode = new C4DeploymentNode();
        let c4ExecutionEnvironment = new C4ExecutionEnvironment();
        let c4Person = new C4Person();
        let c4SoftwareSystem = new C4SoftwareSystem();
        let c4Relationship = new C4Relationship();

        // Adds custom sidebar entry
        ui.sidebar.addPalette(sidebar_id, sidebar_title, true, function (content) {
            let verticies = [c4Component, c4Container, c4Database, c4DeploymentNode, c4ExecutionEnvironment, c4Person, c4SoftwareSystem];
            for (let i in verticies) {
                let c4notationMxCell = verticies[i];

                let mxCellCodec = mxCodecRegistry.getCodec(mxCell);
                let copyOfMxCellCodec = mxUtils.clone(mxCellCodec);
                copyOfMxCellCodec.template = c4notationMxCell;
                mxCodecRegistry.register(copyOfMxCellCodec);
                // mxCodecRegistry.addAlias("C4Component", 'mxCell');

                content.appendChild(
                    ui.sidebar.createVertexTemplateFromCells(
                        [c4notationMxCell],
                        c4notationMxCell.geometry.width,
                        c4notationMxCell.geometry.height,
                        c4notationMxCell.constructor.name
                    )
                );
            }
            content.appendChild(ui.sidebar.createEdgeTemplateFromCells([c4Relationship], 160, 0, c4Relationship.constructor.name));
        });
    }
}