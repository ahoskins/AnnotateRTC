var utils = require('../utils.js');
var serializer = require('../../node_modules/rangy/lib/rangy-serializer.js');

var styles = {
	box: {
		padding: 5,
		borderRadius: 8,
		width: 200,
		backgroundColor: 'rgba(0,0,0,0.7)'
	},
	arrowDown: {
		width: 0,
		height: 0, 
		borderLeft: '10px solid transparent',
		borderRight: '10px solid transparent',
		borderTop: '10px solid rgba(0,0,0,0.7)'
	}
};

function getBoxPosition(props, domRef) {
	var boxEl = React.findDOMNode(domRef);
	var width = boxEl.clientWidth;
	var height = boxEl.clientHeight;

	return {
		position: 'absolute',
		top: props.position.top - height,
		left: props.position.left - (width / 2)
	}
}

function getArrowPosition(props, domRef) {
	var boxEl = React.findDOMNode(domRef);
	var width = boxEl.clientWidth;
	var height = boxEl.clientHeight;

	return {
		position: 'absolute',
		top: props.position.top - 5,
		left: props.position.left - 10
	}
}

module.exports = React.createClass({
	getInitialState: function() {
		return {
			boxPosition: {
				position: 'absolute',
				top: -999,
				left: -999
			},
			arrowPosition: {
				position: 'absolute',
				top: -999,
				left: -999
			},
			range: {}
		}
	},

	componentWillReceiveProps: function(newProps) {
		// set state based on the props
		// can't use the props directly because the position...
		// ...of this relies on the size of this box (internal information to this component)
		this.setState({
			boxPosition: getBoxPosition(newProps, this.refs.box),
			arrowPosition: getArrowPosition(newProps, this.refs.box),
			range: newProps.range
		});
	},

	// stopImmediateProgagation is needed because of the document.onmouseup listener
	// (event happens outside the context of React's synthetic events)
	keepArticleFocus: function(e) {
		e.nativeEvent.stopImmediatePropagation(); 
	},

	saveContent: function() {
		// serialize this range and store it as the key in localstorage
		// value is the annotation
		var serializedRange = serializer.serializeRange(this.state.range, true);
		var annotationContent = React.findDOMNode(this.refs.content).innerText;

		chrome.storage.sync.get('chrome-notes-annotations', function(obj) {
			if (Object.keys(obj).length === 0) obj['chrome-notes-annotations'] = {};
			// if annotations exist for this location, point to this
			var currentLocation = window.location.href;
			var existing = obj['chrome-notes-annotations'][currentLocation] || {};
			existing[serializedRange] = annotationContent; // appended to this object
			obj['chrome-notes-annotations'][currentLocation] = existing; // update at location

			chrome.storage.sync.set(obj);
		});

		// chrome.storage.sync.get('chrome-notes-annotations', function(obj) {
		// 	var content = null;
		// 	if (Object.keys(obj).length === 0) {
		// 		content = obj['chrome-notes-annotations'] = {};
		// 	}
		// 	content[serializedRange] = annotationContent;
		// 	chrome.storage.sync.set(obj, function() {
		// 		alert('saved');
		// 		chrome.storage.sync.get('chrome-notes-annotations', function(obj){
		// 			alert(Object.keys(obj).length);
		// 		});
		// 	});
		// });
	},

	render: function() {
		return (
			<div>
				<div style={utils.m(styles.box, this.state.boxPosition)} ref="box">
					<article contentEditable="true" ref="content" onMouseUp={this.keepArticleFocus}>
					</article>
					<button onClick={this.saveContent}>Save</button>
				</div>
				<div style={utils.m(styles.arrowDown, this.state.arrowPosition)}></div>
			</div>
		)
	}
});