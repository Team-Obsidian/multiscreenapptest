let utils = {};


/*
 * this menu outlines all the screens and their paths.
 */
function app_menu() {
    // start by declaring an items object.
     var items = {};

     // each key will be ID of the "screen."
     items.screen_one_path = {
        active: true,
        title: 'Screen 1 title',
        screen_callback: 'screen_one',
     };
     items.screen_two_path = {
        title: 'Screen 2 title',
        screen_callback: 'screen_two'
     };
     items.screen_three_path = {
        title: 'Screen 3 title',
        screen_callback: 'screen_three'
     };
    return items;
}
/*
 *  the screen 1 callback.
 */
function screen_one() {
  // start with content.
  let content = {};
  // each major section will be specified by an object.

  // object with a markup property.
  content.header = {
    markup: '<h3>Hello World! (Screen 1)</h3>'
  };

  content.body = {
    markup:'<p>Press the buttons to go to another screen.'
  };

  // object with a links property.
  content.nav = {
    className:'nav',
    links:[{
      text:'screen 2',
      href:'#screen_two_path'
    },
    {
      text:'screen 3',
      href:'#screen_three_path'
    }]
  };
  // return the content.
  return content;
}
/*
 *  the screen 2 callback.
 */
function screen_two() {
  let content = {};

  content.header = {
    markup: '<h3>Welcome to Screen 2!</h3>'
  };
  content.body = {
    markup:'<p>Spiffy content here.</h2>'
  };
  content.nav = {
    className:'nav',
    links:[{
      text:'screen 1',
      href:'#screen_one_path'
    },
    {
      text:'screen 3',
      href:'#screen_three_path'
    }]
  };
  return content;
}
/*
 *  the screen 3 callback.
 */
function screen_three() {
  let content = {};

    // object with a markup property.
content.header = {
    markup: '<h3>Howdy! This is Screen 3.</h3>'
  };

  content.body = {
    markup:'<p>Thanks for visiting.</p>.'
  };

  content.nav = {
    className:'nav',
    links:[{
      text:'screen 1',
      href:'#screen_one_path'
    },
    {
      text:'screen 2',
      href:'#screen_two_path'
    }]
  };
  return content;
}
(function(context) {
/*
 *  changeScreen function.
 */
  function changeScreen(e) {
   // codepen-specific.


   // get the active screen.
   let prev = document.querySelector('.screen.active');

   const delay = 10;
   window.setTimeout(function() {
     if (prev && prev.className.includes('active')) {
          prev.classList.remove('active');
     }
   },delay);

   let id = e.target.href.split('#')[1];

   // if screen does not exist, build it dynamically.
   let screen = document.getElementById(id) || buildScreen(id);

   if (!screen.className.includes('active')) {
         let delay = 50;
          window.setTimeout(function() {
             screen.className += ' active';
          },delay);
   }
   return id;
}
/* add content. */
function addContent(id,screen,el) {

  if (context.menu[id]) {
    let cb = context.menu[id].screen_callback;

    let content = window[cb]();

    for (const key in content) {

     let o = content[key];

     if (o.markup) {

      let div = document.createElement('div');
       div.innerHTML = o.markup;
       el.appendChild(div);
     }

     if (o.links) {
       let ul = document.createElement('ul');
       if (o.className) { ul.className = o.className; }
       for (link of o.links) {
         let li = document.createElement('li');
         let a = document.createElement('a');
         a.textContent = link.text;
         a.href = link.href;
         li.appendChild(a);
         ul.appendChild(li);
         enableLink(a);
       }
       el.appendChild(ul);
     }
    }
  }
  return el;
}

/* for each screen, add a title and content. */
context.init = function(appId,myMenu) {

  // add these to the context object since we will want to use them later.
  context.id = appId;
  context.menu = myMenu();

  let path_ids = Object.keys(context.menu);

  let screenId = path_ids.find(id => context.menu[id].active);

  if (screenId) {
    // console.log('screenId: ' + screenId);
    screen = buildScreen(screenId);

    screen.className += ' active';
  }
}
function buildScreen(screenId) {

    let app = document.getElementById(context.id);

    let obj = context.menu[screenId];

    let screen = document.createElement('div');

    screen.className = 'screen';
    screen.id = screenId;

    let h2 = document.createElement('h2');
    let title = obj.title || 'Placeholder';
    h2.textContent = title;

    screen.appendChild(h2);

    let ui = document.createElement('div');
    ui.className = 'ui-content';

    ui = addContent(screenId,screen,ui);
    screen.appendChild(ui);
    app.appendChild(screen);

    return screen;
}
/*
 *  enable a link once it is added.
 */
function enableLink(link) {
  link.addEventListener('click',function(e) {
     let id = changeScreen(e);
  });
}
})(utils);

// call the function and pass in the ID of the container.
utils.init('app',app_menu);
