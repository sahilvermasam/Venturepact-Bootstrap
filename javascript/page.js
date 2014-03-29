/* ========================================================================
 * Page.js
 * Copyright 2014 pampersdry.info
 * ========================================================================
 *
 * This is the place where all the page related javascript is reside. You can
 * see example usage of plugin here :)
 * ======================================================================== */

if (typeof jQuery === "undefined") { throw new Error("This application requires jQuery"); }

/* ========================================================================
 * Custom select function
 * Plugin: selectize
 * ======================================================================== */
var customSelect = function () {
    if (jQuery().selectize) {
        var REGEX_EMAIL = "([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@" +
            "(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)";

        var formatName = function (item) {
            return $.trim((item.first_name || '') + ' ' + (item.last_name || ''));
        };
        // contact
        $("#selectize-contact").selectize({
            persist: false,
            maxItems: null,
            valueField: "email",
            labelField: "name",
            searchField: ["first_name", "last_name", "email"],
            sortField: [{
                field: "first_name",
                direction: "asc"
            }, {
                field: "last_name",
                direction: "asc"
            }],
            options: [{
                email: "nikola@tesla.com",
                first_name: "Nikola",
                last_name: "Tesla"
            }, {
                email: "brian@thirdroute.com",
                first_name: "Brian",
                last_name: "Reavis"
            }, {
                email: "pampersdry@gmail.com",
                first_name: "John",
                last_name: "Pozy"
            }],
            render: {
                item: function (item, escape) {
                    var name = formatName(item);
                    return "<div>" +
                        (name ? "<span class=\"name\">" + escape(name) + "</span>" : "") +
                        (item.email ? "<small class=\"text-muted ml10\">" + escape(item.email) + "</small>" : "") +
                        "</div>";
                },
                option: function (item, escape) {
                    var name = formatName(item);
                    var label = name || item.email;
                    var caption = name ? item.email : null;
                    return "<div>" +
                        "<span class=\"text-primary\">" + escape(label) + "</span><br/>" +
                        (caption ? "<small class=\"text-muted\">" + escape(caption) + "</small>" : "") +
                        "</div>";
                }
            },
            create: function (input) {
                if ((new RegExp("^" + REGEX_EMAIL + "$", "i")).test(input)) {
                    return {
                        email: input
                    };
                }
                var match = input.match(new RegExp("^([^<]*)\<" + REGEX_EMAIL + "\>$", "i"));
                if (match) {
                    var name = $.trim(match[1]);
                    var pos_space = name.indexOf(" ");
                    var first_name = name.substring(0, pos_space);
                    var last_name = name.substring(pos_space + 1);

                    return {
                        email: match[2],
                        first_name: first_name,
                        last_name: last_name
                    };
                }
                alert("Invalid email address.");
                return false;
            }
        });
    }
},

/* ========================================================================
 * Summernote - WYSIWYG
 * Plugin: summernote
 * ======================================================================== */
SummerNote = function () {
    if (jQuery().summernote) {
        $(".summernote").summernote({
            height: 200,
            toolbar: [
                ["style", ["style"]],
                ["style", ["bold", "italic", "underline", "clear"]],
                ["fontsize", ["fontsize"]],
                ["color", ["color"]],
                ["para", ["ul", "ol", "paragraph"]],
                ["height", ["height"]],
                ["table", ["table"]]
            ]
        });
    }
};


/* ========================================================================
 * 
 * BEGIN PAGE RELATED SCRIPT
 *
/* ========================================================================
 * Page: index.html(dashboard)
 * Plugin: sparkline, flot chart
 * ======================================================================== */
