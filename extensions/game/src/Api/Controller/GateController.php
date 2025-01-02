<?php

namespace Flarum\Game\Api\Controller;

use Flarum\Http\RequestUtil;
use Flarum\User\Exception\PermissionDeniedException;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Response\JsonResponse;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;

/**
 * 门限 - 接口
 */
class GateController implements RequestHandlerInterface
{
    /**
     * @throws PermissionDeniedException
     */
    public function handle(Request $request): Response
    {
        // 获取用户对象
        $actor = RequestUtil::getActor($request);
        // 获取参数
        $modelId = Arr::get($request->getQueryParams(), 'id');
        // 判断用户是否有权限
        if(!$actor->hasPermission('game.interface')){
            throw new PermissionDeniedException();//抛出没有权限异常
        }
        $arr = array("key"=>"正解数据来了".$modelId);
        return new JsonResponse($arr, encodingOptions: JSON_UNESCAPED_UNICODE);
    }
}
