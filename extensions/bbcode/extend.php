<?php

namespace Flarum\BBCode;

use Flarum\Api\Serializer\PostSerializer;
use Flarum\BBCode\Api\Serializer\ContentInPosts;
use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),
    new Extend\Locales(__DIR__.'/locale'),
    (new Extend\Formatter)
        ->render(Render::class)
        ->configure(Configure::class),
    (new Extend\ApiSerializer(PostSerializer::class))
        ->attributes(ContentInPosts::class)
];
