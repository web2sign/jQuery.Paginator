(function( $ ) {

	$.fn.paginator = function( options ){
		var self = this;
		var defaults = {
			per_page: 4,
			item: '.item-pane',
			filters: [],
			after: function(){},
			before: function(){},

		};

		var settings = $.extend( {}, defaults, options );

		var current_page = 1;

		function show_page(element){
			element.each(function(i,o){
				$(o).find( settings.item ).each(function(ii,oo){
					if( ii >= ( ( settings.per_page * current_page ) - settings.per_page ) && ii < ( settings.per_page * current_page ) ) {
						$(oo).css('display','block');
					} else {
						$(oo).css('display','none');
					}
				});
				pagination(o);
			});

		}

		function goto(e){
			e.preventDefault();
			current_page = $(this).data('page');
			settings.before();
			show_page( self );
			settings.after();
		}

		function pagination(o){
			$(o).find('.pagination-container').remove();
			
			var pagination = $('<ul />').addClass('pagination-container').addClass('pagination');
			var page_nav = $('<li />');	
			var page = current_page-1;
			var page_link = $('<a />').text('«');
			if( page < 1 ) {
				page_link.addClass('disabled');
			} else {
				page_link.data('page', page ).attr('href','#')
				page_link.bind('click',goto);
			}
			page_nav.append(page_link);
			pagination.append(page_nav);


			for(ii = 1; ii <= Math.ceil( $(o).find( settings.item ).length / settings.per_page ); ++ii) {
				var page_nav = $('<li />');
				if( ii == current_page ) {
					page_nav.addClass('active');
				}
				var page_link = $('<a />').text(ii).data('page',ii).attr('href','#');
				page_link.bind('click',goto);
				page_nav.append(page_link);
				pagination.append(page_nav);
			}

			var page_nav = $('<li />');	
			var page = current_page+1;
			var page_link = $('<a />').text("»");
			if( page > Math.ceil( $(o).find( settings.item ).length / settings.per_page) ) {
				page_link.addClass('disabled');
			} else {
				page_link.data('page', page ).attr('href','#')
				page_link.bind('click',goto);
			}
			page_nav.append(page_link);
			pagination.append(page_nav);

			$(o).append( pagination )

		}

		return show_page(self);
	};

})(jQuery);