;(function ($, window, document, undefined) {
    if ($("body").data("page") === "dashboard") {
        // Log page name
        // ================================
        console.log("Page: " + $("body").data("page") + ".html");

        // Sparkline
        // ================================
        (function () {
            if (jQuery().sparkline) {
                $(".sparklines").sparkline("html", {
                    enableTagOptions: true
                });
            }
        })();

        // Area Chart - Spline
        // ================================
        (function () {
            $.plot("#chart-audience", [{
                label: "Visit (All)",
                color: "#DC554F",
                data: [
                    ["Jan", 47],
                    ["Feb", 84],
                    ["Mar", 60],
                    ["Apr", 143],
                    ["May", 39],
                    ["Jun", 86],
                    ["Jul", 87]
                ]
            }, {
                label: "Visit (Mobile)",
                color: "#9365B8",
                data: [
                    ["Jan", 83],
                    ["Feb", 32],
                    ["Mar", 16],
                    ["Apr", 47],
                    ["May", 98],
                    ["Jun", 84],
                    ["Jul", 18]
                ]
            }], {
                series: {
                    lines: {
                        show: false
                    },
                    splines: {
                        show: true,
                        tension: 0.4,
                        lineWidth: 2,
                        fill: 0.8
                    },
                    points: {
                        show: true,
                        radius: 4
                    }
                },
                grid: {
                    borderColor: "rgba(0, 0, 0, 0.05)",
                    borderWidth: 1,
                    hoverable: true,
                    backgroundColor: "transparent"
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%x : %y",
                    defaultTheme: false
                },
                xaxis: {
                    tickColor: "rgba(0, 0, 0, 0.05)",
                    mode: "categories"
                },
                yaxis: {
                    tickColor: "rgba(0, 0, 0, 0.05)"
                },
                shadowSize: 0
            });
        })();
    }
})(jQuery, window, document);


/* ========================================================================
 * Page: component-animation.html
 * Plugin: none
 * ======================================================================== */
;(function ($, window, document, undefined) {
    if ($("body").data("page") === "component-animation") {
        // Log page name
        // ================================
        console.log("Page: " + $("body").data("page") + ".html");

        // Toggle animation
        // ================================
        (function () {
            var anim,
                panel;

            // toggler
            $("body").on("click", ".btn-toggle-anim", function (e) {
                // get animation class and panel
                anim = $(this).data("anim");
                panel = $(this).parents(".panel");

                // add animation class to panel element
                panel
                    .addClass("animation animating " + anim)
                    .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                        $(this).removeClass("animation animating " + anim);

                    });
                e.preventDefault();
            });
        })();
    }
})(jQuery, window, document);


/* ========================================================================
 * Page: page-email-view.html
 * Plugin: summernote, selectize
 * ======================================================================== */
;(function ($, window, document, undefined) {
    if ($("body").data("page") === "page-email-view") {
        // Log page name
        // ================================
        console.log("Page: " + $("body").data("page") + ".html");

        // Summernote
        // ================================
        SummerNote();

        // Custom select
        // ================================
        customSelect();
    }
})(jQuery, window, document);


/* ========================================================================
 * Page: page-email-inbox.html
 * Plugin: gritter, summernote, selectize
 * ======================================================================== */
;(function ($, window, document, undefined) {
    if ($("body").data("page") === "page-email-inbox") {
        // Log page name
        // ================================
        console.log("Page: " + $("body").data("page") + ".html");

        // Gritter
        // ================================
        (function () {
            setTimeout(function () {
                $.gritter.add({
                    title: "You have (5) unread email",
                    text: "This will fade out after a certain amount of time. Vivamus eget tincidunt velit.",
                    image: "image/avatar/avatar5.jpg",
                    sticky: false
                });
            }, 3000);
        })();

        // Summernote
        // ================================
        SummerNote();

        // Custom select
        // ================================
        customSelect();
    }
})(jQuery, window, document);


/* ========================================================================
 * Page: page-message-default.html, page-message-rich.html
 * Plugin: magnific, gritter
 * ======================================================================== */
