<?php

namespace Flarum\BBCode;

use s9e\TextFormatter\Renderer;
use Symfony\Contracts\Translation\TranslatorInterface;
use Psr\Http\Message\ServerRequestInterface as Request;

class Render
{
    /**
     * @var TranslatorInterface
     */
    protected TranslatorInterface $translator;

    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }

    /**
     * 在渲染之前修改要渲染的XML。
     * 这个回调应该返回新的XML。
     * 例如，在提到的扩展中，这用于提供所提到的用户的用户名和显示名称。
     * 确保最后一个$request参数可以为null（或完全省略）。
     * @param Renderer $renderer
     * @param $context
     * @param $xml
     * @param Request|null $request
     * @return string
     */
    public function __invoke(Renderer $renderer, $context, $xml, Request $request = null): string
    {
        $renderer->setParameter('L_WROTE', $this->translator->trans('flarum-bbcode.forum.quote.wrote'));
        return $xml;
    }
}
