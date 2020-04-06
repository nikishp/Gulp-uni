$.fn.equalizeHeights = function() {
  var maxHeight = this.map(function( i, e ) {
    return $( e ).outerHeight();
  }).get();
  return this.outerHeight( Math.max.apply( this, maxHeight ) );
};


function dynamicHeight(we){
  setTimeout(function(){
    we.equalizeHeights();
  },150);

  $(window).on('resize', function() {
    we.prop('style', '');
    we.equalizeHeights();
  });
};
