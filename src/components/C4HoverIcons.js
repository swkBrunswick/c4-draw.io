import {C4Notation} from "../notation/C4Notation";
import {C4Relationship} from "../notation/C4Relationship";
import {C4RelationshipStyle} from "../notation/C4RelationshipStyle";

/*
 * - https://twitter.com/drawio/status/960913353676902401
 *     Did you know? Ctrl+Resize (Cmd+Resize on macOS) keeps the center of a shape while resizing. Alt+Shift+Cursor (Option+Shift+Cursor on macOS) lets you clone and connect the selected shape in all four directions. Try it at https://www.draw.io/?ui=dark#RjZJNU4QwDIZ%2FDXco6uqVdVcvnjh47tAs7VgoU7IC%2FnqDTfmYnZ3x1ORJ0iZvmuTHZnzzstMfToFNRKrGJH9NhMjS7JGOmUxMsvQQSO2NCixdQWl%2BIJYyvRoFPbOA0DmLptvDyrUtVLhj0ns37NMuzqod6GQNN6CspL2ln0ahDvRZHFb%2BDqbW8eXs6SVEGhmTeZJeS%2BWGDcpPSX70zmGwmvEIdlZvr8v5TnRpzEOL%2FykQoeBb2ivPxn3hFIelAtKVnGLQBqHsZDVHBtotMY2NJS8jU%2FZdEPtiRqD7ix69%2B1oUotkKfg08wni342zRgX4QuAbQT5TCBSJl6eLneWB%2F2GyCkd4sITLJu6%2BXm1d5yGCFortu4i%2B2%2BdD56Rc%3D …
 * --
 *
 * - https://twitter.com/drawio/status/959698065174269952
 *     Did you know? You can add subgraphs to the scratchpad and drag them over the blue arrows to connect them with existing cells.
 *
 *
 */
export class C4HoverIcons extends HoverIcons {

    constructor(graph) {
        super(graph);
    }

    click(state, dir, me) {
        console.debug("state, dir, me", state, dir, me);

        if (!(state.cell instanceof C4Notation)) {
            super.click(state, dir, me);
        }
        if (state.cell instanceof C4Notation) {
            let evt = me.getEvent();
            let x = me.getGraphX();
            let y = me.getGraphY();

            let tmp = this.getStateAt(state, x, y);
            console.debug("tmp", tmp);
            if (tmp != null) {
                console.debug("this.graph.model.isEdge(tmp.cell)", this.graph.model.isEdge(tmp.cell));
                console.debug("!mxEvent.isControlDown(evt)", !mxEvent.isControlDown(evt));
                console.debug("tmp.getVisibleTerminalState(true) === state", tmp.getVisibleTerminalState(true) === state);
                console.debug("tmp.getVisibleTerminalState(false) === state", tmp.getVisibleTerminalState(false) === state);
                console.debug("(tmp.getVisibleTerminalState(true) === state || tmp.getVisibleTerminalState(false) === state)", (tmp.getVisibleTerminalState(true) === state || tmp.getVisibleTerminalState(false) === state));
            }

            if (tmp != null && this.graph.model.isEdge(tmp.cell) && !mxEvent.isControlDown(evt) &&
                (tmp.getVisibleTerminalState(true) === state || tmp.getVisibleTerminalState(false) === state)) {
                console.debug("tmp");

                this.graph.setSelectionCell(tmp.cell);
                this.reset();
            } else if (state != null) {
                console.debug("state != null");

                let length = this.graph.defaultEdgeLength;
                let cells = this.graph.connectVertex(state.cell, dir, length + 50, evt);

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
                cells[0] = this.graph.addCell(c4relation, relation.getParent());

                this.graph.selectCellsForConnectVertex(cells, evt, this);

                // Selects only target vertex if one exists
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
            }
            me.consume();
        }
    }

    /*    drag(evt, x, y) {
            console.debug("evt, x, y: ", evt, x, y);
            if (!(evt.cell instanceof C4Notation)) {
                super.drag(evt, x, y);
            }
            if (evt.cell instanceof C4Notation) {
                console.debug("evt, x, y: ", evt, x, y);
                // super.drag(evt, x, y);
            }
            this.graph.popupMenuHandler.hideMenu();
            this.graph.stopEditing(false);

            // Checks if state was removed in call to stopEditing above
            if (this.currentState != null) {
                this.graph.connectionHandler.start(this.currentState, x, y);
                this.graph.isMouseTrigger = mxEvent.isMouseEvent(evt);
                this.graph.isMouseDown = true;

                // Hides handles for selection cell
                let handler = this.graph.selectionCellsHandler.getHandler(this.currentState.cell);

                if (handler != null) {
                    handler.setHandlesVisible(false);
                }
            }
        }*/
}