// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
// Credits:
//   http://designmoo.com/2892/rating-stars/
//= require jquery
//= require jquery_ujs
//= require_tree .

jQuery.ajaxSetup({
  'beforeSend': function(xhr) {xhr.setRequestHeader("Accept", "text/javascript, application/json")}
    });

// There is probably an efficient javascript LRU cache out there
var locationCache = {};

$(document).ready(function(){
	/**
	 * map the event to an api call
	 */
	var resources = {
	    MOUSE_OVER_ITEM: "poi",
	    CLICK_ITEM: "poi"
	    
	};

	var service = "music"; // deals, local, ...
	var geoposition = null;
	var rounds = [];
	var clicked = {};
	var user = {};
	

        var hideDelay = 500;  
        var currentID;
        var hideTimer = null;

	var attractions = null;

	var pos = 0;


	var onShuffle = function(event) { 
	    console.log("forward")
	    if (attractions) {
		pos += 8;
		if (pos > 92) pos = 0;
		console.log(attractions.slice(pos, pos+8));
		fillDetails(attractions.slice(pos, pos+8));
	    } else {
		initGame();
	    }
	}

	// { apiFn("start", null,  {success:onReceiveBatch}); };

	var onPlay = function(event) { $("#about").css({visibility:"hidden"}); };
	
	var onChoose = function(event) { 
	    var id = event.currentTarget.id; 
	    if (locationCache[id].reviews) {
		showReview(locationCache[id]); 
	    } else {
		apiFn('poi', {id:id}, {success: function(r) { 
			    locationCache[id].reviews = r;
			    showReview(locationCache[id]); }
		    });
	    }

	    var div =  $("#" + id);
	    if (id in clicked) {
		delete clicked[id];
		div.removeClass("clicked");
	    } else {
		clicked[id] = locationCache[id];
		$("#" + id).addClass("clicked");
	    }
	};


	function showReview(item) {
	    var pick = item.reviews[0];
	    review = pick.text.replace(/[\n]+/g, '<br/>');
	    console.log(review);
	    review +=  "<p>Rating: " + pick.rating;
	    var pos = item.latitude + "," + item.longitude;
	    var marker = {
		position: pos,
		bounds: true// true will override zoom
	    };
		
	    var info = { 
		content: item.name,
		center: pos
	    };
	    
	    var init = {
		center: pos,
		zoom: 14
	    }
	    
	    $('#poiLinks').empty();
	    $('#poiPopupAbout').show();
	    $('#poiPopupMap').hide();
	    $('#poiPopupNearby').hide();


	    $('#poiPopupAbout').html(review);
	    $('<span/>', { text: 'Map', class:'detailLink' }).appendTo($('#poiLinks')).click(function() {
		    console.log(	$('#poiPopupMap').gmap('option', 'zoom'));
		$('#poiPopupMap').gmap().bind('init', function(ev, map) {
			$('#poiPopupMap').gmap('addMarker', marker).click(function() {
				$('#poiPopupMap').gmap('openInfoWindow', info, this);
			    });
		    });
		$('#poiPopupMap').gmap('option', 'zoom', 14);
		$('#poiPopupAbout').hide();
		$('#poiPopupNearby').hide();
			$('#poiPopupMap').show();
		});

	    $('<span/>', { text: ' | ' }).appendTo($('#poiLinks'));
	    $('<span/>', { text: 'Review', class:'detailLink' }).appendTo($('#poiLinks')).click(function() {
		    $('#poiPopupAbout').show();
		    $('#poiPopupMap').hide();
		    $('#poiPopupNearby').hide();

		});
	    $('<span/>', { text: ' | ' }).appendTo($('#poiLinks'));
	    $('<span/>', { text: ' Nearby ', class:'detailLink' }).appendTo($('#poiLinks')).click(function() {
		    apiFn('nearby', {lat: item.latitude, lon: item.longitude}, { success: function(r) {
				console.log(r);
                                $("#poiPopupNearby").append("<ul id='nearby'></ul>");
				$("#nearby").empty();
				$.each(r, function(n, elem) {
					if (elem.name != item.name) {
					    $("#nearby").append("<li>" + elem.name + "</li>");
					}
				    });

				$('#poiPopupAbout').hide();
				$('#poiPopupMap').hide();
				$('#poiPopupNearby').show();
			    }
			});
		});
	    $('#poiPopupContainer').css('display', 'block');
	}

	var onMouseOverItem = function(event) {
	    // format of 'rel' tag: pageid,personguid
	    var itemId = event.currentTarget.id

	    if (hideTimer) clearTimeout(hideTimer);

	    //      var boundsLeft = event.currentTarget.getBoundingClientRect().
	    var pos = $(this).offset();
	    var width = $(this).width();
      
	    var left = ((pos.left + width + 360) <  window.innerWidth) ?
	      pos.left + 140 :
	      pos.left - 410;

	    $('#poiPopupContainer').css({
		    left: left + 'px',
			top: pos.top - 5 + 'px'
			
			});

	    $('#poiPopupAbout').html('&nbsp;');
	    $('#poiLinks').empty();

	    var facebookAbout = function(id) {
		FB.api("/" + id, function (r) { 
		  console.log(r); 
		  var about = r.bio ? r.bio : r.description ? r.description :  r.about ? r.about : "Facebook bio unavailable" ;
		  about = about.replace(/[\n]+/g, '<br/>');
		  locationCache[itemId].about = about;
		  $('#poiPopupAbout').html(about);
		  $('#poiPopupContainer').css('display', 'block');
	      });
	    };
	      
	    var updateAbout = function(data) {
		console.log(data);
		// Verify that we're pointed to a page that returned the expected results.
		locationCache[itemId] = data;
		withForeignId("facebook", data.foreign_ids, facebookAbout);
		withForeignId("facebook", data.foreign_ids, function(id) {
			if (! id) return;
			$('<a/>', { text: 'facebook', target:'_facebook', href: 'https://www.facebook.com/' + id }).appendTo($('#poiLinks'));
		    });


	    };

	    var artistFetchError = function(response) { 
		     console.log(response)
			 $('#poiPopupAbout').html('error: ' + response);
	    };

	    if (! locationCache[itemId]) {
		apiFn('poi', {id: itemId}, 
		      { error: artistFetchError, success: updateAbout }
		      );
	    } else if ( locationCache[itemId].about )  {
		var artist = locationCache[itemId];
		setArtistPopup(artist);
	    }
	};




	var onEventClick = function(event) {
	    console.log("event click"); console.log(event);
	    var id = event.currentTarget.id; 
	    var artistId = event.currentTarget.getAttribute("artist");
	    var artist = locationCache[artistId];

	    withFacebookPage(artist, function(page) {
		    console.log(page);

		    var dialog = $("<div/>", { class: "event-dialog", 
					       //'background-size': '100%',
					       'background-size': 'cover',
					       //'background-size': 'contain',
					       title: artist.name});
		    dialog.dialog();
		    dialog[0].parentNode.css({height: '308px',
				width: '718px',
				'background-image': 'url(' +page.cover.source + ')'});
		});
	};

	var onReceiveBatch = function(batch) {
	    attractions = batch;
	    $.each(batch, function(i, item) {
		    id = item.location_id;
		    locationCache[id] = item;
		});
	    fillDetails(batch);
	};
	
	var onBatchRequestError = function(response, status, error) {
	    // reloading after authentication is not an error, but does not
	    // have a status
	    console.log("status: " + status);
	    console.log(response, status, error);
	};
	

	/**
	 * The workhorse. All calls to the rota server pass through this method
	 */
	function apiFn(action, data, callbacks) {
	    var defaultCallbacks = { 
		error: function() { console.log("error requesting: " + action); },
		success: function(r) { console.log(r); }
	    };

	    var template = {
		    url:  "http://mitercam.mit.edu:39090/paris/api/" + action,
			type: "POST",
			dataType: "json",
			data: {service: service, data:JSON.stringify(data)}
		};
	    $.ajax($.extend(template, $.extend(defaultCallbacks, callbacks)));
	}


	/**
	 * Updates the images and ids for boxes
	 */
	function fillDetails(items) {
	    
	    $(".box").each(function(i) {
		    var details = items[i];
		    $(this).empty()
			$('<div/>', {
				class: 'caption',
				    text: details.name
				    }).appendTo($(this));
		    $(this).attr({'id': details.location_id});
		    
		    $(this).removeClass("clicked");
		    if (details.id in clicked) {
			$(this).addClass("clicked");
		    } 
		    if (details.photo.images.large) {
			var image = details.photo.images.large;
			if (image) {
			    var img = "url(" + image.url + ")"; 
			    $(this).css({'background-image': img});
			} else {
			    console.log("no image for " + details.name );
			}
		    }
		});
	}
	
	/**
	 * assuming no more than a couple images are bad,
	 * otherwise will need to go with scheme of trying 
	 * to find reliable provider first
	 */
	function randomImage(images) {
	    var avail = $.grep(images, function(item, i) { return (item.error == undefined); });
	    if (avail.length == 0) {
		return null;
	    }
	    var idx = Math.floor(Math.random()*avail.length);
	    var image = avail[idx];
	    if (! _checkImage(image.url)) {
		image.error = 404;
	    }
	    return ( ! image.error) ? image.url : randomImage(images);
	}
	
	function _checkImage(src) {
	    return true;   // cross domain ajax issues!

	    var check = true;
	    $.ajax({
		    url: src,
			type: 'GET',
			error: function(r, a, b){ console.log(b); check = (a == 'error'); }
		});
	}
	
	function withForeignId(catalog, foreign_ids, fn) {
	    $.each($.grep(foreign_ids, function(item, i){
			return item.catalog == catalog;
		    }), function(i, item) { 
		var foreign_id = item.foreign_id.split(":")[2];
		fn(foreign_id);
		});
	}
	
	function withFacebookPage(artist, fn) {
	    var getPage = function(fbid) {
		FB.api('/' + fbid, function(response) {	fn(response); });
	    }
	    withForeignId("facebook", artist.foreign_ids, getPage);
	}


	function updateEvents(artist, id) {
	    clearArtistEvents();
	    showArtistEvents(artist, id);
	}
	
	function clearArtistEvents() {
	    $('.artist').empty();
	    $('.events').empty();
	}
	
	
	function showArtistEvents(artist, id) {
	    $('.upcoming').hide();
	    var byDate = function(a, b) { 
		var bc = b.start_time.replace(/-/g, "").split("T")[0];
		var ac = a.start_time.replace(/-/g, "").split("T")[0];
		return ac - bc;
	    };
	    
	    FB.api('/' + id + '/events', function(r) { 
		    if (r.data && r.data.length > 0) {
			$('.artist').html(artist.name);
			$.each(r.data.sort(byDate), function(i, item) {
				console.log(item);
				var list = $('<li/>', {
					id: "fb:" + item.id,
					artist: artist.id,
					class: 'event',
				    }).appendTo($('.events'));
				list.click(onEventClick);
				
				var eventName = $('<div/>', { 
					class: 'event-name', 
					html: item.name.replace('SOLD OUT', '<b>SOLD OUT</b>') });
				
				var whereWhen = $('<div/>');
				$.each([
					$('<div/>', { html: item.location, class: 'venue' }),
					$('<div/>', { html: item.start_time.split("T")[0], class: 'date' }),
					], function(i, item) { item.appendTo(whereWhen) });
				
				$.each([ whereWhen, eventName ], 
				       function(i, item) { item.appendTo(list) });
				
			    });
			$('.upcoming').show();
		    }
	    });
	}
	
	$(document).on("contextmenu", ".box", function(event){
		var id = event.currentTarget.id; 
		var item = locationCache[id];
		var foreign_ids = item.foreign_ids;
		
		withForeignId("facebook", foreign_ids, function(id) {
			updateEvents(item, id);
		});
		
		return false;
	    });

	function initGame() {
	    apiFn("attractions",  {city: 187147}, {success:onReceiveBatch});
	}


	/**
	 * get the user's geolocation and initialize the attractions
         */
	function initGeoLocation() {
	    var onSuccess = function(r) { 
		geoposition = r; 
		fetchAttractionsByGeolocation(geoposition) 
	    }

	    var onError = function(r) { 
		console.log(r); 
		fetchAttractionsByGeolocation(geoposition) 
	    }

	    if(navigator.geolocation)
		navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}
	
        // =======================================================
	function fetchAttractionsByGeolocation(position, radius) {
	    // dummy.  initGame loads results from paris
        }

	/**
	 * create facebook initialization
	 */
	function createAsyncInitFn(apikey) {
	    return function() {
		// init the FB JS SDK
		FB.init({
			appId      : apikey,                     // App ID from the app dashboard
			    channelUrl : '//mitercam.mit.edu:38080/stubhack/channel.html', // Channel file for x-domain comms
			    status     : true,                                  // Check Facebook Login status
			    xfbml      : true,                                  // Look for social plugins on the page
			    cookie     : true,                                  // enable cookies to allow server to access session
			    oauth      : true                                   // enable OAuth 2.0
			    });
		
		// Additional initialization code such as adding Event Listeners goes here
		// Apparently, events are being triggered periodically -- I am seeing 
		// 
		FB.Event.subscribe('auth.authResponseChange', function(response) {
			switch (response.status) {
			case "connected":
			    console.log("connected and " + isFacebookConnected())
			    //if (! isFacebookConnected) {
				onFacebookConnect();
				//}
			    break;
			case "not_authorized":
			    onFacebookDisconnect();
			    console.log('not_authorized');
			    break;
			default:
			    onFacebookDisconnect();
			    console.log('response.status: ' + response.status);
			}
		    });
	    };
	}


	function initFb(apikey, d) {
	    window.fbAsyncInit = createAsyncInitFn(apikey);
	    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	    if (d.getElementById(id)) {return;}
	    js = d.createElement('script'); js.id = id; js.async = true;
	    js.src = "http://connect.facebook.net/en_US/all.js";
	    ref.parentNode.insertBefore(js, ref);
	}

	function isFacebookConnected() {
	    return (user.fb != {})
	}

	/**
	 * Get the relevant user info -- would like to make a single call to get all the aspects.
	 * There may be overlap of music and likes as music is a subset of the user's likes, but
	 * there is a page limit and both seem to be in reverse chronological order by selection time
	 * so the likes set may not contain music likes
	 */
	function onFacebookConnect() {
	    fetchFacebookGraph();
	}

	function fetchFacebookGraph() {
	    user.fb = {}
	    user.rota = {}
	    FB.api('/me', function(response) { user.info = response; $(".fbuser").text(response.name); });
	}

	function onFacebookDisconnect() {
	    user.fb = {}
	    $(".fbuser").text("");
	}


//shuffles list in-place
function shuffle(list) {
  var i, j, t;
  for (i = 1; i < list.length; i++) {
    j = Math.floor(Math.random()*(1+i));  // choose j in [0..i]
    if (j != i) {
      t = list[i];                        // swap list[i] and list[j]
      list[i] = list[j];
      list[j] = t;
    }
  }
  return list;
}


	/*
	 * createITunesWidget([637489638,207399824])
	 */
	function createITunesWidget(songs) {
	    var bgcolor="ffffff";
	    $('<iframe/>', {
		    src:"http://widgets.itunes.apple.com/widget.html?c=us" + 
			"&brc="+ bgcolor + "&blc=" + bgcolor + "&trc=" + bgcolor + "&tlc=" + bgcolor + 
			"&d=Songs%20from%20your%20chair&t=Rota%20Music%20Mixer&m=song&e=song" + 
			"&w=250&h=300&wt=playlist&partnerId=&affiliate_id=&ids=" + $.join(songs),
			frameborder: 0,
			style:"overflow-x:hidden;overflow-y:hidden;width:250px;height: 300px;border:0px"
			});
	}

	function setArtistPopup(artist) {
	  $('#poiPopupAbout').html(artist.about);
	  $('#poiPopupContainer').css('display', 'block');
	  withForeignId("facebook", artist.foreign_ids, function(id) {
	      if (! id) return;
	      $('<a/>', { text: 'facebook', target:'_facebook', href: 'https://www.facebook.com/' + id }).appendTo($('#poiLinks'));
	  });
	}
 

	// =============================================================================================
	//
	// =============================================================================================
	$('#poiPopupContainer').css({display:'none', position:'absolute'})

	$(".shuffle").click(onShuffle);
	$(".play").click(onPlay);

	$(".box").each(function() { $(this).click(onChoose); });
        $('.box').on('mouseover', function(event) {
return
    });        




        $('.box').on('mouseout', function() {
          if (hideTimer)
            clearTimeout(hideTimer);
          hideTimer = setTimeout(function() {
	  $('#poiPopupContainer').css('display', 'none');
         }, hideDelay);
        });

        // Allow mouse over of details without hiding details
        $('#poiPopupContainer').mouseover(function() {
          if (hideTimer)
            clearTimeout(hideTimer);
        });

        // Hide after mouseout
        $('#poiPopupContainer').mouseout(function() {
          if (hideTimer)
            clearTimeout(hideTimer);
          hideTimer = setTimeout(function() {
            //container.css('display', 'none');
          }, hideDelay);
        });
    


	initFb('448816685209880', document);
	initGame();
	initGeoLocation();
	drawCircle('.box', 50, 200, 90, 310, 220);
	
    });


/*
, 'background-repeat': 'no-repeat', 
					'min-width':'100px', 'min-height':'100px', width:'auto', height:'auto'
*/