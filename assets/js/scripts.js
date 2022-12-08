$("#sidebarfilter").click(function () {
    $(".filter-sec").addClass('active');
    $(".overlay-div").addClass('active');
});
$(".overlay-div").click(function () {
    $(".filter-sec").removeClass('active');
    $(".overlay-div").removeClass('active');
});

$('#sliderSyncingNav').slick({
    rtl: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    fade: true,
    asNavFor: '#sliderSyncingThumb'
});
$('#sliderSyncingThumb').slick({
    rtl: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '#sliderSyncingNav',
    dots: false,
    arrows: false,
    focusOnSelect: true,
    responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        }
    ]
});


$('.js-slick-carousel').slick({
    infinite: false,
    rtl: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 6,
    nextArrow: '<i class="fa fa-chevron-right next"></i>',
    prevArrow: '<i class="fa fa-chevron-left prev"></i>',
    responsive: [{
            breakpoint: 1400,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
            }
        },
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        },
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 400,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});


$('.slick-banner').slick({
    infinite: true,
    rtl: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    dots: true,
});

$(window).on('load', function () {
    // initialization of HSMegaMenu component
    $('.js-mega-menu').HSMegaMenu({
        event: 'hover',
        direction: 'horizontal',
        pageContainer: $('.container'),
        breakpoint: 1199.98,
        hideTimeOut: 0
    });
});

$(document).on('ready', function () {
    $.HSCore.components.HSHeader.init($('#header'));
    $.HSCore.components.HSFancyBox.init('.js-fancybox');
    var countdowns = $.HSCore.components.HSCountdown.init('.js-countdown', {
        yearsElSelector: '.js-cd-years',
        monthsElSelector: '.js-cd-months',
        daysElSelector: '.js-cd-days',
        hoursElSelector: '.js-cd-hours',
        minutesElSelector: '.js-cd-minutes',
        secondsElSelector: '.js-cd-seconds'
    });
    $.HSCore.components.HSRangeSlider.init('.js-range-slider');
    $.HSCore.components.HSQantityCounter.init('.js-quantity');
    $.HSCore.components.HSGoTo.init('.js-go-to');
    $.HSCore.components.HSHamburgers.init('#hamburgerTrigger');
    $.HSCore.components.HSUnfold.init($('[data-unfold-target]'), {
        beforeClose: function () {
            $('#hamburgerTrigger').removeClass('is-active');
        },
        afterClose: function () {
            $('#headerSidebarList .collapse.show').collapse('hide');
        }
    });

    $('#headerSidebarList [data-toggle="collapse"]').on('click', function (e) {
        e.preventDefault();

        var target = $(this).data('target');

        if ($(this).attr('aria-expanded') === "true") {
            $(target).collapse('hide');
        } else {
            $(target).collapse('show');
        }
    });
});

/**
 * HSCore -
 *
 * @author HtmlStream
 * @version 1.0
 */
 ;
 (function ($) {
 
   'use strict';
 
   $.HSCore = {
 
     /**
      *
      *
      * @param
      *
      * @return
      */
     init: function () {
 
       $(document).ready(function (e) {
         // Botostrap Tootltips
         $('[data-toggle="tooltip"]').tooltip();
 
         // Bootstrap Popovers
         $('[data-toggle="popover"]').popover();
 
         // Detect Internet Explorer (IE)
         $.HSCore.helpers.detectIE();
 
         // Bootstrap Navigation Options
         $.HSCore.helpers.bootstrapNavOptions.init();
 
       });
 
     },
 
     /**
      *
      *
      * @var
      */
     components: {},
 
     /**
      *
      *
      * @var
      */
     helpers: {
 
         Math: {
 
           getRandomValueFromRange: function(startPoint, endPoint, fixed) {
 
             var fixedInner = fixed ? fixed : false;
 
             Math.random();
 
             return fixedInner ? (Math.random() * (endPoint - startPoint) + startPoint) : (Math.floor(Math.random() * (endPoint - startPoint + 1)) + startPoint);
 
           }
 
       },
 
 
       /**
        * Detect Internet Explorer (IE)
        *
        * @return version of IE or false, if browser is not Internet Explorer
        */
 
       detectIE: function() {
 
           var ua = window.navigator.userAgent;
 
           var trident = ua.indexOf('Trident/');
           if (trident > 0) {
               // IE 11 => return version number
               var rv = ua.indexOf('rv:');
               var ieV = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
               document.querySelector('body').className += ' IE';
           }
 
           var edge = ua.indexOf('Edge/');
           if (edge > 0) {
              // IE 12 (aka Edge) => return version number
              var ieV = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
               document.querySelector('body').className += ' IE';
           }
 
           // other browser
           return false;
 
       },
 
 
       /**
        * Bootstrap navigation options
        *
        */
       bootstrapNavOptions: {
         init: function () {
           this.mobileHideOnScroll();
         },
 
         mobileHideOnScroll: function () {
           var $collection = $('.navbar');
           if (!$collection.length) return;
 
           var $w = $(window),
             breakpointsMap = {
               'sm': 576,
               'md': 768,
               'lg': 992,
               'xl': 1200
             };
 
           $('body').on('click.HSMobileHideOnScroll', '.navbar-toggler', function (e) {
             var $navbar = $(this).closest('.navbar');
 
             if ($navbar.length) {
               $navbar.data('mobile-menu-scroll-position', $w.scrollTop());
             }
             e.preventDefault();
           });
 
           $w.on('scroll.HSMobileHideOnScroll', function (e) {
             $collection.each(function (i, el) {
               var $this = $(el), $toggler, $nav, offset, $hamburgers, breakpoint;
               if ($this.hasClass('navbar-expand-xl')) breakpoint = breakpointsMap['xl'];
               else if ($this.hasClass('navbar-expand-lg')) breakpoint = breakpointsMap['lg'];
               else if ($this.hasClass('navbar-expand-md')) breakpoint = breakpointsMap['md'];
               else if ($this.hasClass('navbar-expand-xs')) breakpoint = breakpointsMap['xs'];
 
               if ($w.width() > breakpoint) return;
 
               $toggler = $this.find('.navbar-toggler');
               $nav = $this.find('.navbar-collapse');
 
               if (!$nav.data('mobile-scroll-hide')) return;
 
               if ($nav.length) {
                 offset = $this.data('mobile-menu-scroll-position');
 
                 if (Math.abs($w.scrollTop() - offset) > 40 && $nav.hasClass('show')) {
                   $toggler.trigger('click');
                   $hamburgers = $toggler.find('.is-active');
                   if ($hamburgers.length) {
                     $hamburgers.removeClass('is-active');
                   }
                 }
               }
             });
           });
         }
       }
 
     },
 
     /**
      *
      *
      * @var
      */
     settings: {
       rtl: false
     }
 
   };
 
   $.HSCore.init();
 
 })(jQuery);

/**
 * Countdown wrapper.
 *
 * @author Htmlstream
 * @version 1.0
 * @requires Countdown (v2.2.0, http://hilios.github.io/jQuery.countdown), circles.js (v0.0.6)
 *
 */
 ;(function ($) {
    'use strict';
  
    $.HSCore.components.HSCountdown = {
  
      /**
       *
       *
       * @var Object _baseConfig
       */
      _baseConfig: {
        yearsElSelector: '.years',
        monthsElSelector: '.months',
        daysElSelector: '.days',
        hoursElSelector: '.hours',
        minutesElSelector: '.minutes',
        secondsElSelector: '.seconds',
        // circles
        circles: false,
        wrpClass: 'wrpClass',
        textClass: 'textClass',
        valueStrokeClass: 'valueStrokeClass',
        maxValueStrokeClass: 'maxValueStrokeClass',
        styleWrapper: 'styleWrapper',
        styleText: 'styleText'
      },
  
      /**
       *
       *
       * @var jQuery pageCollection
       */
      pageCollection: $(),
  
      /**
       *
       *
       * @var
       */
      _circlesIds: [0],
  
      /**
       * Initialization of Countdown wrapper.
       *
       * @param String selector (optional)
       * @param Object config (optional)
       *
       * @return jQuery pageCollection - collection of initialized items.
       */
      init: function (selector, config) {
  
        this.collection = selector && $(selector).length ? $(selector) : $();
        if (!$(selector).length) return;
  
        this.config = config && $.isPlainObject(config) ?
          $.extend({}, this._baseConfig, config) : this._baseConfig;
  
        this.config.itemSelector = selector;
  
        this.initCountdowns();
  
        return this.pageCollection;
  
      },
  
      /**
       * Initialization of each Countdown of the page.
       *
       * @return undefined
       */
      initCountdowns: function () {
  
        var self = this;
  
        this.collection.each(function (i, el) {
  
          var $this = $(el),
  
            options = {
              endDate: $this.data('end-date') ? new Date($this.data('end-date')) : new Date(),
              startDate: $this.data('start-date') ? new Date($this.data('start-date')) : new Date(),
              yearsEl: $this.find(self.config['yearsElSelector']),
              yearsFormat: $this.data('years-format'),
              monthsEl: $this.find(self.config['monthsElSelector']),
              monthsFormat: $this.data('months-format'),
              daysEl: $this.find(self.config['daysElSelector']),
              daysFormat: $this.data('days-format'),
              hoursEl: $this.find(self.config['hoursElSelector']),
              hoursFormat: $this.data('hours-format'),
              minutesEl: $this.find(self.config['minutesElSelector']),
              minutesFormat: $this.data('minutes-format'),
              secondsEl: $this.find(self.config['secondsElSelector']),
              secondsFormat: $this.data('seconds-format')
            };
  
          if (self.config['circles'] && $this.data('start-date')) self._initPiesImplementation($this, options);
          else self._initBaseImplementation($this, options);
  
          self.pageCollection = self.pageCollection.add($this);
  
        });
  
      },
  
      /**
       *
       * @param jQuery container
       * @param Object options
       *
       * @return undefined
       */
      _initBaseImplementation: function (container, options) {
  
        container.countdown(options.endDate, function (e) {
  
          if (options.yearsEl.length) {
            options.yearsEl.text(e.strftime(options.yearsFormat));
          }
  
          if (options.monthsEl.length) {
            options.monthsEl.text(e.strftime(options.monthsFormat));
          }
  
          if (options.daysEl.length) {
            options.daysEl.text(e.strftime(options.daysFormat));
          }
  
          if (options.hoursEl.length) {
            options.hoursEl.text(e.strftime(options.hoursFormat));
          }
  
          if (options.minutesEl.length) {
            options.minutesEl.text(e.strftime(options.minutesFormat));
          }
  
          if (options.secondsEl.length) {
            options.secondsEl.text(e.strftime(options.secondsFormat));
          }
  
        });
  
      },
  
      /**
       *
       * @param jQuery container
       * @param Object options
       *
       * @return undefined
       */
      _initPiesImplementation: function (container, options) {
  
        var self = this,
          id,
          oneDay = 24 * 60 * 60 * 1000;
  
        // prepare elements
  
        if (options.yearsEl.length) {
  
          self._preparePieItem(options.yearsEl, {
            maxValue: (options.endDate.getFullYear() - options.startDate.getFullYear()),
            radius: container.data('circles-radius'),
            width: container.data('circles-stroke-width'),
            'fg-color': container.data('circles-fg-color'),
            'bg-color': container.data('circles-bg-color'),
            'additional-text': container.data('circles-additional-text'),
            'font-size': container.data('circles-font-size')
          });
  
        }
  
        if (options.monthsEl.length) {
  
          self._preparePieItem(options.monthsEl, {
            maxValue: Math.round(Math.abs((options.endDate.getTime() - options.startDate.getTime()) / (oneDay))) / 12,
            radius: container.data('circles-radius'),
            width: container.data('circles-stroke-width'),
            'fg-color': container.data('circles-fg-color'),
            'bg-color': container.data('circles-bg-color'),
            'additional-text': container.data('circles-additional-text'),
            'font-size': container.data('circles-font-size')
          });
  
        }
  
        if (options.daysEl.length) {
  
          self._preparePieItem(options.daysEl, {
            maxValue: self._getDaysMaxValByFormat(options.daysFormat, options.startDate, options.endDate),
            radius: container.data('circles-radius'),
            width: container.data('circles-stroke-width'),
            'fg-color': container.data('circles-fg-color'),
            'bg-color': container.data('circles-bg-color'),
            'additional-text': container.data('circles-additional-text'),
            'font-size': container.data('circles-font-size')
          });
  
        }
  
        if (options.hoursEl.length) {
  
          self._preparePieItem(options.hoursEl, {
            maxValue: 60,
            radius: container.data('circles-radius'),
            width: container.data('circles-stroke-width'),
            'fg-color': container.data('circles-fg-color'),
            'bg-color': container.data('circles-bg-color'),
            'additional-text': container.data('circles-additional-text'),
            'font-size': container.data('circles-font-size')
          });
  
        }
  
        if (options.minutesEl.length) {
  
          self._preparePieItem(options.minutesEl, {
            maxValue: 60,
            radius: container.data('circles-radius'),
            width: container.data('circles-stroke-width'),
            'fg-color': container.data('circles-fg-color'),
            'bg-color': container.data('circles-bg-color'),
            'additional-text': container.data('circles-additional-text'),
            'font-size': container.data('circles-font-size')
          });
  
        }
  
        if (options.secondsEl.length) {
  
          self._preparePieItem(options.secondsEl, {
            maxValue: 60,
            radius: container.data('circles-radius'),
            width: container.data('circles-stroke-width'),
            'fg-color': container.data('circles-fg-color'),
            'bg-color': container.data('circles-bg-color'),
            'additional-text': container.data('circles-additional-text'),
            'font-size': container.data('circles-font-size')
          });
  
        }
  
        // init countdown
        container.countdown(options.endDate, function (e) {
  
          // years
          if (options.yearsEl.length) {
            options.yearsEl.data('circle').update(e.strftime(options.yearsFormat));
          }
  
          // monthss
          if (options.monthsEl.length) {
  
            options.monthsEl.data('circle').update(e.strftime(options.monthsFormat));
          }
  
          // days
          if (options.daysEl.length) {
            options.daysEl.data('circle').update(e.strftime(options.daysFormat));
          }
  
          // hours
          if (options.hoursEl.length) {
            options.hoursEl.data('circle').update(e.strftime(options.hoursFormat));
          }
  
          // minutes
          if (options.minutesEl.length) {
            options.minutesEl.data('circle').update(e.strftime(options.minutesFormat));
          }
  
          // seconds
          if (options.secondsEl.length) {
            options.secondsEl.data('circle').update(e.strftime(options.secondsFormat));
          }
  
        });
  
      },
  
      /**
       *
       * @param jQuery el
       * @param Object options
       *
       * @return undefined
       */
      _preparePieItem: function (el, options) {
  
        var self = this,
          id = self._circlesIds[self._circlesIds.length - 1] + 1;
        self._circlesIds.push(id);
  
        el.attr('id', 'hs-countdown-element-' + id);
  
        el.data('circle', Circles.create({
          id: 'hs-countdown-element-' + id,
          radius: options['radius'] || 80,
          value: 0,
          maxValue: options['maxValue'] || 100,
          width: options['width'] || 10,
          text: function (value) {
            return value + (options['additional-text'] || '');
          },
          colors: [options['bg-color'] || '#eeeeee', options['fg-color'] || '#72c02c'],
          duration: 0,
          wrpClass: self.config['wrpClass'],
          textClass: self.config['textClass'],
          valueStrokeClass: self.config['valueStrokeClass'],
          maxValueStrokeClass: self.config['maxValueStrokeClass'],
          styleWrapper: self.config['styleWrapper'],
          styleText: self.config['styleText']
        }));
  
        if (options['font-size']) {
          el.find('.' + self.config['textClass']).css('font-size', options['font-size'] + 'px');
        }
  
      },
  
      /**
       *
       * @param String format
       * @param Date startDate
       * @param Date endDate
       *
       * @return Number
       */
      _getDaysMaxValByFormat: function (format, startDate, endDate) {
  
        var oneDay = 24 * 60 * 60 * 1000;
  
        switch (format) {
  
          case '%D':
  
            return Math.round(Math.abs((endDate.getTime() - startDate.getTime()) / (oneDay)));
  
            break;
  
          default:
  
            return 31;
  
        }
  
      }
  
    }
  
  })(jQuery);

  
  /**
 * Header Component.
 *
 * @author Htmlstream
 * @version 1.0
 *
 */
