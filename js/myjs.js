/*HTML DOM needed: 
<div data-slider> 
<div data-item="link-0">1</div> 
<div data-item="link-1">2</div> 
<div data-item="link-2">3</div> 
<div data-item="link-3">4</div> 
</div> 
*/ 
$.fn.slideAll = function(settingUser) { 
var settingDefault = { 
arrows: false, 
class: '',
bottom: false 
} 
var settings = $.extend(settingDefault, settingUser); 
$(this).each(function(index, el) { 
var controls = document.createElement('div'); 
controls.className +='controls'; 
var items = $(el).find('[data-item]'); 
for (var i = 0; i < items.length; i++) { 
var insertClass = ''; 
if(settings.class) { 
insertClass += settings.class; 
} 
if(i == 0) { 
insertClass += ' active'; 
} 
$(controls).append('<a href="#" data-link="link-'+i+'" class="'+insertClass+'"></a>'); 
}
if(settings.bottom) {
el.appendChild(controls);
} else { 
el.prepend(controls)
}
$(el).on('click', '[data-link]', function(event) { 
event.preventDefault(); 
items.hide(); 
$(el).find('a').removeClass('active'); 
$(this).addClass('active') 
$(el).find('[data-item="'+this.dataset.link+'"]').show(); 
}); 
if(settings.arrows) { 
var arrows = document.createElement('div'); 
arrows.className +='control-arrows'; 
$(arrows).append('<a href="#" data-slide="left" class="left-arrow"></a><a href="#" data-slide="right" class="right-arrow"></a>'); 
el.appendChild(arrows); 

$(el).on('click', '[data-slide]', function(event) { 
event.preventDefault(); 
var findSlideNum = $(el).find('a.active')[0].dataset.link.slice(5); 
$(el).find('a').removeClass('active'); 
if(this.dataset.slide == 'right') { 
if (parseInt(findSlideNum) < items.length -1) { 
findSlideNum = parseInt(findSlideNum) + 1; 
} 
} else { 
if (parseInt(findSlideNum) > 0) { 
findSlideNum = parseInt(findSlideNum) - 1; 
} 
} 
$(el).find('a').removeClass('active'); 
$(el).find('[data-item]').hide(); 
$(el).find('[data-link="link-'+findSlideNum+'"]').addClass(' active'); 
$(el).find('[data-item="link-'+findSlideNum+'"]').show(); 
}); 
} 
}) 
}
