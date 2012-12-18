/*
* Project: jQuery-Sapling - http://github.com/outofroutine/jquery-sapling/
* Description: An ultra-lightweight, simple tree plugin for list elements.
* Version: 0.1
* Requires: jQuery v1.4.2+
* Author: Tamer Aydın - http://www.tamerayd.in
* 
* This work is licensed under the Creative Commons Attribution 3.0 Unported License. To view a copy of this license, visit http://creativecommons.org/licenses/by/3.0/.
*/

;(function ($, window, document, undefined) {

	$.sapling = function(element, options) {

		var plugin = this;

		var defaults = {
			multiexpand: true
		}

		plugin.settings = {}

		var element = element,
			$element = $(element);

		plugin.init = function() {

			plugin.settings = $.extend({}, defaults, options);

			$element.addClass('sapling-list');
			$element.children('li').addClass('sapling-top-level');
			$element.find('li').each(function() {
				if ($(this).children('ul').index()!=-1) {
					$(this).addClass('sapling-item');
					$(this).bind('click', click);
					$(this).children('ul').bind('click', function() {
						return false;
					});
				}
			});

		}

		plugin.expand = function() {

			$element.find('.sapling-item').addClass('sapling-expanded');

		}

		plugin.collapse = function() {

			$element.find('.sapling-expanded').removeClass('sapling-expanded');

		}

		var click = function() {

			if ($(this).hasClass('sapling-expanded')) {
				$(this).removeClass('sapling-expanded');
			} else {
				if (!plugin.settings.multiexpand) {
					$element.find('.sapling-expanded').not($(this).parents()).trigger('click');
				}
				$(this).addClass('sapling-expanded');
			}

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