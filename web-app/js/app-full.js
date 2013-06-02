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
//= require jquery
//= require jquery_ujs
//= require_tree .

jQuery.ajaxSetup({
  'beforeSend': function(xhr) {xhr.setRequestHeader("Accept", "text/javascript, application/json")}
    });


$(document).ready(function(){
	var sHHRound = 1;
	var sHHBCCount = 0;

	    alert("ok")
	$("div#sHHLSBand").click(function(){
		if($(this).attr("class").indexOf("sHHLSBSelected") >= 0 && sHHBCCount > 0){
			sHHBCCount -= 1

			$(this).removeClass("sHHLSBSelected");
			$("div#sHHLSBDetails", this).removeClass("sHHLSBSelected")
			$("div#sHHLSBSCheckContainer", this).remove()

			updateRBSpan()
		} else if(sHHBCCount < 3){
			sHHBCCount += 1

			$(this).addClass("sHHLSBSelected")

			$("div#sHHLSBDetails", this).addClass("sHHLSBSelected").prepend(
				'<div id="sHHLSBSCheckContainer">'+
					'<img id="sHHLSBSCheck" src="/assets/sHHBandSelected.png"/>'+
				'</div>'
			);

			updateRBSpan()
		}
	});

	function updateRBSpan(){
		var sHHBCSNum = 3 - sHHBCCount
		$("span#sHHLFCounter").text(sHHBCSNum)

		if(sHHBCSNum < 3 && !$("span#sHHLFSpan div#sHHLFSubmit").is("*")){
			$("span#sHHLFSpan").append(
				'<div id="sHHLFSubmit" class="round">Round 2</div>'
			);
		}else if(sHHBCSNum == 3 && $("span#sHHLFSpan div#sHHLFSubmit").is("*")){
			$("span#sHHLFSpan div#sHHLFSubmit").remove()
		}
	}

	// TODO: Start should be, on page load, send 
	// ajax like one below, with start instead of shuffle

	$("div#sHHLSSButton").click(apiFn("shuffle"))

        function apiFn(action){
		var arg = "shuffle"
		var shuffleURL = "http://mitercam.mit.edu:8080/stubhack/api/" + arg;
		$.ajax({
			url: shuffleURL,
			type: "GET",
			dataType: "json",
			beforeSend: function(){
				console.log("sent ajax")
			},
			complete: function(){

			},
			error: function(response, status, error){
				alert("there was an error")
				console.log(response, status, error)	
			},
			success: function(data){
				alert("received ajax")
				console.log(data)	
var artists = [

    {
        "name": "Rage Against the Machine",
        "foreign_ids": [
            {
                "catalog": "musicbrainz",
                "foreign_id": "musicbrainz:artist:3798b104-01cb-484c-a3b0-56adc6399b80"
            },
            {
                "catalog": "songkick",
                "foreign_id": "songkick:artist:470548"
            }
        ],
        "hotttnesss": 0.55081,
        "images": [
            {
                "url": "http://upload.wikimedia.org/wikipedia/commons/b/b5/Audioslave_2005.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "Wyglif",
                    "url": "http://upload.wikimedia.org/wikipedia/commons/b/b5/Audioslave_2005.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/123297.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/123297.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/160805.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/160805.jpg"
                }
            },
            {
                "url": "http://upload.wikimedia.org/wikipedia/en/3/3c/RATM_-_Burningamp.jpg",
                "license": {
                    "type": "all-rights-reserved",
                    "attribution": "n/a",
                    "url": "http://en.wikipedia.org/wiki/File%3ARATM_-_Burningamp.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/256046.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/256046.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/15022.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/15022.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/382647.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/382647.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/70627.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/70627.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/71486.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/71486.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/135361.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/135361.jpg"
                }
            },
            {
                "url": "http://upload.wikimedia.org/wikipedia/en/6/69/Rage-sweatshops.jpg",
                "license": {
                    "type": "all-rights-reserved",
                    "attribution": "n/a",
                    "url": "http://en.wikipedia.org/wiki/File%3ARage-sweatshops.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/380903.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/380903.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/114764.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/114764.jpg"
                }
            },
            {
                "url": "http://upload.wikimedia.org/wikipedia/commons/5/5d/The_Democratic_National_Convention_Mumia_Abu-Jamal_Banner_With_Rage_Against_The_Machine_Fans.jpg",
                "license": {
                    "type": "cc-by",
                    "attribution": "Alejandro",
                    "url": "http://en.wikipedia.org/wiki/File%3AThe_Democratic_National_Convention_Mumia_Abu-Jamal_Banner_With_Rage_Against_The_Machine_Fans.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/9839.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/9839.jpg"
                }
            }
        ],
        "id": "ARCE0H01187B9AF741"
    },
    {
        "name": "Muse",
        "foreign_ids": [
            {
                "catalog": "musicbrainz",
                "foreign_id": "musicbrainz:artist:1695c115-bf3f-4014-9966-2b0c50179193"
            },
            {
                "catalog": "songkick",
                "foreign_id": "songkick:artist:219230"
            }
        ],
        "hotttnesss": 0.674943,
        "images": [
            {
                "url": "http://userserve-ak.last.fm/serve/500/16980845/Muse.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "FlipTonik",
                    "url": "www.last.fm/user/FlipTonik"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/500/20063117/Muse+16+17+anos.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "last.fm",
                    "url": "www.last.fm/"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/35147389/Muse+++The+Resistance+era.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "Diana_pl",
                    "url": "www.last.fm/user/Diana_pl"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/12887581/Muse.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "irockudont",
                    "url": "www.last.fm/user/irockudont"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/34205295/Muse+timesonline.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "n/a",
                    "url": "http://www.last.fm/music/Muse/+images"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/500/34223493/Muse+Warriors.png",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "schneckix",
                    "url": "www.last.fm/user/schneckix"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/34353621/Muse+escanear0002.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "Sarenka_b",
                    "url": "www.last.fm/user/Sarenka_b"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/500/13137435/Muse+26rx0.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "hahaha_muse",
                    "url": "www.last.fm/user/hahaha_muse"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/500/34679645/Muse+++The+Resistance+era.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "Diana_pl",
                    "url": "www.last.fm/user/Diana_pl"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/500/2511664/Muse.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "n/a",
                    "url": "http://www.last.fm/music/Muse/+images"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/12805671/Muse.png",
                "license": {
                    "type": "unknown",
                    "attribution": "n/a",
                    "url": "http://www.last.fm/music/Muse/+images"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/500/33561753/Muse.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "n/a",
                    "url": "http://www.last.fm/music/Muse/+images"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/23966485/Muse+early_.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "n/a",
                    "url": "http://www.last.fm/music/Muse/+images"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/500/34392269/Muse+horse.png",
                "license": {
                    "type": "unknown",
                    "attribution": "n/a",
                    "url": "http://www.last.fm/music/Muse/+images"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/27258499/Muse+O_o.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "n/a",
                    "url": "http://www.last.fm/music/Muse/+images"
                }
            }
        ],
        "id": "ARR3ONV1187B9A2F59"
    },
    {
        "name": "Placebo",
        "foreign_ids": [
            {
                "catalog": "musicbrainz",
                "foreign_id": "musicbrainz:artist:81b9963b-7ff7-47f7-9afb-fe454d8db43c"
            },
            {
                "catalog": "songkick",
                "foreign_id": "songkick:artist:324967"
            }
        ],
        "hotttnesss": 0.547807,
        "images": [
            {
                "url": "http://upload.wikimedia.org/wikipedia/commons/9/96/BrianMolkoLyonNovembre09.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "PlaceboVirus",
                    "url": "http://upload.wikimedia.org/wikipedia/commons/9/96/BrianMolkoLyonNovembre09.jpg"
                }
            },
            {
                "url": "http://upload.wikimedia.org/wikipedia/commons/a/a9/PlaceboBologna2009.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "Lycaon",
                    "url": "http://upload.wikimedia.org/wikipedia/commons/a/a9/PlaceboBologna2009.jpg"
                }
            },
            {
                "url": "http://upload.wikimedia.org/wikipedia/commons/2/26/Brian_molko-34.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "- Tarja",
                    "url": "http://en.wikipedia.org/wiki/File:Brian_molko-34.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/300854.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/300854.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/202033.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/202033.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/292397.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/292397.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/82853.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/82853.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/117000.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/117000.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/351930.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/351930.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/133691.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/133691.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/121350.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/121350.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/295560.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/295560.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/365207.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/365207.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/27302.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/27302.jpg"
                }
            },
            {
                "url": "http://upload.wikimedia.org/wikipedia/commons/2/25/Placebo_coachella.jpg",
                "license": {
                    "type": "cc-by",
                    "attribution": "FlickreviewR",
                    "url": "http://upload.wikimedia.org/wikipedia/commons/2/25/Placebo_coachella.jpg"
                }
            }
        ],
        "id": "AR6892W1187B9AC71B"
    },
    {
        "name": "Bob Seger",
        "foreign_ids": [
            {
                "catalog": "musicbrainz",
                "foreign_id": "musicbrainz:artist:4382b934-64c3-47ac-98db-65f26d845c48"
            },
            {
                "catalog": "songkick",
                "foreign_id": "songkick:artist:371453"
            }
        ],
        "hotttnesss": 0.53198,
        "images": [
            {
                "url": "http://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Bob_Seger.jpg/800px-Bob_Seger.jpg",
                "license": {
                    "type": "cc-by",
                    "attribution": "radioactv915",
                    "url": "http://en.wikipedia.org/wiki/File%3ABob_Seger.jpg"
                }
            },
            {
                "url": "http://upload.wikimedia.org/wikipedia/commons/7/73/Bob_Seger.jpg",
                "license": {
                    "type": "cc-by",
                    "attribution": "radioactv915",
                    "url": "http://en.wikipedia.org/wiki/File:Bob_Seger.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/14484.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/14484.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/2793602.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/2793602.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/500/51795037/Bob+Seger.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "Kari420",
                    "url": "www.last.fm/user/Kari420"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/20811075/Bob+Seger+seger2.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "DianeNC",
                    "url": "www.last.fm/user/DianeNC"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/500/2793602/Bob+Seger+Classy.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "Rosenort",
                    "url": "www.last.fm/user/Rosenort"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/20810139/Bob+Seger+BobSegerpic.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "DianeNC",
                    "url": "www.last.fm/user/DianeNC"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/20810803/Bob+Seger.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "DianeNC",
                    "url": "www.last.fm/user/DianeNC"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/500/9397511/Bob+Seger+BobSeger.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "Super_Dan",
                    "url": "www.last.fm/user/Super_Dan"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/51795079/Bob+Seger.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "Kari420",
                    "url": "www.last.fm/user/Kari420"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/48783419/Bob+Seger.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "ipodtouch2009",
                    "url": "www.last.fm/user/ipodtouch2009"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/31413971/Bob+Seger+bobseger02x365.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "hurricanes717",
                    "url": "www.last.fm/user/hurricanes717"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/10954437/Bob+Seger+seger.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "MidnightRider01",
                    "url": "www.last.fm/user/MidnightRider01"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/500/16235829/Bob+Seger+seger.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "EveDestruction",
                    "url": "www.last.fm/user/EveDestruction"
                }
            }
        ],
        "id": "ARJ45QE1187FB423B8"
    },
    {
        "name": "The Libertines",
        "foreign_ids": [
            {
                "catalog": "musicbrainz",
                "foreign_id": "musicbrainz:artist:82b304c0-7da4-45d3-896a-0767c7ae1141"
            },
            {
                "catalog": "songkick",
                "foreign_id": "songkick:artist:459044"
            }
        ],
        "hotttnesss": 0.472823,
        "images": [
            {
                "url": "http://userserve-ak.last.fm/serve/_/310724.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/310724.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/214168.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/214168.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/168425.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/168425.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/198916.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/198916.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/186174.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/186174.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/11337.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/11337.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/337147.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/337147.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/6235.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/6235.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/1162.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/1162.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/318156.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/318156.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/291006.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/291006.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/85711.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/85711.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/778164.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/778164.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/275213.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/275213.jpg"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/315087.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "last.fm",
                    "url": "http://userserve-ak.last.fm/serve/_/315087.jpg"
                }
            }
        ],
        "id": "ARUQYVH1187B9B2E61"
    },
    {
        "name": "The Rolling Stones",
        "foreign_ids": [
            {
                "catalog": "musicbrainz",
                "foreign_id": "musicbrainz:artist:b071f9fa-14b0-4217-8e97-eb41da73f598"
            },
            {
                "catalog": "songkick",
                "foreign_id": "songkick:artist:379603"
            }
        ],
        "hotttnesss": 0.59921,
        "images": [
            {
                "url": "http://upload.wikimedia.org/wikipedia/commons/8/8f/Mick_Taylor2.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "FlickreviewR",
                    "url": "http://upload.wikimedia.org/wikipedia/commons/8/8f/Mick_Taylor2.jpg"
                }
            },
            {
                "url": "//upload.wikimedia.org/wikipedia/commons/8/8f/Mick_Taylor2.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "FlickreviewR",
                    "url": "http://en.wikipedia.org/wiki/File:Mick_Taylor2.jpg"
                }
            },
            {
                "url": "http://upload.wikimedia.org/wikipedia/commons/1/17/Mick_Jagger_and_Ron_Wood_-_Rolling_Stones_-_1975.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "Howcheng",
                    "url": "http://en.wikipedia.org/wiki/File:Mick_Jagger_and_Ron_Wood_-_Rolling_Stones_-_1975.jpg"
                }
            },
            {
                "url": "http://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Mick_Jagger_and_Ron_Wood_-_Rolling_Stones_-_1975.jpg/348px-Mick_Jagger_and_Ron_Wood_-_Rolling_Stones_-_1975.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "n/a",
                    "url": "http://en.wikipedia.org/wiki/File:Mick_Jagger_and_Ron_Wood_-_Rolling_Stones_-_1975.jpg"
                }
            },
            {
                "url": "http://upload.wikimedia.org/wikipedia/en/e/ee/Stones_members_montage.JPG",
                "license": {
                    "type": "cc-by",
                    "attribution": "Moxy (talk | contribs)",
                    "url": "http://upload.wikimedia.org/wikipedia/en/e/ee/Stones_members_montage.JPG"
                }
            },
            {
                "url": "http://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Stones_members_montage.JPG/653px-Stones_members_montage.JPG",
                "license": {
                    "type": "unknown",
                    "attribution": "n/a",
                    "url": "http://en.wikipedia.org/wiki/File:Stones_members_montage.JPG"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/5775770/The+Rolling+Stones+prisonStone.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "last.fm",
                    "url": "www.last.fm/"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/500/5417803/The+Rolling+Stones++2008.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "bluetooth38",
                    "url": "www.last.fm/user/bluetooth38"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/2424887/The+Rolling+Stones+MickKeithCharlie.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "singga",
                    "url": "www.last.fm/user/singga"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/8387321/The+Rolling+Stones+start+me+up.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "n/a",
                    "url": "http://www.last.fm/music/The+Rolling+Stones/+images"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/23408343/The+Rolling+Stones+TheRollingStones.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "nowherelplans",
                    "url": "www.last.fm/user/nowherelplans"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/500/6719867/The+Rolling+Stones+from_stone_dragon_pix09.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "n/a",
                    "url": "http://www.last.fm/music/The+Rolling+Stones/+images"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/5735221/The+Rolling+Stones+4lastFM_04.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "n/a",
                    "url": "http://www.last.fm/music/The+Rolling+Stones/+images"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/500/36446413/The+Rolling+Stones+Rolling+Stones.jpg",
                "license": {
                    "type": "unknown",
                    "attribution": "n/a",
                    "url": "http://www.last.fm/music/The+Rolling+Stones/+images"
                }
            },
            {
                "url": "http://userserve-ak.last.fm/serve/_/6445119/The+Rolling+Stones+good_times.jpg",
                "license": {
                    "type": "cc-by-sa",
                    "attribution": "last.fm",
                    "url": "www.last.fm/"
                }
            }
        ],
        "id": "ARFCUN31187B9AD578"
    }

]
		var artists_1 =[
			{"name": "Kanye West"},
			{"name": "Kanye West"},
			{"name": "Kanye West"},
			{"name": "Kanye West"},
			{"name": "Kanye West"},
			{"name": "Kanye West"}
		]


				// Fill in artist info
				fillBandDetails(artists)
			}
		});
	} //);

	// Band details
	function fillBandDetails(artists){
		// Artist div id
		var artistDivs = $("div#sHHLSBDetails")
	
		for(var i=0, l=artists.length; i<l; i++){
			var artist = artists[i];
			var artistDiv = artistDivs[i];

			$(artistDiv).append(
				'<span id="sHHLSBDName">'+artist.name+'</span>'
			);
		}

	}


        
	//fillBandDetails()
	apiFn("start");

});
