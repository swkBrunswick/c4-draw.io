import {C4utils} from "../utilities/c4utils";

export class C4statehandler extends mxVertexHandler {

    custom;
    ui;

    constructor(ui, state) {
        super(state);
        this.ui = ui;
    }

    init() {
        this.domNode = document.createElement('div');
        this.domNode.style.position = 'absolute';
        this.domNode.style.whiteSpace = 'nowrap';
        if (this.custom) this.custom.apply(this, arguments);
        let img = C4utils.createSettingsIcon();
        mxEvent.addGestureListeners(img,
            mxUtils.bind(this, function (evt) {
                mxEvent.consume(evt);
            })
        );
        mxEvent.addListener(img, 'click',
            mxUtils.bind(this, function (evt) {
                let isC4Person = C4utils.isC4Person(this.state.cell);
                if (isC4Person) {
                    let cell = this.state.cell.getChildAt(0);
                    if (cell !== null) {
                        let dlg = new EditDataDialog(this.ui, cell);
                        this.ui.showDialog(dlg.container, 320, 320, true, false);
                        dlg.init();
                    }
                }
                if (!isC4Person) {
                    this.ui.actions.get('editData').funct();
                }
                mxEvent.consume(evt);
            })
        );
        this.domNode.appendChild(img);
        super.init();
        this.graph.container.appendChild(this.domNode);
        this.redrawTools();
    }

    redraw() {
        super.redraw();
        this.redrawTools();
    };

    redrawTools() {
        if (this.state !== null && this.domNode !== null) {
            let dy = (mxClient.IS_VML && document.compatMode === 'CSS1Compat') ? 20 : 4;
            this.domNode.style.left = (this.state.x + this.state.width - this.domNode.children.length * 14) + 'px';
            this.domNode.style.top = (this.state.y + this.state.height + dy) + 'px';
        }
    }

    destroy(sender, me) {
        super.destroy(arguments);
        if (this.domNode !== null) {
            this.domNode.parentNode.removeChild(this.domNode);
            this.domNode = null;
        }
    }

}