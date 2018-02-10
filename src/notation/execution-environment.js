export class C4ExecutionEnvironment {

    constructor(c4StateHandler) {
        this.handler = c4StateHandler;
    }

    create() {
        var c4DeploymentNode = new mxCell(
            ''
            , new mxGeometry(0, 70, 240, 230)
            , 'rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#ffffff;fontSize=14;font-weight:bold;fontColor=#ffffff;align=left;arcSize=3;strokeColor=#000000;verticalAlign=bottom;'
        );
        c4DeploymentNode.setVertex(true);
        c4DeploymentNode.setValue(mxUtils.createXmlDocument().createElement('object'));
        c4DeploymentNode.setAttribute(
            'label'
            , '<div style="text-align: left">hostname</div><div style="text-align: left">[operationSystem]</div><div style="text-align: right">scalingFactor</div>'
        );
        c4DeploymentNode.setAttribute('placeholders', '1');
        c4DeploymentNode.setAttribute('c4Name', 'hostname');
        c4DeploymentNode.setAttribute('c4Type', 'DeploymentNode');
        c4DeploymentNode.setAttribute('c4OperationSystem', 'operationSystem');
        c4DeploymentNode.setAttribute('c4ScalingFactor', 'scalingFactor');
        c4DeploymentNode.c4 = this;
        return c4DeploymentNode;
    }

}

// c4Utils.registCodec(C4ExecutionEnvironment);
