<?php

namespace Flarum\BBCode\Api\Serializer;

use Flarum\Settings\SettingsRepositoryInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

/**
 * @property SettingsRepositoryInterface|mixed $settings
 * @property mixed|TranslatorInterface $translator
 */
class FormatContent
{
    public function __construct()
    {
        $this->settings = resolve(SettingsRepositoryInterface::class);
        $this->translator = resolve(TranslatorInterface::class);
    }
}
