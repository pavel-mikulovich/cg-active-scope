chrome.devtools.panels.elements.createSidebarPane("CG Scope", function(sidebar) {
	chrome.devtools.panels.elements.onSelectionChanged.addListener(function() {
		sidebar.setExpression('(' + getActiveScope.toString() + ')()');
	});
});

var getActiveScope = function() {	
	if (!CG || !$) return;
	var el = $($0);
	var directScope = el.scope();
	var activeScope = {directScope: directScope};
	var isUIGrid = el.parents('[ui-grid]').length;
	if (isUIGrid) {
		var uiGridEntity = getClosestUIGridEntity(directScope);
		if (uiGridEntity) {
			activeScope.uiGridEntity = uiGridEntity;
		}
	
	}
	var closestController = getClosestController(directScope);
	if (closestController) {
		activeScope.closestController= closestController;
	}
	console.log(activeScope);
	return activeScope;
	
	function getClosestUIGridEntity(scope) {
		if (!scope) return;
		if (scope.row) {
			return scope.row.entity;
		}
		return getClosestUIGridEntity(scope.$parent);
	}
	
	function getClosestController(scope) {
		if (!scope) return;
		if (scope.ctrl) {
			return scope.ctrl;
		}
		return getClosestController(scope.$parent);
	}
}