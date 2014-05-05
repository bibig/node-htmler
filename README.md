# Htmler

+ an easy way to render html string.
+ although sorts of template engines are popular, but sometimes we also need the tranditional way to render html.

## Install
 npm install htmler

## Version
  0.0.1

## Usage
  ```javascript
    var htmler = require('htmler');
    var img = htmler.img;
    var nav = htmler.tag('nav');
    
    
    img({src: 'http://www.example.com/xxx.png'});
    // -> <img src="http://www.example.com/xxx.png">
    
    var div = htmler.div;
    div({id: 'myDiv', class: 'myClass'}).html('hello world');
    // -> <div id="myDiv" class="myClass">hello world</div>
  
    var ul = htmler.ul;
    var li = htmler.li;

    ul('myStyle').html(
      li().html('hello'),
      li('active').html('htmler')
    );
    // -> <ul class="myStyle"><li>hello</li><li class="active">htmler</li></ul>

    nav('myNav').html('hello');
    // -> <nav class="myNav">haha</nav>
  
  ```