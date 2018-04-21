var getParamsFromUrl = function () {
    var paramArray = window.location.search.substring(1).split('&');
    var i, params = {};
    if (paramArray[0] === "") {
        return {};
    }
    for (i = 0; i < paramArray.length; i++) {
        params[paramArray[i].split('=')[0]] = paramArray[i].split('=')[1];
    }
    return params;
}

var setUrlFromParams = function (params) {
    var paramUrl = "?";
    for (param in params) {
        paramUrl += param + "=" + params[param] + "&";
    }
    return paramUrl.substring(0, paramUrl.length - 1);
}
