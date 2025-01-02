<?php

namespace Flarum\BBCode\Api\Serializer;

use Flarum\Api\Serializer\PostSerializer;
use Flarum\Database\AbstractModel;
use QL\QueryList;

class ContentInPosts extends FormatContent
{
    public function __invoke(PostSerializer $serializer, AbstractModel $post, array $attributes)
    {
        if (isset($attributes["contentHtml"])) {
            $newHTML = $attributes["contentHtml"];
            if (str_contains($newHTML, '<reply2see>')) {
                $attributes = $this->reply($serializer, $post, $attributes);
            }

            if (str_contains($newHTML, '<p><mba>')) {
                $attributes = $this->mba($serializer, $post, $attributes);
            }

            if (str_contains($newHTML, '<p><gov>')) {
                $attributes = $this->gov($serializer, $post, $attributes);
            }
        }
        return $attributes;
    }

    // 回复可见
    public function reply(PostSerializer $serializer, AbstractModel $post, array $attributes): array
    {
        $newHTML = $attributes["contentHtml"];

        $usersModel = $post['discussion']->participants()->get('id');
        $users = [];
        foreach ($usersModel as $user) {
            $users[] = $user->id;
        }

        $replied = !$serializer->getActor()->isGuest() && in_array($serializer->getActor()->id, $users);
        if ($serializer->getActor()->isAdmin()) $replied = true;
        if ($replied) {
            $newHTML = preg_replace('/<reply2see>(.*?)<\/reply2see>/is',
                '<div class="reply2see"><div class="reply2see_title">' .
                $this->translator->trans('flarum-bbcode.forum.hidden_content')
                . '</div>$1</div>',
                $newHTML
            );
        } else {
            $newHTML = preg_replace(
                '/<reply2see>(.*?)<\/reply2see>/is',
                '<div class="reply2see"><div class="reply2see_alert">' .
                $this->translator->trans('flarum-bbcode.forum.reply_to_see',
                    array(
                        '{reply}' => '<a class="reply2see_reply">' . $this->translator->trans('core.forum.discussion_controls.reply_button') . '</a>'
                    )
                ) . '</div></div>',
                $newHTML
            );
        }

        $attributes['contentHtml'] = $newHTML;
        return $attributes;
    }

    public function mba(PostSerializer $serializer, AbstractModel $post, array $attributes): array
    {
        $newHTML = $attributes["contentHtml"];
        $newHTML = str_replace('<p><mba>', '', $newHTML);
        $newHTML = str_replace('</mba></p>', '', $newHTML);
        // DOM解析规则
        $rules = [
            // 移除内容中所有的超链接，但保留超链接的内容
            'content' => ['.main_content','html','a']
        ];
        $ql = (new QueryList)->rules($rules)->get('https://wiki.mbalib.com/wiki/' . $newHTML)->encoding('UTF-8');
        // 移除的元素，并移除
        $ql->find('.printfooter,.reference,.editsection,.toc,.wikitable,#siteSub,script:last')->remove();
        $res = $ql->query()->getData()->all()['content'];
        $attributes['contentHtml'] = $res;
        return $attributes;
    }

    public function gov(PostSerializer $serializer, AbstractModel $post, array $attributes): array
    {
        $newHTML = $attributes["contentHtml"];
        $newHTML = str_replace('<p><gov>', '', $newHTML);
        $newHTML = str_replace('</gov></p>', '', $newHTML);
        $arr = explode(":", $newHTML);//以:为分隔符
        $rules = [
            // 移除内容中所有的超链接，但保留超链接的内容
            'content' => ['.TRS_UEDITOR','html','a']
        ];
        $ql = (new QueryList)->rules($rules)->get('https://www.gov.cn/yaowen/liebiao/' . $arr[0] . '/content_' . $arr[1] . '.htm')->encoding('UTF-8');
        // 移除的元素，并移除
        //$ql->find('')->remove();
        $res = $ql->query()->getData()->all()['content'];
        $attributes['contentHtml'] = $res;
        return $attributes;
    }
}
