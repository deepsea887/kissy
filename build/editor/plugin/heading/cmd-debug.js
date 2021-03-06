/*
Copyright 2014, KISSY v5.0.0
MIT Licensed
build time: Apr 29 15:03
*/
/*
combined modules:
editor/plugin/heading/cmd
*/
/**
 * @ignore
 * Adds a heading tag around a selection or insertion point line.
 * Requires the tag-name string to be passed in as a value argument (i.e. "H1", "H6")
 * @author yiminghe@gmail.com
 */
KISSY.add('editor/plugin/heading/cmd', ['editor'], function (S, require) {
    var Editor = require('editor');
    return {
        init: function (editor) {
            if (!editor.hasCommand('heading')) {
                editor.addCommand('heading', {
                    exec: function (editor, tag) {
                        var currentValue;
                        editor.execCommand('save');
                        if (tag !== 'p') {
                            currentValue = editor.queryCommandValue('heading');
                        }
                        if (tag === currentValue) {
                            tag = 'p';
                        }
                        new Editor.Style({ element: tag }).apply(editor.get('document')[0]);
                        editor.execCommand('save');
                    }
                });
                var queryCmd = Editor.Utils.getQueryCmd('heading');
                editor.addCommand(queryCmd, {
                    exec: function (editor) {
                        var selection = editor.getSelection();
                        if (selection && !selection.isInvalid) {
                            var startElement = selection.getStartElement();
                            var currentPath = new Editor.ElementPath(startElement);
                            var block = currentPath.block || currentPath.blockLimit;
                            var nodeName = block && block.nodeName() || '';
                            if (nodeName.match(/^h\d$/) || nodeName === 'p') {
                                return nodeName;
                            }
                        }
                    }
                });
            }
        }
    };
});
