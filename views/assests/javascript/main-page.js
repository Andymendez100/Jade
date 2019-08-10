$(document).ready(function () {
 var itemsMainDiv = ('.MultiCarousel');
 var itemsDiv = ('.MultiCarousel-inner');
 var itemWidth = "";
 
 $('.leftLst, .rightLst').click(function () {
   var condition = $(this).hasClass("leftLst");
   if (condition)
     click(0, this);
   else
     click(1, this)
 });
 
 ResCarouselSize();
 
 
 
 
 $(window).resize(function () {
   ResCarouselSize();
 });
 
 //this function define the size of the items
 
 
 function ResCarouselSize() {
   var incno = 0;
   var dataItems = ("data-items");
   var itemClass = ('.item');
   var id = 0;
   var btnParentSb = '';
   var itemsSplit = '';
   var sampwidth = $(itemsMainDiv).width();
   var bodyWidth = $('body').width();
   $(itemsDiv).each(function () {
     id = id + 1;
     var itemNumbers = $(this).find(itemClass).length;
     btnParentSb = $(this).parent().attr(dataItems);
     itemsSplit = btnParentSb.split(',');
     $(this).parent().attr("id", "MultiCarousel" + id);
 
 
     if (bodyWidth >= 1200) {
       incno = itemsSplit[3];
       itemWidth = sampwidth / incno;
     }
     else if (bodyWidth >= 992) {
       incno = itemsSplit[2];
       itemWidth = sampwidth / incno;
     }
     else if (bodyWidth >= 768) {
       incno = itemsSplit[1];
       itemWidth = sampwidth / incno;
     }
     else {
       incno = itemsSplit[0];
       itemWidth = sampwidth / incno;
     }
     $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
     $(this).find(itemClass).each(function () {
       $(this).outerWidth(itemWidth);
     });
 
     $(".leftLst").addClass("over");
     $(".rightLst").removeClass("over");
 
   });
 }
 
 
 //this function used to move the items
 function ResCarousel(e, el, s) {
   var leftBtn = ('.leftLst');
   var rightBtn = ('.rightLst');
   var translateXval = '';
   var divStyle = $(el + ' ' + itemsDiv).css('transform');
   var values = divStyle.match(/-?[\d\.]+/g);
   var xds = Math.abs(values[4]);
   if (e == 0) {
     translateXval = parseInt(xds) - parseInt(itemWidth * s);
     $(el + ' ' + rightBtn).removeClass("over");
 
     if (translateXval <= itemWidth / 2) {
       translateXval = 0;
       $(el + ' ' + leftBtn).addClass("over");
     }
   }
   else if (e == 1) {
     var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
     translateXval = parseInt(xds) + parseInt(itemWidth * s);
     $(el + ' ' + leftBtn).removeClass("over");
 
     if (translateXval >= itemsCondition - itemWidth / 2) {
       translateXval = itemsCondition;
       $(el + ' ' + rightBtn).addClass("over");
     }
   }
   $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
 }
 
 //It is used to get some elements from btn
 function click(ell, ee) {
   var Parent = "#" + $(ee).parent().attr("id");
   var slide = $(Parent).attr("data-slide");
   ResCarousel(ell, Parent, slide);
 }
 
});
 
// animation to top bar //-----------------------------------------------
(function ($) {
 "use strict"; // Start of use strict
 
 // Smooth scrolling using jQuery easing
 $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
   if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
     var target = $(this.hash);
     target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
     if (target.length) {
       $('html, body').animate({
         scrollTop: (target.offset().top - 71)
       }, 1000, "easeInOutExpo");
       return false;
     }
   }
 });
 
 // Scroll to top button appear
 $(document).scroll(function () {
   var scrollDistance = $(this).scrollTop();
   if (scrollDistance > 100) {
     $('.scroll-to-top').fadeIn();
   } else {
     $('.scroll-to-top').fadeOut();
   }
 });
 
 // Closes responsive menu when a scroll trigger link is clicked
 $('.js-scroll-trigger').click(function () {
   $('.navbar-collapse').collapse('hide');
 });
 
 // Activate scrollspy to add active class to navbar items on scroll
 $('body').scrollspy({
   target: '#mainNav',
   offset: 80
 });
 
 // Collapse Navbar
 var navbarCollapse = function () {
   if ($("#mainNav").offset().top > 100) {
     $("#mainNav").addClass("navbar-shrink");
   } else {
     $("#mainNav").removeClass("navbar-shrink");
   }
 };
 // Collapse now if page is not at top
 navbarCollapse();
 // Collapse the navbar when page is scrolled
 $(window).scroll(navbarCollapse);
 
 // Floating label headings for the contact form
 $(function () {
   $("body").on("input propertychange", ".floating-label-form-group", function (e) {
     $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
   }).on("focus", ".floating-label-form-group", function () {
     $(this).addClass("floating-label-form-group-with-focus");
   }).on("blur", ".floating-label-form-group", function () {
     $(this).removeClass("floating-label-form-group-with-focus");
   });
 });
 
})(jQuery); // End of use strict
 
 
 // flip effect on cards
 