;(function ($, window, document, undefined) {
    if (($("body").data("page") === "page-message-default") || ($("body").data("page") === "page-message-rich")) {
        // Log page name
        // ================================
        console.log("Page: " + $("body").data("page") + ".html");

        // Gritter
        // ================================
        (function () {
            setTimeout(function () {
                $.gritter.add({
                    title: "You have (14) unread message",
                    text: "This will fade out after a certain amount of time. Vivamus eget tincidunt velit.",
                    image: "image/avatar/avatar9.jpg",
                    sticky: false
                });
            }, 3000);
        })();

        // Magnific Popup
        // ================================
        (function () {
            if (jQuery().magnificPopup) {
                $("#photo-album").magnificPopup({
                    delegate: ".magnific",
                    type: "image",
                    gallery: {
                        enabled: true
                    }
                });
            }
        })();

        // Custom select
        // ================================
        customSelect();
    }
})(jQuery, window, document);


/* ========================================================================
 * Page: page-media.html
 * Plugin: mixitup, magnific
 * ======================================================================== */
;(function ($, window, document, undefined) {
    if ($("body").data("page") === "page-media") {
        // Log page name
        // ================================
        console.log("Page: " + $("body").data("page") + ".html");

        // Sort / filter
        // ================================
        $("#mixitup-grid").mixitup({
            effects: ["fade", "scale"],
            easing: "snap"
        });

        // Lightbox
        // ================================
        $("#mixitup-grid").magnificPopup({
            delegate: ".magnific",
            type: "image",
            gallery: {
                enabled: true
            }
        });
    }
})(jQuery, window, document);


/* ========================================================================
 * Page: page-profile.html
 * Plugin: magnific
 * ======================================================================== */
;(function ($, window, document, undefined) {
    if ($("body").data("page") === "page-profile") {
        // Log page name
        // ================================
        console.log("Page: " + $("body").data("page") + ".html");

        // Magnific Popup
        // ================================
        $("#photo-list").magnificPopup({
            delegate: ".magnific",
            type: "image",
            gallery: {
                enabled: true
            }
        });
    }
})(jQuery, window, document);


/* ========================================================================
 * Page: table-default.html
 * Plugin: sparkline
 * ======================================================================== */
;(function ($, window, document, undefined) {
    if ($("body").data("page") === "table-default") {
        // Log page name
        // ================================
        console.log("Page: " + $("body").data("page") + ".html");

        // Sparkline
        // ================================
        if (jQuery().sparkline) {
            $(".sparklines").sparkline("html", {
                enableTagOptions: true
            });
        }
    }
})(jQuery, window, document);


/* ========================================================================
 * Page: table-datatable.html
 * Plugin: datatable
 * ======================================================================== */
