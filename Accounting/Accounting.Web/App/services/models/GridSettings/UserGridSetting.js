/// <reference path="../../../../Scripts/TypeDefs/knockout.d.ts" />
define(["require", "exports"], function(require, exports) {
    // Module
    (function (Model) {
        var UserGridSetting = (function () {
            function UserGridSetting(iUserGridSetting) {
                var self = this;

                self.GridName = iUserGridSetting.GridId ? iUserGridSetting.GridId : null;

                if (iUserGridSetting.Columns != null || iUserGridSetting.Columns !== undefined) {
                    var columns = ko.observableArray([]);
                    for (var counter = 0; counter < iUserGridSetting.Columns.length; counter++) {
                        if (iUserGridSetting.Columns[counter].ColumnUIName !== "✔")
                            columns.push({
                                ColumnName: iUserGridSetting.Columns[counter].ColumnName,
                                ColumnOrder: counter,
                                IsVisible: iUserGridSetting.Columns[counter].IsVisible,
                                SortOrder: (iUserGridSetting.Columns[counter].SortOrder == 'asc') ? 0 : (iUserGridSetting.Columns[counter].SortOrder == 'desc') ? 1 : null,
                                DisplayName: iUserGridSetting.Columns[counter].DisplayName,
                                isRemovable: iUserGridSetting.Columns[counter].isRemovable,
                                width: iUserGridSetting.Columns[counter].Width
                            });
                    }
                    self.ColumnNameOrder = columns();
                }
            }
            return UserGridSetting;
        })();
        Model.UserGridSetting = UserGridSetting;
    })(exports.Model || (exports.Model = {}));
    var Model = exports.Model;
});
