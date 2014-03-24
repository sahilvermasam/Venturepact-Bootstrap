/*! ========================================================================
 * Core v1.0.0
 * Copyright 2014 pampersdry
 * ========================================================================
 *
 * pampersdry@gmail.com
 *
 * this script. This script will be use in my other projects too.
 * Your support ensure the continuity of this script and it projects.
 * ======================================================================== */

if (typeof jQuery === "undefined") { throw new Error("This application requires jQuery"); }

/* ========================================================================
 * 
 * BEGIN CORE SCRIPT
 *
 * ======================================================================== */
;(function ($, window, document, undefined) {

    // Create the defaults once
    var pluginName  = "Core";
    var defaults    = {
        console: true,
        eventPrefix: "fa"
    };

    function MAIN(element, options) {
        this.element    = element;
        this.settings   = $.extend({}, defaults, options);
        this._defaults  = defaults;
        this._name      = pluginName;
        this._version   = "1.0.0";
        this.init();
    }

    MAIN.prototype = {
        init: function () {
            var self = this;
            // Libary loader
            // ================================
            yepnope([
                {
                    test : Modernizr.input.placeholder,
                    nope : { "placeholder" : "library/placeholder/js/placeholder.min.js" }
                }, 
                {
                    test : Modernizr.canvas,
                    nope : { "excanvas" : "library/excanvas/js/excanvas.min.js" }
                }, 
                {
                    test : Modernizr.touch,
                    yep  : { "fastclick" : "library/fastclick/js/fastclick.min.js" },
                    nope : { "slimscroll" : "library/slimscroll/js/slimscroll.min.js" },
                    callback: function (url, result, key) {
                        if(key === "slimscroll") { 
                            self.MISC.Scrollbar();
                        }
                        if(key === "fastclick") { 
                            self.MISC.Fastclick();
                        }
                    }
                }, 
                {
                    load: [
                        "library/unveil/js/unveil.min.js",
                        "library/transit/js/transit.min.js",
                        "library/prettify/js/prettify.min.js",
                        "library/waypoints/js/waypoints.min.js"
                    ],
                    complete: function () {
                        self.PLUGINS();
                        self.LAYOUTS();
                        self.MISC.Init();
                    }
                }
            ]);
        },
        // Helper
        // ================================
        HELPER: {
            // @Helper: Console
            // Per call
            // ================================
            Console: function (cevent) {
                if(settings.console) {
                    $(element).on(cevent, function (e, o) {
                        console.log("----- "+cevent+" -----");
                        console.log(o.element);
                    });
                }
            }
        },

        // Misc
        // ================================
        MISC: {
            // @MISC: Init
            Init: function () {
                this.Prettify();
                this.Unveil();
                this.BsTooltip();
                this.BsPopover();
            },

            // @MISC: Scrollbar
            // Per call
            // ================================
            Scrollbar: function () {
                $(".slimscroll").slimScroll({
                    size: "6px",
                    distance: "0px",
                    wrapperClass: "viewport",
                    railClass: "scrollrail",
                    barClass: "scrollbar",
                    wheelStep: 10,
                    railVisible: true,
                    alwaysVisible: true
                });
            },

            // @MISC: Fastclick
            // Per call
            // ================================
            Fastclick: function () {
                FastClick.attach(document.body);
            },

            // @MISC: Prettify - Code prettify
            // Per call
            // ================================
            Prettify: function () {
                window.prettyPrint && prettyPrint();
            },

            // @MISC: Unveil - lazyload images
            // Per call
            // ================================
            Unveil: function () {
                $("[data-toggle~=unveil]").unveil(200, function () {
                    $(this).load(function () {
                        $(this).addClass("unveiled");
                    });
                });
            },

            // @MISC: BsTooltip - Bootstrap tooltip
            // Per call
            // ================================
            BsTooltip: function () {
                $("[data-toggle~=tooltip]").tooltip();
            },

            // @MISC: BsPopover - Bootstrap popover
            // Per call
            // ================================
            BsPopover: function () {
                $("[data-toggle~=popover]").popover();
            }
        },

        // Layout behavior
        // ================================
        LAYOUTS: function () {
            element     = this.element;
            settings    = this.settings;

        },

        // Custom Mini Plugins
        // ================================
        PLUGINS: function () {
            // access MAIN variable
            element     = this.element;
            settings    = this.settings;

            // @PLUGIN: ToTop
            // Self invoking
            // ================================
            (ToTop = function () {
                var toggler     = "[data-toggle~=totop]";

                // toggler
                $(element).on("click", toggler, function (e) {
                    $("html, body").animate({
                        scrollTop: 0
                    }, 200);

                    e.preventDefault();
                });
            }).call();

            // @PLUGIN: WayPoints
            // Self invoking
            // ================================
            (WayPoints = function () {
                var toggler     = "[data-toggle~=waypoints]";

                $(toggler).each(function () {
                    var wayShowAnimation,
                        wayHideAnimation,
                        wayOffset,
                        wayMarker,
                        target = this;

                    // check if marker is define or not
                    !!$(this).data("marker") ? wayMarker = $(this).data("marker") : wayMarker = this;

                    // check if offset is define or not
                    !!$(this).data("offset") ? wayOffset = $(this).data("offset") : wayOffset = "95%";

                    // check if show animation is define or not
                    !!$(this).data("showanim") ? wayShowAnimation = $(this).data("showanim") : wayShowAnimation = "fadeIn";

                    // check if hide animation is define or not
                    !!$(this).data("hideanim") ? wayHideAnimation = $(this).data("hideanim") : wayHideAnimation = false;

                    // waypoints core
                    $(wayMarker).waypoint(function (d) {
                        if(d === "down") {
                            $(target)
                                .removeClass(wayHideAnimation + " animated")
                                .addClass(wayShowAnimation + " animating")
                                .on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                                    $(this).removeClass("animating").addClass("animated").removeClass(wayShowAnimation);;
                                });
                        } 
                        if( (d === "up") && (wayHideAnimation !== false)) {
                            $(target)
                                .removeClass(wayShowAnimation + " animated")
                                .addClass(wayHideAnimation + " animating")
                                .on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                                    $(this).removeClass("animating").removeClass("animated").removeClass(wayHideAnimation);
                                });
                        }
                    }, { offset: wayOffset });
                });
            }).call();

            // @PLUGIN: SelectRow
            // Self invoking
            // ================================
            (SelectRow = function () {
                var contextual,
                    toggler     = "[data-toggle~=selectrow]",
                    target      = $(toggler).data("target");

                // check on DOM ready
                $(toggler).each(function () {
                    if($(this).is(":checked")) {
                        selectrow(this, "checked");
                    }
                });

                // clicker
                $(element).on("change", toggler, function () {
                    // checked / unchecked
                    if($(this).is(":checked")) {
                        selectrow(this, "checked");
                    } else {
                        selectrow(this, "unchecked");
                    }
                });

                // Core SelectRow function
                // state: checked/unchecked
                function selectrow ($this, state) {
                    // contextual
                    !!$($this).data("contextual") ? contextual = $($this).data("contextual") : contextual = "active";

                    if(state === "checked") {
                        // add contextual class
                        $($this).parents(target).addClass(contextual);

                        // publish event
                        $(element).trigger(settings.eventPrefix+".selectrow.selected", { "element": $($this).parents(target) });
                    } else {
                        // remove contextual class
                        $($this).parents(target).removeClass(contextual);

                        // publish event
                        $(element).trigger(settings.eventPrefix+".selectrow.unselected", { "element": $($this).parents(target) });
                    }
                }

                // Event console
                MAIN.prototype.HELPER.Console(settings.eventPrefix+".selectrow.selected");
                MAIN.prototype.HELPER.Console(settings.eventPrefix+".selectrow.unselected");
            }).call();

            // @PLUGIN: CheckAll
            // Self invoking
            // ================================
            (CheckAll = function () {
                var contextual,
                    toggler     = "[data-toggle~=checkall]",
                    target      = $(toggler).data("target");

                // check on DOM ready
                $(toggler).each(function () {
                    if($(this).is(":checked")) {
                        checked();
                    }
                });
                
                // clicker
                $(element).on("change", toggler, function () {
                    // checked / unchecked
                    if($(this).is(":checked")) {
                        checked();
                    } else {
                        unchecked();
                    }
                });

                // Core CheckAll function
                function checked () {
                    // find checkbox
                    $(target).find("input[type=checkbox]").each(function () {
                        $(this).prop("checked", true);

                        // select row
                        if($(this).data("toggle") === "selectrow") {
                            // contextual
                            !!$(this).data("contextual") ? contextual = $(this).data("contextual") : contextual = "active";

                            // add contextual class
                            $(this).parents($(this).data("target")).addClass(contextual);
                        }  
                    });

                    // publish event
                    $(element).trigger(settings.eventPrefix+".checkall.checked", { "element": $(target) });
                }
                
                function unchecked () {
                    // find checkbox
                    $(target).find("input[type=checkbox]").each(function () {
                        $(this).prop("checked", false);

                        // select row
                        if($(this).data("toggle") === "selectrow") {
                            // contextual
                            !!$(this).data("contextual") ? contextual = $(this).data("contextual") : contextual = "active";

                            // remove contextual class
                            $(this).parents($(this).data("target")).removeClass(contextual);
                        }
                    });

                    // publish event
                    $(element).trigger(settings.eventPrefix+".checkall.unchecked", { "element": $(target) });
                }

                // Event console
                MAIN.prototype.HELPER.Console(settings.eventPrefix+".checkall.checked");
                MAIN.prototype.HELPER.Console(settings.eventPrefix+".checkall.unchecked");
            }).call();

            // @PLUGIN: Panel Refresh
            // Self invoking
            // ================================
            (PanelRefresh = function () {
                var isDemo          = false,
                    indicatorClass  = "indicator",
                    toggler         = "[data-toggle~=panelrefresh]";

                // clicker
                $(element).on("click", toggler, function (e) {
                    // find panel element
                    var panel       = $(this).parents(".panel"),
                        indicator   = panel.find("."+indicatorClass);

                    // check if demo or not
                    !!$(this).hasClass("demo") ? isDemo = true : isDemo = false;

                    // check indicator
                    if(indicator.length !== 0) {
                        indicator.addClass("show");

                        // check if demo or not
                        if(isDemo) {
                            setTimeout(function () {
                                indicator.removeClass("show");
                            }, 2000);
                        }

                        // publish event
                        $(element).trigger(settings.eventPrefix+".panelrefresh.refresh", { "element": $(panel) });
                    } else {
                        $.error("There is no `indicator` element inside this panel.");
                    }

                    // prevent default
                    e.preventDefault();
                });

                // Event console
                MAIN.prototype.HELPER.Console(settings.eventPrefix+".panelrefresh.refresh");
            }).call();
            
            // @PLUGIN: Panel Collapse
            // Self invoking
            // ================================
            (PanelCollapse = function () {
                var toggler   = "[data-toggle~=panelcollapse]";

                // clicker
                $(element).on("click", toggler, function (e) {
                    // find panel element
                    var panel   = $(this).parents(".panel"),
                        target  = panel.children(".panel-collapse"),
                        height  = target.height();

                    // error handling
                    if(target.length === 0) {
                        $.error("collapsable element need to be wrap inside '.panel-collapse'");
                    }

                    // collapse the element
                    $(target).hasClass("out") ? close(this) : open(this);

                    function open (toggler) {
                        $(toggler).removeClass("down").addClass("up");
                        $(target)
                            .removeClass("pull").addClass("pulling")
                            .css("height", "0px")
                            .transition({ height: height }, function() {
                                $(this).removeClass("pulling").addClass("pull out");
                                $(this).css({ "height": "" });
                            });

                        // publish event
                        $(element).trigger(settings.eventPrefix+".panelcollapse.open", { "element": $(panel) });
                    }
                    function close (toggler) {
                        $(toggler).removeClass("up").addClass("down");
                        $(target)
                            .removeClass("pull out").addClass("pulling")
                            .css("height", height)
                            .transition({ height: "0px" }, function() {
                                $(this).removeClass("pulling").addClass("pull");
                                $(this).css({ "height": "" });
                            });

                        // publish event
                        $(element).trigger(settings.eventPrefix+".panelcollapse.close", { "element": $(panel) });
                    }

                    // prevent default
                    e.preventDefault();
                });

                // Event console
                MAIN.prototype.HELPER.Console(settings.eventPrefix+".panelcollapse.open");
                MAIN.prototype.HELPER.Console(settings.eventPrefix+".panelcollapse.close");
            }).call();
            
            // @PLUGIN: Panel Remove
            // Self invoking
            // ================================
            (PanelRemove = function () {
                var panel,
                    parent,
                    toggler   = "[data-toggle~=panelremove]";

                // clicker
                $(element).on("click", toggler, function (e) {
                    // find panel element
                    panel   = $(this).parents(".panel");
                    parent  = $(this).data("parent");

                    // remove panel
                    panel.transition({ scale: 0 }, function () {
                        //remove
                        if(parent) {
                            $(this).parents(parent).remove();
                        } else {
                            $(this).remove();
                        }

                        // publish event
                        $(element).trigger(settings.eventPrefix+".panelcollapse.close", { "element": $(panel) });
                    });

                    // prevent default
                    e.preventDefault();
                });

                // Event console
                MAIN.prototype.HELPER.Console(settings.eventPrefix+".panelremove.remove");
            }).call();

            // @PLUGIN: SubMenu
            // Self invoking
            // utilize bootstrap collapse
            // ================================
            (SubMenu = function () {
                var target,
                    targetHeight,
                    toggler         = "[data-toggle~=submenu]";

                // clicker
                $(element).on("click", toggler, function (e) {
                    target       = $(this).data("target"),
                    targetHeight = $(target).height();

                    // toggle open / close
                    $(target).hasClass("in") ? close(target) : open(target, this);

                    // prevent default
                    e.preventDefault();
                });

                function open (target, ctoggler) {
                    // close other open target if parent is defined
                    if($(ctoggler).data("parent")) {
                        $($(ctoggler).data("parent")+" .in").each(function () {
                            close(this);
                        });
                    }

                    // collapse show
                    $(target).collapse("show");

                    // add opened class to parent element
                    $(target).parent().addClass("open");

                    // publish event
                    $(element).trigger(settings.eventPrefix+".submenu.open", { "element": $(target) });
                }
                function close (target) {
                    // collapse hide
                    $(target).collapse("hide");

                    // remove opened class to parent element
                    $(target).parent().removeClass("open");

                    // publish event
                    $(element).trigger(settings.eventPrefix+".submenu.close", { "element": $(target) });
                }

                // Event console
                MAIN.prototype.HELPER.Console(settings.eventPrefix+".submenu.open");
                MAIN.prototype.HELPER.Console(settings.eventPrefix+".submenu.close");
            }).call();

            // @PLUGIN: Offcanvas
            // Self invoking
            // ================================
            (Offcanvas = function () {
                var direction,
                    sidebar,
                    toggler      = "[data-toggle~=offcanvas]",
                    openClass    = "sidebar-open";  

                // sidebar toggler
                function toggle () {
                    // get direction
                    direction = $(this).data("direction");
                    direction === "ltr" ? sidebar = ".sidebar-left" : sidebar = ".sidebar-right";

                    // trigger error if `data-direction` is not set
                    if((direction === false)||(direction === "")) {
                        $.error("missing `data-direction` value (ltr or rtl)");
                    }

                    // open/close sidebar
                    !$(element).hasClass(openClass+"-"+direction) ? open() : close();
                    return false;
                }

                function open () {
                    $(element).addClass(openClass+"-"+direction);
                    $(element).trigger(settings.eventPrefix+".offcanvas.open", {
                        "element": $(sidebar)
                    });
                }
                function close () {
                    if ($(element).hasClass(openClass+"-"+direction)) {
                        $(element).removeClass(openClass+"-"+direction);
                        $(element).trigger(settings.eventPrefix+".offcanvas.close", {
                            "element": $(sidebar)
                        });
                    }
                }

                $(document)
                    .on("click", close)
                    .on("click", ".sidebar,"+ toggler, function (e) { e.stopPropagation(); })
                    .on("click", toggler, toggle);

                // Event console
                MAIN.prototype.HELPER.Console(settings.eventPrefix+".offcanvas.open");
                MAIN.prototype.HELPER.Console(settings.eventPrefix+".offcanvas.close");
            }).call();

            // @PLUGIN: Ajax load
            // Self invoking
            // ================================
            (AjaxLoad = function () {
                var container,
                    source,
                    param,
                    eventClass   = {"complete": "ajaxload-complete", "start": "ajaxload-start", "success": "ajaxload-success", "error": "ajaxload-error"};
                    toggler      = "[data-toggle~=ajaxload]";  

                // clicker
                $(element).on("click", toggler, function (e) {
                    // check if container is define or nor
                    if($(this).data("container")) {
                        container = $($(this).data("container"));
                    } else {
                        $.error("missing `data-container`");
                    }

                    // remove active class
                    $(toggler).each(function () {
                        $(this).removeClass("active");
                    });
                    $(this).addClass("active");

                    // find source
                    $(this).data("source") ? source = $(this).data("source") : source = $(this).attr("href");

                    // add loading class
                    $(element)
                        .addClass(eventClass.start)
                        .removeClass(eventClass.complete)
                        .removeClass(eventClass.success)
                        .removeClass(eventClass.error);

                    // core ajax function
                    var ajaxload = $.ajax({
                        type: "GET",
                        url: source,
                        context: $(element)
                    });

                    // handle status (done)
                    ajaxload.done(function (data) {
                        $(this)
                            .addClass(eventClass.success)
                            .removeClass(eventClass.complete)
                            .removeClass(eventClass.start)
                            .removeClass(eventClass.error);

                        // append
                        container.html(data);

                        // publish event
                    });
                    // handle status (error)
                    ajaxload.error(function (data) {
                        $(this)
                            .addClass(eventClass.error)
                            .removeClass(eventClass.complete)
                            .removeClass(eventClass.start)
                            .removeClass(eventClass.success);
                    });
                    // handle status (complete)
                    ajaxload.always(function (data) {
                        $(this)
                            .addClass(eventClass.complete)
                            .removeClass(eventClass.start);
                    });

                    // prevent default
                    e.preventDefault();
                });

                // Event console
                //MAIN.prototype.HELPER.Console(settings.eventPrefix+".offcanvas.open");
                //MAIN.prototype.HELPER.Console(settings.eventPrefix+".offcanvas.close");
            }).call();
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new MAIN(this, options));
            }
        });
    };

})(jQuery, window, document);