;(function ($, window, document, undefined) {
    if ($("body").data("page") === "table-datatable") {
        // Log page name
        // ================================
        console.log("Page: " + $("body").data("page") + ".html");

        // Datatable
        // ================================
        if (jQuery().dataTable) {
            // zero configuration
            $("#zero-configuration").dataTable();

            // full pagination
            $("#ajax-source").dataTable({
                "bProcessing": true,
                "sAjaxSource": "server/datatables/data.txt"
            });

            // table tools
            $("#table-tools").dataTable({
                "sDom": "<'row'<'col-sm-4'T><'col-sm-4'l><'col-sm-4'f>><'table-responsive'rt><'row'<'col-sm-6'p><'col-sm-6'i>>",
                "oTableTools": {
                    "sSwfPath": "plugins/datatables/tabletools/swf/copy_csv_xls_pdf.swf",
                    "aButtons": [
                        "copy",
                        "print",
                        "pdf",
                        "csv"
                    ]
                }
            });

            // Formating function for row details
            var fnFormatDetails = function (oTable, nTr) {
                var sOut = "",
                    aData = oTable.fnGetData(nTr);

                sOut += '<table class="table table-condensed nm">';
                sOut += '<tr><td width="15%">Rendering engine:</td><td>' + aData[1] + ' ' + aData[4] + '</td></tr>';
                sOut += '<tr><td width="15%">Link to source:</td><td>Could provide a link here</td></tr>';
                sOut += '<tr><td width="15%">Extra info:</td><td>And any further details here (images etc)</td></tr>';
                sOut += '</table>';

                return sOut;
            };

            var nCloneTh = document.createElement("th"),
                nCloneTd = document.createElement("td");
            nCloneTd.innerHTML = '<a href="#" class="text-primary detail-toggler" style="text-decoration:none;font-size:14px;"><i class="ico-plus-circle"></i></a>';
            nCloneTd.className = "center";

            $("#row-detail thead tr").each(function () {
                this.insertBefore(nCloneTh, this.childNodes[0]);
            });
            $("#row-detail tbody tr").each(function () {
                this.insertBefore(nCloneTd.cloneNode(true), this.childNodes[0]);
            });

            // Initialse DataTables
            var oTable = $("#row-detail").dataTable({
                "aoColumnDefs": [{
                    "bSortable": false,
                    "aTargets": [0]
                }],
                "aaSorting": [
                    [1, "asc"]
                ]
            });

            // Add event listener for opening and closing details
            $("#row-detail tbody td .detail-toggler").on("click", function (e) {
                var nTr = $(this).parents("tr")[0];
                $(nTr).toggleClass("open");
                if (oTable.fnIsOpen(nTr)) {
                    // This row is already open - close it
                    $(this).children().attr("class", "ico-plus-circle");
                    oTable.fnClose(nTr);
                } else {
                    // Open this row
                    $(this).children().attr("class", "ico-minus-circle");
                    oTable.fnOpen(nTr, fnFormatDetails(oTable, nTr), "details np");
                }
                e.preventDefault();
            });
        }
    }
})(jQuery, window, document);


/* ========================================================================
 * Page: form-editor.html
 * Plugin: summernote
 * ======================================================================== */
;(function ($, window, document, undefined) {
    if ($("body").data("page") === "form-editor") {
        // Log page name
        // ================================
        console.log("Page: " + $("body").data("page") + ".html");

        // WYSISYG Editor
        // ================================
        SummerNote();
    }
})(jQuery, window, document);


/* ========================================================================
 * Page: form-wizard.html
 * Plugin: steps, parsley
 * ======================================================================== */
;(function ($, window, document, undefined) {
    if ($("body").data("page") === "form-wizard") {
        // Log page name
        // ================================
        console.log("Page: " + $("body").data("page") + ".html");

        // Form wizard with no validation
        // ================================
        $("#wizard").steps({
            headerTag: ".wizard-title",
            bodyTag: ".wizard-container",
            onFinished: function () {
                // do anything here ;)
                alert("finished!");
            }
        });

        // Form wizard with validation
        // ================================
        $("#wizard-validate").steps({
            headerTag: ".wizard-title",
            bodyTag: ".wizard-container",
            transitionEffect: "fade",
            onStepChanging: function (event, currentIndex, newIndex) {
                console.log(currentIndex);
                // Allways allow previous action even if the current form is not valid!
                if (currentIndex > newIndex) {
                    return true;
                }

                // Forbid next action on "Warning" step if the user is to young
                if (newIndex === 3 && Number($("#age-2").val()) < 18) {
                    return false;
                }

                // NOTE: Use parsley group(data-parsley-group) to validate form group
                // and move to next container if validation is passed. No need to init
                // parsley validation plugin on the form. Just put the parsley built-in
                // validator(eg:data-parsley-required="true") to the form input.
                // ======================================================================
                // SAMPLE: <input type="text" name="first-name" class="form-control" placeholder="First Name" data-parsley-group="{group-name}" data-parsley-required>

                // validate "order" section: data-parsley-group="order"
                if ((currentIndex === 0)) {
                    return $(this).parsley().validate("order");
                }

                // validate "information" section: data-parsley-group="information"
                if ((currentIndex === 1)) {
                    return $(this).parsley().validate("information");
                }

                // validate "payment" section: data-parsley-group="payment"
                if ((currentIndex === 2)) {
                    return $(this).parsley().validate("payment");
                }
            },
            onStepChanged: function (event, currentIndex, priorIndex) {
                // Used to skip the "Warning" step if the user is old enough.
                if (currentIndex === 2 && Number($("#age-2").val()) >= 18) {
                    $("#form-3").steps("next");
                }

                // Used to skip the "Warning" step if the user is old enough and wants to the previous step.
                if (currentIndex === 2 && priorIndex === 3) {
                    $("#form-3").steps("previous");
                }
            },
            onFinishing: function (event, currentIndex, newIndex) {
                // revalidate the whole form
                return $(this).parsley().validate();
            },
            onFinished: function () {
                // yayyy! all validation is pass.. now we can send data to server
                // or display message ;)
                alert("submitted!");
            }
        });
    }
})(jQuery, window, document);


