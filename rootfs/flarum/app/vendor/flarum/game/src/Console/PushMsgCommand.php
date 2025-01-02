<?php

namespace Flarum\Game\Console;

use Flarum\Console\AbstractCommand;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Bus\Dispatcher;
use Symfony\Contracts\Translation\TranslatorInterface;

/**
 * 推送消息 - 命令
 */
class PushMsgCommand extends AbstractCommand
{
    protected Dispatcher $bus; // 调度器
    protected SettingsRepositoryInterface $settings; // 设置接口
    protected TranslatorInterface $translator; // 翻译接口

    public function __construct(Dispatcher $bus, SettingsRepositoryInterface $settings, TranslatorInterface $translator)
    {
        parent::__construct();
        $this->bus = $bus;
        $this->settings = $settings;
        $this->translator = $translator;
    }

    protected function configure(): void
    {
        $this->setName('game:push:msg')
            ->setDescription('推送消息.');
    }

    protected function fire(): void
    {
        // 判断后台管理是否开启推送
        if (!$this->settings->get('flarum-game.enable_push_msg')) {
            $this->error($this->translator->trans('flarum-game.console.push_msg_disabled'));
            return;
        }
        $this->info($this->translator->trans('flarum-game.admin.permissions.interface'));
    }
}
