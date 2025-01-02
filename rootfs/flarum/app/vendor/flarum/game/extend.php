<?php

use Flarum\Extend;
use Flarum\Game;

return [
    // 注册资源
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),
    // 注册多语言
    new Extend\Locales(__DIR__.'/locale'),
    // 注册路由
    (new Extend\Routes('api'))
        ->get('/game/gate/{id}', 'game.gate', Game\Api\Controller\GateController::class),
    // 注册自定义 - 全局权限
    (new Extend\Policy())
        ->globalPolicy(Game\Access\GamePolicy::class),
    // 注册控制台命令
    (new Extend\Console())
        ->command(Game\Console\PushMsgCommand::class),
    // 注册设置参数
    (new Extend\Settings())
        ->default('flarum-game.enable_push_msg', true)
        ->serializeToForum('game.enablePushMsg', 'flarum-game.enable_push_msg', 'boolVal'),
];