/* ========================================================================
 * Page: form-element.html
 * Plugin: jquery UI, selectize
 * ======================================================================== */
;(function ($, window, document, undefined) {
    if ($("body").data("page") === "form-element") {
        // Log page name
        // ================================
        console.log("Page: " + $("body").data("page") + ".html");

        // Datepicker
        // ================================
        (function () {
            // default
            $("#datepicker1").datepicker();

            // date in other moonth
            $("#datepicker2").datepicker({
                showOtherMonths: true,
                selectOtherMonths: true
            });

            // button bar
            $("#datepicker3").datepicker({
                showButtonPanel: true
            });

            // display month & year
            $("#datepicker4").datepicker({
                changeMonth: true,
                changeYear: true
            });

            // select date range
            $("#datepicker-from").datepicker({
                defaultDate: "+1w",
                numberOfMonths: 2,
                onClose: function (selectedDate) {
                    $("#datepicker-to").datepicker("option", "minDate", selectedDate);
                }
            });
            $("#datepicker-to").datepicker({
                defaultDate: "+1w",
                numberOfMonths: 2,
                onClose: function (selectedDate) {
                    $("#datepicker-from").datepicker("option", "maxDate", selectedDate);
                }
            });
        })();

        // Custom select
        // ================================
        customSelect();
        (function () {
            // custom select
            $("#selectize-customselect").selectize();
			$("#satnam").selectize();
			$("#time_z").selectize();


            // tagging
            $("#selectize-tagging").selectize({
                delimiter: ",",
                persist: false,
                create: function (input) {
                    return {
                        value: input,
                        text: input
                    }
                }
            });

            // select
            $("#selectize-select").selectize({
                create: true,
                sortField: {
                    field: "text",
                    direction: "asc"
                },
                dropdownParent: "body"
            });

            // multiple select
            $("#selectize-selectmultiple").selectize({
                maxItems: 3
            });
        })();
    }
})(jQuery, window, document);


/* ========================================================================
 * Page: component-notification.html
 * Plugin: gritter, bootbox
 * ======================================================================== */
