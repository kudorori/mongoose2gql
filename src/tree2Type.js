import R from "ramda";
import { Schema, Types, VirtualType } from "mongoose";

const ignore = R.pipe(
  R.when(
    R.has("type"),
    R.prop("type")
  ),
  R.either(
    R.is(VirtualType),
    R.is(Schema),
    R.equals(VirtualType),
    R.equals(Schema)
  ),
  R.not
)

const isInstance = is => R.ifElse(
  R.has("type"),
  item => isInstance(is)(item.type),
  R.either(
    R.equals(is),
    R.is(is)
  )
)

const resultType = type => R.ifElse(
  R.has("required"),
  R.ifElse(
    R.propEq("required", true),
    R.always(`${type}!`),
    R.always(type)
  ),
  R.always(type)
)

const arrayToType = R.pipe(
  R.when(R.has("type"), R.prop("type")),
  R.head,
  R.cond([
    [R.has("type"), item => [Field2Type(item)]],
    [item => typeof(item) == "function", item => [Field2Type(item)]],
    [R.is(Object), item => [mapType(item)]],
  ]),
)

const Field2Type = R.cond([
  [isInstance(String), resultType("String")],
  [isInstance(Number), resultType("Float")],
  [isInstance(Schema.ObjectId), resultType("String")],
  [isInstance(Date), resultType("String")],
  [isInstance(Boolean), resultType("Boolean")],
  [isInstance(Array), arrayToType],
  [isInstance(Object), item => mapType(item)],
  [R.T, R.empty]
])

const mapType = R.pipe(
  R.filter(ignore),
  R.map(Field2Type),
  R.filter(R.pipe(
    R.isEmpty,
    R.not
  ))
)

export default mapType;
