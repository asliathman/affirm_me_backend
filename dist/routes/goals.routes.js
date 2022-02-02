"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const goal_1 = __importStar(require("../models/goal"));
const database_1 = __importDefault(require("../database"));
// create connection once and everyone piggybacks off it 
// create db connection as a singleton and be able to use it in multiple places 
// Handle Errors for routes 
// closing the database when we host?
// add error handle for get routes for get routes invalid id not available and if id is not a valid char
// test for char invalid for all routes 
// decide on consitent error messages 
const router = (0, express_1.Router)();
(0, goal_1.GoalMap)(database_1.default);
// GET - goals
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //GoalMap(database);
    const result = yield goal_1.default.findAll();
    res.status(200).json({ goals: result });
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //let newGoal= req.body;
    const result = yield goal_1.default.create(req.body);
    //newGoal = result?.dataValues;
    res.status(201).json({ goal: result });
    //res.status(201).json({ goal: newGoal });
}));
// GET - goals/:id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //GoalMap(database);
    const id = Number(req.params.id);
    const result = yield goal_1.default.findByPk(id);
    res.status(200).json({ goal: result });
}));
//PATCH - goals/:id  or should we do put
router.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [updated] = yield goal_1.default.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedUser = yield goal_1.default.findOne({ where: { id: id } });
            return res.status(200).json({ user: updatedUser });
        }
        throw new Error('User not Found');
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}));
// DELETE - goals/:id
// commenting out the else doesnt work because we dont handle logic for when the response is not one but also not an error
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    goal_1.default.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            console.log(num);
            res.send({
                message: "Goal was deleted successfully!"
            });
        } //else {
        // res.send({
        //     message: `Cannot delete Goal with id ${id}. Maybe Goal was completed!`
        // });
        // }
    })
        .catch(err => {
        console.log(err);
        res.status(500).send({
            message: "Could not delete Goal with id=" + id
        });
    });
}));
exports.default = router;
//# sourceMappingURL=goals.routes.js.map