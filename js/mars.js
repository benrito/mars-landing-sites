// PLUGIN: MARS/Text

(function ( Popcorn ) {

  /**
   * MARS popcorn plug-in
   * Adds text to an element on the page.
   * Options parameter will need a start, end, target and text.
   * Start is the time that you want this plug-in to execute
   * End is the time that you want this plug-in to stop executing
   * Text is the text that you want to appear in the target
   * Target is the id of the document element that the text needs to be
   * attached to, this target element must exist on the DOM
   *
   * @param {Object} options
   *
   * Example:
   *  var p = Popcorn('#video')
   *    .MARS({
   *      start: 5, // seconds
   *      end: 15, // seconds
   *      text: 'This video made exclusively for drumbeat.org',
   *      target: 'MARSdiv'
   *    });
   **/

  Popcorn.plugin( "MARS", {

    manifest: {
      about: {
        name: "Popcorn MARS Plugin",
        version: "3.0",
        author: "",
        website: "kqed.org"
      },
      options: {
        start: {
          elem: "input",
          type: "number",
          label: "Start"
        },
        end: {
          elem: "input",
          type: "number",
          label: "End"
        },
        type: {
          elem: "input",
          type: "text",
          label: "Type"
        },
        lat: {
          elem: "input",
          type: "text",
          label: "lat"
        },
        lng: {
          elem: "input",
          type: "text",
          label: "long"
        },
        zoom: 2,
        target: "MARS-container"
      }
    },

    marsMap: function(){},
    
    _setup: function( options ) {
      //Popcorn.getScript( "http://maps.google.com/maps?file=api&v=2&sensor=false" );
      
      var target = Popcorn.dom.find( options.target );
      target.style.visibility = "hidden";
      
      var enumType = G_MARS_ELEVATION_MAP;
      switch( options.type ) {
        case ("G_MARS_ELEVATION_MAP"):
          enumType = G_MARS_ELEVATION_MAP;
          break;
        case ("G_MARS_VISIBLE_MAP"):
          enumType = G_MARS_VISIBLE_MAP;
          break;
        case ("G_MARS_INFRARED_MAP"):
          enumType = G_MARS_INFRARED_MAP;
          break;
      }
        
      marsMap = new GMap2(document.getElementById( options.target ), {
          mapTypes:[ enumType ]
      });
	  marsMap.setCenter(new GLatLng( options.lat, options.lng), options.zoom);
	  marsMap.enableScrollWheelZoom();
      
    },

    /**
     * @member MARS
     * The start function will be executed when the currentTime
     * of the video  reaches the start time provided by the
     * options variable
     */
    start: function( event, options ){      
      var target = Popcorn.dom.find( options.target );
      target.style.visibility = "visible";
      
      for( var i = 1; i<=7; i++){
	    setTimeout(function(){
    	  marsMap.setCenter(new GLatLng( options.lat, options.lng), options.zoom++);
  	    }, 600*i);
      }

      
    },

    /**
     * @member MARS
     * The end function will be executed when the currentTime
     * of the video  reaches the end time provided by the
     * options variable
     */
    end: function( event, options ){
      var target = Popcorn.dom.find( options.target );
      target.style.visibility = "hidden";
    },

    _teardown: function( options ) {

    }

  });
})( Popcorn );