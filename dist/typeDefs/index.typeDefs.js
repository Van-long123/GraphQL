"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const article_tydeDefs_1 = require("./article.tydeDefs");
const category_typeDefs_1 = require("./category.typeDefs");
const user_typeDefs_1 = require("./user.typeDefs");
exports.typeDefs = [article_tydeDefs_1.typeDefsArticle, category_typeDefs_1.typeDefsCategory, user_typeDefs_1.typeDefsUser];