;(function ($, window, document, undefined) {
    if ($("body").data("page") === "component-notification") {
        // Log page name
        // ================================
        console.log("Page: " + $("body").data("page") + ".html");

        // Gritter
        // ================================
        (function () {
            // sticky notice
            $("#add-sticky").on("click", function (e) {
                $.gritter.add({
                    title: "Sticky notice",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget tincidunt velit.",
                    sticky: true,
                });
                e.preventDefault();
            });

            // regular notice
            $("#add-regular").on("click", function (e) {
                $.gritter.add({
                    title: "Regular notice",
                    text: "This will fade out after a certain amount of time. Vivamus eget tincidunt velit.",
                    sticky: false,
                });
                e.preventDefault();
            });

            // max 3 notice
            $("#add-max").on("click", function (e) {
                $.gritter.add({
                    title: "Max of 3 notice on screen",
                    text: "This will fade out after a certain amount of time. Vivamus eget tincidunt velit.",
                    sticky: false,
                    // (function) before the gritter notice is opened
                    before_open: function () {
                        if ($(".gritter-item-wrapper").length == 3) {
                            // Returning false prevents a new gritter from opening
                            return false;
                        }
                    }
                });
                e.preventDefault();
            });

            // with image notice
            $("#add-image").on("click", function (e) {
                $.gritter.add({
                    title: "Notice with image",
                    text: "This will fade out after a certain amount of time. Vivamus eget tincidunt velit.",
                    image: "image/avatar/avatar5.jpg",
                    sticky: false
                });
                e.preventDefault();
            });

            // light notice with image
            $("#add-light").on("click", function (e) {
                $.gritter.add({
                    title: "Light notice",
                    text: "This will fade out after a certain amount of time. Vivamus eget tincidunt velit.",
                    image: "image/avatar/avatar8.jpg",
                    class_name: "gritter-light",
                    sticky: true
                });
                e.preventDefault();
            });
        })();

        // Bootbox
        // ================================
        (function () {
            // bootbox - alert
            $("#bootbox-alert").on("click", function (event) {
                bootbox.alert("Hello world!");
                event.preventDefault();
            });

            // bootbox - confirm
            $("#bootbox-confirm").on("click", function (event) {
                bootbox.confirm("Are you sure?", function (result) {
                    // callback
                });
                event.preventDefault();
            });

            // bootbox - prompt
            $("#bootbox-prompt").on("click", function (event) {
                bootbox.prompt("What is your name?", function (result) {
                    // callback
                });
                event.preventDefault();
            });

            // bootbox - custom
            $("#bootbox-custom").on("click", function (event) {
                bootbox.dialog({
                    message: "I am a custom dialog",
                    title: "Custom title",
                    buttons: {
                        success: {
                            label: "Success",
                            className: "btn-success",
                            callback: function () {
                                // callback
                            }
                        },
                        danger: {
                            label: "Danger",
                            className: "btn-danger",
                            callback: function () {
                                // callback
                            }
                        },
                        main: {
                            label: "Primary",
                            className: "btn-primary",
                            callback: function () {
                                // callback
                            }
                        }
                    }
                });
                event.preventDefault();
            });
        })();
    }
})(jQuery, window, document);


/* ========================================================================
 * Page: component-custom-widget.html
 * Plugin: flot chart
 * ======================================================================== */
;(function ($, window, document, undefined) {
    if ($("body").data("page") === "component-custom-widget") {
        // Log page name
        // ================================
        console.log("Page: " + $("body").data("page") + ".html");

        // Visitor widget chart
        // ================================
        (function () {
            $.plot("#visitor-wchart", [{
                color: "rgba(255, 255, 255, 0.5)",
                data: [
                    [0, 0],
                    [1, 0],
                    [2, 1],
                    [3, 2],
                    [4, 15],
                    [5, 5],
                    [6, 12]
                ]
            }], {
                series: {
                    lines: {
                        show: false
                    },
                    splines: {
                        show: true,
                        tension: 0.4,
                        lineWidth: 2,
                        fill: 0.5
                    },
                    points: {
                        show: true,
                        fill: true,
                        radius: 4
                    }
                },
                grid: {
                    borderColor: "rgba(255, 255, 255, 0.15)",
                    borderWidth: 1,
                    hoverable: true,
                    backgroundColor: "transparent"
                },
                xaxis: {
                    tickColor: "transparent"
                },
                yaxis: {
                    tickColor: "rgba(255, 255, 255, 0.15)"
                },
                shadowSize: 0
            });
        })();

        // Violations widget chart
        // ================================
        (function () {
            $.plot("#violations-wchart", [{
                color: "#DC554F",
                data: [
                    ["Jan", 35],
                    ["Feb", 134],
                    ["Mar", 85],
                    ["Apr", 63],
                    ["May", 96],
                    ["Jun", 30],
                    ["Jul", 61]
                ]
            }], {
                series: {
                    lines: {
                        show: false
                    },
                    splines: {
                        show: true,
                        tension: 0.4,
                        lineWidth: 2,
                        fill: 0.5
                    },
                    points: {
                        show: true,
                        radius: 4
                    }
                },
                grid: {
                    borderColor: "#eee",
                    borderWidth: 1,
                    hoverable: true,
                    backgroundColor: "#fcfcfc"
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%x : %y"
                },
                xaxis: {
                    tickColor: "#fcfcfc",
                    mode: "categories"
                },
                yaxis: {
                    tickColor: "#eee"
                },
                shadowSize: 0
            });
        })();
    }
})(jQuery, window, document);


