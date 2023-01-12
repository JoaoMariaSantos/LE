$(document).mousemove(function(e){
    //Get 'container' offset:
    o = $('.cursor').offset();
    //Track mouse position:
    $(".dot").css({
      "top": e.pageY - o.top,
      "left": e.pageX - o.left
    });
});