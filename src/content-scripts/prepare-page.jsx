var Annotator = require('./annotator.jsx');
var serializer = require('../../node_modules/rangy/lib/rangy-serializer.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			position: {
				top: -999,
				left: -999
			},
			range: {}
		}
	},

	componentDidMount: function() {
		var self = this;
		document.onmouseup = function(e) {
			setTimeout(function(e) {
				self.checkHighlighting(e);
			}, 1);
		}
		this.restoreAnnotations();
	},

	// what is changing on my static page?
	// the annoter, maybe.  Delete it from the DOM before serializing 
	// also, try settings a parent node (other than) root.  just see what happens
	restoreAnnotations: function() {
		chrome.storage.sync.get('chrome-notes-annotations', function(obj) {
			for (var url in obj['chrome-notes-annotations']) {
				var curr = window.location.href;
				if (url === curr) {
					// annotations exist on this url
					for (var serialized in obj['chrome-notes-annotations'][url]) {
						if (! serializer.canDeserializeRange(serialized)) continue;
						var range = serializer.deserializeRange(serialized);
						bg = document.createElement("span");
						bg.style.backgroundColor = "yellow";
						range.surroundContents(bg);
					}
				}
			}
		});
	},

	checkHighlighting: function() {
		var selection = window.getSelection();
		if (selection.isCollapsed) {
			this.setState({
				position: {
					top: -999,
					left: -999
				}
			});
		} else {
			// Move the annotate editor centered above this highlighted text
			var b = selection.getRangeAt(0).getBoundingClientRect();

			// Highlight the selected text
			bg = document.createElement("span");
			bg.style.backgroundColor = "yellow";
			var r = selection.getRangeAt(0);
			r.surroundContents(bg);

			this.setState({
				position: {
					top: b.top - 5 + window.pageYOffset,
					left: (b.left + b.right) / 2
				},
				range: r
			});
		}
	},

	render: function() {
		// some kind of banner!
		return (
			<div>
			<p>ANNOTATE ON</p>
			<Annotator position={this.state.position} selected={this.state.selected} range={this.state.range} />
			</div>
		)
	}
});