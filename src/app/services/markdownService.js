app
    .service('markdownService', function () {
        var converter = new showdown.Converter();
        this.makeHtml = function (text) {
            return converter.makeHtml(text);
        }
    });