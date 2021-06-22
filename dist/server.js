"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./routes/user/index"));
const server = express_1.default();
server.use(express_1.default.json());
server.use(cors_1.default());
const port = process.env.PORT;
server.use("/chanel", index_1.default);
console.log(express_list_endpoints_1.default(server));
mongoose_1.default.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, () => console.log("Connected"));
server.listen(port, () => {
    console.log(`The application it's running on port ${port}`);
});
//# sourceMappingURL=server.js.map