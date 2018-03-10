jQuery(document).ready(function($) {
	"use strict";
	var body = $("body");

	function setup(e, self) {
		e.preventDefault(); 
		var el = $(self);
		var parent = el.closest(".search-result");
		var index = parent.attr("data-index");
		var uri = parent.attr("data-uri");
		var url = parent.attr("data-url");
		var lib_code = parent.attr("data-lib-code");
		var isLoggedIn = window.collex.currentUserId && window.collex.currentUserId > 0;
		var orphan = parent.attr('data-orphan');
		var title = parent.attr("data-title");
		var hasEdit = parent.find('button.edit').length > 0;		
		return { uri: uri, url: url, index: index, isLoggedIn: isLoggedIn, title: title, hasEdit: hasEdit, libCode: lib_code, orphan: orphan};
	}

	/*body.on("click", ".search_result_buttons .checkAnnotation", function (e) {
		var params = setup(e, this);
		var parent = $(this).closest(".search-result");
		var obj = parent.find(".object_infos");
		doCheckAnnotation(obj, params.uri, params.url, params.index, 'search_result_'+params.index, params.isLoggedIn, params.title, "checkAnnotation");		
	});
*/
	body.on("click", ".viewannotationdiv .viewAnnotation", function (e) {
		var params = setup(e, this);
		var parent = $(this).closest(".search-result");
		var obj = parent.find(".object_infos");
		var activeannotation = parent.find(".activeannotations");
		var viewAnnotation = parent.find(".viewAnnotation");
		//doViewAnnotation(obj, viewAnnotation, params.uri, params.url, params.index, 'search_result_'+params.index, params.isLoggedIn, params.title, "viewAnnotation");		
		doViewAnnotation(activeannotation, viewAnnotation, params.uri, params.url, params.index, 'search_result_'+params.index, params.isLoggedIn, params.title, "viewAnnotation");		
	});

	body.on("click", ".search_result_buttons .match_holding_match", function (e) {
		var params = setup(e, this);
		doMatchHoldingMatch(params.uri, params.url, params.index, 'search_result_'+params.index, params.isLoggedIn, params.title, "match_holding_match");
	});

	body.on("click", ".search_result_buttons .match", function (e) {
		var params = setup(e, this);
		doMatch(params.uri, params.url, params.index, 'search_result_'+params.index, params.isLoggedIn, params.title, params.orphan);
	});

	body.on("click", ".search_result_buttons .watch", function (e) {
		var params = setup(e, this);
		doWatch(params.uri, params.title, window.collex.currentUserId, params.libCode);
	});

	body.on("click", ".search_result_buttons .unwatch", function (e) {
		var params = setup(e, this);
		doUnWatch(params.uri, params.title, window.collex.currentUserId);
	});

	body.on("click", ".search_result_buttons .annotate, .contribute_action .annotate ", function (e) {
		var params = setup(e, this);
		doAnnotate(params.uri, params.url, params.index, 'search_result_'+params.index, params.isLoggedIn, params.title, "annotate");
	});

	body.on("click", ".search_result_buttons .collect", function (e) {
		var params = setup(e, this);
		doCollect('/results/result_row', params.uri, params.index, 'search_result_'+params.index, params.isLoggedIn, params.hasEdit);
	});

	body.on("click", ".search_result_buttons .uncollect", function (e) {
		var params = setup(e, this);
		doRemoveCollect('/results/result_row', params.uri, params.index, params.hasEdit);
	});

	body.on("click", ".search_result_buttons .discuss", function (e) {
		var params = setup(e, this);
		new StartDiscussionWithObject('/forum/get_all_topics', '/forum/post_object_to_new_thread', params.uri, params.title, '#search_result_'+params.index+' .discuss', params.isLoggedIn, '/forum/get_nines_obj_list', window.collex.spinner);
	});

	body.on("click", ".search_result_buttons .exhibit", function (e) {
		var params = setup(e, this);
		doAddToExhibit('result_row', params.uri, params.index, 'search_result_'+params.index, window.collex.myCollexUrl);
	});

	body.on("click", ".search_result_buttons .edit", function (e) {
		var params = setup(e, this);
		var tw_url = "/typewright/documents/0?uri="+params.uri;
		doEditDocument( params.isLoggedIn, tw_url );
	});

	body.on("click", ".search-result .uri_link", function (e) {
		jQuery(this).next().toggle();
		return false;
	});

	body.on("click", ".search_result_buttons .page-search", function (e) {
      var params = setup(e, this);
      window.collex.doPageSearch(params.uri);
   });

});

