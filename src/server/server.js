/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server/config/Database.ts":
/*!***************************************!*\
  !*** ./src/server/config/Database.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! dotenv/config */ "dotenv/config");
const mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ "mongoose"));
const FormattedDate_1 = __importDefault(__webpack_require__(/*! @/server/utils/FormattedDate */ "./src/server/utils/FormattedDate.ts"));
class Database {
    constructor() {
        this._database = mongoose_1.default.connect(`${process.env.URL_MONGO_DB}/${process.env.DATABASE}`);
    }
    get database() {
        return this._database;
    }
    connection() {
        return __awaiter(this, void 0, void 0, function* () {
            const database = yield this._database;
            database.connection.on('connected', () => {
                console.log(`[${FormattedDate_1.default.formattedDate}] : Conexão estabelecida com sucesso`);
            });
            database.connection.on('disconnected', () => {
                console.log(`[ ${FormattedDate_1.default.formattedDate} ] : Conexão desconectada`);
            });
            database.connection.on('error', (error) => {
                console.error(`[ ${FormattedDate_1.default.formattedDate} ] : Erro de conexão => ${error}`);
            });
        });
    }
    closeConnection() {
        process.on('SIGINT', () => __awaiter(this, void 0, void 0, function* () {
            const database = yield this._database;
            database.connection.close();
            console.log(`[ ${FormattedDate_1.default.formattedDate} ] : Mongoose encerrado`);
            process.exit(0);
        }));
    }
}
exports["default"] = new Database();


/***/ }),

/***/ "./src/server/config/MainApplication.ts":
/*!**********************************************!*\
  !*** ./src/server/config/MainApplication.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! dotenv/config */ "dotenv/config");
const express_1 = __importDefault(__webpack_require__(/*! express */ "express"));
const body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ "body-parser"));
const GameRouter_1 = __importDefault(__webpack_require__(/*! @/server/routes/GameRouter */ "./src/server/routes/GameRouter.ts"));
class MainApplication {
    constructor() {
        this._express = (0, express_1.default)();
        this.middleware();
        this.staticFiles();
        this.routes();
    }
    get express() {
        return this._express;
    }
    middleware() {
        this._express.use(body_parser_1.default.json());
        this._express.use(body_parser_1.default.urlencoded({ extended: false }));
    }
    staticFiles() {
        this._express.use(express_1.default.static(process.env.EXPRESS_STATIC_FILES));
    }
    routes() {
        this.express.use('/', GameRouter_1.default);
    }
}
exports["default"] = new MainApplication().express;


/***/ }),

/***/ "./src/server/config/Server.ts":
/*!*************************************!*\
  !*** ./src/server/config/Server.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! dotenv/config */ "dotenv/config");
const http = __importStar(__webpack_require__(/*! http */ "http"));
const MainApplication_1 = __importDefault(__webpack_require__(/*! @/server/config/MainApplication */ "./src/server/config/MainApplication.ts"));
const Database_1 = __importDefault(__webpack_require__(/*! @/server/config/Database */ "./src/server/config/Database.ts"));
class Server {
    constructor() {
        this._port = this.normalizePort(process.env.PORT || 3000);
        this._server = this.configureMainApplication();
    }
    get port() {
        return this._port;
    }
    get server() {
        return this._server;
    }
    normalizePort(val) {
        const port = typeof val === 'string' ? parseInt(val, 10) : val;
        if (isNaN(port))
            return val;
        else if (port >= 0)
            return port;
        else
            return false;
    }
    configureMainApplication() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                Database_1.default.connection()
                    .then(() => __awaiter(this, void 0, void 0, function* () {
                    MainApplication_1.default.set('port', this._port);
                    MainApplication_1.default.set('database', yield Database_1.default.database);
                    resolve(http.createServer(MainApplication_1.default));
                }))
                    .catch((error) => reject(error));
            });
        });
    }
    closeDatabase() {
        MainApplication_1.default.get('database').closeConnection();
    }
}
exports["default"] = Server;


/***/ }),

