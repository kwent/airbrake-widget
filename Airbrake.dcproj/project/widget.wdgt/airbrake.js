var TIMEOUT  = null;
var NOTIFIER = null;
var MINUTE   = 60 * 1000;
var DEBUG    = true;

//
// Function: load()
// Called by HTML body element's onload event when the widget is ready to start
//
function load()
{
	setupParts();
	loadExceptions();
	log("load", "widget has been loaded");
}

//
// Function: remove()
// Called when the widget has been removed from the Dashboard
//
function remove()
{
  // Stop any timers to prevent CPU usage
  // Remove any preferences as needed
  clearTimeout(TIMEOUT);
  widget.setPreferenceForKey(null, createInstancePreferenceKey("AirbrakeApiKey"));
  widget.setPreferenceForKey(null, createInstancePreferenceKey("AirbrakeSubdomain"));
  widget.setPreferenceForKey(null, createInstancePreferenceKey("AirbrakeRefreshInterval"));

  log("remove", "credentials has been removed");
}

//
// Function: hide()
// Called when the widget has been hidden
//
function hide()
{
  // Stop any timers to prevent CPU usage
	// clearInterval(TIMEOUT);
	log("hide", "widget has been hidden");
}

//
// Function: show()
// Called when the widget has been shown
//
function show()
{
	log("show", "widget has been shown");
}

//
// Function: showBack(event)
// Called when the info button is clicked to show the back of the widget
//
// event: onClick event from the info button
//
function showBack(event)
{
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToBack");
    }

    front.style.display = "none";
    back.style.display = "block";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }

	var prefs = preferences();
	
	$("#apiKey").val(prefs.apiKey);
	$("#subdomain").val(prefs.subdomain);
  $("#author")[0].onclick = function(){
		widget.openURL("http://www.quentinrousseau.fr");
	}
	$("#author1")[0].onclick = function(){
		widget.openURL("http://simplesideias.com.br");
	}
}

//
// Function: showFront(event)
// Called when the done button is clicked from the back of the widget
//
// event: onClick event from the done button
//
function showFront(event)
{
  var front = document.getElementById("front");
  var back = document.getElementById("back");

  if (window.widget) {
      widget.prepareForTransition("ToFront");
  }

  front.style.display="block";
  back.style.display="none";

  if (window.widget) {
      setTimeout('widget.performTransition();', 0);
  }

	$("#airbrake-back, #airbrake-front").click(function(){
		widget.openURL("http://airbrake.io");
	});
	
	$("#reload").click(function(){
		loadExceptions(true);
	});
	
	loadExceptions(true);
}

function saveProject(event)
{
  if( event.type == "mouseup" || ( event.type == "keypress" && event.which == 13) )
  {
  	widget.setPreferenceForKey($("#apiKey").val().toString(), createInstancePreferenceKey("AirbrakeApiKey"));
    widget.setPreferenceForKey($("#subdomain").val().toString(), createInstancePreferenceKey("AirbrakeSubdomain"));
	
    $('#apiKey').val("");
    $('#subdomain').val("");
    showFront(event);
	
    log("preferences", "api key and subdomain and refresh interval has been saved");
  }
}

function preferences() {
	return {
		apiKey: widget.preferenceForKey(createInstancePreferenceKey("AirbrakeApiKey")),
		subdomain: widget.preferenceForKey(createInstancePreferenceKey("AirbrakeSubdomain"))
	}
}

function loadExceptions(with_loader) {
	clearTimeout(TIMEOUT);
	
	var prefs = preferences();

	log("loadExceptions", "loading exceptions");
	
	if (prefs.apiKey && prefs.apiKey != "" && prefs.subdomain && prefs.subdomain != "")
  {
		var cmd = "/usr/bin/osascript airbrake.scpt " + prefs.subdomain + " " + prefs.apiKey;
  
    $('#inform').addClass('hide');
    $('#unable').addClass('hide');
    $('#no-result').addClass('hide');
    $('#no-exceptions').addClass('hide');
    
    if(with_loader)
        $("#loading").show();
  
		log("step", "about to execute command");
		log("run", cmd);
		
		widget.system(cmd, function(cmd)
    {
			log("step", "command executed");
      
			var output = cmd.outputString;
			
			if (output.match(/exception/gim))
      {
				$("#scrollArea").html(output)
					.removeClass('hide');
          
        if(with_loader)
          $("#loading").hide();
				
				$('abbr').timeago();
        
        $('#last_update').html("Last update: <br/>" + new Date().toDateString() + '-' + new Date().toLocaleTimeString());
        
        $('#last_update')
          .removeClass("hide");
      
        log("last_update", new Date().toDateString() + '-' + new Date().toLocaleTimeString());
        
			}
      else if (output.match(/no-results/))
      {
				$('#no-exceptions')
					.removeClass('hide');
        
        if(with_loader)
          $('#loading').hide();
        
        $('#last_update').html("Last update: <br/>" + new Date().toDateString() + '-' + new Date().toLocaleTimeString());
        
        $('#last_update')
          .removeClass("hide");
        
			}
      else
      {          
        if(with_loader)
          $("#loading").hide();
				
				$('#unable')
					.removeClass('hide');
			}
		});
		
    if (widget.preferenceForKey(createInstancePreferenceKey("AirbrakeRefreshInterval")) == null)
    {
      widget.setPreferenceForKey(1, createInstancePreferenceKey("AirbrakeRefreshInterval"));
    }
      
		TIMEOUT = setTimeout(loadExceptions, widget.preferenceForKey(createInstancePreferenceKey("AirbrakeRefreshInterval")) * MINUTE);
    
	}
  else
  {
		$('#inform').show();
		log("loadExceptions", "no credentials found");
	}
}

function log(title, message) {
	if (DEBUG) {
		widget.system('MESSAGE="' + title + ': ' + message + '" /usr/bin/osascript logger.scpt');
	}
}

if (window.widget) {
    widget.onremove = remove;
    widget.onhide = hide;
    widget.onshow = show;
}

function refreshIntervalsliderChangeValue(value)
{
    $('#text4').html("Refresh every "+ value + "min.");
    widget.setPreferenceForKey(value, createInstancePreferenceKey("AirbrakeRefreshInterval"));
}