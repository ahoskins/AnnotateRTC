module.exports = {

	/* 
	combine multiple single layer objects 
	
	used to compose styles, having a similar effect as LESS or SASS
	*/
	m: function() {
		var result = {};
		for (var i = 0; i < arguments.length; i++) {
			if (arguments[i]) {
				for (k in arguments[i]) {
					result[k] = arguments[i][k];
				}
			}
		}
		return result;	
	},

	/* Courtesy of: http://stackoverflow.com/a/7616484/3728542 */
	hashCode: function(s) {
		var hash = 0, i, chr, len;
		if (s.length == 0) return hash;
		for (i = 0, len = s.length; i < len; i++) {
			chr = s.charCodeAt(i);
			hash = ((hash << 5) - hash) + chr;
    		hash |= 0; // Convert to 32bit integer
		}
		if (hash < 0) hash = -hash;
		return hash;
	}
}