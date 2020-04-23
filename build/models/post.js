"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Post = /** @class */ (function () {
    function Post(id, title, body, pid) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.posterId = pid;
    }
    return Post;
}());
exports.Post = Post;
