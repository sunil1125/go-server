/// <reference path="../../../../Scripts/TypeDefs/knockout.d.ts" />

// Interface
export interface IUserGridSetting {
    GridId: string;
    Columns: any;
}

// Module
export module Model {
    export class UserGridSetting {
        public GridName: string;
        public ColumnNameOrder: any;

        constructor(iUserGridSetting?: any) {
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
    }
}