/* ========================================================================
 * Page: component-slider.html
 * Plugin: jquery UI
 * ======================================================================== */
;(function ($, window, document, undefined) {
    if ($("body").data("page") === "component-slider") {
        // Log page name
        // ================================
        console.log("Page: " + $("body").data("page") + ".html");

        // Default slider
        // ================================
        $("#default-slider > li").each(function () {
            $(this).slider({
                value: $(this).data("min"),
                orientation: "horizontal",
                range: "min",
                animate: true
            });
        });

        // Range slider
        // ================================
        $("#range-slider > li").each(function () {
            $(this).slider({
                range: true,
                min: 0,
                max: 100,
                values: [$(this).data("min"), $(this).data("max")]
            });
        });

        // Range slider - fix maximum
        // ================================
        $("#fixed-max-slider").slider({
            range: "max",
            min: 1,
            max: 10,
            value: 2,
            slide: function (event, ui) {
                $("#amount-max-slider").text(ui.value);
            }
        });
        $("#amount-max-slider").text($("#fixed-max-slider").slider("value"));

        // Range slider - fix minimum
        // ================================
        $("#fixed-min-slider").slider({
            range: "min",
            value: 37,
            min: 1,
            max: 700,
            slide: function (event, ui) {
                $("#amount-min-slider").text(ui.value);
            }
        });
        $("#amount-min-slider").text($("#fixed-min-slider").slider("value"));

        // Snap to increments
        // ================================
        $("#snap-increment-slider").slider({
            value: 100,
            min: 0,
            max: 500,
            step: 50,
            slide: function (event, ui) {
                $("#amount-snap-increment-slider").text("$" + ui.value);
            }
        });
        $("#amount-snap-increment-slider").text("$" + $("#snap-increment-slider").slider("value"));

        // Vertical slider
        // ================================
        $("#vertical-slider > li").each(function () {
            $(this).slider({
                orientation: "vertical",
                range: "min",
                min: 0,
                max: 100,
                value: $(this).data("min")
            });
        });

        // Vertical range slider
        // ================================
        $("#vertical-range-slider > li").each(function () {
            $(this).slider({
                orientation: "vertical",
                range: true,
                values: [$(this).data("min"), $(this).data("max")]
            });
        });
    }
})(jQuery, window, document);


/* ========================================================================
 * Page: page-calendar.html
 * Plugin: fullcalendar
 * ======================================================================== */