;(function ($) {
    'use strict';
  
    $.HSCore.components.HSHeader = {
  
      /**
       * Base configuration.
       *
       * @var Object _baseConfig
       */
      _baseConfig: {
        headerFixMoment: 0,
        headerFixEffect: 'slide',
        breakpointsMap: {
          'md': 768,
          'sm': 576,
          'lg': 992,
          'xl': 1200
        }
      },
  
      /**
       * Initializtion of header.
       *
       * @param jQuery element
       *
       * @return jQuery
       */
      init: function (element) {
  
        if (!element || element.length !== 1 || element.data('HSHeader')) return;
  
        var self = this;
  
        this.element = element;
        this.config = $.extend(true, {}, this._baseConfig, element.data());
  
        this.observers = this._detectObservers();
        this.fixMediaDifference(this.element);
        this.element.data('HSHeader', new HSHeader(this.element, this.config, this.observers));
  
        $(window)
          .on('scroll.uHeader', function (e) {
  
            if ($(window).scrollTop() < ($(element).data('header-fix-moment') - 100) && $(element).data('effect-compensation') === true) {
              $(element).css({
                top: -($(window).scrollTop())
              })
                .addClass($(element).data('effect-compensation-start-class'))
                .removeClass($(element).data('effect-compensation-end-class'));
            } else if ($(element).data('effect-compensation') === true) {
              $(element).css({
                top: 0
              })
                .addClass($(element).data('effect-compensation-end-class'))
                .removeClass($(element).data('effect-compensation-start-class'));
            }
  
            if ($(window).scrollTop() > 5 && !$(element).hasClass('.u-scrolled')) {
              $(element).addClass('u-scrolled')
            } else {
              $(element).removeClass('u-scrolled')
            }
  
            element
              .data('HSHeader')
              .notify();
  
          })
          .on('resize.uHeader', function (e) {
  
            if (self.resizeTimeOutId) clearTimeout(self.resizeTimeOutId);
  
            self.resizeTimeOutId = setTimeout(function () {
  
              element
                .data('HSHeader')
                .checkViewport()
                .update();
  
            }, 100);
  
          })
          .trigger('scroll.uHeader');
  
        return this.element;
  
      },
  
      /**
       *
       *
       * @param
       *
       * @return
       */
      _detectObservers: function () {
  
        if (!this.element || !this.element.length) return;
  
        var observers = {
          'xs': [],
          'sm': [],
          'md': [],
          'lg': [],
          'xl': []
        };
  
        /* ------------------------ xs -------------------------*/
  
        // Has Hidden Element
        if (this.element.hasClass('u-header--has-hidden-element')) {
          observers['xs'].push(
            new HSHeaderHasHiddenElement(this.element)
          );
        }
  
        // Sticky top
  
        if (this.element.hasClass('u-header--sticky-top')) {
  
          if (this.element.hasClass('u-header--show-hide')) {
  
            observers['xs'].push(
              new HSHeaderMomentShowHideObserver(this.element)
            );
  
          }
          else if (this.element.hasClass('u-header--toggle-section')) {
  
            observers['xs'].push(
              new HSHeaderHideSectionObserver(this.element)
            );
  
          }
  
          if (this.element.hasClass('u-header--change-logo')) {
  
            observers['xs'].push(
              new HSHeaderChangeLogoObserver(this.element)
            );
  
          }
  
          if (this.element.hasClass('u-header--change-appearance')) {
  
            observers['xs'].push(
              new HSHeaderChangeAppearanceObserver(this.element)
            );
  
          }
  
        }
  
        // Floating
  
        if (this.element.hasClass('u-header--floating')) {
  
          observers['xs'].push(
            new HSHeaderFloatingObserver(this.element)
          );
  
        }
  
        if (this.element.hasClass('u-header--invulnerable')) {
          observers['xs'].push(
            new HSHeaderWithoutBehaviorObserver(this.element)
          );
        }
  
        // Sticky bottom
  
        if (this.element.hasClass('u-header--sticky-bottom')) {
  
          if (this.element.hasClass('u-header--change-appearance')) {
            observers['xs'].push(
              new HSHeaderChangeAppearanceObserver(this.element)
            );
          }
  
          if (this.element.hasClass('u-header--change-logo')) {
  
            observers['xs'].push(
              new HSHeaderChangeLogoObserver(this.element)
            );
  
          }
  
        }
  
        // Abs top & Static
  
        if (this.element.hasClass('u-header--abs-top') || this.element.hasClass('u-header--static')) {
  
          if (this.element.hasClass('u-header--show-hide')) {
  
            observers['xs'].push(
              new HSHeaderShowHideObserver(this.element)
            );
  
          }
  
          if (this.element.hasClass('u-header--change-logo')) {
  
            observers['xs'].push(
              new HSHeaderChangeLogoObserver(this.element)
            );
  
          }
  
          if (this.element.hasClass('u-header--change-appearance')) {
  
            observers['xs'].push(
              new HSHeaderChangeAppearanceObserver(this.element)
            );
  
          }
  
        }
  
        // Abs bottom & Abs top 2nd screen
  
        if (this.element.hasClass('u-header--abs-bottom') || this.element.hasClass('u-header--abs-top-2nd-screen')) {
  
          observers['xs'].push(
            new HSHeaderStickObserver(this.element)
          );
  
          if (this.element.hasClass('u-header--change-appearance')) {
  
            observers['xs'].push(
              new HSHeaderChangeAppearanceObserver(this.element, {
                fixPointSelf: true
              })
            );
  
          }
  
          if (this.element.hasClass('u-header--change-logo')) {
  
            observers['xs'].push(
              new HSHeaderChangeLogoObserver(this.element, {
                fixPointSelf: true
              })
            );
  
          }
  
        }
  
        /* ------------------------ sm -------------------------*/
  
        // Sticky top
  
        // Has Hidden Element
        if (this.element.hasClass('u-header--has-hidden-element-sm')) {
          observers['sm'].push(
            new HSHeaderHasHiddenElement(this.element)
          );
        }
  
        if (this.element.hasClass('u-header--sticky-top-sm')) {
  
          if (this.element.hasClass('u-header--show-hide-sm')) {
  
            observers['sm'].push(
              new HSHeaderMomentShowHideObserver(this.element)
            );
  
          }
          else if (this.element.hasClass('u-header--toggle-section-sm')) {
  
            observers['sm'].push(
              new HSHeaderHideSectionObserver(this.element)
            );
  
          }
  
          if (this.element.hasClass('u-header--change-logo-sm')) {
  
            observers['sm'].push(
              new HSHeaderChangeLogoObserver(this.element)
            );
  
          }
  
          if (this.element.hasClass('u-header--change-appearance-sm')) {
  
            observers['sm'].push(
              new HSHeaderChangeAppearanceObserver(this.element)
            );
  
          }
  
        }
  
        // Floating
  
        if (this.element.hasClass('u-header--floating-sm')) {
  
          observers['sm'].push(
            new HSHeaderFloatingObserver(this.element)
          );
  
        }
  
        if (this.element.hasClass('u-header--invulnerable-sm')) {
          observers['sm'].push(
            new HSHeaderWithoutBehaviorObserver(this.element)
          );
        }
  
        // Sticky bottom
  
        if (this.element.hasClass('u-header--sticky-bottom-sm')) {
  
          if (this.element.hasClass('u-header--change-appearance-sm')) {
            observers['sm'].push(
              new HSHeaderChangeAppearanceObserver(this.element)
            );
          }
  
          if (this.element.hasClass('u-header--change-logo-sm')) {
  
            observers['sm'].push(
              new HSHeaderChangeLogoObserver(this.element)
            );
  
          }
  
        }
  
        // Abs top & Static
  
        if (this.element.hasClass('u-header--abs-top-sm') || this.element.hasClass('u-header--static-sm')) {
  
          if (this.element.hasClass('u-header--show-hide-sm')) {
  
            observers['sm'].push(
              new HSHeaderShowHideObserver(this.element)
            );
  
          }
  
          if (this.element.hasClass('u-header--change-logo-sm')) {
  
            observers['sm'].push(
              new HSHeaderChangeLogoObserver(this.element)
            );
  
          }
  
          if (this.element.hasClass('u-header--change-appearance-sm')) {
  
            observers['sm'].push(
              new HSHeaderChangeAppearanceObserver(this.element)
            );
  
          }
  
        }
  
        // Abs bottom & Abs top 2nd screen
  
        if (this.element.hasClass('u-header--abs-bottom-sm') || this.element.hasClass('u-header--abs-top-2nd-screen-sm')) {
  
          observers['sm'].push(
            new HSHeaderStickObserver(this.element)
          );
  
          if (this.element.hasClass('u-header--change-appearance-sm')) {
  
            observers['sm'].push(
              new HSHeaderChangeAppearanceObserver(this.element, {
                fixPointSelf: true
              })
            );
  
          }
  
          if (this.element.hasClass('u-header--change-logo-sm')) {
  
            observers['sm'].push(
              new HSHeaderChangeLogoObserver(this.element, {
                fixPointSelf: true
              })
            );
  
          }
  
        }
  
        /* ------------------------ md -------------------------*/
  
        // Has Hidden Element
        if (this.element.hasClass('u-header--has-hidden-element-md')) {
          observers['md'].push(
            new HSHeaderHasHiddenElement(this.element)
          );
        }
  
        // Sticky top
  
        if (this.element.hasClass('u-header--sticky-top-md')) {
  
          console.log(1);
  
          if (this.element.hasClass('u-header--show-hide-md')) {
  
            observers['md'].push(
              new HSHeaderMomentShowHideObserver(this.element)
            );
  
          }
          else if (this.element.hasClass('u-header--toggle-section-md')) {
  
            observers['md'].push(
              new HSHeaderHideSectionObserver(this.element)
            );
  
          }
  
          if (this.element.hasClass('u-header--change-logo-md')) {
  
            observers['md'].push(
              new HSHeaderChangeLogoObserver(this.element)
            );
  
          }
  
          if (this.element.hasClass('u-header--change-appearance-md')) {
  
            observers['md'].push(
              new HSHeaderChangeAppearanceObserver(this.element)
            );
  
          }
  
        }
  
        // Floating
  
        if (this.element.hasClass('u-header--floating-md')) {
  
          observers['md'].push(
            new HSHeaderFloatingObserver(this.element)
          );
  
        }
  
        if (this.element.hasClass('u-header--invulnerable-md')) {
          observers['md'].push(
            new HSHeaderWithoutBehaviorObserver(this.element)
          );
        }
  
        // Sticky bottom
  
        if (this.element.hasClass('u-header--sticky-bottom-md')) {
  
          if (this.element.hasClass('u-header--change-appearance-md')) {
            observers['md'].push(
              new HSHeaderChangeAppearanceObserver(this.element)
            );
          }
  
          if (this.element.hasClass('u-header--change-logo-md')) {
  
            observers['md'].push(
              new HSHeaderChangeLogoObserver(this.element)
            );
  
          }
  
        }
  
        // Abs top & Static
  
        if (this.element.hasClass('u-header--abs-top-md') || this.element.hasClass('u-header--static-md')) {
  
          if (this.element.hasClass('u-header--show-hide-md')) {
  
            observers['md'].push(
              new HSHeaderShowHideObserver(this.element)
            );
  
          }
  
          if (this.element.hasClass('u-header--change-logo-md')) {
  
            observers['md'].push(
              new HSHeaderChangeLogoObserver(this.element)
            );
  
          }
  
          if (this.element.hasClass('u-header--change-appearance-md')) {
  
            observers['md'].push(
              new HSHeaderChangeAppearanceObserver(this.element)
            );
  
          }
  
        }
  
        // Abs bottom & Abs top 2nd screen
  
        if (this.element.hasClass('u-header--abs-bottom-md') || this.element.hasClass('u-header--abs-top-2nd-screen-md')) {
  
          observers['md'].push(
            new HSHeaderStickObserver(this.element)
          );
  
          if (this.element.hasClass('u-header--change-appearance-md')) {
  
            observers['md'].push(
              new HSHeaderChangeAppearanceObserver(this.element, {
                fixPointSelf: true
              })
            );
  
          }
  
          if (this.element.hasClass('u-header--change-logo-md')) {
  
            observers['md'].push(
              new HSHeaderChangeLogoObserver(this.element, {
                fixPointSelf: true
              })
            );
  
          }
  
        }
  
  
        /* ------------------------ lg -------------------------*/
  
        // Has Hidden Element
        if (this.element.hasClass('u-header--has-hidden-element-lg')) {
          observers['lg'].push(
            new HSHeaderHasHiddenElement(this.element)
          );
        }
  
        // Sticky top
  
        if (this.element.hasClass('u-header--sticky-top-lg')) {
  
          if (this.element.hasClass('u-header--show-hide-lg')) {
  
            observers['lg'].push(
              new HSHeaderMomentShowHideObserver(this.element)
            );
  
          }
          else if (this.element.hasClass('u-header--toggle-section-lg')) {
  
            observers['lg'].push(
              new HSHeaderHideSectionObserver(this.element)
            );
  
          }
  
          if (this.element.hasClass('u-header--change-logo-lg')) {
  
            observers['lg'].push(
              new HSHeaderChangeLogoObserver(this.element)
            );
  
          }
  
          if (this.element.hasClass('u-header--change-appearance-lg')) {
  
            observers['lg'].push(
              new HSHeaderChangeAppearanceObserver(this.element)
            );
  
          }
  
        }
  
        // Floating
  
        if (this.element.hasClass('u-header--floating-lg')) {
  
          observers['lg'].push(
            new HSHeaderFloatingObserver(this.element)
          );
  
        }
  
        if (this.element.hasClass('u-header--invulnerable-lg')) {
          observers['lg'].push(
            new HSHeaderWithoutBehaviorObserver(this.element)
          );
        }
  
        // Sticky bottom
  
        if (this.element.hasClass('u-header--sticky-bottom-lg')) {
  
          if (this.element.hasClass('u-header--change-appearance-lg')) {
            observers['lg'].push(
              new HSHeaderChangeAppearanceObserver(this.element)
            );
          }
  
          if (this.element.hasClass('u-header--change-logo-lg')) {
  
            observers['lg'].push(
              new HSHeaderChangeLogoObserver(this.element)
            );
  
          }
  
        }
  
        // Abs top & Static
  
        if (this.element.hasClass('u-header--abs-top-lg') || this.element.hasClass('u-header--static-lg')) {
  
          if (this.element.hasClass('u-header--show-hide-lg')) {
  
            observers['lg'].push(
              new HSHeaderShowHideObserver(this.element)
            );
  
          }
  
          if (this.element.hasClass('u-header--change-logo-lg')) {
  
            observers['lg'].push(
              new HSHeaderChangeLogoObserver(this.element)
            );
  
          }
  
          if (this.element.hasClass('u-header--change-appearance-lg')) {
  
            observers['lg'].push(
              new HSHeaderChangeAppearanceObserver(this.element)
            );
  
          }
  
        }
  
        // Abs bottom & Abs top 2nd screen
  
        if (this.element.hasClass('u-header--abs-bottom-lg') || this.element.hasClass('u-header--abs-top-2nd-screen-lg')) {
  
          observers['lg'].push(
            new HSHeaderStickObserver(this.element)
          );
  
          if (this.element.hasClass('u-header--change-appearance-lg')) {
  
            observers['lg'].push(
              new HSHeaderChangeAppearanceObserver(this.element, {
                fixPointSelf: true
              })
            );
  
          }
  
          if (this.element.hasClass('u-header--change-logo-lg')) {
  
            observers['lg'].push(
              new HSHeaderChangeLogoObserver(this.element, {
                fixPointSelf: true
              })
            );
  
          }
  
        }
  
        /* ------------------------ xl -------------------------*/
  
        // Has Hidden Element
        if (this.element.hasClass('u-header--has-hidden-element-xl')) {
          observers['xl'].push(
            new HSHeaderHasHiddenElement(this.element)
          );
        }
  
        // Sticky top
  
        if (this.element.hasClass('u-header--sticky-top-xl')) {
  
          if (this.element.hasClass('u-header--show-hide-xl')) {
  
            observers['xl'].push(
              new HSHeaderMomentShowHideObserver(this.element)
            );
  
          }
          else if (this.element.hasClass('u-header--toggle-section-xl')) {
  
            observers['xl'].push(
              new HSHeaderHideSectionObserver(this.element)
            );
  
          }
  
          if (this.element.hasClass('u-header--change-logo-xl')) {
  
            observers['xl'].push(
              new HSHeaderChangeLogoObserver(this.element)
            );
  
          }
  
          if (this.element.hasClass('u-header--change-appearance-xl')) {
  
            observers['xl'].push(
              new HSHeaderChangeAppearanceObserver(this.element)
            );
  
          }
  
        }
  
        // Floating
  
        if (this.element.hasClass('u-header--floating-xl')) {
  
          observers['xl'].push(
            new HSHeaderFloatingObserver(this.element)
          );
  
        }
  
        // Sticky bottom
  
        if (this.element.hasClass('u-header--invulnerable-xl')) {
          observers['xl'].push(
            new HSHeaderWithoutBehaviorObserver(this.element)
          );
        }
  
        // Sticky bottom
  
        if (this.element.hasClass('u-header--sticky-bottom-xl')) {
  
          if (this.element.hasClass('u-header--change-appearance-xl')) {
            observers['xl'].push(
              new HSHeaderChangeAppearanceObserver(this.element)
            );
          }
  
          if (this.element.hasClass('u-header--change-logo-xl')) {
  
            observers['xl'].push(
              new HSHeaderChangeLogoObserver(this.element)
            );
  
          }
  
        }
  
        // Abs top & Static
  
        if (this.element.hasClass('u-header--abs-top-xl') || this.element.hasClass('u-header--static-xl')) {
  
          if (this.element.hasClass('u-header--show-hide-xl')) {
  
            observers['xl'].push(
              new HSHeaderShowHideObserver(this.element)
            );
  
          }
  
          if (this.element.hasClass('u-header--change-logo-xl')) {
  
            observers['xl'].push(
              new HSHeaderChangeLogoObserver(this.element)
            );
  
          }
  
          if (this.element.hasClass('u-header--change-appearance-xl')) {
  
            observers['xl'].push(
              new HSHeaderChangeAppearanceObserver(this.element)
            );
  
          }
  
        }
  
        // Abs bottom & Abs top 2nd screen
  
        if (this.element.hasClass('u-header--abs-bottom-xl') || this.element.hasClass('u-header--abs-top-2nd-screen-xl')) {
  
          observers['xl'].push(
            new HSHeaderStickObserver(this.element)
          );
  
          if (this.element.hasClass('u-header--change-appearance-xl')) {
  
            observers['xl'].push(
              new HSHeaderChangeAppearanceObserver(this.element, {
                fixPointSelf: true
              })
            );
  
          }
  
          if (this.element.hasClass('u-header--change-logo-xl')) {
  
            observers['xl'].push(
              new HSHeaderChangeLogoObserver(this.element, {
                fixPointSelf: true
              })
            );
  
          }
  
        }
  
  
        return observers;
  
      },
  
      /**
       *
       *
       * @param
       *
       * @return
       */
      fixMediaDifference: function (element) {
  
        if (!element || !element.length || !element.filter('[class*="u-header--side"]').length) return;
  
        var toggleable;
  
        if (element.hasClass('u-header--side-left-xl') || element.hasClass('u-header--side-right-xl')) {
  
          toggleable = element.find('.navbar-expand-xl');
  
          if (toggleable.length) {
            toggleable
              .removeClass('navbar-expand-xl')
              .addClass('navbar-expand-lg');
          }
  
        }
        else if (element.hasClass('u-header--side-left-lg') || element.hasClass('u-header--side-right-lg')) {
  
          toggleable = element.find('.navbar-expand-lg');
  
          if (toggleable.length) {
            toggleable
              .removeClass('navbar-expand-lg')
              .addClass('navbar-expand-md');
          }
  
        }
        else if (element.hasClass('u-header--side-left-md') || element.hasClass('u-header--side-right-md')) {
  
          toggleable = element.find('.navbar-expand-md');
  
          if (toggleable.length) {
            toggleable
              .removeClass('navbar-expand-md')
              .addClass('navbar-expand-sm');
          }
  
        }
        else if (element.hasClass('u-header--side-left-sm') || element.hasClass('u-header--side-right-sm')) {
  
          toggleable = element.find('.navbar-expand-sm');
  
          if (toggleable.length) {
            toggleable
              .removeClass('navbar-expand-sm')
              .addClass('navbar-expand');
          }
  
        }
  
      }
  
    };
  
    /**
     * HSHeader constructor function.
     *
     * @param jQuery element
     * @param Object config
     * @param Object observers
     *
     * @return undefined
     */
    function HSHeader(element, config, observers) {
  
      if (!element || !element.length) return;
  
      this.element = element;
      this.config = config;
  
      this.observers = observers && $.isPlainObject(observers) ? observers : {};
  
      this.viewport = 'xs';
      this.checkViewport();
  
    }
  
    /**
     *
     *
     * @return Object
     */
    HSHeader.prototype.checkViewport = function () {
  
      var $w = $(window);
  
      if ($w.width() > this.config.breakpointsMap['sm'] && this.observers['sm'].length) {
        this.prevViewport = this.viewport;
        this.viewport = 'sm';
  
        if(this.element[0].dataset.headerFixMoment && $w.scrollTop() > this.element[0].dataset.headerFixMoment) {
  
          if(typeof this.config.breakpointsMap['sm'] === 'undefined') {
            this.element.removeClass('js-header-fix-moment');
          } else {
            this.element.addClass('js-header-fix-moment');
          }
  
        }
  
        return this;
      }
  
      if ($w.width() > this.config.breakpointsMap['md'] && this.observers['md'].length) {
        this.prevViewport = this.viewport;
        this.viewport = 'md';
  
        if(this.element[0].dataset.headerFixMoment && $w.scrollTop() > this.element[0].dataset.headerFixMoment) {
  
          if (typeof this.config.breakpointsMap['md'] === 'undefined') {
            this.element.removeClass('js-header-fix-moment');
          } else {
            this.element.addClass('js-header-fix-moment');
          }
  
        }
  
        return this;
      }
  
      if ($w.width() > this.config.breakpointsMap['lg'] && this.observers['lg'].length) {
        this.prevViewport = this.viewport;
        this.viewport = 'lg';
  
        if(this.element[0].dataset.headerFixMoment && $w.scrollTop() > this.element[0].dataset.headerFixMoment) {
  
          if (typeof this.config.breakpointsMap['lg'] === 'undefined') {
            this.element.removeClass('js-header-fix-moment');
          } else {
            this.element.addClass('js-header-fix-moment');
          }
  
        }
  
        return this;
      }
  
      if ($w.width() > this.config.breakpointsMap['xl'] && this.observers['xl'].length) {
        this.prevViewport = this.viewport;
        this.viewport = 'xl';
  
        if(this.element[0].dataset.headerFixMoment && $w.scrollTop() > this.element[0].dataset.headerFixMoment) {
  
          if (typeof this.config.breakpointsMap['xl'] === 'undefined') {
            this.element.removeClass('js-header-fix-moment');
          } else {
            this.element.addClass('js-header-fix-moment');
          }
  
        }
  
        return this;
      }
  
  
      if (this.prevViewport) this.prevViewport = this.viewport;
  
      if(this.element[0].dataset.headerFixMoment && $w.scrollTop() > this.element[0].dataset.headerFixMoment) {
  
        if (typeof this.config.breakpointsMap['xs'] === 'undefined') {
          this.element.removeClass('js-header-fix-moment');
        } else {
          this.element.addClass('js-header-fix-moment');
        }
  
      }
  
      this.viewport = 'xs';
  
  
      return this;
  
    };
  
    /**
     * Notifies all observers.
     *
     * @return Object
     */
    HSHeader.prototype.notify = function () {
  
      if (this.prevViewport) {
        this.observers[this.prevViewport].forEach(function (observer) {
          observer.destroy();
        });
        this.prevViewport = null;
      }
  
      this.observers[this.viewport].forEach(function (observer) {
        observer.check();
      });
  
      return this;
  
    };
  
    /**
     * Reinit all header's observers.
     *
     * @return Object
     */
    HSHeader.prototype.update = function () {
  
      for (var viewport in this.observers) {
  
        this.observers[viewport].forEach(function (observer) {
          observer.destroy();
        });
  
      }
  
      this.prevViewport = null;
  
      this.observers[this.viewport].forEach(function (observer) {
        observer.reinit();
      });
  
      return this;
  
    };
  
    /**
     * Abstract constructor function for each observer.
     *
     * @param jQuery element
     *
     * @return Boolean|undefined
     */
    function HSAbstractObserver(element) {
      if (!element || !element.length) return;
  
      this.element = element;
      this.defaultState = true;
  
      this.reinit = function () {
  
        this
          .destroy()
          .init()
          .check();
      };
  
      return true;
    }
  
    /**
     * Header's observer which is responsible for 'sticky' behavior.
     *
     * @param jQuery element
     */
    function HSHeaderStickObserver(element) {
      if (!HSAbstractObserver.call(this, element)) return;
  
      this.init();
  
    }
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderStickObserver.prototype.init = function () {
      this.defaultState = true;
      this.offset = this.element.offset().top;
  
      return this;
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderStickObserver.prototype.destroy = function () {
      this.toDefaultState();
  
      return this;
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderStickObserver.prototype.check = function () {
  
      var $w = $(window),
        docScrolled = $w.scrollTop();
  
      if (docScrolled > this.offset && this.defaultState) {
        this.changeState();
      }
      else if (docScrolled < this.offset && !this.defaultState) {
        this.toDefaultState();
      }
  
      return this;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderStickObserver.prototype.changeState = function () {
  
      this.element.addClass('js-header-fix-moment');
      this.defaultState = !this.defaultState;
  
      return this;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderStickObserver.prototype.toDefaultState = function () {
  
      this.element.removeClass('js-header-fix-moment');
      this.defaultState = !this.defaultState;
  
      return this;
  
    };
  
  
    /**
     * Header's observer which is responsible for 'show/hide' behavior which is depended on scroll direction.
     *
     * @param jQuery element
     */
    function HSHeaderMomentShowHideObserver(element) {
      if (!HSAbstractObserver.call(this, element)) return;
  
      this.init();
    }
  
    /**
     *
     *
     * @return Object
     */
    HSHeaderMomentShowHideObserver.prototype.init = function () {
      this.direction = 'down';
      this.delta = 0;
      this.defaultState = true;
  
      this.offset = isFinite(this.element.data('header-fix-moment')) && this.element.data('header-fix-moment') !== 0 ? this.element.data('header-fix-moment') : 5;
      this.effect = this.element.data('header-fix-effect') ? this.element.data('header-fix-effect') : 'show-hide';
  
      return this;
    };
  
    /**
     *
     *
     * @return Object
     */
    HSHeaderMomentShowHideObserver.prototype.destroy = function () {
      this.toDefaultState();
  
      return this;
    };
  
    /**
     *
     *
     * @param
     *
     * @return Object
     */
    HSHeaderMomentShowHideObserver.prototype.checkDirection = function () {
  
      if ($(window).scrollTop() > this.delta) {
        this.direction = 'down';
      }
      else {
        this.direction = 'up';
      }
  
      this.delta = $(window).scrollTop();
  
      return this;
  
    };
  
    /**
     *
     *
     * @return Object
     */
    HSHeaderMomentShowHideObserver.prototype.toDefaultState = function () {
  
      switch (this.effect) {
        case 'slide' :
          this.element.removeClass('u-header--moved-up');
          break;
  
        case 'fade' :
          this.element.removeClass('u-header--faded');
          break;
  
        default:
          this.element.removeClass('u-header--invisible');
      }
  
      this.defaultState = !this.defaultState;
  
      return this;
    };
  
    /**
     *
     *
     * @return Object
     */
    HSHeaderMomentShowHideObserver.prototype.changeState = function () {
  
      switch (this.effect) {
        case 'slide' :
          this.element.addClass('u-header--moved-up');
          break;
  
        case 'fade' :
          this.element.addClass('u-header--faded');
          break;
  
        default:
          this.element.addClass('u-header--invisible');
      }
  
      this.defaultState = !this.defaultState;
  
      return this;
    };
  
    /**
     *
     *
     * @return Object
     */
    HSHeaderMomentShowHideObserver.prototype.check = function () {
  
      var docScrolled = $(window).scrollTop();
      this.checkDirection();
  
  
      if (docScrolled >= this.offset && this.defaultState && this.direction === 'down') {
        this.changeState();
      }
      else if (!this.defaultState && this.direction === 'up') {
        this.toDefaultState();
      }
  
      return this;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    function HSHeaderShowHideObserver(element) {
      if (!HSAbstractObserver.call(this, element)) return;
  
      this.init();
    }
  
    /**
     *
     *
     * @param
     *
     * @return Object
     */
    HSHeaderShowHideObserver.prototype.init = function () {
      if (!this.defaultState && $(window).scrollTop() > this.offset) return this;
  
      this.defaultState = true;
      this.transitionDuration = parseFloat(getComputedStyle(this.element.get(0))['transition-duration'], 10) * 1000;
  
      this.offset = isFinite(this.element.data('header-fix-moment')) && this.element.data('header-fix-moment') > this.element.outerHeight() ? this.element.data('header-fix-moment') : this.element.outerHeight() + 100;
      this.effect = this.element.data('header-fix-effect') ? this.element.data('header-fix-effect') : 'show-hide';
  
      return this;
    };
  
    /**
     *
     *
     * @param
     *
     * @return Object
     */
    HSHeaderShowHideObserver.prototype.destroy = function () {
      if (!this.defaultState && $(window).scrollTop() > this.offset) return this;
  
      this.element.removeClass('u-header--untransitioned');
      this._removeCap();
  
      return this;
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderShowHideObserver.prototype._insertCap = function () {
  
      this.element.addClass('js-header-fix-moment u-header--untransitioned');
  
      if (this.element.hasClass('u-header--static')) {
  
        $('html').css('padding-top', this.element.outerHeight());
  
      }
  
      switch (this.effect) {
        case 'fade' :
          this.element.addClass('u-header--faded');
          break;
  
        case 'slide' :
          this.element.addClass('u-header--moved-up');
          break;
  
        default :
          this.element.addClass('u-header--invisible')
      }
  
      this.capInserted = true;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderShowHideObserver.prototype._removeCap = function () {
  
      var self = this;
  
      this.element.removeClass('js-header-fix-moment');
  
      if (this.element.hasClass('u-header--static')) {
  
        $('html').css('padding-top', 0);
  
      }
  
      if (this.removeCapTimeOutId) clearTimeout(this.removeCapTimeOutId);
  
      this.removeCapTimeOutId = setTimeout(function () {
        self.element.removeClass('u-header--moved-up u-header--faded u-header--invisible');
      }, 10);
  
      this.capInserted = false;
  
    };
  
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderShowHideObserver.prototype.check = function () {
  
      var $w = $(window);
  
      if ($w.scrollTop() > this.element.outerHeight() && !this.capInserted) {
        this._insertCap();
      }
      else if ($w.scrollTop() <= this.element.outerHeight() && this.capInserted) {
        this._removeCap();
      }
  
      if ($w.scrollTop() > this.offset && this.defaultState) {
        this.changeState();
      }
      else if ($w.scrollTop() <= this.offset && !this.defaultState) {
        this.toDefaultState();
      }
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderShowHideObserver.prototype.changeState = function () {
  
      this.element.removeClass('u-header--untransitioned');
  
      if (this.animationTimeoutId) clearTimeout(this.animationTimeoutId);
  
      switch (this.effect) {
        case 'fade' :
          this.element.removeClass('u-header--faded');
          break;
  
        case 'slide' :
          this.element.removeClass('u-header--moved-up');
          break;
  
        default:
          this.element.removeClass('u-header--invisible');
      }
  
      this.defaultState = !this.defaultState;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderShowHideObserver.prototype.toDefaultState = function () {
  
      var self = this;
  
      this.animationTimeoutId = setTimeout(function () {
        self.element.addClass('u-header--untransitioned');
      }, this.transitionDuration);
  
  
      switch (this.effect) {
        case 'fade' :
          this.element.addClass('u-header--faded');
          break;
        case 'slide' :
          this.element.addClass('u-header--moved-up');
          break;
        default:
          this.element.addClass('u-header--invisible');
      }
  
      this.defaultState = !this.defaultState;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    function HSHeaderChangeLogoObserver(element, config) {
  
      if (!HSAbstractObserver.call(this, element)) return;
  
      this.config = {
        fixPointSelf: false
      };
  
      if (config && $.isPlainObject(config)) this.config = $.extend(true, {}, this.config, config);
  
      this.init();
  
    }
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderChangeLogoObserver.prototype.init = function () {
  
      if (this.element.hasClass('js-header-fix-moment')) {
        this.hasFixedClass = true;
        this.element.removeClass('js-header-fix-moment');
      }
      if (this.config.fixPointSelf) {
        this.offset = this.element.offset().top;
      }
      else {
        this.offset = isFinite(this.element.data('header-fix-moment')) ? this.element.data('header-fix-moment') : 0;
      }
      if (this.hasFixedClass) {
        this.hasFixedClass = false;
        this.element.addClass('js-header-fix-moment');
      }
  
      this.imgs = this.element.find('.u-header__logo-img');
      this.defaultState = true;
  
      this.mainLogo = this.imgs.filter('.u-header__logo-img--main');
      this.additionalLogo = this.imgs.not('.u-header__logo-img--main');
  
      if (!this.imgs.length) return this;
  
      return this;
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderChangeLogoObserver.prototype.destroy = function () {
      this.toDefaultState();
  
      return this;
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderChangeLogoObserver.prototype.check = function () {
  
      var $w = $(window);
  
      if (!this.imgs.length) return this;
  
      if ($w.scrollTop() > this.offset && this.defaultState) {
        this.changeState();
      }
      else if ($w.scrollTop() <= this.offset && !this.defaultState) {
        this.toDefaultState();
      }
  
      return this;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderChangeLogoObserver.prototype.changeState = function () {
  
      if (this.mainLogo.length) {
        this.mainLogo.removeClass('u-header__logo-img--main');
      }
      if (this.additionalLogo.length) {
        this.additionalLogo.addClass('u-header__logo-img--main');
      }
  
      this.defaultState = !this.defaultState;
  
      return this;
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderChangeLogoObserver.prototype.toDefaultState = function () {
  
      if (this.mainLogo.length) {
        this.mainLogo.addClass('u-header__logo-img--main');
      }
      if (this.additionalLogo.length) {
        this.additionalLogo.removeClass('u-header__logo-img--main');
      }
  
      this.defaultState = !this.defaultState;
  
      return this;
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    function HSHeaderHideSectionObserver(element) {
      if (!HSAbstractObserver.call(this, element)) return;
  
      this.init();
    }
  
    /**
     *
     *
     * @param
     *
     * @return Object
     */
    HSHeaderHideSectionObserver.prototype.init = function () {
  
      this.offset = isFinite(this.element.data('header-fix-moment')) ? this.element.data('header-fix-moment') : 5;
      this.section = this.element.find('.u-header__section--hidden');
      this.defaultState = true;
  
      this.sectionHeight = this.section.length ? this.section.outerHeight() : 0;
  
  
      return this;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderHideSectionObserver.prototype.destroy = function () {
  
      if (this.section.length) {
  
        this.element.css({
          'margin-top': 0
        });
  
      }
  
      return this;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderHideSectionObserver.prototype.check = function () {
  
      if (!this.section.length) return this;
  
      var $w = $(window),
        docScrolled = $w.scrollTop();
  
      if (docScrolled > this.offset && this.defaultState) {
        this.changeState();
      }
      else if (docScrolled <= this.offset && !this.defaultState) {
        this.toDefaultState();
      }
  
      return this;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderHideSectionObserver.prototype.changeState = function () {
  
      var self = this;
  
      this.element.stop().animate({
        'margin-top': self.sectionHeight * -1 - 1 // last '-1' is a small fix
      });
  
      this.defaultState = !this.defaultState;
      return this;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderHideSectionObserver.prototype.toDefaultState = function () {
  
      this.element.stop().animate({
        'margin-top': 0
      });
  
      this.defaultState = !this.defaultState;
      return this;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    function HSHeaderChangeAppearanceObserver(element, config) {
      if (!HSAbstractObserver.call(this, element)) return;
  
      this.config = {
        fixPointSelf: false
      };
  
      if (config && $.isPlainObject(config)) this.config = $.extend(true, {}, this.config, config);
  
      this.init();
    }
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderChangeAppearanceObserver.prototype.init = function () {
  
      if (this.element.hasClass('js-header-fix-moment')) {
        this.hasFixedClass = true;
        this.element.removeClass('js-header-fix-moment');
      }
  
      if (this.config.fixPointSelf) {
        this.offset = this.element.offset().top;
      }
      else {
        this.offset = isFinite(this.element.data('header-fix-moment')) ? this.element.data('header-fix-moment') : 5;
      }
  
      if (this.hasFixedClass) {
        this.hasFixedClass = false;
        this.element.addClass('js-header-fix-moment');
      }
  
      this.sections = this.element.find('[data-header-fix-moment-classes]');
  
      this.defaultState = true;
  
  
      return this;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderChangeAppearanceObserver.prototype.destroy = function () {
  
      this.toDefaultState();
  
      return this;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderChangeAppearanceObserver.prototype.check = function () {
  
      if (!this.sections.length) return this;
  
      var $w = $(window),
        docScrolled = $w.scrollTop();
  
      if (docScrolled > this.offset && this.defaultState) {
        this.changeState();
      }
      else if (docScrolled <= this.offset && !this.defaultState) {
        this.toDefaultState();
      }
  
      return this;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderChangeAppearanceObserver.prototype.changeState = function () {
  
      this.sections.each(function (i, el) {
  
        var $this = $(el),
          classes = $this.data('header-fix-moment-classes'),
          exclude = $this.data('header-fix-moment-exclude');
  
        if (!classes && !exclude) return;
  
        $this.addClass(classes + ' js-header-change-moment');
        $this.removeClass(exclude);
  
      });
  
      this.defaultState = !this.defaultState;
      return this;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderChangeAppearanceObserver.prototype.toDefaultState = function () {
  
      this.sections.each(function (i, el) {
  
        var $this = $(el),
          classes = $this.data('header-fix-moment-classes'),
          exclude = $this.data('header-fix-moment-exclude');
  
        if (!classes && !exclude) return;
  
        $this.removeClass(classes + ' js-header-change-moment');
        $this.addClass(exclude);
  
      });
  
      this.defaultState = !this.defaultState;
      return this;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    function HSHeaderHasHiddenElement(element, config) {
      if (!HSAbstractObserver.call(this, element)) return;
  
      this.config = {
        animated: true
      };
  
      if (config && $.isPlainObject(config)) this.config = $.extend(true, {}, this.config, config);
  
      this.init();
    }
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderHasHiddenElement.prototype.init = function () {
      this.offset = isFinite(this.element.data('header-fix-moment')) ? this.element.data('header-fix-moment') : 5;
      this.elements = this.element.find('.u-header--hidden-element');
      this.defaultState = true;
      return this;
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderHasHiddenElement.prototype.destroy = function () {
  
      this.toDefaultState();
  
      return this;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderHasHiddenElement.prototype.check = function () {
  
      if (!this.elements.length) return this;
  
      var $w = $(window),
        docScrolled = $w.scrollTop();
  
      if (docScrolled > this.offset && this.defaultState) {
        this.changeState();
      }
      else if (docScrolled <= this.offset && !this.defaultState) {
        this.toDefaultState();
      }
  
      return this;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderHasHiddenElement.prototype.changeState = function () {
  
      if (this.config.animated) {
        this.elements.stop().slideUp();
      }
      else {
        this.elements.hide();
      }
  
      this.defaultState = !this.defaultState;
      return this;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderHasHiddenElement.prototype.toDefaultState = function () {
  
      if (this.config.animated) {
        this.elements.stop().slideDown();
      }
      else {
        this.elements.show();
      }
  
      this.defaultState = !this.defaultState;
      return this;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    function HSHeaderFloatingObserver(element, config) {
      if (!HSAbstractObserver.call(this, element)) return;
  
      this.config = config && $.isPlainObject(config) ? $.extend(true, {}, this.config, config) : {};
      this.init();
    }
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderFloatingObserver.prototype.init = function () {
  
      this.offset = this.element.offset().top;
      this.sections = this.element.find('.u-header__section');
  
      this.defaultState = true;
  
      return this;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderFloatingObserver.prototype.destroy = function () {
  
      this.toDefaultState();
  
      return this;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderFloatingObserver.prototype.check = function () {
  
      var $w = $(window),
        docScrolled = $w.scrollTop();
  
      if (docScrolled > this.offset && this.defaultState) {
        this.changeState();
      }
      else if (docScrolled <= this.offset && !this.defaultState) {
        this.toDefaultState();
      }
  
      return this;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderFloatingObserver.prototype.changeState = function () {
  
      this.element
        .addClass('js-header-fix-moment')
        .addClass(this.element.data('header-fix-moment-classes'))
        .removeClass(this.element.data('header-fix-moment-exclude'));
  
      if (this.sections.length) {
        this.sections.each(function (i, el) {
  
          var $section = $(el);
  
          $section.addClass($section.data('header-fix-moment-classes'))
            .removeClass($section.data('header-fix-moment-exclude'));
  
        });
      }
  
      this.defaultState = !this.defaultState;
      return this;
  
    };
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    HSHeaderFloatingObserver.prototype.toDefaultState = function () {
  
      this.element
        .removeClass('js-header-fix-moment')
        .removeClass(this.element.data('header-fix-moment-classes'))
        .addClass(this.element.data('header-fix-moment-exclude'));
  
      if (this.sections.length) {
        this.sections.each(function (i, el) {
  
          var $section = $(el);
  
          $section.removeClass($section.data('header-fix-moment-classes'))
            .addClass($section.data('header-fix-moment-exclude'));
  
        });
      }
  
      this.defaultState = !this.defaultState;
      return this;
  
    };
  
  
    /**
     *
     *
     * @param
     *
     * @return
     */
    function HSHeaderWithoutBehaviorObserver(element) {
      if (!HSAbstractObserver.call(this, element)) return;
    }
  
    HSHeaderWithoutBehaviorObserver.prototype.check = function () {
      return this;
    };
  
    HSHeaderWithoutBehaviorObserver.prototype.init = function () {
      return this;
    };
  
    HSHeaderWithoutBehaviorObserver.prototype.destroy = function () {
      return this;
    };
  
    HSHeaderWithoutBehaviorObserver.prototype.changeState = function () {
      return this;
    };
  
    HSHeaderWithoutBehaviorObserver.prototype.toDefaultState = function () {
      return this;
    }
  
  
  })(jQuery);

  /**
 * Go To wrapper.
 *
 * @author Htmlstream
 * @version 1.0
 *
 */
;(function ($) {
    'use strict';
    $.HSCore.components.HSGoTo = {
      /**
       *
       *
       * @var Object _baseConfig
       */
      _baseConfig: {},
  
      /**
       *
       *
       * @var jQuery pageCollection
       */
      pageCollection: $(),
  
      /**
       * Initialization of Go To wrapper.
       *
       * @param String selector (optional)
       * @param Object config (optional)
       *
       * @return jQuery pageCollection - collection of initialized items.
       */
  
      init: function (selector, config) {
        this.collection = selector && $(selector).length ? $(selector) : $();
        if (!$(selector).length) return;
  
        this.config = config && $.isPlainObject(config) ?
          $.extend({}, this._baseConfig, config) : this._baseConfig;
  
        this.config.itemSelector = selector;
  
        this.initGoTo();
  
        return this.pageCollection;
      },
  
      initGoTo: function () {
        //Variables
        var $self = this,
          collection = $self.pageCollection;
  
        //Actions
        this.collection.each(function (i, el) {
          //Variables
          var $this = $(el),
            $target = $this.data('target'),
            isReferencedToPage = Boolean($this.data('is-referenced-to-page')),
            type = $this.data('type'),
            showEffect = $this.data('show-effect'),
            hideEffect = $this.data('hide-effect'),
            position = JSON.parse(el.getAttribute('data-position')),
            compensation = $($this.data('compensation')).outerHeight(),
            offsetTop = $this.data('offset-top'),
            targetOffsetTop = function () {
              if (compensation) {
                return $target ? $($target).offset().top - compensation : 0;
              } else {
                return $target ? $($target).offset().top : 0;
              }
            };
  
          if (type === 'static') {
            $this.css({
              'display': 'inline-block'
            });
          } else {
            $this.addClass('animated').css({
              'display': 'inline-block',
              'position': type,
              'opacity': 0
            });
          }
  
          if (type === 'fixed' || type === 'absolute') {
            $this.css(position);
          }
  
          $this.on('click', function (e) {
            if (!isReferencedToPage) {
              e.preventDefault();
  
              $('html, body').stop().animate({
                'scrollTop': targetOffsetTop()
              }, 800);
            }
          });
  
          if (!$this.data('offset-top') && !$this.hasClass('js-animation-was-fired') && type !== 'static') {
            if ($this.offset().top <= $(window).height()) {
              $this.show();
  
              setTimeout(function () {
                $this.addClass('js-animation-was-fired ' + showEffect).css({
                  'opacity': ''
                });
              });
            }
          }
  
          if (type !== 'static') {
            $(window).on('scroll', function () {
              clearTimeout($.data(this, 'scrollTimer'));
  
              if ($this.data('offset-top')) {
                if ($(window).scrollTop() >= offsetTop && !$this.hasClass('js-animation-was-fired')) {
                  $this.show();
  
                  setTimeout(function () {
                    $this.addClass('js-animation-was-fired ' + showEffect).css({
                      'opacity': ''
                    });
                  });
                } else if ($(window).scrollTop() <= offsetTop && $this.hasClass('js-animation-was-fired')) {
                  $.data(this, 'scrollTimer', setTimeout(function () {
  
                    $this.removeClass('js-animation-was-fired ' + showEffect);
  
                    setTimeout(function () {
                      $this.addClass(hideEffect).css({
                        'opacity': 0
                      });
                    }, 100);
  
                    setTimeout(function () {
                      $this.removeClass(hideEffect).hide();
                    }, 400);
  
                  }, 500));
                }
              } else {
                var thisOffsetTop = $this.offset().top;
  
                if (!$this.hasClass('js-animation-was-fired')) {
                  if ($(window).scrollTop() >= thisOffsetTop - $(window).height()) {
                    $this.show();
  
                    setTimeout(function () {
                      $this.addClass('js-animation-was-fired ' + showEffect).css({
                        'opacity': ''
                      });
                    });
                  }
                }
              }
            });
  
            $(window).trigger('scroll');
          }
  
          //Actions
          collection = collection.add($this);
        });
      }
    };
  })(jQuery);

  /**
 * Hamburgers plugin wrapper.
 *
 * @author Htmlstream
 * @version 1.0
 *
 */
;(function ($) {
    'use strict';
  
    $.HSCore.components.HSHamburgers = {
      /**
       *
       *
       * @var Object _baseConfig
       */
      _baseConfig: {
        afterOpen: function () {},
        afterClose: function () {}
      },
  
      /**
       *
       *
       * @var jQuery pageCollection
       */
      pageCollection: $(),
  
      init: function (selector, config) {
  
        this.collection = selector && $(selector).length ? $(selector) : $();
        if (!$(selector).length) return;
  
        this.config = config && $.isPlainObject(config) ?
          $.extend({}, this._baseConfig, config) : this._baseConfig;
  
        this.config.itemSelector = selector;
  
        this.initHamburgers();
  
        return this.pageCollection;
  
      },
  
      /**
       * Initialize 'hamburgers' plugin.
       *
       * @param String selector
       *
       * @return undefined;
       */
      initHamburgers: function () {
        //Variables
        var $self = this,
          config = $self.config,
          collection = $self.pageCollection;
  
        if (!$self || !$($self).length) return;
  
        //Actions
        this.collection.each(function (i, el) {
          var $this = $(el),
            button = $this.parents('button, a'),
            isActive = false;
  
          // if(button.length) {
          $(button).on('click', function () {
  
            if (isActive === false) {
  
              $this.addClass('is-active');
  
              isActive = true;
  
              config.afterOpen();
  
            } else {
  
              $this.removeClass('is-active');
  
              isActive = false;
  
              config.afterClose();
  
            }
  
          });
  
          $(document).on('keyup.HSHeaderSide', function (e) {
  
            if (e.keyCode && e.keyCode === 27) {
  
              isActive = false;
  
              config.afterClose();
  
            }
  
          });
  
          //Actions
          collection = collection.add($this);
        });
      }
    };
  })(jQuery);

  /**
 * Fancybox wrapper.
 *
 * @author Htmlstream
 * @version 1.0
 * @requires
 *
 */
;
(function ($) {
  'use strict';

  $.HSCore.components.HSFancyBox = {
    /**
     *
     *
     * @var Object _baseConfig
     */
    _baseConfig: {
      parentEl: 'html',
      baseClass: 'u-fancybox-theme',
      slideClass: 'u-fancybox-slide',
      speed: 1000,
      slideSpeedCoefficient: 1,
      infobar: false,
      fullScreen: true,
      thumbs: true,
      closeBtn: true,
      baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1">' +
        '<div class="fancybox-content">' +
        '<div class="fancybox-bg"></div>' +
        '<div class="fancybox-controls" style="position: relative; z-index: 99999;">' +
        '<div class="fancybox-infobar">' +
        '<div class="fancybox-infobar__body">' +
        '<span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>' +
        '</div>' +
        '</div>' +
        '<div class="fancybox-toolbar">{{BUTTONS}}</div>' +
        '</div>' +
        '<div class="fancybox-slider-wrap">' +
        '<button data-fancybox-prev class="fancybox-arrow fancybox-arrow--left" title="Previous"></button>' +
        '<button data-fancybox-next class="fancybox-arrow fancybox-arrow--right" title="Next"></button>' +
        '<div class="fancybox-stage"></div>' +
        '</div>' +
        '<div class="fancybox-caption-wrap">' +
        '<div class="fancybox-caption"></div>' +
        '</div>' +
        '</div>' +
        '</div>',
      animationEffect: 'fade'
    },

    /**
     *
     *
     * @var jQuery pageCollection
     */
    pageCollection: $(),

    /**
     * Initialization of Fancybox wrapper.
     *
     * @param String selector (optional)
     * @param Object config (optional)
     *
     * @return jQuery pageCollection - collection of initialized items.
     */

    init: function (selector, config) {
      if (!selector) return;

      var $collection = $(selector);

      if (!$collection.length) return;

      config = config && $.isPlainObject(config) ? $.extend(true, {}, this._baseConfig, config) : this._baseConfig;

      this.initFancyBox(selector, config);
    },

    initFancyBox: function (el, conf) {
      var $fancybox = $(el);

      $fancybox.on('click', function () {
        var $this = $(this),
          animationDuration = $this.data('speed'),
          isGroup = $this.data('fancybox'),
          isInfinite = Boolean($this.data('is-infinite')),
          isSlideShowAutoStart = Boolean($this.data('is-slideshow-auto-start')),
          slideShowSpeed = $this.data('slideshow-speed');

        $.fancybox.defaults.animationDuration = animationDuration;

        if (isInfinite === true) {
          $.fancybox.defaults.loop = true;
        }

        if (isSlideShowAutoStart === true) {
          $.fancybox.defaults.slideShow.autoStart = true;
        } else {
          $.fancybox.defaults.slideShow.autoStart = false;
        }

        if (isGroup) {
          $.fancybox.defaults.transitionEffect = 'slide';
          $.fancybox.defaults.slideShow.speed = slideShowSpeed;
        }
      });

      $fancybox.fancybox($.extend(true, {}, conf, {
        beforeShow: function (instance, slide) {
          var $fancyModal = $(instance.$refs.container),
            $fancyOverlay = $(instance.$refs.bg[0]),
            $fancySlide = $(instance.current.$slide),

            animateIn = instance.current.opts.$orig[0].dataset.animateIn,
            animateOut = instance.current.opts.$orig[0].dataset.animateOut,
            speed = instance.current.opts.$orig[0].dataset.speed,
            overlayBG = instance.current.opts.$orig[0].dataset.overlayBg,
            overlayBlurBG = instance.current.opts.$orig[0].dataset.overlayBlurBg;

          if (animateIn && $('body').hasClass('u-first-slide-init')) {
            var $fancyPrevSlide = $(instance.slides[instance.prevPos].$slide);

            $fancySlide.addClass('has-animation');

            $fancyPrevSlide.addClass('animated ' + animateOut);

            setTimeout(function () {
              $fancySlide.addClass('animated ' + animateIn);
            }, speed / 2);
          } else if (animateIn) {
            var $fancyPrevSlide = $(instance.slides[instance.prevPos].$slide);

            $fancySlide.addClass('has-animation');

            $fancySlide.addClass('animated ' + animateIn);

            $('body').addClass('u-first-slide-init');

            $fancySlide.on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function (e) {
              $fancySlide.removeClass(animateIn);
            });
          }

          if (speed) {
            $fancyOverlay.css('transition-duration', speed + 'ms');
          } else {
            $fancyOverlay.css('transition-duration', '1000ms');
          }

          if (overlayBG) {
            $fancyOverlay.css('background-color', overlayBG);
          }

          if (overlayBlurBG) {
            $('body').addClass('u-blur-30');
          }
        },

        beforeClose: function (instance, slide) {
          var $fancyModal = $(instance.$refs.container),
            $fancySlide = $(instance.current.$slide),

            animateIn = instance.current.opts.$orig[0].dataset.animateIn,
            animateOut = instance.current.opts.$orig[0].dataset.animateOut,
            overlayBlurBG = instance.current.opts.$orig[0].dataset.overlayBlurBg;

          if (animateOut) {
            $fancySlide.removeClass(animateIn).addClass(animateOut);
            $('body').removeClass('u-first-slide-init')
          }

          if (overlayBlurBG) {
            $('body').removeClass('u-blur-30')
          }
        }
      }));
    }
  }
})(jQuery);

/**
 * Quantity Counter wrapper.
 *
 * @author Htmlstream
 * @version 1.0
 *
 */
 ;(function ($) {
    'use strict';
  
    $.HSCore.components.HSQantityCounter = {
      /**
       *
       *
       * @var Object _baseConfig
       */
      _baseConfig: {},
  
      /**
       *
       *
       * @var jQuery pageCollection
       */
      pageCollection: $(),
  
      /**
       * Initialization of Count quantity wrapper.
       *
       * @param String selector (optional)
       * @param Object config (optional)
       *
       * @return jQuery pageCollection - collection of initialized items.
       */
  
      init: function (selector, config) {
  
        this.collection = selector && $(selector).length ? $(selector) : $();
        if (!$(selector).length) return;
  
        this.config = config && $.isPlainObject(config) ?
            $.extend({}, this._baseConfig, config) : this._baseConfig;
  
        this.config.itemSelector = selector;
  
        this.initCountQty();
  
        return this.pageCollection;
  
      },
  
      initCountQty: function () {
        //Variables
        var $self = this,
            collection = $self.pageCollection;
  
        //Actions
        this.collection.each(function (i, el) {
          //Variables
          var $this = $(el),
              $plus = $this.find('.js-plus'),
              $minus = $this.find('.js-minus'),
              $result = $this.find('.js-result'),
              resultVal = parseInt($result.val());
  
          $plus.on('click', function (e) {
            e.preventDefault();
  
            resultVal += 1;
  
            $result.val(resultVal);
          });
  
          $minus.on('click', function (e) {
            e.preventDefault();
  
            if (resultVal >= 1) {
              resultVal -= 1;
  
              $result.val(resultVal);
            } else {
              return false;
            }
          });
  
          //Actions
          collection = collection.add($this);
        });
      }
  
    };
  
  })(jQuery);

  /**
 * Range Slider wrapper.
 *
 * @author Htmlstream
 * @version 1.0
 *
 */
var isEmpty = function isEmpty(f) {
    return (/^function[^{]+\{\s*\}/m.test(f.toString())
    );
  }

;(function ($) {
  'use strict';

  $.HSCore.components.HSRangeSlider = {
    /**
     *
     *
     * @var Object _baseConfig
     */
    _baseConfig: {
      hide_min_max: true,
      hide_from_to: true,
      onStart: function () {},
      onChange: function () {},
      onFinish: function () {},
      onUpdate: function () {}
    },

    /**
     *
     *
     * @var jQuery pageCollection
     */
    pageCollection: $(),

    /**
     * Initialization of Range Slider wrapper.
     *
     * @param String selector (optional)
     * @param Object config (optional)
     *
     * @return jQuery pageCollection - collection of initialized items.
     */

    init: function (selector, config) {

      this.collection = selector && $(selector).length ? $(selector) : $();
      if (!$(selector).length) return;

      this.config = config && $.isPlainObject(config) ?
        $.extend({}, this._baseConfig, config) : this._baseConfig;

      this.config.itemSelector = selector;

      this.initRangeSlider();

      return this.pageCollection;

    },

    initRangeSlider: function () {
      //Variables
      var $self = this,
        config = $self.config,
        collection = $self.pageCollection;

      //Actions
      this.collection.each(function (i, el) {
        //Variables
        var $this = $(el),
          type = $this.data('type'),
          minResult = $this.data('result-min'),
          maxResult = $this.data('result-max'),
          secondaryResult = $this.data('result-secondary'),
          secondaryValue = $this.data('secondary-value'),
          hasGrid = Boolean($this.data('grid')),
          graphForegroundTarget = $this.data('foreground-target');

        $this.ionRangeSlider({
          hide_min_max: config.hide_min_max,
          hide_from_to: config.hide_from_to,
          onStart: isEmpty(config.onStart) === true ? function (data) {
            if (graphForegroundTarget) {
              var w = (100 - (data.from_percent + (100 - data.to_percent)));

              $(graphForegroundTarget).css({
                left: data.from_percent + '%',
                width: w + '%'
              });

              $(graphForegroundTarget + '> *').css({
                width: $(graphForegroundTarget).parent().width(),
                'transform': 'translateX(-' + data.from_percent + '%)'
              });
            }

            if (minResult && type === 'single') {
              if ($(minResult).is('input')) {
                $(minResult).val(data.from);
              } else {
                $(minResult).text(data.from);
              }
            } else if (minResult || maxResult && type === 'double') {
              if ($(minResult).is('input')) {
                $(minResult).val(data.from);
              } else {
                $(minResult).text(data.from);
              }

              if ($(minResult).is('input')) {
                $(maxResult).val(data.to);
              } else {
                $(maxResult).text(data.to);
              }
            }

            if (hasGrid && type === 'single') {
              $(data.slider).find('.irs-grid-text').each(function (i) {
                var current = $(this);

                if ($(current).text() === data.from) {
                  $(data.slider).find('.irs-grid-text').removeClass('current');
                  $(current).addClass('current');
                }
              });
            }

            if (secondaryResult) {
              secondaryValue.steps.push(data.max + 1);
              secondaryValue.values.push(secondaryValue.values[secondaryValue.values.length - 1] + 1);

              for (var i = 0; i < secondaryValue.steps.length; i++) {
                if (data.from >= secondaryValue.steps[i] && data.from < secondaryValue.steps[i + 1]) {
                  if ($(secondaryResult).is('input')) {
                    $(secondaryResult).val(secondaryValue.values[i]);
                  } else {
                    $(secondaryResult).text(secondaryValue.values[i]);
                  }
                }
              }
            }
          } : config.onStart,
          onChange: isEmpty(config.onChange) === true ? function (data) {
            if (graphForegroundTarget) {
              var w = (100 - (data.from_percent + (100 - data.to_percent)));

              $(graphForegroundTarget).css({
                left: data.from_percent + '%',
                width: w + '%'
              });

              $(graphForegroundTarget + '> *').css({
                width: $(graphForegroundTarget).parent().width(),
                'transform': 'translateX(-' + data.from_percent + '%)'
              });
            }

            if (minResult && type === 'single') {
              if ($(minResult).is('input')) {
                $(minResult).val(data.from);
              } else {
                $(minResult).text(data.from);
              }
            } else if (minResult || maxResult && type === 'double') {
              if ($(minResult).is('input')) {
                $(minResult).val(data.from);
              } else {
                $(minResult).text(data.from);
              }

              if ($(minResult).is('input')) {
                $(maxResult).val(data.to);
              } else {
                $(maxResult).text(data.to);
              }
            }

            if (hasGrid && type === 'single') {
              $(data.slider).find('.irs-grid-text').each(function (i) {
                var current = $(this);

                if ($(current).text() === data.from) {
                  $(data.slider).find('.irs-grid-text').removeClass('current');
                  $(current).addClass('current');
                }
              });
            }

            if (secondaryResult) {
              for (var i = 0; i < secondaryValue.steps.length; i++) {
                if (data.from >= secondaryValue.steps[i] && data.from < secondaryValue.steps[i + 1]) {
                  if ($(secondaryResult).is('input')) {
                    $(secondaryResult).val(secondaryValue.values[i]);
                  } else {
                    $(secondaryResult).text(secondaryValue.values[i]);
                  }
                }
              }
            }
          } : config.onChange,
          onFinish: isEmpty(config.onFinish) === true ? function (data) {} : config.onFinish,
          onUpdate: isEmpty(config.onUpdate) === true ? function (data) {} : config.onUpdate
        });

        var slider = $this.data('ionRangeSlider');

        if (minResult && type === 'single' && $(minResult).is('input')) {
          $(minResult).on('change', function () {
            slider.update({
              from: $(this).val()
            });
          });
        } else if (minResult || maxResult && type === 'double' && $(minResult).is('input') || $(maxResult).is('input')) {
          $(minResult).on('change', function () {
            slider.update({
              from: $(this).val()
            });
          });
          $(maxResult).on('change', function () {
            slider.update({
              to: $(this).val()
            });
          });
        }

        $(window).on('resize', function () {
          $(graphForegroundTarget + '> *').css({
            width: $(graphForegroundTarget).parent().width()
          });
        });

        //Actions
        collection = collection.add($this);
      });
    }

  };

})(jQuery);

/**
 * Unfold Content component.
 *
 * @author Htmlstream
 * @version 1.0
 */
 ;
 (function ($) {
     'use strict';
     
     $.HSCore.components.HSUnfold = {
         
         /**
          * Base configuration of the component.
          *
          * @private
          */
         _baseConfig: {
             unfoldEvent: 'click',
             unfoldType: 'simple',
             unfoldDuration: 300,
             unfoldEasing: 'linear',
             unfoldAnimationIn: 'fadeIn',
             unfoldAnimationOut: 'fadeOut',
             unfoldHideOnScroll: true,
             unfoldHideOnBlur: false,
             unfoldDelay: 350,
             unfoldOpenedElement: 'init',
             unfoldOverlay: false,
             afterOpen: function (invoker) {
             },
             beforeClose: function (invoker) {
             },
             afterClose: function (invoker) {
             }
         },
         
         /**
          * Collection of all initialized items on the page.
          *
          * @private
          */
         _pageCollection: $(),
         
         /**
          * Initialization.
          *
          * @param {jQuery} collection
          * @param {Object} config
          *
          * @public
          * @return {jQuery}
          */
         init: function (collection, config) {
             
             var self;
             
             if (!collection || !collection.length) return;
             
             self = this;
             
             var fieldsQty;
             
             collection.each(function (i, el) {
                 
                 var $this = $(el), itemConfig;
                 
                 if ($this.data('HSUnfold')) return;
                 
                 itemConfig = config && $.isPlainObject(config) ?
                     $.extend(true, {}, self._baseConfig, config, $this.data()) :
                     $.extend(true, {}, self._baseConfig, $this.data());
                 
                 switch (itemConfig.unfoldType) {
                     
                     case 'css-animation' :
                         
                         $this.data('HSUnfold', new UnfoldCSSAnimation($this, itemConfig));
                         
                         break;
                     
                     case 'jquery-slide' :
                         
                         $this.data('HSUnfold', new UnfoldJSlide($this, itemConfig));
                         
                         break;
                     
                     default :
                         
                         $this.data('HSUnfold', new UnfoldSimple($this, itemConfig));
                     
                 }
                 
                 self._pageCollection = self._pageCollection.add($this);
                 self._bindEvents($this, itemConfig.unfoldEvent, itemConfig.unfoldDelay);
                 var UnFold = $(el).data('HSUnfold');
                 
                 fieldsQty = $(UnFold.target).find('input, textarea').length;
                 
                 if ($(UnFold.target).find('[data-unfold-target]').length) {
                     
                     $this.addClass('target-of-invoker-has-unfolds');
                     
                 }
                 
             });
             
             $(document).on('click touchstart', 'body', function (e) {
                 
                 if (e.target.id === self._baseConfig.unfoldOpenedElement) return;
                 
                 if ($(e.target).closest('#' + self._baseConfig.unfoldOpenedElement).length) return;
                 
                 self._pageCollection.each(function (i, el) {
                     
                     var windW = window.innerWidth,
                         optIsMobileOnly = Boolean($(el).data('is-mobile-only'));
                     
                     if (!optIsMobileOnly) {
                         
                         $(el).data('HSUnfold').hide();
                         
                     } else if (optIsMobileOnly && windW < 769) {
                         
                         $(el).data('HSUnfold').hide();
                         
                     }
                     
                     if ($(el).data('HSUnfold').config.unfoldOverlay) {
                         
                         $(el).data('HSUnfold').config.unfoldDelay = setTimeout(function () {
                             
                             $('.' + $(el).data('HSUnfold').config.unfoldOverlay.className).fadeOut($(el).data('HSUnfold').config.unfoldOverlay.animationSpeed ? $(el).data('HSUnfold').config.unfoldOverlay.animationSpeed : 200);
                             
                         }, $(el).data('HSUnfold').config.unfoldDelay)
                         
                     }
                     
                     $(el).data('HSUnfold').config.beforeClose.call(self.target, self.element);
                     
                 });
                 
             });
             
             $(window).on('scroll.HSUnfold', function () {
                 
                 self._pageCollection.each(function (i, el) {
                     
                     var UnFold = $(el).data('HSUnfold');
                     
                     if (UnFold.getOption('unfoldHideOnScroll') && fieldsQty === 0) {
                         
                         UnFold.hide();
                         
                     } else if (UnFold.getOption('unfoldHideOnScroll') && !(/iPhone|iPad|iPod/i.test(navigator.userAgent))) {
                         
                         UnFold.hide();
                         
                     }
                     
                 });
                 
             });
             
             $(window).on('resize.HSUnfold', function () {
                 
                 if (self._resizeTimeOutId) clearTimeout(self._resizeTimeOutId);
                 
                 self._resizeTimeOutId = setTimeout(function () {
                     
                     self._pageCollection.each(function (i, el) {
                         
                         var UnFold = $(el).data('HSUnfold');
                         
                         UnFold.smartPosition(UnFold.target);
                         
                     });
                     
                 }, 50);
                 
             });
             
             $(document).on('keydown.HSUnfold', function (e) {
                 
                 if ($('body').hasClass('u-unfold-opened')) {
                     
                     if (e.keyCode && e.keyCode === 38 || e.keyCode && e.keyCode === 40) {
                         
                         e.preventDefault();
                         
                     }
                     
                     if (e.keyCode && e.keyCode === 27) {
                         
                         self._pageCollection.each(function (i, el) {
                             
                             $(el).data('HSUnfold').hide();
                             
                         });
                         
                         $('body').removeClass('u-unfold-opened');
                         
                     }
                     
                 }
                 
             });
             
             return collection;
             
         },
         
         /**
          * Binds necessary events.
          *
          * @param {jQuery} $invoker
          * @param {String} eventType
          * @param {Number} delay
          * @private
          */
         _bindEvents: function ($invoker, eventType, delay) {
             
             var self = this,
                 $unfold = $($invoker.data('unfold-target'));
             
             if (eventType === 'hover' && !_isTouch()) {
                 
                 $invoker.on('mouseenter.HSUnfold', function () {
                     
                     var $invoker = $(this),
                         HSUnfold = $invoker.data('HSUnfold');
                     
                     if (!HSUnfold) return;
                     
                     if (HSUnfold.unfoldTimeOut) clearTimeout(HSUnfold.unfoldTimeOut);
                     HSUnfold.show();
                     $('body').addClass('u-unfold-opened');
                     
                 })
                     .on('mouseleave.HSUnfold', function () {
                         
                         var $invoker = $(this),
                             HSUnfold = $invoker.data('HSUnfold');
                         
                         if (!HSUnfold) return;
                         
                         HSUnfold.unfoldTimeOut = setTimeout(function () {
                             
                             HSUnfold.hide();
                             $('body').removeClass('u-unfold-opened');
                             
                         }, delay);
                         
                     });
                 
                 if ($unfold.length) {
                     
                     $unfold.on('mouseenter.HSUnfold', function () {
                         
                         var HSUnfold = $invoker.data('HSUnfold');
                         
                         if (HSUnfold.unfoldTimeOut) clearTimeout(HSUnfold.unfoldTimeOut);
                         HSUnfold.show();
                         
                     })
                         .on('mouseleave.HSUnfold', function () {
                             
                             var HSUnfold = $invoker.data('HSUnfold');
                             
                             HSUnfold.unfoldTimeOut = setTimeout(function () {
                                 HSUnfold.hide();
                             }, delay);
                             
                         });
                 }
                 
             } else {
                 
                 $invoker.on('click.HSUnfold', function (e) {
                     
                     var $curInvoker = $(this),
                         $unfoldNotHasInnerUnfolds = $('[data-unfold-target].active:not(.target-of-invoker-has-unfolds)'),
                         $unfoldHasInnerUnfold = $('[data-unfold-target].active.target-of-invoker-has-unfolds');
                     
                     self._baseConfig.unfoldOpenedElement = $curInvoker.data('HSUnfold').target[0].id;
                     
                     if (!$curInvoker.data('HSUnfold')) return;
                     
                     if (!$curInvoker.hasClass('target-of-invoker-has-unfolds')) {
                         
                         if ($unfoldNotHasInnerUnfolds.length) {
                             
                             $unfoldNotHasInnerUnfolds.data('HSUnfold').toggle();
                             
                         }
                         
                     } else {
                         
                         if ($unfoldHasInnerUnfold.length) {
                             
                             $unfoldHasInnerUnfold.data('HSUnfold').toggle();
                             
                         }
                         
                     }
                     
                     $curInvoker.data('HSUnfold').toggle();
                     $('body').toggleClass('u-unfold-opened');
                     
                     e.stopPropagation();
                     
                     e.preventDefault();
                     
                 });
                 
                 if (Boolean($invoker.data('unfold-target-is-menu'))) {
                     
                     var $target = $($invoker.data('unfold-target')),
                         $targetItems = $target.children();
                     
                     $targetItems.on('click', function () {
                         
                         $invoker.data('HSUnfold').toggle();
                         
                     });
                     
                 }
                 
             }
             
         }
     };
     
     function _isTouch() {
         return 'ontouchstart' in window;
     }
     
     /**
      * Abstract Unfold class.
      *
      * @param {jQuery} element
      * @param {Object} config
      * @abstract
      */
     function AbstractUnfold(element, config) {
         
         var $self = this;
         
         if (!element.length) return false;
         
         $self.element = element;
         $self.config = config;
         
         $self.target = $($self.element.data('unfold-target'));
         
         $self.allInvokers = $('[data-unfold-target="' + $self.element.data('unfold-target') + '"]');
         
         $self.toggle = function () {
             if (!$self.target.length) return $self;
             
             var dataset = $self.element[0].dataset,
                 overlay = dataset.unfoldOverlay ? JSON.parse(dataset.unfoldOverlay) : false;
             
             if ($self.defaultState) {
                 
                 if (dataset.unfoldOverlay) {
                     
                     if (!$('.' + overlay.className).length) {
                         
                         $('<div class="' + overlay.className + '" style="background-color: ' + overlay.background + '"></div>').prependTo('body');
                         
                     }
                     
                     if ($('.' + overlay.className).length) {
                         
                         $('.' + overlay.className).fadeIn(overlay.animationSpeed ? overlay.animationSpeed : 200);
                         
                     }
                     
                 }
                 
                 $self.show();
                 
             } else {
                 
                 if ($('.' + overlay.className).length) {
                     
                     $self.config.unfoldTimeOut = setTimeout(function () {
                         
                         $('.' + overlay.className).fadeOut(overlay.animationSpeed ? overlay.animationSpeed : 200);
                         
                     }, $self.config.unfoldDelay)
                     
                 }
                 
                 $self.hide();
                 
             }
             
             return $self;
         };
         
         this.smartPosition = function (target) {
             
             if (target.data('baseDirection')) {
                 target.css(
                     target.data('baseDirection').direction,
                     target.data('baseDirection').value
                 );
             }
             
             target.removeClass('u-unfold--reverse-y');
             
             var $w = $(window),
                 styles = getComputedStyle(target.get(0)),
                 direction = Math.abs(parseInt(styles.left, 10)) < 40 ? 'left' : 'right',
                 targetOuterGeometry = target.offset();
             
             // horizontal axis
             if (direction === 'right') {
                 
                 if (!target.data('baseDirection')) target.data('baseDirection', {
                     direction: 'right',
                     value: parseInt(styles.right, 10)
                 });
                 
                 if (targetOuterGeometry.left < 0) {
                     
                     target.css(
                         'right',
                         (parseInt(target.css('right'), 10) - (targetOuterGeometry.left - 10)) * -1
                     );
                     
                 }
                 
             } else {
                 
                 if (!target.data('baseDirection')) target.data('baseDirection', {
                     direction: 'left',
                     value: parseInt(styles.left, 10)
                 });
                 
                 if (targetOuterGeometry.left + target.outerWidth() > $w.width()) {
                     
                     target.css(
                         'left',
                         (parseInt(target.css('left'), 10) - (targetOuterGeometry.left + target.outerWidth() + 10 - $w.width()))
                     );
                     
                 }
                 
             }
             
             // vertical axis
             if (targetOuterGeometry.top + target.outerHeight() - $w.scrollTop() > $w.height()) {
                 
                 target.addClass('u-unfold--reverse-y');
                 
             }
             
         };
         
         this.getOption = function (option) {
             return this.config[option] ? this.config[option] : null;
         };
         
         return true;
     }
     
     
     /**
      * UnfoldSimple constructor.
      *
      * @param {jQuery} element
      * @param {Object} config
      * @constructor
      */
     function UnfoldSimple(element, config) {
         if (!AbstractUnfold.call(this, element, config)) return;
         
         Object.defineProperty(this, 'defaultState', {
             get: function () {
                 return this.target.hasClass('u-unfold--hidden');
             }
         });
         
         this.target.addClass('u-unfold--simple');
         
         this.hide();
     }
     
     /**
      * UnfoldCSSAnimation constructor.
      *
      * @param {jQuery} element
      * @param {Object} config
      * @constructor
      */
     function UnfoldCSSAnimation(element, config) {
         if (!AbstractUnfold.call(this, element, config)) return;
         
         var self = this;
         
         this.target
             .addClass('u-unfold--css-animation u-unfold--hidden')
             .css('animation-duration', self.config.unfoldDuration + 'ms');
         
         Object.defineProperty(this, 'defaultState', {
             get: function () {
                 return this.target.hasClass('u-unfold--hidden');
             }
         });
         
         if (this.target.length) {
             
             this.target.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (e) {
                 
                 if (self.target.hasClass(self.config.unfoldAnimationOut)) {
                     
                     self.target.removeClass(self.config.unfoldAnimationOut)
                         .addClass('u-unfold--hidden');
                     
                     
                     if (self.allInvokers.length) self.allInvokers.attr('aria-expanded', 'false');
                     
                     self.config.afterClose.call(self.target, self.element);
                 }
                 
                 if (self.target.hasClass(self.config.unfoldAnimationIn)) {
                     
                     if (self.allInvokers.length) self.allInvokers.attr('aria-expanded', 'true');
                     
                     self.config.afterOpen.call(self.target, self.element);
                 }
                 
                 e.preventDefault();
                 e.stopPropagation();
             });
             
         }
     }
     
     /**
      * UnfoldSlide constructor.
      *
      * @param {jQuery} element
      * @param {Object} config
      * @constructor
      */
     function UnfoldJSlide(element, config) {
         if (!AbstractUnfold.call(this, element, config)) return;
         
         this.target.addClass('u-unfold--jquery-slide u-unfold--hidden').hide();
         
         Object.defineProperty(this, 'defaultState', {
             get: function () {
                 return this.target.hasClass('u-unfold--hidden');
             }
         });
     }
     
     /**
      * Shows Unfold.
      *
      * @public
      * @return {UnfoldSimple}
      */
     UnfoldSimple.prototype.show = function () {
         
         var activeEls = $(this)[0].config.unfoldTarget;
         
         $('[data-unfold-target="' + activeEls + '"]').addClass('active');
         
         this.smartPosition(this.target);
         
         this.target.removeClass('u-unfold--hidden');
         if (this.allInvokers.length) this.allInvokers.attr('aria-expanded', 'true');
         this.config.afterOpen.call(this.target, this.element);
         
         return this;
     };
     
     /**
      * Hides Unfold.
      *
      * @public
      * @return {UnfoldSimple}
      */
     UnfoldSimple.prototype.hide = function () {
         
         var activeEls = $(this)[0].config.unfoldTarget;
         
         $('[data-unfold-target="' + activeEls + '"]').removeClass('active');
         
         this.target.addClass('u-unfold--hidden');
         if (this.allInvokers.length) this.allInvokers.attr('aria-expanded', 'false');
         this.config.afterClose.call(this.target, this.element);
         
         return this;
     };
     
     /**
      * Shows Unfold.
      *
      * @public
      * @return {UnfoldCSSAnimation}
      */
     UnfoldCSSAnimation.prototype.show = function () {
         
         var self = this,
             activeEls = $(self)[0].config.unfoldTarget;
         
         $('[data-unfold-target="' + activeEls + '"]').addClass('active');
         
         self.smartPosition(self.target);
         
         self.target.removeClass('u-unfold--hidden')
             .removeClass(self.config.unfoldAnimationOut);
         
         if (!self.config.unfoldOverlay) {
             
             self.target.addClass(self.config.unfoldAnimationIn);
             
         } else {
             
             setTimeout(function () {
                 
                 self.target.addClass(self.config.unfoldAnimationIn);
                 
             });
             
         }
         
         self.config.afterOpen.call(self.target, self.element);
         
     };
     
     /**
      * Hides Unfold.
      *
      * @public
      * @return {UnfoldCSSAnimation}
      */
     UnfoldCSSAnimation.prototype.hide = function () {
         
         var activeEls = $(this)[0].config.unfoldTarget;
         
         $('[data-unfold-target="' + activeEls + '"]').removeClass('active');
         
         this.target.removeClass(this.config.unfoldAnimationIn)
             .addClass(this.config.unfoldAnimationOut);
         
     };
     
     /**
      * Shows Unfold.
      *
      * @public
      * @return {UnfoldJSlide}
      */
     UnfoldJSlide.prototype.show = function () {
         
         var self = this;
         
         var activeEls = $(this)[0].config.unfoldTarget;
         
         $('[data-unfold-target="' + activeEls + '"]').addClass('active');
         
         this.smartPosition(this.target);
         
         this.target.removeClass('u-unfold--hidden').stop().slideDown({
             duration: self.config.unfoldDuration,
             easing: self.config.unfoldEasing,
             complete: function () {
                 self.config.afterOpen.call(self.target, self.element);
             }
         });
         
     };
     
     /**
      * Hides Unfold.
      *
      * @public
      * @return {UnfoldJSlide}
      */
     UnfoldJSlide.prototype.hide = function () {
         
         var self = this;
         
         var activeEls = $(this)[0].config.unfoldTarget;
         
         $('[data-unfold-target="' + activeEls + '"]').removeClass('active');
         
         this.target.slideUp({
             duration: self.config.unfoldDuration,
             easing: self.config.unfoldEasing,
             complete: function () {
                 self.config.afterClose.call(self.target, self.element);
                 self.target.addClass('u-unfold--hidden');
             }
         });
         
     }
     
 })(jQuery);
 
