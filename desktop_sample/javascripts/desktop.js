var window1, window2, window3, window4, window5;


/*  Test01 Window ****************************************/
function openWindowTest01() {
  if (!window2) {
    window2 = new Window({className: currentThemeName, blurClassName: currentBlurThemeName, top: 100, left:310, height:100, width:250});
    window2.setTitle("Test 01");
    window2.getContent().appendChild($('test01').show());
  }
  window2.toFront();
  window2.show();
}

function closeTest01() {
  if (window2) 
    window2.close();
}

function maximizeTest01() {
  if (window2) 
    window2.maximize();
}

function minimizeTest01() {
  if (window2) 
    window2.minimize();
}

/*  Test02 Window ****************************************/
function openWindowTest02() {
  if (!window3) {
    window3 = new Window({className: currentThemeName, blurClassName: currentBlurThemeName, url: "externals/test02.html",
                          top: 400, left:10, height:180, width:250});
    window3.setTitle("Test 02");
    window3.show();
  }
  window3.toFront();
  window3.show();
}

/*  Refresh Window ***************************************/
function openWindowRefresh() {
  if (!window4) {
    window4 = new Window({className: currentThemeName, blurClassName: currentBlurThemeName, url: "externals/refresh.html", 
                          top: 250, left:10, height:100, width:250});
    window4.setTitle("Refresh");
    window4.show();
  }
  window4.toFront();
  window4.show();
}

/*  Control Panel Windows ********************************/
function openWindowCP() {
  if (!window1) {
    window1 = new Window({className: currentThemeName, blurClassName: currentBlurThemeName, top: 100, left:10,height:100, width:250});
    window1.setTitle("Control Panel");
    window1.getContent().appendChild($('control_panel').show());
  }
  window1.toFront();
  window1.show();
}

function openWindowExternalCP() {
  if (!window5) {
    window5 = new Window({className: currentThemeName, blurClassName: currentBlurThemeName, url: "externals/control_panel.html", 
                          top: 250, left:310, height:100, width:300});
    window5.setTitle("Control Panel (External)");
    window5.show();
  }
  window5.toFront();
  window5.show();
}

function closeCP() {
  if (window1) 
    window1.close();
}

function maximizeCP() {
  if (window1) 
    window1.maximize();
}

function minimizeCP() {
  if (window1) 
    window1.minimize();
}

/* Themes and backgrounds ********************************/
var currentTheme = 0;
var currentThemeName = "alphacube";
var currentBlurThemeName = "alphacube";
function changeTheme(select) {
  var index = select.selectedIndex;
  if (index == currentTheme)
    return;

  var theme, blurTheme;
  switch (index) {
    case 0:
      theme = "alphacube";
      blurTheme = "alphacube";
      break;
    case 1:
      theme = "mac_os_x";
      blurTheme = "blur_os_x";
      break;
    case 2:
      theme = "bluelighting";
      blurTheme = "greylighting";
      break;
    case 3:
      theme = "greenlighting";
      blurTheme = "greylighting";
      break;
    case 4:
      theme = "vista_glass";
      blurTheme = "blur_vista_glass";
      break;
    case 5:
      theme = "vista_normal";
      blurTheme = "blur_vista_normal";
      break;
  }
  Windows.windows.each(function(win) {
    win.options.focusClassName = theme; 
    win.options.blurClassName = blurTheme;
    win.changeClassName(blurTheme);
  });
  if (Windows.focusedWindow)
    Windows.focusedWindow.changeClassName(theme);
  currentTheme = index; 
  currentThemeName = theme;
  currentBlurThemeName = blurTheme;
}

var currentBackground = 0;
function changeBackground(select) {
  var index = select.selectedIndex;
  if (index == currentBackground)
    return;  
  switch (index) {
    case 0:   
      document.body.style.backgroundImage = "url(backgrounds/blue_strips_bg.png)"
      break;
    case 1:
      document.body.style.backgroundImage = "url(backgrounds/black_strips_bg.png)"
      break;
    case 2:
      document.body.style.backgroundColor = "#FFF"
      document.body.style.backgroundImage = "none"
      break;
  }
  currentBackground = index;
}