var assert = require('assert');
var should = require('should');
var htmler = require('../libs/htmler');


describe('[html unit test]', function () {

    it('div without properites', function () {
        var s = htmler.div().contain('hello world');
        // console.log(s);
        assert.equal(s, '<div>hello world</div>');
    });
    
    it('div with properties', function () {
        var s = htmler.div({'class': 'container'}).contain('hello ', 'world');
        // console.log(s);
        assert.equal(s, '<div class="container">hello world</div>');
    });
    
    it('div with properties which include array value', function () {
        var s = htmler.div({'id': 'myDiv', 'class': ['c1', 'c2', 'c3']}).contain('hello ', 'world');
        // console.log(s);
        assert.equal(s, '<div id="myDiv" class="c1 c2 c3">hello world</div>');
    });
    
    it('img', function () {
        var s = htmler.img({'class': 'thumb', 'src': 'test.png'});
        // console.log(s);
        assert.equal(s, '<img class="thumb" src="test.png">');
    });
    
    it('nest', function () {
        var s = htmler.div({'class': 'container'}).contain(
            htmler.img({'class': 'thumb', 'src': 'test.png'}),
            htmler.img({'class': 'thumb', 'src': 'test2.png'})
        );
        assert.equal(s, '<div class="container"><img class="thumb" src="test.png"><img class="thumb" src="test2.png"></div>');
    });
    
    it('span with class', function () {
        var s = htmler.span('ok').html('hello ', 'world');
        // console.log(s);
        assert.equal(s, '<span class="ok">hello world</span>');
    });
    
    it('span with empty text', function () {
        var s = htmler.span('ok').html();
        assert.equal(s, '<span class="ok"></span>');
    });
    
});