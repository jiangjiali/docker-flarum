## 游戏服务

### 安装

```sh
composer require flarum/game *@dev
```

### 更新

```sh
composer update flarum/game *@dev
```

## 命令

**初始化**

- `flarum-cli init [PATH]` 生成一个空白的扩展骨架，包括所有推荐的基础结构。

**基础结构**

- `flarum-cli infra [MODULE] [PATH]` 为扩展基础结构的某些部分添加（或更新）基础结构。您可以通过运行 `fl-dev infra --help` 来查看所有可用的模块。

**审查**

- `flarum-cli audit infra [--monorepo] [--fix]` 检查所有已启用模块的基础结构文件是否是最新的。

**后端代码生成**：生成不同类型的后端类和扩展程序。

- `flarum-cli make backend api-controller` 创建API控制器
- `flarum-cli make backend api-serializer` 创建API序列化
- `flarum-cli make backend api-serializer-attributes` 创建API序列化属性
- `flarum-cli make backend command` 创建命令
- `flarum-cli make backend event-listener` 创建事件监听
- `flarum-cli make backend handler` 创建处理程序
- `flarum-cli make backend integration-test` 创建集成测试
- `flarum-cli make backend job` 创建任务
- `flarum-cli make backend migration` 创建表迁移
- `flarum-cli make backend model` 创建模型
- `flarum-cli make backend policy` 创建权限
- `flarum-cli make backend repository` 创建存储库
- `flarum-cli make backend route [PATH]` 创建路由
- `flarum-cli make backend service-provider` 创建服务托管
- `flarum-cli make backend validator` 创建验证器

**前端代码生成**：生成前端组件/类。

- `flarum-cli make frontend component [PATH]` 创建组件
- `flarum-cli make frontend modal [PATH]` 创建模式
- `flarum-cli make frontend model [PATH]` 创建模型

**代码更新**：这些命令有助于更新Flarum的新版本的扩展。

- `flarum-cli update js-imports`: 将admin/forum/common命名空间添加到所有从flarum核心导入的JS中。

_当然，您可以始终使用help命令查看所有可用命令的列表及其说明：_

- `flarum-cli help [COMMAND]`

如果可能，所有命令都可以使用 `--no interaction` 标志继续使用默认值进行提示。

## 最强大的命令

在上述所有命令中，最强大的两个命令将产生巨大的影响，它们是扩展初始化命令**init**和后端**model**生成命令。前者显然允许使用Core Dev团队推荐的骨架启动扩展，而后者不仅创建后端模型，还允许仅从模型名称创建与模型相关的所有类：

- Table migration 表迁移
- Policy 权限
- API Serializer API序列化
- CRUD API Controllers CRUD API控制器
- CRUD Handlers CRUD处理程序
- Repository 存储库
- Validator 验证器
- Routes 路由
- Related Extenders 相关扩展器
