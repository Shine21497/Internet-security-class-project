# Block Chain Client
IBM区块链借贷系统Demo-前端仓库

> 后端仓库:<https://github.com/Hughshine/blockchain-backend>

> 前端界面:<http://39.96.164.104:81>
## 项目描述

随着线上交易平台的流行，考虑这样一个商业场景，有三方角色，分别为用户方，平台方以及商户方(资金方)。

用户用个人信息注册平台账号，向平台借款；商户将资金注资给平台，从而商户与用户间接产生了联系。 整个过程满足区块链去中心化的特性，于是我们设计这样一条区块链，将某个商户注资给某个平台这样一个事件记录到链上，也将某个用户像某个平台借款这样一个事件记录到链上。 

当商户想查询资金去向的用户群体时就可以查询链上其注资的平台以及向该平台借款的用户得知。反之用户查询自己的信息流向的商户时也可以通过查询链上其所借款的平台以及该平台对应的商户得知。

### 技术实现

商户，用户，平台信息存储在mysql，商户与平台的注资关系，客户与平台的借款关系存储在区块链中。

架构: 区块链(IBM)+数据库(MySQL)+后端Yii(PHP)+前端(Vue)

### 安装依赖包
```bash
npm install
# 或
yarn install
```

### 调试
```bash
npm run serve
# 或
yarn run serve
```

### 生产环境
```bash
npm run build
# 或
yarn run build
```

## 示例图片

![](https://github.com/AllenOris/BlockChain-Client/blob/master/src/assets/demo1.png?raw=true)

![](https://github.com/AllenOris/BlockChain-Client/blob/master/src/assets/demo2.png?raw=true)

![](https://github.com/AllenOris/BlockChain-Client/blob/master/src/assets/demo3.png?raw=true)

![](https://github.com/AllenOris/BlockChain-Client/blob/master/src/assets/demo4.png?raw=true)
