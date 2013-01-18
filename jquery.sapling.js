/*
* jQuery Sapling - http://outofroutine.github.com/jquery-sapling/
* An ultra-lightweight tree/accordion plugin for HTML lists.
*
* Version: 0.3.0
* Dependency: jQuery v1.4.2+
* Author: Tamer Aydın - http://www.tamerayd.in
* 
* This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/.
*/

;(function ($, window, document, undefined) {

	$.sapling = function(element, options) {

		var plugin = this,
			element = element,
			$element = $(element),

			defaults = {
				multiexpand: true,
				animation: false
			}

		var expand = function(el) {

				el.addClass('sapling-expanded');

			},
			collapse = function(el) {

				el.removeClass('sapling-expanded');

			},
			click = function() {

				if ($(this).hasClass('sapling-expanded')) {
					collapse($(this));
				} else {
					if (!plugin.settings.multiexpand) {
						$element.find('.sapling-expanded').not($(this).parents()).trigger('click');
					}
					expand($(this));
				}

			}

		plugin.settings = {}

		plugin.init = function() {

			plugin.settings = $.extend({}, defaults, options);

			if (plugin.settings.animation) {
				expand = function(el) {
					el.children('ul,ol').slideDown(function() {
						el.addClass('sapling-expanded');
					});
				},
				collapse = function(el) {
					el.children('ul,ol').slideUp(function() {
						el.removeClass('sapling-expanded');
					});
				};
			}

			$element.addClass('sapling-list');
			$element.children('li').addClass('sapling-top-level');
			$element.find('li').each(function() {
				if ($(this).children('ul,ol').index()!=-1) {
					$(this).addClass('sapling-item');
					$(this).bind('click', click);
					$(this).children('ul,ol').bind('click', function(e) {
						if (e.target.nodeName != 'A') {
							return false;
						}
					});
				}
			});

		}

		plugin.expand = function() {

			expand($element.find('.sapling-item'));

		}

		plugin.collapse = function() {

			collapse($element.find('.sapling-expanded'));

		}

		plugin.init();

	}

	$.fn.sapling = function(options) {
		return this.each(function() {
			if (undefined == $(this).data('sapling')) {
				var plugin = new $.sapling(this, options);
				$(this).data('sapling', plugin);
			}
		});
	}

})(jQuery, window, document);