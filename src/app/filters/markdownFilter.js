app
    .filter('markdown', function (markdownService) {
        return function (text) {
            if (!text) {
                return text
            };
            return markdownService.makeHtml(text);
        };
    });