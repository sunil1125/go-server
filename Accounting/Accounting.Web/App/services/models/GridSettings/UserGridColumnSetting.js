define(["require", "exports"], function(require, exports) {
    // Module
    (function (Model) {
        var UserGridColumnSetting = (function () {
            function UserGridColumnSetting(iUserGridColumnSetting) {
                var self = this;
                self.ColumnOrder = iUserGridColumnSetting.ColumnOrder ? iUserGridColumnSetting.ColumnOrder : null;
                self.ColumnName = iUserGridColumnSetting.ColumnName ? iUserGridColumnSetting.ColumnName : null;
                self.IsVisible = iUserGridColumnSetting.IsVisible != null ? iUserGridColumnSetting.IsVisible : true;
                self.SortOrder = iUserGridColumnSetting.SortOrder != null ? iUserGridColumnSetting.SortOrder : null;
            }
            return UserGridColumnSetting;
        })();
        Model.UserGridColumnSetting = UserGridColumnSetting;
    })(exports.Model || (exports.Model = {}));
    var Model = exports.Model;
});
