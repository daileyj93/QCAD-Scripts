include("../MyScripts.js");


/**
 * class: MyAction
 * propt: constructor
 * desc : calls parent constructor
**/
function MyAction(guiAction) {
	MyScripts.call(this, guiAction);
}

//inherit properties from MyScripts
MyAction.prototype = new MyScripts();

/**
 * class: MyAction
 * propt: beginEvent
 * type : function
 * desc : actions performed when tool is selected
**/
MyAction.prototype.beginEvent = function() {
	MyScripts.prototype.beginEvent.call(this);
	var appWin = EAction.getMainWindow();
	appWin.handleUserMessage("MyAction() is running...");
	this.terminate();
};


/**
 * class: MyAction
 * propt: init
 * type : function
 * desc : initializes tool when program is started
**/
MyAction.init = function(basePath) {
	var action = new RGuiAction("&MyAction", RMainWindowQt.getMainWindow());
	action.setRequiresDocument(true);
	action.setScriptFile(basePath + "/MyAction.js");
	action.setDefaultCommands(["myaction"]);
	
	action.setGroupSortOrder(80100);
	action.setSortOrder(200);
	
	action.setWidgetNames(["MyScriptsMenu"]);
};