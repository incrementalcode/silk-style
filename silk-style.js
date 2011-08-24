(function() {
var sheet, isReady = false;

$(function() {
	isReady = true;
	sheet = document.createElement("style");
	sheet.setAttribute("id", "silkStyleSheet");
	sheet.setAttribute("type", "text/css");
	document.head.appendChild(document.createElement("style"));
	sheet = document.styleSheets[document.styleSheets.length-1];
});

function createRule(selector) {
	sheet.insertRule(selector + '{}', sheet.cssRules.length);
	return sheet.cssRules[sheet.cssRules.length-1];
}

function getSingletonRule(selector) {
	for (var i = 0; i < sheet.cssRules.length; i++) {
		if (sheet.cssRules.item(i).selectorText == selector)
			return sheet.cssRules.item(i);
	}
	
	return createRule(selector);						
}

$.fn.sss = function(declaration) {
	var jq = this;
	if (!isReady) {
		$(function() { jq.sss(declaration) })
		return jq
	}
		
		
	this.sssRule = getSingletonRule(this.selector);
	
	if (declaration instanceof Function) {
		var declarationFunc = declaration;
		declaration = {};
		declarationFunc.call(declaration);
	}

	for (var p in declaration) if (declaration.hasOwnProperty(p)) {
		
		if (p == 'rules') {
			for (var s in declaration[p]) if (declaration[p].hasOwnProperty(s)) {
				$(this.selector + ' ' + s).sss(declaration[p][s]);
			}
		}
		if (p[0] == '/') {
			$(this.selector + p.replace(/^(\/w*)/, '')).sss(declaration[p]);
		}
		else if (p == 'forEach') {
			this.each(declaration[p]);
		}
		else {
			this.sssRule.style[p] = declaration[p];
		}
	}

	
	return this
}
}())
