define([ "jquery", "underscore", "backbone" ],
	
	function( $, _, Backbone ){
	
		(function() {
	
			var  
			bootstrap = SP.app.bootstrap, mixins = {}, w = window;

			
			mixins.removeCollectionByVal = function( items, key, value )
			{
				_.log( arguments );
				for ( var i = 0; i < items.length; i++){
					_.log( items[i][ key ], value );
				    if ( items[i][ key ] && items[i][ key ] == value ) { 
				        items.splice(i, 1);
				        break;
				    }				
				};	
				return items;
			};

			
			mixins.keyDownNumber = function( event )
			{
				// Allow only backspace and delete and tab
				if (event.keyCode == 188 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 9 || event.keyCode == 46 || event.keyCode == 8 ||  event.keyCode == 190 || event.keyCode == 110 ||  (event.keyCode>=96 && event.keyCode<=105) ) {
					return true;
				}
				else {
					if (event.keyCode < 48 || event.keyCode > 57 ) {
						event.preventDefault();	
					}							
				}
			};
			
			mixins.parseObject = function( obj )
			{
				var copy = {}, copy2 = {};
				
				_.deepCopy( copy, obj );

				_.each( copy, function( c, idx ){
					
					if( ! _.isArray( c ) && ! _.isObject( c ) )
					{
						copy2[ idx ] = c;
					}
					
				});

				
				
				return JSON.stringify( copy2 );
			};


			mixins.writeString = function( s )
			{	
				s = new String( s );
				s = s.replace( /function \(\){/, '' );
				s = s.replace( /function\(\){/, '' );
				s = s.replace( /\*\/}/, '' );
				s = s.replace( /\//, '', -1 );
				s = s.replace( /\*/, '', -1 );
				return s;
			};


			//boostrapData
			//will bootstap all data that is needed to start the app
			//object to pass in the singleton object to attach all objects too
			//collectionsMaps is a object of all the collection/models you want loaded
			//success is the success method if this all works well
			//error is the error method if this fails
			 
			mixins.bootstrapData = function( bootstrap, preload, success, error )
			{
				if( _.isUndefined( success ) || ! _.isFunction( success ) ) throw new Error( 'Please provide a success method' );
				
				
				error = error || function(){ _.log( arguments[ 0 ] + ' ' + arguments[ 3 ] ); };
			
				var deferredObjects = [], deferred = null, keys = _.keys( preload );
				
				_.each( keys, function( key ){ 
					
					if( _.isUndefined( bootstrap[ key ] ) ) bootstrap[ key ] = {};
					
					_.extend( bootstrap[ key ], preload[ key ] );
					
					_.each( preload[ key ], function( collection ){
						deferredObjects.push( collection );
					});	
				});
				
				deferred = _.map( deferredObjects, function( deferredObject ){ return deferredObject.fetch(); });
				
				$.when.apply( this, deferred ).then( success, error );
				
				return this;
			};
			
			mixins.squash = function( obj )
			{
				for( var key in obj ) 
				{
					if( ! obj[ key ] )  delete obj[ key ];				
				}				
				
				return obj;
			}
			
			mixins.ifNull = function( item, defaultVal )
			{				
				return _.isNull( item ) ? defaultVal || '' : item;
			};
			
			mixins.getPlatformPath = function()
			{
				var check = false;
				(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);

				return ( check ? 'mobile' : 'desktop' ) + '/' + ( w.location.pathname.indexOf( '/administrator/' ) == -1 ? 'frontend' : 'admin' ) + '/';
			};			


			mixins.setCustomXHRRequest = function( xhr, url, ignore )
			{
				var
				urlAsArray 	= url.split( '/' ),
				lastIndex  	= _.lastIndexOf( urlAsArray ),
				newPath		= _.getPlatformPath() + urlAsArray.pop();
				
				//TODO
				//needs to be dynamic
				//needs to breack up the chunks into data slugs which then can parse the ui an vX
				//this way we won't have to alter this anymore. 
				if(  _.contains( urlAsArray, 'ui-v2' ) || _.contains( urlAsArray, 'ui-v1' ) ) return xhr;
				
				//splice in the new path info
				urlAsArray.splice( _.indexOf( urlAsArray, 'templates' ) + 1, 0, _.getPlatformPath().slice( 0, -1 ) );
				
				//set the xhr request
				xhr.open( 'get', urlAsArray.join( '/' ) + '/' + url.split( '/' ).pop(), true );
				
				return this;
			};			
			
			//console log
			mixins.log 		= function()
			{
				if( arguments.length == 0 )
				{
					console.log( new Date().getTime() );
				}
				else
				{
					for( var i = 0; i < arguments.length; i++ )
					{
						console.log( arguments[ i ] );
					}
				}
			};	

			
			mixins.loadCSS = function()
			{
				var link 	= document.createElement("link");
				link.type 	= "text/css";
				link.rel 	= "stylesheet";
				link.href 	= url;
				document.getElementsByTagName("head")[0].appendChild(link);
				
				return this;					
			}
			


			mixins.deepCopy = function(destination, source) {
			  for (var property in source) {
			    if (source[property] && source[property].constructor &&
			     source[property].constructor === Object) {
			      destination[property] = destination[property] || {};
			      arguments.callee(destination[property], source[property]);
			    } else {
			      destination[property] = source[property];
			    }
			  }
			  return destination;
			};			

			mixins.deepExtend = function(obj) {
			  var parentRE = /#{\s*?_\s*?}/,
			      slice = Array.prototype.slice,
			      hasOwnProperty = Object.prototype.hasOwnProperty;
			 
			  _.each(slice.call(arguments, 1), function(source) {
			    for (var prop in source) {
			      if (hasOwnProperty.call(source, prop)) {
			        if (_.isUndefined(obj[prop]) || _.isFunction(obj[prop]) || _.isNull(source[prop])) {
			          obj[prop] = source[prop];
			        }
			        else if (_.isString(source[prop]) && parentRE.test(source[prop])) {
			          if (_.isString(obj[prop])) {
			            obj[prop] = source[prop].replace(parentRE, obj[prop]);
			          }
			        }
			        else if (_.isArray(obj[prop]) || _.isArray(source[prop])){
			          if (!_.isArray(obj[prop]) || !_.isArray(source[prop])){
			            throw 'Error: Trying to combine an array with a non-array (' + prop + ')';
			          } else {
			            obj[prop] = _.reject(_.deepExtend(obj[prop], source[prop]), function (item) { return _.isNull(item);});
			          }
			        }
			        else if (_.isObject(obj[prop]) || _.isObject(source[prop])){
			          if (!_.isObject(obj[prop]) || !_.isObject(source[prop])){
			            throw 'Error: Trying to combine an object with a non-object (' + prop + ')';
			          } else {
			            obj[prop] = _.deepExtend(obj[prop], source[prop]);
			          }
			        } else {
			          obj[prop] = source[prop];
			        }
			      }
			    }
			  });
			  return obj;
			};
			 

			mixins.fileExists = function( $url )
			{
				var http = new XMLHttpRequest();
				http.open('HEAD', $url, false);
				http.send();
				return http.status!=404;								
			};
		

			//THE BELOW NEED TO BE CREATED INTO JQUERY PLUGINS JOSH GONZALEZ
				
			mixins.wrapFader 	= function( $parent, $el, z )
			{
				var z = z || '';
		    	//remove the old fader	        	
				$parent.find( '.fader' ).remove();
				
				//add in the fader		
				$el.prepend( $( '<div />', { 'class' : 'fader ' + z } ) );	
				$el.find( '.fader' ).css( 'background', '#e7ffcc' );
				$el.find( '> div:first-child' ).animate({ 'opacity' : '0' }, 3000, function(){
					$el.find( '.fader' ).delay().remove();
					
				});	
				
			};
			
			mixins.tabElevator = function( $container, $el, $tabs )
			{
				var 
				offsetHeight	= 150,
				containerH 		= $container.height(),
				top 			= $el.offset().top - $el.parent().offset().top - $el.parent().scrollTop();
				
				if( top > 20 ) top -= 30;
				
				$tabs.animate( { 'top' : top + 'px'  }, 500 );
		
				if( top % containerH > 150 ) $container.animate({ 'height' : containerH + offsetHeight + 'px' }, 500 );
					
				return _;				
			};
			
				
			_.mixin( mixins );
		
		}).call( this );
	
	}
	
);