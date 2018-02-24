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
 *
 * - Integration of Github / .. and other saving locations.
 * -- https://support.draw.io/display/DO/2015/09/21/Simple+draw.io+embedding+walk-through
 *
 * - Usage of Placeholders:
 * -- https://desk.draw.io/support/solutions/articles/16000051979
 *
 *
 * - https://www.salesforce.com/video/1770866/
 * -- Co-founder David Benson at @Dreamforce 2017 in San Francisco about building the http://draw.io  LiveApp for @quip https://www.salesforce.com/video/1770866/  - No browser tabs, no external data, with offline sync and real time collaboration. Thanks to Quip for this great platform!
 *
 * - https://about.draw.io/floating-and-fixed-connections-in-draw-io/
 *
 * - https://desk.draw.io/support/solutions/articles/16000052833-how-to-connect-shapes-
 *
 * - ALT+SHIFT+CURSOR
 * -- EditorUi.js - EditorUi.prototype.createKeyHandler
 *
 *    var directions = {37: mxConstants.DIRECTION_WEST, 38: mxConstants.DIRECTION_NORTH,
 *			39: mxConstants.DIRECTION_EAST, 40: mxConstants.DIRECTION_SOUTH};
 *
 * - WEBDAV:
 * -- https://support.draw.io/pages/viewpage.action?pageId=7504018
 * -- http://documentation.mamp.info/en/MAMP-PRO-Mac/Settings/Hosts/Apache/
 *
 * - GITHUB:
 * -- https://github.com/jgraph/drawio-github/blob/master/nanocms.js
 *
 * - Embedding Walk Through:
 * -- https://support.draw.io/display/DO/2015/09/21/Simple+draw.io+embedding+walk-through
 */
import {Palette} from "./components/Sidebar";
import {C4ModelMenu} from "./components/C4ModelMenu";
import {C4HoverIcons} from "./components/C4HoverIcons";

Draw.loadPlugin(function (ui) {
    document.querySelectorAll("body .geFooterContainer #geFooter img[title=Hide]")[0].click();
    Palette.create(ui);
    ui.hoverIcons = new C4HoverIcons(ui.editor.graph);

    console.debug("ui", ui);
    console.debug("this", this);

    fetch("https://de-dus-nb-toh.de:8890/dist/SoftwareSystem_InternetBankingSystem.json", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        mode: "cors",
        referrer: 'no-referrer', // *client
    }).then(function (response) {
        console.debug("response", response);
        let text = response.text();
        console.debug("response.text()", text);
        // console.debug("response.json()", response.json());
        // response.status;     //=> number 100–599
        // response.statusText; //=> String
        // response.headers;    //=> Headers
        // response.url;        //=> String
        return text
    }, function (error) {
        console.error("error", error) //=> String
    });

    // let template = ui.editor.templates['task'];
    // let clone = ui.editor.graph.model.cloneCell(template);

    /*    let userObject = new Object();
        let parent = ui.editor.graph.getDefaultParent();
        let model = ui.editor.graph.model;
        model.beginUpdate();
        try {
            ui.editor.graph.insertVertex(parent, null, userObject, 20, 20, 80, 30);
        }
        finally {
            model.endUpdate();
        }*/

    /*    let graph = ui.editor.graph;
        graph.addListener(mxEvent.LABEL_CHANGED, function (sender, evt) {
            let cell = evt.getProperty('cell');
            console.debug("send & event: ", sender, evt);
            console.debug("cell: ", cell);
        });*/

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
