/**
 * A JavaScript file.
 *
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license https://opensource.org/licenses/mit-license.php MIT License
 * @version 0.0.1
 */


/**
 * Setting up PrismJS
 */
Prism.plugins.autoloader.languages_path = '/assets/js/prism/components/';

$window = $(window);

$window.on('load', function () {

    console.log('Achievement Unlocked! > Open developer tools <');

    // Load the scripts and execute functions
    // defined in the post body
    var loadScripts = function (array, accumulator) {
        if (!accumulator) {
            accumulator = 0;
        }
        if (accumulator === array.length) {
            return;
        }
        var script = array[accumulator];
        if (typeof script === 'function') {
            script($);
            loadScripts(array, ++accumulator);
        } else if (typeof script === 'string') {
            $.getScript(script, function () {
                loadScripts(array, ++accumulator);
            })
        } else {
            throw new Error('Invalid script.');
        }
    };
    loadScripts(window.scripts);

    var $body = $('body');
    var $wrapper = $('.foxy-wrapper');
    var $navigation = $('.foxy-navigation');
    var $navigationOverlay = $('.foxy-navigation-overlay');

    var navigation = false;

    var toggleNavigation = function (event) {
        event.preventDefault();
        navigation = !navigation;
        $wrapper.toggleClass('minimised', navigation);
        $navigation.toggleClass('visible', navigation);
        $navigationOverlay.toggleClass('hidden', !navigation);
    };
    $body.on('click', '.foxy-wrapper-menu-button', toggleNavigation);
    $body.on('click', '.foxy-navigation-overlay', toggleNavigation);

    var nav = $('.foxy-content-menu-button');
    var toggleNav = function () {
        nav.toggleClass('hidden', $window.width() > 1127);
    };
    $window.resize(function () {
        toggleNav();
    });
    toggleNav();

    if ($body.hasClass('home-template')) {

        var $container = $('#foxy-grid');
        $container.isotope({
            itemSelector: '.foxy-grid-item-wrapper',
            masonry: {
                columnWidth: '.foxy-grid-sizer'
            },
            percentPosition: true,
            // layoutMode: 'fitRows'
        });
        $('.foxy-content').on('click', '.foxy-grid-filter', function (event) {
            event.preventDefault();
            $('.foxy-grid-filter').removeClass('current');
            $(this).addClass('current');
            var filterValue = $(this).attr('data-filter');
            $container.isotope({filter: filterValue});
        });

    }

    if ($body.hasClass('post-template')) {
        var $content = $('.foxy-post-content');

        // Make all links open in new windows,
        // except those prefixed with ~
        var $postContentLinks = $content.find('a');
        $.each($postContentLinks, function (index, link) {
            var $link = $(link);
            var text = $link.text();
            var href = $link.attr('href');
            if (/^~/.test(text)) {
                $link.text(text.substr(1));
            }
            if (!/^#/.test(href)) {
                $(link).attr('target', '_blank');
            }
        });

        var $headings = $content.find('h1, h2');
        $.each($headings, function(index, heading) {
            var $heading = $(heading);
            var id = $heading.attr('id');
            $heading.addClass('anchor');
            $heading.prepend('<a class="foxy-anchor" href="#' + id + '">#</a> ');
        });
    }

});