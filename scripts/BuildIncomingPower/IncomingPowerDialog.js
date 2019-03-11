include("../MyScripts.js");
include("scripts/WidgetFactory.js");

/**
 * class: IncomingPowerDialog
 * propt: constructor
 * desc : calls parent class
**/
function IncomingPowerDialog(guiAction) {
	MyScripts.call(this, guiAction);
}

//inherit properties from MyScripts
IncomingPowerDialog.prototype = new MyScripts();
IncomingPowerDialog.includeBasePath = includeBasePath;

//define voltage configurations
IncomingPowerDialog.prototype.voltageConfig = [
	[//0: single-phase no neutral
		"240 VAC"
	],
	[//1: single-phase with neutral
		"120 VAC",
		"120/240 VAC"
	],
	[//2: three-phase no neutral
		"208 VAC",
		"230 VAC",
		"240 VAC",
		"460 VAC",
		"480 VAC"
	],
	[//3: three-phase with neutral
		"120/208 VAC",
		"120/240 VAC",
		"277, 480 VAC"
	]
];

/**
 * class: IncomingPowerDialog
 * propt: show
 * type : function
 * desc : actions executed to display dialog
**/
IncomingPowerDialog.prototype.show = function() {
	var doc = EAction.getDocument();
	if(isNull(doc)) {
		return;
	}
	
	this.dialog = WidgetFactory.createDialog(IncomingPowerDialog.basePath, "incomingpowerdialog.ui", EAction.getMainWindow());
	
	var threePhaseRadio = this.dialog.findChild("threePhaseRadio");
	var singlePhaseRadio = this.dialog.findChild("singlePhaseRadio");
	var neutralCheckBox = this.dialog.findChild("neutralCheckBox");
	var voltComboBox = this.dialog.findChild("voltComboBox");
	
	threePhaseRadio.toggled.connect(this, "configChanged");
	singlePhaseRadio.toggled.connect(this, "configChanged");
	neutralCheckbox.toggled.connect(this, "configChanged");
	
	for(var i = 0; i < this.voltageConfig[2].length; i++) {
		voltComboBox.addItem(this.voltageConfig[2][i]);
	}
	
};

/**
 * class: IncomingPowerDialog
 * propt: init
 * type : function
 * desc : initializes tool when program is started
**/
MyWidget.init = function(basePath) {
	var action = new RGuiAction(qsTr("&IncomingPowerDialog"), RMainWindowQt.getMainWindow());
	action.setRequiresDocument(true);
	action.setScriptFile(basePath + "/IncomingPowerDialog.js");
	
	action.setGroupSortOrder(80100);
	action.setSortOrder(200);
	
	action.setWidgetNames(["MyScriptsMenu"]);
};
















