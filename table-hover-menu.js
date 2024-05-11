const tableSelectAllHoverMenu = {
    key: 'selectAll', // 定义 menu key ：要保证唯一、不重复（重要）
    factory() {
        return new TableSelectAllHoverMenu() // 把 `YourMenuClass` 替换为你菜单的 class
    },
}

// https://github.com/wangeditor-team/wangEditor/issues/5714
// 内容编写参考：https://github.com/wangeditor-team/wangEditor/blob/master/packages/table-module/src/module/menu/InsertCol.ts
function TableSelectAllHoverMenu() {
    // 全选菜单渲染为一个按钮
    this.tag = 'button';
    this.title = '全选';
    // svg 图标参考顶部注释：https://github.com/wangeditor-team/wangEditor/blob/master/packages/table-module/src/constants/svg.ts
    // svg 来自（github 登录 myesn 账号）：https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=4542728
    this.iconSvg = '<svg t="1715422038657" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1472" width="200" height="200"><path d="M736 96h192v192h-192v-192zM416 736h192v192h-192v-192zM608 96h-192v192h192v-192zM96 736h192v192h-192v-192zM288 96h-192v192h192v-192zM736 736h192v192h-192v-192zM288 416h-192v192h192v-192zM608 416h-192v192h192v-192zM736 416h192v192h-192v-192z" fill="#000000" p-id="1473"></path></svg>';

    this.getValue = (editor) => {
        return '';
    };

    this.isActive = (editor) => {
        return false;
    };

    this.isDisabled = (editor) => {
        return false;
    };

    this.exec = (editor, value) => {
        if (this.isDisabled(editor)) return;

        // 代码参考 
        // https://www.wangeditor.com/v5/API.html#%E8%8E%B7%E5%8F%96%E9%80%89%E4%B8%AD%E8%8A%82%E7%82%B9
        // https://github.com/wangeditor-team/wangEditor/blob/f35d8a73a0a3dc159134d483afc5963d0256ea18/packages/table-module/src/module/menu/InsertCol.ts#L41
        const [cellEntry] = wangEditor.SlateEditor.nodes(editor, {
            match: n => wangEditor.DomEditor.checkNodeType(n, 'table-cell'),
            universal: true,
        });
        const [selectedCellNode, selectedCellPath] = cellEntry;

        const rowNode = wangEditor.DomEditor.getParentNode(editor, selectedCellNode);
        if (rowNode == null) return;
        const tableNode = wangEditor.DomEditor.getParentNode(editor, rowNode);
        if (tableNode == null) return;

        const selectedTablePath = wangEditor.DomEditor.findPath(editor, tableNode);
        editor.select(selectedTablePath);
    }
}

wangEditor.Boot.registerMenu(tableSelectAllHoverMenu);