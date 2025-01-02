<?php

namespace Flarum\Game\Access;

use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;

/**
 * 自定义权限 - 游戏【权限名：game.interface】
 */
class GamePolicy extends AbstractPolicy
{
    /**
     * @param User $actor
     * @param string $ability
     * @return bool|null
     */
    public function can(User $actor, string $ability): ?bool
    {
        if ($ability === 'game.interface'
            && $actor->hasPermission($ability)) {
            return $this->allow();
        }else{
            return $this->deny();
        }
    }
}