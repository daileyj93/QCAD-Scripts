include("../MyScripts.js");
include("scripts/WidgetFactory.js");


/**
 * class: MyWidget
 * propt: constructor
 * desc : calls parent constructor
**/
function MyWidget(guiAction) {
	MyScripts.call(this, guiAction);
}

/** 
 * class: MyWidget
 * propt: State
 * type : Object
 * desc : property to describe the state of the tool
**/
MyWidget.State = {
	SettingPosition : 0
};

//inherit properties from MyScripts
MyWidget.prototype = new MyScripts();
MyWidget.includeBasePath = includeBasePath;

/**
 * class: MyWidget
 * propt: setState
 * type : function
 * desc : sets up document properties for use with this tool
 * 		  sets ui to coord selection mode 
**/
MyWidget.prototype.setState = function(state) {
	EAction.prototype.setState.call(this, state);
	
	this.setCrosshairCursor();
	this.getDocumentInterface().setClickMode(RAction.PickCoordinate);
	
	var appWin = RMainWindowQt.getMainWindow();
	this.setLeftMouseTip(qsTr("Position"));
	this.setRightMouseTip(EAction.trCancel);
	
	EAction.showSnapTools();
};

/**
 * class: MyWidget
 * propt: beginEvent
 * type : function
 * desc : actions performed when tool is selected
**/
MyWidget.prototype.beginEvent = function() {
	MyScripts.prototype.beginEvent.call(this);
	this.setState(MyWidget.State.SettingPosition);
};

/**
 * class: MyWidget
 * propt: coordinateEvent
 * type : function
 * desc : actions performed when the user selects coordinates
 *		  updates dialog text boxes with new coords
**/
MyWidget.prototype.coordinateEvent = function(event){
	var pos = event.getModelPosition();
	
	var appWin = EAction.getMainWindow();
	appWin.handleUserMessage("Test1");
	
	var dialog = WidgetFactory.createWidget(
		MyWidget.includeBasePath,
		"MyWidget.ui");
	
	appWin.handleUserMessage("Test2");	
	WidgetFactory.restoreState(dialog);
	
	var widgets = getWidgets(dialog);
	widgets["PositionX"].text = pos.x;
	widgets["PositionY"].text = pos.y;
	
	appWin.handleUserMessage("Test3");
	if(!dialog.exec()) {
		appWin.handleUserMessage("Test4");
		dialog.destroy();
		EAction.activateMainWindow();
		this.terminate();
		appWin.handleUserMessage("Test5");
		return;
	}
	appWin.handleUserMessage("Test6");
	//user hit OK
	WidgetFactory.saveState(dialog);
	var positionX = widgets["PositionX"].text;
	var positionY = widgets["PositionY"].text;
	
	//print user input to console
	appWin.handleUserMessage("Position X: " + positionX);
	appWin.handleUserMessage("Position Y: " + positionY);
	//this.terminate();

};

/**
 * class: MyWidget
 * propt: init
 * type : function
 * desc : initializes tool when program is started
**/
MyWidget.init = function(basePath) {
	var action = new RGuiAction(qsTr("&MyWidget"), RMainWindowQt.getMainWindow());
	action.setRequiresDocument(true);
	action.setScriptFile(basePath + "/MyWidget.js");
	//action.setDefaultCommands(["MyWidget"]);
	
	action.setGroupSortOrder(80100);
	action.setSortOrder(200);
	
	action.setWidgetNames(["MyScriptsMenu"]);
};