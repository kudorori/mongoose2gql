import R from "ramda";
import { Schema, Types, VirtualType } from "mongoose";
import tree2Type from "./tree2Type";
import toTypes from "./toTypes";
import toTypeString from "./toTypeString";
import mergeExtend from "./mergeExtend";
import mergeIgnore from "./mergeIgnore";

import mergeType from "./mergeType";

export {
  mergeType
};

const log = R.tap(console.log);

//result [type, ... , type]
const createType = (_args) => {
  const {
    schema,
    name,
    description = "",
    ignore = () => ({}),
    extend = () => ({})
  } = _args;

  return R.pipe(
    tree2Type,
    toTypes(name, description),
    mergeIgnore(ignore()),
    mergeExtend(extend()),
    toTypeString,
  )(schema.tree)
}

export default createType;
