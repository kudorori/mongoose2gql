# Mongoose Schema To GraphQL Object

## 警告
> 這個套件目前還在實驗階段

## 前言

這個套件參考了 [https://github.com/sarkistlt/mongoose-schema-to-graphql](https://github.com/sarkistlt/mongoose-schema-to-graphql)

並且新增了一些目前我需要的東西，分別是：

1. 將GraphQL Fields 定義改為閉包(Closure)的方式，讓各個Type間可以循環參照 (`當然你不一定要讓他循環參照`)

2. 不採用亂數命名的方式 (命名管理起來太亂了)

3. Array型態不單單只轉變成`[String]`

4. 加入了GraphQLNonNull的支持




# Install

> $ npm i -S mongoose2gql

# Method

```
/**
 * @params {string} name
 * @params {mongooseSchema} schema
 * @params {string} class Enum["GraphQLObjectType", "GraphQLInputObjectType"]
 * @params {string} description
 * @params {function} extends
 *         @return Object
 * @return GraphQLType[class]
 */
createType({
  name,
  schema,
  class,
  description,
  extends
})
```

# Exmaple

```javascript

import createType from "../../src";
import schema from "../schema/a";
import BType from "./BType";

export default createType({
  name: "AType",
  schema,
  extends: () => ({
    BType: {
      type: BType
    }
  })
})

```

> 這個範例會等於

```javascript
type AType {
  stringType: String
  numberType: Int
  dateType: String
  requiredType: String!
  arrayTypeString: [String]
  arrayTypeNumber: [Int]
  EmbeddedB: AType_EmbeddedB
  EmbeddedBArray: [AType_EmbeddedBArray]
  _id: String
  tree: AType_tree
  BType: BType
}
```
