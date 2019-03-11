include("scripts/EAction.js);

/**
 * class ExThreePoints
**/

function ExThreePoints(guiAction){
	EAction.call(this, guiAction);
	ExThreePoints.prototype = new EAction();
}

ExThreePoints.init = function(basePath){
	var action = new RGuiAction(qsTr("Three Points), RMainWindowQt.getMainWindow());
	action.setRequiresDocument(true);
	action.setScriptFile(basePath + "/ExThreePoints.js");
	action.setStatusTip(qsTr("Drawthree points"));
	action.setDefaultShortcut(new QKeySequence("p,s"));
	action.setDefaultCommands(["point3"]);
	action.setGroupSortOrder(73100);
	action.setSortOrder(400);
	action.setWidgetNames(["DrawExamplesMenu"]);
};
