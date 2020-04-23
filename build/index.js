"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repo_1 = require("./repos/user-repo");
const post_repo_1 = require("./repos/post-repo");
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        let postRepo = post_repo_1.PostRepository.getInstance();
        let userRepo = user_repo_1.UserRepository.getInstance();
        console.log(yield postRepo.getAll());
        console.log(yield userRepo.getAll());
    });
})();
