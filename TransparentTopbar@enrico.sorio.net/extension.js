import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

let _handles = [];

export default class TransparentTopbarExtension extends Extension {

    enable() {
        Main.panel.remove_style_class_name('solid');
        Main.panel.add_style_class_name('panel-transparency');

        if (Main.mmPanel) {
            for (var i = 0, len = Main.mmPanel.length; i < len; i++) {
                Main.mmPanel[i].remove_style_class_name('solid');
                Main.mmPanel[i].add_style_class_name('panel-transparency');
            }
        }

        _handles.push(global.window_manager.connect('switch-workspace', () => {
            setStyle();
        }));
    }

    disable() {
        _handles.splice(0).forEach(h => global.window_manager.disconnect(h));
    }
}