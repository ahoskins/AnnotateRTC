var PreparePage = require('./prepare-page.jsx');

// put our React container div at the top of the document
var container = document.createElement('div');
document.body.insertBefore(container, document.body.firstChild);

React.render(<PreparePage />, container);