/***/ "./src/server/controllers/GameController.ts":
/*!**************************************************!*\
  !*** ./src/server/controllers/GameController.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const FormattedDate_1 = __importDefault(__webpack_require__(/*! @/server/utils/FormattedDate */ "./src/server/utils/FormattedDate.ts"));
class GameController {
    startGame(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[ ${FormattedDate_1.default.formattedDate} ] : Novo jogo iniciado`);
            // Redireciona para a view onde o game vai rodar
            resp.render(path_1.default.join(__dirname, '../game/view/index'));
        });
    }
}
exports["default"] = GameController;


/***/ }),

/***/ "./src/server/index.ts":
/*!*****************************!*\
  !*** ./src/server/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const FormattedDate_1 = __importDefault(__webpack_require__(/*! @/server/utils/FormattedDate */ "./src/server/utils/FormattedDate.ts"));
const Server_1 = __importDefault(__webpack_require__(/*! @/server/config/Server */ "./src/server/config/Server.ts"));
const httpServer = new Server_1.default();
httpServer.server
    .then((server) => {
    server.listen(httpServer.port);
    server.on('error', onError);
    server.on('listening', () => onListening(server));
});
const onError = (error) => {
    if (error.syscall !== 'listen')
        throw error;
    const bind = typeof httpServer.port === 'string'
        ? `Pipe ${httpServer.port}`
        : `Porta ${httpServer.port}`;
    httpServer.closeDatabase();
    switch (error.code) {
        case 'EACCESS':
            console.log(`[ ${FormattedDate_1.default.formattedDate} ] : ${bind} requer privilégios elevados de acesso`);
            break;
        case `EADDRESS`:
            console.log(`[ ${FormattedDate_1.default.formattedDate} ] : ${bind} já está em uso`);
            break;
        default:
            throw error;
    }
};
const onListening = (server) => {
    const address = server.address();
    const bind = typeof address === 'string' ? `Pipe ${address}` : `Porta ${address === null || address === void 0 ? void 0 : address.port}`;
    console.log(`[ ${FormattedDate_1.default.formattedDate} ] : Servidor rodando em ${bind}`);
};


/***/ }),

/***/ "./src/server/routes/GameRouter.ts":
/*!*****************************************!*\
  !*** ./src/server/routes/GameRouter.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameRouter = void 0;
const express_1 = __webpack_require__(/*! express */ "express");
const GameController_1 = __importDefault(__webpack_require__(/*! @/server/controllers/GameController */ "./src/server/controllers/GameController.ts"));
class GameRouter {
    constructor() {
        this._router = (0, express_1.Router)();
        this.init();
    }
    get router() {
        return this._router;
    }
    init() {
        this._router.get('/', this.startGame);
    }
    startGame(req, resp) {
        const gameController = new GameController_1.default();
        gameController.startGame(req, resp);
    }
}
exports.GameRouter = GameRouter;
const gameRouter = new GameRouter();
exports["default"] = gameRouter.router;


/***/ }),

/***/ "./src/server/utils/FormattedDate.ts":
/*!*******************************************!*\
  !*** ./src/server/utils/FormattedDate.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Classe responsável por formatar a data informada para
 * o padrão dd/mm/aaaa - hh:mm:ss
 */
class FormattedDate {
    constructor() {
        this._date = new Date();
        this._formattedDate = this.setFormattedDate();
    }
    setFormattedDate() {
        const day = ('0' + this._date.getDate()).slice(-2);
        const month = ('0' + (this._date.getMonth() + 1)).slice(-2);
        const year = this._date.getFullYear();
        const hours = ('0' + this._date.getHours()).slice(-2);
        const minutes = ('0' + this._date.getMinutes()).slice(-2);
        const seconds = ('0' + this._date.getSeconds()).slice(-2);
        return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    }
    get formattedDate() {
        return this._formattedDate;
    }
}
exports["default"] = new FormattedDate();


/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "dotenv/config":
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("dotenv/config");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU0sT0FBTyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFekQsT0FBTyxHQUFHLEdBQUcsSUFBSSxLQUFLLElBQUksSUFBSSxNQUFNLEtBQUssSUFBSSxPQUFPLElBQUksT0FBTyxFQUFFO0lBQ25FLENBQUM7SUFFRCxJQUFXLGFBQWE7UUFDdEIsT0FBTyxJQUFJLENBQUMsY0FBYztJQUM1QixDQUFDO0NBQ0Y7QUFFRCxxQkFBZSxJQUFJLGFBQWEsRUFBRTs7Ozs7Ozs7Ozs7QUM5QmxDOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RlcnJhLWJyYXNpbGlzLy4vc3JjL3NlcnZlci9jb25maWcvRGF0YWJhc2UudHMiLCJ3ZWJwYWNrOi8vdGVycmEtYnJhc2lsaXMvLi9zcmMvc2VydmVyL2NvbmZpZy9NYWluQXBwbGljYXRpb24udHMiLCJ3ZWJwYWNrOi8vdGVycmEtYnJhc2lsaXMvLi9zcmMvc2VydmVyL2NvbmZpZy9TZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vdGVycmEtYnJhc2lsaXMvLi9zcmMvc2VydmVyL2NvbnRyb2xsZXJzL0dhbWVDb250cm9sbGVyLnRzIiwid2VicGFjazovL3RlcnJhLWJyYXNpbGlzLy4vc3JjL3NlcnZlci9pbmRleC50cyIsIndlYnBhY2s6Ly90ZXJyYS1icmFzaWxpcy8uL3NyYy9zZXJ2ZXIvcm91dGVzL0dhbWVSb3V0ZXIudHMiLCJ3ZWJwYWNrOi8vdGVycmEtYnJhc2lsaXMvLi9zcmMvc2VydmVyL3V0aWxzL0Zvcm1hdHRlZERhdGUudHMiLCJ3ZWJwYWNrOi8vdGVycmEtYnJhc2lsaXMvZXh0ZXJuYWwgY29tbW9uanMgXCJib2R5LXBhcnNlclwiIiwid2VicGFjazovL3RlcnJhLWJyYXNpbGlzL2V4dGVybmFsIGNvbW1vbmpzIFwiZG90ZW52L2NvbmZpZ1wiIiwid2VicGFjazovL3RlcnJhLWJyYXNpbGlzL2V4dGVybmFsIGNvbW1vbmpzIFwiZXhwcmVzc1wiIiwid2VicGFjazovL3RlcnJhLWJyYXNpbGlzL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vdGVycmEtYnJhc2lsaXMvZXh0ZXJuYWwgY29tbW9uanMgXCJtb25nb29zZVwiIiwid2VicGFjazovL3RlcnJhLWJyYXNpbGlzL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vdGVycmEtYnJhc2lsaXMvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGVycmEtYnJhc2lsaXMvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90ZXJyYS1icmFzaWxpcy93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdGVycmEtYnJhc2lsaXMvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnZG90ZW52L2NvbmZpZydcclxuaW1wb3J0IG1vbmdvb3NlLCB7IE1vbmdvb3NlIH0gZnJvbSAnbW9uZ29vc2UnXHJcbmltcG9ydCBkYXRlIGZyb20gJ0Avc2VydmVyL3V0aWxzL0Zvcm1hdHRlZERhdGUnXHJcblxyXG5jbGFzcyBEYXRhYmFzZSB7XHJcbiAgcHJpdmF0ZSBfZGF0YWJhc2U6IFByb21pc2U8TW9uZ29vc2U+XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5fZGF0YWJhc2UgPSBtb25nb29zZS5jb25uZWN0KFxyXG4gICAgICBgJHtwcm9jZXNzLmVudi5VUkxfTU9OR09fREJ9LyR7cHJvY2Vzcy5lbnYuREFUQUJBU0V9YFxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBkYXRhYmFzZSgpOiBQcm9taXNlPE1vbmdvb3NlPiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGF0YWJhc2VcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhc3luYyBjb25uZWN0aW9uKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgY29uc3QgZGF0YWJhc2UgPSBhd2FpdCB0aGlzLl9kYXRhYmFzZVxyXG4gICAgZGF0YWJhc2UuY29ubmVjdGlvbi5vbignY29ubmVjdGVkJywgKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZyhgWyR7ZGF0ZS5mb3JtYXR0ZWREYXRlfV0gOiBDb25leMOjbyBlc3RhYmVsZWNpZGEgY29tIHN1Y2Vzc29gKVxyXG4gICAgfSlcclxuXHJcbiAgICBkYXRhYmFzZS5jb25uZWN0aW9uLm9uKCdkaXNjb25uZWN0ZWQnLCAoKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGBbICR7ZGF0ZS5mb3JtYXR0ZWREYXRlfSBdIDogQ29uZXjDo28gZGVzY29uZWN0YWRhYClcclxuICAgIH0pXHJcblxyXG4gICAgZGF0YWJhc2UuY29ubmVjdGlvbi5vbignZXJyb3InLCAoZXJyb3I6IEVycm9yKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFsgJHtkYXRlLmZvcm1hdHRlZERhdGV9IF0gOiBFcnJvIGRlIGNvbmV4w6NvID0+ICR7ZXJyb3J9YClcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xvc2VDb25uZWN0aW9uKCk6IHZvaWQge1xyXG4gICAgcHJvY2Vzcy5vbignU0lHSU5UJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgICBjb25zdCBkYXRhYmFzZSA9IGF3YWl0IHRoaXMuX2RhdGFiYXNlXHJcbiAgICAgIGRhdGFiYXNlLmNvbm5lY3Rpb24uY2xvc2UoKVxyXG4gICAgICBjb25zb2xlLmxvZyhgWyAke2RhdGUuZm9ybWF0dGVkRGF0ZX0gXSA6IE1vbmdvb3NlIGVuY2VycmFkb2ApXHJcbiAgICAgIHByb2Nlc3MuZXhpdCgwKVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBEYXRhYmFzZSgpIiwiaW1wb3J0ICdkb3RlbnYvY29uZmlnJ1xyXG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJ1xyXG5pbXBvcnQgYm9keVBhcnNlciBmcm9tICdib2R5LXBhcnNlcidcclxuaW1wb3J0IEdhbWVSb3V0ZXIgZnJvbSAnQC9zZXJ2ZXIvcm91dGVzL0dhbWVSb3V0ZXInXHJcblxyXG5jbGFzcyBNYWluQXBwbGljYXRpb24ge1xyXG4gIHB1YmxpYyBfZXhwcmVzczogZXhwcmVzcy5BcHBsaWNhdGlvblxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX2V4cHJlc3MgPSBleHByZXNzKClcclxuICAgIHRoaXMubWlkZGxld2FyZSgpXHJcbiAgICB0aGlzLnN0YXRpY0ZpbGVzKClcclxuICAgIHRoaXMucm91dGVzKClcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZXhwcmVzcygpOiBleHByZXNzLkFwcGxpY2F0aW9uIHtcclxuICAgIHJldHVybiB0aGlzLl9leHByZXNzXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1pZGRsZXdhcmUoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9leHByZXNzLnVzZShib2R5UGFyc2VyLmpzb24oKSlcclxuICAgIHRoaXMuX2V4cHJlc3MudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSlcclxuICB9ICBcclxuXHJcbiAgcHJpdmF0ZSBzdGF0aWNGaWxlcygpOiB2b2lkIHtcclxuICAgIHRoaXMuX2V4cHJlc3MudXNlKGV4cHJlc3Muc3RhdGljKHByb2Nlc3MuZW52LkVYUFJFU1NfU1RBVElDX0ZJTEVTISkpXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJvdXRlcygpOiB2b2lkIHtcclxuICAgIHRoaXMuZXhwcmVzcy51c2UoJy8nLCBHYW1lUm91dGVyKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IE1haW5BcHBsaWNhdGlvbigpLmV4cHJlc3MiLCJpbXBvcnQgJ2RvdGVudi9jb25maWcnXHJcbmltcG9ydCAqIGFzIGh0dHAgZnJvbSAnaHR0cCdcclxuaW1wb3J0IE1haW5BcHBsaWNhdGlvbiBmcm9tICdAL3NlcnZlci9jb25maWcvTWFpbkFwcGxpY2F0aW9uJ1xyXG5pbXBvcnQgRGF0YWJhc2UgZnJvbSAnQC9zZXJ2ZXIvY29uZmlnL0RhdGFiYXNlJ1xyXG5cclxuY2xhc3MgU2VydmVyIHtcclxuICBwcml2YXRlIF9wb3J0OiBzdHJpbmcgfCBib29sZWFuIHwgbnVtYmVyXHJcbiAgcHJpdmF0ZSBfc2VydmVyOiBQcm9taXNlPGh0dHAuU2VydmVyPlxyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX3BvcnQgPSB0aGlzLm5vcm1hbGl6ZVBvcnQocHJvY2Vzcy5lbnYuUE9SVCB8fCAzMDAwKVxyXG4gICAgdGhpcy5fc2VydmVyID0gdGhpcy5jb25maWd1cmVNYWluQXBwbGljYXRpb24oKVxyXG4gIH1cclxuICBcclxuICBwdWJsaWMgZ2V0IHBvcnQoKTogc3RyaW5nIHwgYm9vbGVhbiB8IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fcG9ydFxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCBzZXJ2ZXIoKTogUHJvbWlzZTxodHRwLlNlcnZlcj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NlcnZlclxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBub3JtYWxpemVQb3J0KHZhbDogc3RyaW5nIHwgbnVtYmVyKTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB7XHJcbiAgICBjb25zdCBwb3J0OiBudW1iZXIgPSB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyA/IHBhcnNlSW50KHZhbCwgMTApIDogdmFsXHJcbiAgICBpZiAoaXNOYU4ocG9ydCkpIHJldHVybiB2YWxcclxuICAgIGVsc2UgaWYgKHBvcnQgPj0gMCkgcmV0dXJuIHBvcnRcclxuICAgIGVsc2UgcmV0dXJuIGZhbHNlXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGNvbmZpZ3VyZU1haW5BcHBsaWNhdGlvbigpOiBQcm9taXNlPGh0dHAuU2VydmVyPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBEYXRhYmFzZS5jb25uZWN0aW9uKClcclxuICAgICAgICAudGhlbihhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICBNYWluQXBwbGljYXRpb24uc2V0KCdwb3J0JywgdGhpcy5fcG9ydClcclxuICAgICAgICAgIE1haW5BcHBsaWNhdGlvbi5zZXQoJ2RhdGFiYXNlJywgYXdhaXQgRGF0YWJhc2UuZGF0YWJhc2UpXHJcbiAgICAgICAgICByZXNvbHZlKGh0dHAuY3JlYXRlU2VydmVyKE1haW5BcHBsaWNhdGlvbikpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycm9yOiB1bmtub3duIHwgRXJyb3IpID0+IHJlamVjdChlcnJvcikpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsb3NlRGF0YWJhc2UoKTogdm9pZCB7XHJcbiAgICBNYWluQXBwbGljYXRpb24uZ2V0KCdkYXRhYmFzZScpLmNsb3NlQ29ubmVjdGlvbigpXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZXJ2ZXJcclxuIiwiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tICdleHByZXNzJ1xyXG5pbXBvcnQgZGF0ZSBmcm9tICdAL3NlcnZlci91dGlscy9Gb3JtYXR0ZWREYXRlJ1xyXG5cclxuY2xhc3MgR2FtZUNvbnRyb2xsZXIge1xyXG4gIHB1YmxpYyBhc3luYyBzdGFydEdhbWUocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgY29uc29sZS5sb2coYFsgJHtkYXRlLmZvcm1hdHRlZERhdGV9IF0gOiBOb3ZvIGpvZ28gaW5pY2lhZG9gKVxyXG5cclxuICAgIC8vIFJlZGlyZWNpb25hIHBhcmEgYSB2aWV3IG9uZGUgbyBnYW1lIHZhaSByb2RhclxyXG4gICAgcmVzcC5yZW5kZXIocGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL2dhbWUvdmlldy9pbmRleCcpKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZUNvbnRyb2xsZXIiLCJpbXBvcnQgKiBhcyBodHRwIGZyb20gJ2h0dHAnXHJcbmltcG9ydCBkYXRlIGZyb20gJ0Avc2VydmVyL3V0aWxzL0Zvcm1hdHRlZERhdGUnXHJcbmltcG9ydCBTZXJ2ZXIgZnJvbSAnQC9zZXJ2ZXIvY29uZmlnL1NlcnZlcidcclxuXHJcbmNvbnN0IGh0dHBTZXJ2ZXIgPSBuZXcgU2VydmVyKClcclxuXHJcbmh0dHBTZXJ2ZXIuc2VydmVyXHJcbiAgLnRoZW4oKHNlcnZlcjogaHR0cC5TZXJ2ZXIpID0+IHtcclxuICAgIHNlcnZlci5saXN0ZW4oaHR0cFNlcnZlci5wb3J0KVxyXG4gICAgc2VydmVyLm9uKCdlcnJvcicsIG9uRXJyb3IpXHJcbiAgICBzZXJ2ZXIub24oJ2xpc3RlbmluZycsICgpID0+IG9uTGlzdGVuaW5nKHNlcnZlcikpXHJcbiAgfSlcclxuXHJcbmNvbnN0IG9uRXJyb3IgPSAoZXJyb3I6IE5vZGVKUy5FcnJub0V4Y2VwdGlvbik6IHZvaWQgPT4ge1xyXG4gIGlmIChlcnJvci5zeXNjYWxsICE9PSAnbGlzdGVuJykgdGhyb3cgZXJyb3JcclxuXHJcbiAgY29uc3QgYmluZCA9XHJcbiAgICB0eXBlb2YgaHR0cFNlcnZlci5wb3J0ID09PSAnc3RyaW5nJ1xyXG4gICAgICA/IGBQaXBlICR7aHR0cFNlcnZlci5wb3J0fWBcclxuICAgICAgOiBgUG9ydGEgJHtodHRwU2VydmVyLnBvcnR9YFxyXG4gIFxyXG4gIGh0dHBTZXJ2ZXIuY2xvc2VEYXRhYmFzZSgpXHJcblxyXG4gIHN3aXRjaChlcnJvci5jb2RlKSB7XHJcbiAgICBjYXNlICdFQUNDRVNTJzpcclxuICAgICAgY29uc29sZS5sb2coYFsgJHtkYXRlLmZvcm1hdHRlZERhdGV9IF0gOiAkeyBiaW5kIH0gcmVxdWVyIHByaXZpbMOpZ2lvcyBlbGV2YWRvcyBkZSBhY2Vzc29gKVxyXG4gICAgICBicmVha1xyXG5cclxuICAgIGNhc2UgYEVBRERSRVNTYDpcclxuICAgICAgY29uc29sZS5sb2coYFsgJHtkYXRlLmZvcm1hdHRlZERhdGUgfSBdIDogJHsgYmluZCB9IGrDoSBlc3TDoSBlbSB1c29gKVxyXG4gICAgICBicmVha1xyXG5cclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHRocm93IGVycm9yXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBvbkxpc3RlbmluZyA9IChzZXJ2ZXI6IGh0dHAuU2VydmVyKTogdm9pZCA9PiB7XHJcbiAgY29uc3QgYWRkcmVzcyA9IHNlcnZlci5hZGRyZXNzKClcclxuICBjb25zdCBiaW5kID0gXHJcbiAgICB0eXBlb2YgYWRkcmVzcyA9PT0gJ3N0cmluZycgPyBgUGlwZSAke2FkZHJlc3N9YCA6IGBQb3J0YSAke2FkZHJlc3M/LnBvcnR9YFxyXG5cclxuICBjb25zb2xlLmxvZyhgWyAke2RhdGUuZm9ybWF0dGVkRGF0ZX0gXSA6IFNlcnZpZG9yIHJvZGFuZG8gZW0gJHsgYmluZCB9YClcclxufVxyXG4iLCJpbXBvcnQgeyBSb3V0ZXIsIFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSAnZXhwcmVzcydcclxuaW1wb3J0IEdhbWVDb250cm9sbGVyIGZyb20gJ0Avc2VydmVyL2NvbnRyb2xsZXJzL0dhbWVDb250cm9sbGVyJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWVSb3V0ZXIge1xyXG4gIHByaXZhdGUgX3JvdXRlcjogUm91dGVyXHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5fcm91dGVyID0gUm91dGVyKClcclxuICAgIHRoaXMuaW5pdCgpXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0IHJvdXRlcigpOiBSb3V0ZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3JvdXRlclxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fcm91dGVyLmdldCgnLycsIHRoaXMuc3RhcnRHYW1lKVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGFydEdhbWUocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSk6IHZvaWQge1xyXG4gICAgY29uc3QgZ2FtZUNvbnRyb2xsZXIgPSBuZXcgR2FtZUNvbnRyb2xsZXIoKVxyXG4gICAgZ2FtZUNvbnRyb2xsZXIuc3RhcnRHYW1lKHJlcSwgcmVzcClcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGdhbWVSb3V0ZXIgPSBuZXcgR2FtZVJvdXRlcigpXHJcbmV4cG9ydCBkZWZhdWx0IGdhbWVSb3V0ZXIucm91dGVyIiwiLyoqXHJcbiAqIENsYXNzZSByZXNwb25zw6F2ZWwgcG9yIGZvcm1hdGFyIGEgZGF0YSBpbmZvcm1hZGEgcGFyYVxyXG4gKiBvIHBhZHLDo28gZGQvbW0vYWFhYSAtIGhoOm1tOnNzXHJcbiAqL1xyXG5jbGFzcyBGb3JtYXR0ZWREYXRlIHtcclxuICBwdWJsaWMgX2RhdGU6IERhdGVcclxuICBwdWJsaWMgX2Zvcm1hdHRlZERhdGU6IHN0cmluZ1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX2RhdGUgPSBuZXcgRGF0ZSgpXHJcbiAgICB0aGlzLl9mb3JtYXR0ZWREYXRlID0gdGhpcy5zZXRGb3JtYXR0ZWREYXRlKClcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0Rm9ybWF0dGVkRGF0ZSgpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgZGF5ID0gKCcwJyArIHRoaXMuX2RhdGUuZ2V0RGF0ZSgpKS5zbGljZSgtMilcclxuICAgIGNvbnN0IG1vbnRoID0gKCcwJyArICh0aGlzLl9kYXRlLmdldE1vbnRoKCkgKyAxKSkuc2xpY2UoLTIpXHJcbiAgICBjb25zdCB5ZWFyID0gdGhpcy5fZGF0ZS5nZXRGdWxsWWVhcigpXHJcblxyXG4gICAgY29uc3QgaG91cnMgPSAoJzAnICsgdGhpcy5fZGF0ZS5nZXRIb3VycygpKS5zbGljZSgtMilcclxuICAgIGNvbnN0IG1pbnV0ZXMgPSAoJzAnICsgdGhpcy5fZGF0ZS5nZXRNaW51dGVzKCkpLnNsaWNlKC0yKVxyXG4gICAgY29uc3Qgc2Vjb25kcyA9ICgnMCcgKyB0aGlzLl9kYXRlLmdldFNlY29uZHMoKSkuc2xpY2UoLTIpXHJcblxyXG4gICAgcmV0dXJuIGAke2RheX0vJHttb250aH0vJHt5ZWFyfSAtICR7aG91cnN9OiR7bWludXRlc306JHtzZWNvbmRzfWBcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZm9ybWF0dGVkRGF0ZSgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1hdHRlZERhdGVcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBGb3JtYXR0ZWREYXRlKCkiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJib2R5LXBhcnNlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJkb3RlbnYvY29uZmlnXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJtb25nb29zZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zZXJ2ZXIvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=