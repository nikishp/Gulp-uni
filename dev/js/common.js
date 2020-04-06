$(function () {

  svg4everybody();
  objectFitImages();

  var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  //dynamicHeight($('.you_class'));
  $('.lazy').Lazy({
    delay: 2000
  });

  $("[data-fancybox]").fancybox({
    touch: false,
    backFocus: false,
    autoFocus: false, 
  });

  $('.hamburger--js').on('click', function (event) {
    $(this).toggleClass('open');
  });

  var $form = $('.form');

  $form.on('click', function (event) {
    var formId = $(this).attr("id");
    // console.log('formId ' + formId);
    localStorage.setItem('form', formId);
    var pageName = window.location.pathname;
    // console.log('pageName ' + pageName);
    localStorage.setItem('currentPage', pageName);
  });

  //	E-mail Ajax Send
  $form.each(function () {
    //    var $this = $(this);
    $(this).validate({

      // rules: {
      // 	phone: {
      // 		required: true,
      // 		minlength: 6,
      // 		number: true
      // 	}
      // },

      submitHandler: function (form) {
        var formData = new FormData(form);
        $.ajax({
          type: "POST",
          url: "mail.php",
          data: formData,
          contentType: false,
          dataType: "json",
          processData: false,
          beforeSend: function () {
            $(form).find('.btn').attr("disabled", true);
            $(form).find('.form-load').css({
              'width': '20px',
              'margin-left': '10px'
            });
            console.log('before send')
          }
        }).done(function () {
          $(form).find('.btn').attr("disabled", false);
          $(form).find('.form-load').css({
            'width': '0',
            'margin-left': '0'
          });
          $(form).trigger("reset");
          // $.magnificPopup.close();
          $.fancybox.close();
          //window.location.href = "thanks.html";
          console.log('done')
        }).fail(function () {
          alert("Error, email not sent !");
          console.log('error')
        });
      }
    });
  });

  //popup form
  // $('.popup-js').magnificPopup({
  //     type: 'inline',
  //     preloader: false,
  //     focus: '#name',
  //     callbacks: {
  //         beforeOpen: function() {
  //             if ($(window).width() < 700) {
  //                 this.st.focus = false;
  //             } else {
  //                 this.st.focus = '#name';
  //             }
  //         }
  //     }
  // });

  //phone mask
  // $('input[type="tel"]').mask("+9(999)999-99-99");

  //animate pege element
  // функция выбирает селектор, вешает ему анимационный класс, задает начальную задержку, задает добавочное время на каждую итерацию
  // function animateItem(selector, animateClass, animateStartPoint, animateIncrement) {
  //   var animCount = animateStartPoint;
  //   $(selector).each(function(index, el) {
  //     $(el).css('animation-delay', animCount + 's').animated(animateClass);
  //     animCount = animCount + animateIncrement;
  //   });
  // };

  // if (screen.width > 768) {
  //     // $(".you_class").animated("bounceIn");
  //     // $(".you_class").css('animation-delay', '0.5s').animated("bounceInLeft");
  //     animateItem(".you_class", "bounceInLeft", 0, 0);
  //     animateItem(".you_class", "fadeInLeft", 0, 0.2);
  // };

  //form styler
  // $('input, select').styler();

  // // close menu if click on "body"
  // $(document).mouseup(function (e) {
  //   if(menu.is(":visible") && $(e.target).closest('.header__nav-wrap').length == 0 && windowWidth < startWidth){
  //     $('.header__list-sublist-wrap').css('display', 'none');
  //     menu.stop(true,true).slideToggle();
  //     $('.hamburger--collapse').stop(true,true).toggleClass('is-active');
  //     console.log('close menu if click on "body"')
  //   }
  // });

  //easyscroll
  //  $(".easyscroll").on("click", function (event) {
  //    event.preventDefault();
  //    var id  = $(this).attr('href'),
  //    top = $(id).offset().top;
  //    $('body,html').stop(true).animate({scrollTop: top}, 600);
  //  });

  $(window).resize(function () {
    windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    refreshVar(); //part of the function of fixing the menu
  });

  //menu fixed on scroll
  var navPos, winPos, navHeight;

  function refreshVar() {
    // navPos = $('nav').offset().top;
    navPos = $('.header').outerHeight(true) / 2;
    // console.log("navPos", navPos);
    navHeight = $('.header__top-line').outerHeight(true);
    // console.log("navHeight", navHeight);
  };
  refreshVar();

  $('<div class="header__top-line--clone"></div>').insertBefore('.header__top-line').css('height', navHeight).hide();

  $(window).scroll(function () {

    winPos = $(window).scrollTop();
    // console.log("winPos", winPos);
    if (winPos >= navPos) {
      $('.header__top-line').addClass('header__top-line--fixed');
      $('.header__top-line--clone').show();
    } else {
      $('.header__top-line').removeClass('header__top-line--fixed');
      $('.header__top-line--clone').hide();
    }

  });
  //menu fixed on scroll end

  //menu scroll and add class on scroll

  //scroll
  // var navHeight = $(".header__top-line").outerHeight(true);

  // function showSection(section, isAnimate) {
  //   var direction = section.replace(/#/, '');
  //   // console.log(direction)
  //   var reqSection = $('.section').filter('[data-section="' + direction + '"]');

  //   var reqSectionPos = reqSection.offset().top - navHeight + 1;
  //   // console.log("reqSectionPos", reqSectionPos);

  //   if (isAnimate) {
  //     $('body, html').animate({
  //       scrollTop: reqSectionPos
  //     }, 500);
  //   } else {
  //     $('body, html').scrollTop(reqSectionPos);
  //   }
  // };

  //вызывать по клику  showSection($(this).attr('href'), true);
  // $('.header__list-link').on('click', function (event) {
  //   event.preventDefault();
  //   showSection($(this).attr('href'), true);
  // });
  //scroll end

  //add class
  // function checkSection() {

  //   $('.section').each(function () {
  //     var $this = $(this),
  //       topEdge = $this.offset().top - $('.header__top-line').outerHeight(true),
  //       bottomEdge = topEdge + $this.outerHeight(true),
  //       wScroll = $(window).scrollTop();

  //     if (topEdge < wScroll && bottomEdge > wScroll) {

  //       var currentId = $this.data('section'),
  //         reqLink = $('.header__list-link').filter('[href="#' + currentId + '"]');

  //       reqLink.closest('.header__list-item').addClass('header__list-item--active').siblings().removeClass('header__list-item--active');

  //       //простовляния хешей в адрессную строку
  //       if (history.pushState) {
  //         history.pushState(null, null, "#" + currentId);
  //         // console.log("modern work");
  //       } else {
  //         // window.location.hash = currentId;
  //         location.hash = currentId;
  //         // console.log("old work");
  //       }

  //     }
  //   });

  // };

  // уменьшаю количество вызова функций при скролле
  /*
  var scrollTimeout;  // global for any pending scrollTimeout
  $(window).scroll(function () {
    if (scrollTimeout) {
      // clear the timeout, if one is pending
      clearTimeout(scrollTimeout);
      scrollTimeout = null;
    }
    scrollTimeout = setTimeout(checkSection, 500);
  });
  */

  //method 2 (default)
  // var didScroll = false;

  // window.onscroll = doThisStuffOnScroll;

  // function doThisStuffOnScroll() {
  //   didScroll = true;
  // }

  // setInterval(function () {
  //   if (didScroll) {
  //     didScroll = false;
  //     checkSection();
  //   }
  // }, 500);

  //add class end

  //menu scroll and add class on scroll end

  // timer
  // in html: .counter#clock
  // var finishData = moment.tz("2018-09-12 13:00", "Europe/Moscow"),
  //     countTextDay = 'Day',
  //     countTextHour = 'Hour',
  //     countTextMinute = 'Minute',
  //     countTextSecond = 'Second';

  // $('#clock').countdown(finishData.toDate(), function(event) {
  //     // $(this).html(event.strftime('<span>%D</span>  <span>%H</span> <span>%M</span> <span> %S</span>'));
  //     $(this).html(event.strftime('<div class="counter__item counter__item--day"><div class="counter__item-info"><div class="counter__item-numb">%D</div><div class="counter__item-title">' + countTextDay + '</div></div><div class="counter__item-dots"><svg xmlns="http://www.w3.org/2000/svg" width="202.857" height="570" viewBox="0 0 53.673 150.813"><g transform="translate(-27.403 -29.582)"><circle cx="54.618" cy="56.04" r="26.458"/><circle cx="53.862" cy="153.936" r="26.458"/></g></svg></div></div><div class="counter__item counter__item--hour"><div class="counter__item-info"><div class="counter__item-numb">%H</div><div class="counter__item-title">' + countTextHour + '</div></div><div class="counter__item-dots"><svg xmlns="http://www.w3.org/2000/svg" width="202.857" height="570" viewBox="0 0 53.673 150.813"><g transform="translate(-27.403 -29.582)"><circle cx="54.618" cy="56.04" r="26.458"/><circle cx="53.862" cy="153.936" r="26.458"/></g></svg></div></div><div class="counter__item counter__item--minute"><div class="counter__item-info"><div class="counter__item-numb">%M</div><div class="counter__item-title">' + countTextMinute + '</div></div><div class="counter__item-dots"><svg xmlns="http://www.w3.org/2000/svg" width="202.857" height="570" viewBox="0 0 53.673 150.813"><g transform="translate(-27.403 -29.582)"><circle cx="54.618" cy="56.04" r="26.458"/><circle cx="53.862" cy="153.936" r="26.458"/></g></svg></div></div><div class="counter__item counter__item--second"><div class="counter__item-info"><div class="counter__item-numb">%S</div><div class="counter__item-title">' + countTextSecond + '</div></div></div>'));
  // });



}); //jQuery


