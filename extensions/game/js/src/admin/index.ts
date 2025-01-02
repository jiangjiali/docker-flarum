import app from 'flarum/admin/app';

app.initializers.add('flarum/game', () => {
    app.extensionData.for('flarum-game')
        .registerPermission(
        {
            icon: 'fas fa-gamepad',
            label: app.translator.trans('flarum-game.admin.permissions.interface'),
            permission: 'game.interface',
        },
        'view',
        95)
        .registerSetting(
        {
            setting: 'flarum-game.enable_push_msg',
            label: app.translator.trans('flarum-game.admin.settings.enable_push_msg'),
            type: 'boolean',
        });
});