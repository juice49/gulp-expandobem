var
	through = require('through2'),
	gutil = require('gulp-util'),
	concatStream = require('concat-stream'),
	expandobem = require('expandobem');

const PLUGIN_NAME = 'gulp-expandobem';

module.exports = function() {

	return through.obj(function(file, unused, cb) {
		
		var _this = this;
		
		if(file.isNull()) {
			this.push(file);
			return cb();
		}
		
		if(file.isStream()) {
			new gutil.PluginError('gulp-expandobem', 'Streaming not supported');
		}
		
		if(file.isBuffer()) {
			expandobem.processString(file.contents).pipe(concatStream(function(body) {
				file.contents = body;
				_this.push(file);
				return cb();
			}));
		}
		
	});

};