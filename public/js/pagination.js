//dependent to urlParamHelper.js
var createPaginationBar = function (pageCount) {
    var PAGE_LISTING_LIMIT = 5;
    var i, url;
    var params = getParamsFromUrl();
    var currentPage = (typeof params['page'] === 'undefined') ? 0 : parseInt(params['page']);
    var startPage = (PAGE_LISTING_LIMIT > currentPage) ? 0 : currentPage - PAGE_LISTING_LIMIT;
    var endPage = (currentPage + PAGE_LISTING_LIMIT + 1 >= pageCount) ? pageCount : currentPage + PAGE_LISTING_LIMIT + 1;
    if(endPage === 1) return;
    if (currentPage > 0) {
        params['page'] = currentPage - 1;
        $('#pagination-list').append('<li class="page-item"><a class="page-link" href="' + setUrlFromParams(params) + '"> &laquo; </a></li>');
    }

    for (i = startPage; i < currentPage; i++) {
        params['page'] = i;
        $('#pagination-list').append('<li class="page-item"><a class="page-link" href="' + setUrlFromParams(params) + '">' + params['page'] + '</a></li>');
    }

    params['page'] = currentPage;
    $('#pagination-list').append('<li class="page-item active"><a class="page-link" href="' + setUrlFromParams(params) + '">' + params['page'] + '</a></li>');

    for (i = currentPage + 1; i < endPage; i++) {
        params['page'] = i;
        $('#pagination-list').append('<li class="page-item"><a class="page-link" href="' + setUrlFromParams(params) + '">' + params['page'] + '</a></li>');
    }
    if (currentPage < endPage - 1) {
        params['page'] = currentPage + 1;
        $('#pagination-list').append('<li class="page-item"><a class="page-link" href="' + setUrlFromParams(params) + '"> &raquo; </a></li>');
    }
}