;(function ($, window, document, undefined) {
    if ($("body").data("page") === "page-calendar") {
        // Log page name
        // ================================
        console.log("Page: " + $("body").data("page") + ".html");

        // Instantiate fullCalendar
        // ================================
        if (jQuery().fullCalendar) {
            var date = new Date(),
                d = date.getDate(),
                m = date.getMonth(),
                y = date.getFullYear();

            $("#full_calendar").fullCalendar({
                header: {
                    left: "prev,next",
                    center: "title",
                    right: "today,month,agendaWeek,agendaDay"
                },
                buttonText: {
                    prev: '<i class="ico-angle-left"></i>',
                    next: '<i class="ico-angle-right"></i>'
                },
                editable: true,
                events: [{
                    title: "All Day Event",
                    start: new Date(y, m, 1),
                    className: "fc-event-primary"
                }, {
                    title: "Click me!.. seriously",
                    start: new Date(y, m, d - 5),
                    end: new Date(y, m, d - 2),
                    className: "fc-event-success"
                }, {
                    id: 999,
                    title: "Repeating Event",
                    start: new Date(y, m, d - 3, 16, 0),
                    allDay: false,
                    className: "fc-event-info"
                }, {
                    id: 999,
                    title: "Repeating Event",
                    start: new Date(y, m, d + 4, 16, 0),
                    allDay: false,
                    className: "fc-event-warning"
                }, {
                    title: "Meeting",
                    start: new Date(y, m, d, 10, 30),
                    allDay: false,
                    className: "fc-event-danger"
                }, {
                    title: "Lunch",
                    start: new Date(y, m, d, 12, 0),
                    end: new Date(y, m, d, 14, 0),
                    allDay: false,
                    className: "fc-event-inverse"
                }, {
                    title: "Birthday Party",
                    start: new Date(y, m, d + 1, 19, 0),
                    end: new Date(y, m, d + 1, 22, 30),
                    allDay: false
                }, {
                    title: "Click for Google",
                    start: new Date(y, m, 28),
                    end: new Date(y, m, 29),
                    url: "http://google.com/",
                    className: "fc-event-teal"
                }],
                eventClick: function (calEvent, jsEvent, view) {
                    // content
                    var pcontent = "";
                    pcontent += "<h5 class=semibold>";
                    pcontent += "<img class='img-circle mr10' src='image/avatar/avatar2.jpg' width='42px' height='42px' />";
                    pcontent += calEvent.title;
                    pcontent += "</h5>";
                    pcontent += "<hr/>";
                    pcontent += "<p class=''><span class='ico-clock'></span> Start: ";
                    pcontent += $.fullCalendar.formatDate(calEvent.start, "MM/dd/yyyy @ hh:mmtt");
                    pcontent += "</p>";
                    if (calEvent.end !== null) {
                        pcontent += "<p class=''><span class='ico-clock'></span>  End: ";
                        pcontent += $.fullCalendar.formatDate(calEvent.end, "MM/dd/yyyy @ hh:mmtt");
                        pcontent += "</p>";
                    }

                    // bootstrap popover
                    $(this).popover({
                        placement: "left auto",
                        html: true,
                        trigger: "manual",
                        content: pcontent
                    }).popover("toggle");
                }
            });
        }

        // Instantiate parsley validator
        // ================================
        $("#ModalAddEvent form").parsley();
        $("#ModalAddEvent form").on("submit", function (e) {
            e.preventDefault()
        });

        // Render Full Calendar event
        // ================================
        // listen to parsley form event
        $.listen("parsley:form:validate", $("#ModalAddEvent form"), function (p) {
            if ($("#ModalAddEvent form").parsley().isValid()) {
                var eventData = {
                    id: 999,
                    title: $("input[name=eventname]").val(),
                    start: $.fullCalendar.parseDate($("input[name=datefrom]").val()),
                    end: $.fullCalendar.parseDate($("input[name=dateto]").val()),
                    allDay: $("select[name=allday]").val() === "yes" ? true : false,
                    className: "fc-event-" + $("input[name=eventcolor]:checked").val()
                }

                // render event
                $("#full_calendar")
                    .fullCalendar("renderEvent", eventData, true);

                // and then push data to server ;)

                // close modal
                $("#ModalAddEvent").modal("hide");
            }
        });

        // Instantiate Datepicker
        // ================================
        $("#datepicker-from").datepicker({
            defaultDate: "+1w",
            onClose: function (selectedDate) {
                $("#datepicker-to").datepicker("option", "minDate", selectedDate);
            }
        });
        $("#datepicker-to").datepicker({
            defaultDate: "+1w",
            onClose: function (selectedDate) {
                $("#datepicker-from").datepicker("option", "maxDate", selectedDate);
            }
        });
    }
})(jQuery, window, document);