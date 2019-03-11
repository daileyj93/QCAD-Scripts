include("scripts/EAction.js");

function MyScripts(guiAction) {
	EAction.call(this, guiAction);
}

MyScripts.prototype = new EAction();

MyScripts.getMenu = function() {
	return EAction.getMenu(MyScripts.getTitle(), "MyScriptsMenu");
};

MyScripts.getToolBar = function() {
	return EAction.getToolBar(MyScripts.getTitle(), "MyScriptToolBar");
};

MyScripts.getTitle = function() {
	return qsTr("My Scripts");
};

MyScripts.init = function() {
	MyScripts.getMenu();
	MyScripts.getToolBar();
};