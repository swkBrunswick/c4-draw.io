import {C4Notation} from "../notation/C4Notation";
import {C4Relationship} from "../notation/C4Relationship";
import {C4RelationshipStyle} from "../notation/C4RelationshipStyle";

export class C4HoverIcons extends HoverIcons {

    constructor(graph) {
        super(graph);
    }

    click(state, dir, me) {
        if (!(state.cell instanceof C4Notation)) {
            super.click(state, dir, me);
        }
        if (state.cell instanceof C4Notation) {
            let evt = me.getEvent();
            let x = me.getGraphX();
            let y = me.getGraphY();

            let tmp = this.getStateAt(state, x, y);

            if (tmp != null && this.graph.model.isEdge(tmp.cell) && !mxEvent.isControlDown(evt) &&
                (tmp.getVisibleTerminalState(true) === state || tmp.getVisibleTerminalState(false) === state)) {
                this.graph.setSelectionCell(tmp.cell);
                this.reset();
            } else if (state != null) {
                let cells = this.graph.connectVertex(state.cell, dir, this.graph.defaultEdgeLength, evt);
                console.debug("cells: ", cells); // [mxCell, C4Component]

                let relation = cells[0];
                let relationGeometry = relation.getGeometry();
                this.graph.removeCells([relation], false);

                let c4relation = new C4Relationship();
                let isSource = true;
                c4relation.setParent(null);
                c4relation.setTerminal(relation.getTerminal(isSource), isSource);
                c4relation.setTerminal(relation.getTerminal(!isSource), !isSource);
                c4relation.setGeometry(relationGeometry);
                c4relation.setStyle(new C4RelationshipStyle().toString());
                let addCell = this.graph.addCell(c4relation, relation.getParent());

                // ui.sidebar.createEdgeTemplateFromCells([c4Relationship], 160, 0, c4Relationship.constructor.name)
                // this.graph.selectCellsForConnectVertex(cells, evt, this);

                // Selects only target vertex if one exists
                /*
                                if (cells.length === 2 && this.graph.model.isVertex(cells[1])) {
                                    this.graph.setSelectionCell(cells[1]);

                                    // Adds hover icons to new target vertex for touch devices
                                    if (mxEvent.isTouchEvent(evt)) {
                                        this.update(this.getState(this.graph.view.getState(cells[1])));
                                    } else {
                                        // Hides hover icons after click with mouse
                                        this.reset();
                                    }

                                    this.graph.scrollCellToVisible(cells[1]);
                                } else {
                                    this.graph.setSelectionCells(cells);
                                }
                */
            }
            me.consume();
        }
    }
}