var Html = exports = module.exports = {};

function registerTag (name, hasText) {
    if (hasText) {
        Html[name] = tag(name);
    } else {
        Html[name] = singleTag(name);
    }
}

function tag (name) {
    return function (properties) {
        return {
            text: '',
            name: name,
            properties: convertProperties(properties),
            contain: contain,
            html: contain
        };
    }
}

function singleTag (name) {
    return function (properties) {
        var props = makeProperties(convertProperties(properties));
        return makeTag(name, props, false);
    }
}

function convertProperties (properties) {
    properties = properties || {};
    
    if (typeof properties == 'string') {
        return {class: properties};
    }
    
    if (Array.isArray(properties)) {
        return {class: properties.join(' ')};
    }
    
    return properties;
}

function contain () {
		if (arguments.length == 1 && Array.isArray(arguments[0])) {
				this.text = arguments[0].join('');
		} else {
			for (var i = 0; i < arguments.length; i++) {
					this.text += arguments[i];
			}
		}
    return render.call(this);
}

function render () {
    var props = makeProperties(this.properties);
    return makeTag(this.name, props, this.text);
}



function makeTag(name, props, html) {
    var props = props.length > 0 ? ' ' + props.join(' ') : '';
    var beginTag = surround(name + props, '<', '>');
    var endTag;
    if (html === false) {
        return beginTag;
    } else {
        endTag = surround('/' + name, '<', '>');
        return surround(html, beginTag, endTag);
    }
}

function makeProperties (properties) {
    var props = [];
    var keys = Object.keys(properties);
    
    keys.forEach(function (key) {
        props.push(makeProperty(key, properties[key]));
    });
    
    return props;
}

function makeProperty(name, value) {
    
    if (value === undefined || value === null) {
        return '';
    }
    
    if (Array.isArray(value)) {
        value = value.join(' ');
    }
    return [name, surround(value)].join('=');
}


function surround (str/*sign*/) {
    var startSign = '"', endSign = '"';
    
    if (arguments.length == 2) {
        startSign = endSign = arguments[1];
    } else if (arguments.length == 3) {
        startSign = arguments[1]
        endSign = arguments[2];
    }
    
    return startSign + str + endSign;
}

Html.tag = tag;
Html.singleTag = singleTag;

['html', 'head', 'body', 'style', 'title', 'div','p','span','label','h1','h2','h3', 'h4', 'h5', 'h6', 'table','caption', 'thead', 'tbody', 'th','td','tr','li','ul','ol','dl','dt','dd','center','strong','b','em','sup','sub','a', 'i', 'textarea', 'button', 'select', 'option', 'optgroup', 'form', 'fieldset', 'legend', 'address', 'section', 'script'].forEach(function (name) {
    registerTag(name, true);
});

['img', 'input', 'link', 'meta'].forEach(function (name) {
    registerTag(name, false);
});