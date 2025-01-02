<?php

namespace Flarum\BBCode;

use s9e\TextFormatter\Configurator;

class Configure
{
    /**
     * 添加自定义文本格式化程序配置
     * @param Configurator $config
     * @return void
     */
    public function __invoke(Configurator $config): void
    {
        $this->addTagsFromRepositories($config);
        $this->adaptHighlightJs($config);
        $this->addReply2see($config);
        $this->addTimeline($config);
        $this->addEmptyTwoSquares($config);
        $this->addGather($config);
    }

    protected function addTagsFromRepositories(Configurator $config): void
    {
        $config->BBCodes->addFromRepository('B');
        $config->BBCodes->addFromRepository('I');
        $config->BBCodes->addFromRepository('U');
        $config->BBCodes->addFromRepository('S');
        $config->BBCodes->addFromRepository('URL');
        $config->BBCodes->addFromRepository('IMG');
        $config->BBCodes->addFromRepository('EMAIL');
        $config->BBCodes->addFromRepository('CODE');
        $config->BBCodes->addFromRepository('QUOTE', 'default', [
            'authorStr' => '<xsl:value-of select="@author"/> <xsl:value-of select="$L_WROTE"/>'
        ]);
        $config->BBCodes->addFromRepository('LIST');
        $config->BBCodes->addFromRepository('DEL');
        $config->BBCodes->addFromRepository('COLOR');
        $config->BBCodes->addFromRepository('CENTER');
        $config->BBCodes->addFromRepository('SIZE');
        $config->BBCodes->addFromRepository('*');
    }

    /**
     * Fix for highlight JS not working after changing post content.
     *
     * @link https://github.com/flarum/framework/issues/3794
     */
    protected function adaptHighlightJs(Configurator $config): void
    {
        $codeTag = $config->tags->get('CODE');
        $script = '
                <script>
                    if(window.hljsLoader && !document.currentScript.parentNode.hasAttribute(\'data-s9e-livepreview-onupdate\')) {
                        window.hljsLoader.highlightBlocks(document.currentScript.parentNode);
                    }
                </script>';
        $codeTag->template = str_replace('</pre>', $script.'</pre>', $codeTag->template);
    }

    protected function addReply2see(Configurator $config):void{
        $config->BBCodes->addCustom(
            '[REPLY]{TEXT}[/REPLY]',
            '<reply2see>{TEXT}</reply2see>'
        );
    }

    protected function addTimeline(Configurator $config):void{
        $config->BBCodes->addCustom(
            '[TLI={IDENTIFIER} {TEXT}]{ANYTHING}[/TLI]',
            '<div class="cb-timeline">
                    <div class="cb-center-line"></div>
                    <div class="cb-info">
                        <i class="icon fas fa-{IDENTIFIER}"></i>
                        <div class="cb-timestamp">{TEXT}</div>
                        <div class="cb-content">
                            {ANYTHING}
                        </div>
                    </div>
                </div>'
        );
        $config->BBCodes->addCustom(
            '[TLC={COLOR} {TEXT}]{ANYTHING}[/TLC]',
            '<div class="cb-timeline">
                    <div class="cb-center-line2" style="background:{COLOR} !important;"></div>
                    <div class="cb-info">
                        <i class="icon2" style="background: {COLOR} !important;"></i>
                        <div class="cb-timestamp2" style="background:{COLOR} !important;">{TEXT}</div>
                        <div class="cb-content2">
                            {ANYTHING}
                        </div>
                    </div>
                </div>'
        );
    }

    protected function addEmptyTwoSquares(Configurator $config):void{
        $config->BBCodes->addCustom(
            '[ETS]{ANYTHING}[/ETS]',
            '<p style="text-indent: 2em;">{ANYTHING}</p>'
        );
    }

    protected function addGather(Configurator $config):void{
        $config->BBCodes->addCustom(
            '[GOV]{TEXT1}:{TEXT2}[/GOV]',
            '<gov>{TEXT1}:{TEXT2}</gov>'
        );

        $config->BBCodes->addCustom(
            '[MBA]{TEXT}[/MBA]',
            '<mba>{TEXT}</mba>'
        );
    }
}
