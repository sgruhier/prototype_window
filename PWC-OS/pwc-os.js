// Overide WindowUtilities getPageSize to remove dock height (for maximized windows)
WindowUtilities._oldGetPageSize = WindowUtilities.getPageSize;
WindowUtilities.getPageSize = function() {
  var size = WindowUtilities._oldGetPageSize();
  var dockHeight = $('dock').getHeight();
  
  size.pageHeight -= dockHeight;
  size.windowHeight -= dockHeight;
  return size;
};    


// Overide Windows minimize to move window inside dock  
Object.extend(Windows, {
  // Overide minimize function
  minimize: function(id, event) {
    var win = this.getWindow(id)
    if (win && win.visible) {
      // Hide current window
      win.hide();            
    
      // Create a dock element
      var element = document.createElement("span");
      element.className = "dock_icon"; 
      element.style.display = "none";
      element.win = win;
      $('dock').appendChild(element);
      Event.observe(element, "mouseup", Windows.restore);
      $(element).update(win.getTitle());
    
      new Effect.Appear(element)
    }
    Event.stop(event);
  },                 
  
  // Restore function
  restore: function(event) { 
    var element = Event.element(event);
    // Show window
    element.win.show();
    //Windows.focus(element.win.getId());                    
    element.win.toFront();
    // Fade and destroy icon
    new Effect.Fade(element, {afterFinish: function() {element.remove()}})
  }
})

// blur focused window if click on document
Event.observe(document, "click", function(event) {   
  var e = Event.element(event);
  var win = e.up(".dialog");
  var dock = e == $('dock') || e.up("#dock"); 
  if (!win && !dock && Windows.focusedWindow) {
    Windows.blur(Windows.focusedWindow.getId());                    
  }
})               

// Chnage theme callback
var currentTheme = 0;
function changeTheme(event) {
  var index = Event.element(event).selectedIndex;
  if (index == currentTheme)
    return;

  var theme, blurTheme;
  switch (index) {
    case 0:
      theme = "mac_os_x";
      blurTheme = "blur_os_x";
      break;
    case 1:
      theme = "bluelighting";
      blurTheme = "greylighting";
      break;
    case 2:
      theme = "greenlighting";
      blurTheme = "greylighting";
      break;
    case 3:
      theme = "vista_glass";
      blurTheme = "blur_vista_glass";
      break;
    case 4:
      theme = "vista_normal";
      blurTheme = "blur_vista_normal";
      break;
  }
  Windows.windows.each(function(win) {
    win.options.focusClassName = theme; 
    win.options.blurClassName = blurTheme;
    win.changeClassName(blurTheme)
  });
  if (Windows.focusedWindow)
    Windows.focusedWindow.changeClassName(theme);
  currentTheme = index;
}

// Drop callback
function dropIcon(draggable, droppable) {
  draggable.setStyle({top:"10px", left:"10px"})
  droppable.appendChild(draggable)
} 

Draggables.addObserver({ 
    onStart: function(eventName, draggable) {   
      document.body.appendChild(draggable.element)
    }
}); 

// Init webOS, create 3 windows
function initWebOS() {         
  // Create 3 windows
  $R(1,3).each(function(index) {
    var win = new Window({className: "mac_os_x", blurClassName: "blur_os_x", title: "window #"+index, width:250, height:150, top: 100 + index*50, left:100 + index*50}); 
    win.getContent().update("<h1>Window #" + index + "</h1>Drop area :<div class='drop' id='drop_" + index + "'></div>");
    win.show(); 
  	date=new Date();
    date.setMonth(date.getMonth()+3);
    win.setCookie("pwc-os-"+index, date);
    Droppables.add("drop_" + index, {hoverclass: "drop_hover", onDrop: dropIcon});
  })                                                                         
  //
  $$("#theme select").first().selectedIndex = currentTheme;
  Event.observe($$("#theme select").first(), "change", changeTheme); 
  
  new Draggable("drag") 
}
Event.observe(window, "load", initWebOS)
               
               