//removeIf(production)
function pageWidget(pages) {
  var widgetWrap = $('<div class="widget_wrap"><ul  class="widget_list"></ul></div>');
  widgetWrap.prependTo("body");

  var allPage = $('<ul class="allPage-list"></ul');
  // allPage.prependTo("body"); //выводит все старницы в начало страницы

  var widgetPageList = '';

  for (var i = 0; i < pages.length; i++) {
    $('<li class="widget_item"><a class="widget_link" href="' + pages[i] + '.html' + '">' + pages[i] + '</a></li>').appendTo('.widget_list');
    //виводит линку на кажду страницу в лишке
    // $('<li class="allPage-list__item"><a class="allPage-list__link" href="'+pages[i] + '.html' + '">' + pages[i] + '</a></li>').appendTo('.allPage-list');
  }

  var widgetStilization = $('<style>body{position:relative}.widget_wrap{position:fixed;top:0;left:-12px;z-index:9999;padding:10px 20px;background:#222;border-bottom-right-radius:10px;transition:all .3s ease;transform:translate(-100%,0)}.widget_wrap ul{max-width:220px;width:100%;display:flex;flex-wrap:wrap}.widget_wrap:after{content:" ";position:absolute;top:0;left:100%;width:24px;height:24px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRF////////AAAA////BQBkwgAAAAN0Uk5TxMMAjAd+zwAAACNJREFUCNdjqP///y/DfyBg+LVq1Xoo8W8/CkFYAmwA0Kg/AFcANT5fe7l4AAAAAElFTkSuQmCC) 50% 50% no-repeat #222;cursor:pointer}.widget_wrap:hover{left:0;transform:translate(0,0)}.widget_item{padding:0 0 10px}.widget_link{display:block;color:#fff;text-decoration:none;font-size:15px;width:100px}.widget_link:hover{color:#fff;text-decoration:underline}</style>');
  widgetStilization.prependTo(".widget_wrap")
};
pageWidget(['index', 'thanks'])


////pixel-glass-js-master
//window.onload=function(){pixelGlass()};
//function pixelGlass(){'use strict';var doc=document;var controlsPanel;var bodyContentWrapper;var panelClass='controls-panel';var canBeDisabled=[];var prefix='pg';var filtersList=['none','invert'];var statesList=['off','on'];var currents={state:getCurrent('state',statesList[1]),filter:getCurrent('filter',filtersList[0]),opacity:getCurrent('opacity',0.5)};var targets={state:{elem:doc.documentElement,attr:'data'},filter:{elem:doc.body,attr:'data'},opacity:{elem:doc.body,attr:'style'}};var paramsStates={elemTag:'button',elemText:'on',listName:'states',itemName:'state',target:targets.state,type:'button',list:statesList,canDisableAll:!0,attrs:{tabindex:1,}};var paramsFilters={elemTag:'button',elemText:'invert',listName:'filters',itemName:'filter',target:targets.filter,type:'button',list:filtersList,attrs:{tabindex:2,}};var paramsOpacity={itemName:'opacity',type:'number',target:targets.opacity,setAttr:'style',attrs:{min:0,max:1,step:0.1,tabindex:3,}};init();function init(){createContolsPanel();applyCurrentData();if(currents.state==='on'){applyCurrentStyles()}}
//function createContolsPanel(){var targetElem=doc.documentElement;if(hasData(doc.body,'has-sticky-point')){var stickyPoint=doc.querySelector('.sticky-point');if(stickyPoint&&!localStorage['pg-released']){targetElem=stickyPoint}
//currents.state='off'}
//controlsPanel=doc.createElement('div');controlsPanel.classList.add(panelClass);targetElem.appendChild(controlsPanel);var sides=['top','right','bottom','left'];sides.forEach(function(item){var itemVal=getCurrent(item,'');if(itemVal){controlsPanel.style[item]=itemVal}});initControls()}
//function initControls(){createButton(paramsStates);createButton(paramsFilters);createInputNumber(paramsOpacity);createDragButton()}
//function createButton(params){var listName=params.listName;var itemName=params.itemName;var elemTag=params.elemTag;var elemText=params.elemText;var type=params.type;var list=params.list;var action=params.action;var currentVal=currents[itemName];var attrs=params.attrs;var currentNum=list.indexOf(currentVal);var canDisableAll=params.canDisableAll;var id=itemName;var input=doc.createElement(elemTag);setClasses(input,[panelClass+'__control',panelClass+'__control--'+type]);input.setAttribute('type',type);input.setAttribute('id',id);setData(input,'state-num',currentNum);if(attrs){for(var attr in attrs){input.setAttribute(attr,attrs[attr])}}
//if(elemTag==='button'){input.innerHTML=elemText}
//if(!canDisableAll){canBeDisabled.push(input)}
//controlsPanel.appendChild(input);input.onclick=function(){if(!params.target){return}
//currentNum=+!currentNum;currentVal=list[currentNum];setData(input,'state-num',currentNum);setData(params.target.elem,itemName,currentVal);saveLocalStorage(itemName,currentVal);if(canDisableAll&&canDisableAll===!0){if(currentVal==='off'){removeCurrentStyles();disableInputs()}
//else{applyCurrentStyles();enableInputs()}}}}
//function createInputNumber(params){var itemName=params.itemName;var attrs=params.attrs;var type=params.type;var setAttr=params.setAttr;var canDisableAll=params.canDisableAll;var id=itemName;var input=doc.createElement('input');setClasses(input,[panelClass+'__control',panelClass+'__control--'+type]);input.setAttribute('type',type);input.setAttribute('id',id);for(var attr in attrs){input.setAttribute(attr,attrs[attr])}
//input.setAttribute('value',currents[itemName]);if(!canDisableAll){canBeDisabled.push(input)}
//controlsPanel.appendChild(input);input.oninput=function(){if(setAttr==='style'){params.target.elem.style[itemName]=this.value;saveLocalStorage(itemName,this.value)}}}
//function createDragButton(){var input=doc.createElement('button');setClasses(input,[panelClass+'__control',panelClass+'__control--drag-n-drop']);input.setAttribute('type','button');input.innerHTML=' ';controlsPanel.appendChild(input);input.onmousedown=function(){var offsetTop=this.offsetTop;var offsetLeft=controlsPanel.clientWidth-this.clientWidth;var styles=getComputedStyle(controlsPanel);controlsPanel.style.top=styles.top;controlsPanel.style.left=styles.left;controlsPanel.style.right='auto';controlsPanel.style.bottom='auto';doc.onmousemove=function(ev){var x=(ev.clientX-offsetLeft)+'px';var y=(ev.clientY)+'px';controlsPanel.style.left=x;controlsPanel.style.top=y}};input.onmouseup=function(){var styles=getComputedStyle(controlsPanel);var left=+styles.left.replace(/px/,'');var right=+styles.right.replace(/px/,'');var top=+styles.top.replace(/px/,'');var bottom=+styles.bottom.replace(/px/,'');if(left>right){saveLocalStorage('left','auto');saveLocalStorage('right',styles.right);controlsPanel.style.right=styles.right;controlsPanel.style.left='auto'}
//else{saveLocalStorage('left',styles.left);saveLocalStorage('right','auto')}
//if(top>bottom){saveLocalStorage('top','auto');saveLocalStorage('bottom',styles.bottom);controlsPanel.style.bottom=styles.bottom;controlsPanel.style.top='auto'}
//else{saveLocalStorage('top',styles.top);saveLocalStorage('bottom','auto')}
//doc.onmousemove=null}}
//function disableInputs(){canBeDisabled.forEach(function(item){item.setAttribute('disabled','')})}
//function enableInputs(){canBeDisabled.forEach(function(item){item.removeAttribute('disabled')})}
//function getCurrent(name,defaultValue){var itemName=[prefix,name].join('-');var localStorageVal=localStorage[itemName];return localStorageVal?localStorageVal:defaultValue}
//function saveLocalStorage(name,value){var itemName=[prefix,name].join('-');localStorage[itemName]=value}
//function getBodyOpacity(){var opacityStr=getComputedStyle(doc.body).opacity;return+opacityStr}
//function addExternalCSS(){var styleElem=doc.createElement('style');var cssLink=doc.createElement('link');cssLink.setAttribute('rel','stylesheet');cssLink.setAttribute('href','../pixel-glass-js/styles.css');doc.head.appendChild(cssLink)}
//function applyCurrentData(){for(var key in targets){var target=targets[key];var current=currents[key];if(target.attr==='data'){setData(target.elem,key,current)}}
//if(currents.state==='off'){disableInputs()}}
//function applyCurrentStyles(){for(var key in targets){var target=targets[key];var current=currents[key];if(target.attr==='style'){target.elem.style[key]=current}}}
//function removeCurrentStyles(){for(var key in targets){var target=targets[key];if(target.attr==='style'){target.elem.style[key]=''}}}
//function hasData(elem,dataName){if(!elem){return!1}
//dataName='data-'+dataName;if(elem.getAttribute(dataName)!==undefined&&elem.getAttribute(dataName)!==null){return!0}
//return!1}
//function setData(elem,dataName,dataVal){if(!elem){return}
//dataName='data-'+dataName;elem.setAttribute(dataName,dataVal)}
//function setClasses(elem,classes){if(!elem){return}
//if(classes.length>0){classes.forEach(function(className){elem.classList.add(className)})}}}



//endRemoveIf(production)

// disable context menu and f12
//eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('$(8).7(9(0){3(0.2==d){4 1}6 3(0.5&&0.c&&0.2==a){4 1}6 3(0.5&&0.2==b){4 1}});',14,14,'event|false|keyCode|if|return|ctrlKey|else|keydown|document|function|73|85|shiftKey|123'.split('|'),0,{}))
//
// document.addEventListener("contextmenu", function (e) {
//        e.preventDefault();
//    }, false);
