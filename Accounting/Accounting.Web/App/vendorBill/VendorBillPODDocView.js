//#region References
/// <reference path="../../Scripts/TypeDefs/Bootstrap.d.ts" />
/// <reference path="../../Scripts/TypeDefs/bootstrap.timepicker.d.ts" />
/// <reference path="../../Scripts/TypeDefs/durandal.d.ts" />
/// <reference path="../../Scripts/TypeDefs/jquery.d.ts" />
/// <reference path="../../Scripts/TypeDefs/utils.d.ts" />
/// <reference path="../../Scripts/TypeDefs/knockout.validation.d.ts" />
/// <reference path="../../Scripts/TypeDefs/knockout.d.ts" />
/// <reference path="../services/models/TypeDefs/CommonModels.d.ts" />
//#endregion
define(["require", "exports", 'plugins/router', 'durandal/app', 'durandal/system', 'services/models/common/Enums', 'services/client/VendorBillClient', 'services/models/salesOrder/SalesOrderUploadFileModel', '../templates/reportViewerControlV2'], function(require, exports, ___router__, ___app__, __refSystem__, __refEnums__, __refVendorBillClient__, __refUploadFileModel__, ___reportViewer__) {
    
    var _router = ___router__;
    var _app = ___app__;
    var refSystem = __refSystem__;
    
    var refEnums = __refEnums__;
    var refVendorBillClient = __refVendorBillClient__;
    var refUploadFileModel = __refUploadFileModel__;
    var _reportViewer = ___reportViewer__;

    //#endregion
    /*
    ** <summary>
    ** Purchase Order POD Doc View Model.
    ** </summary>
    ** <createDetails>
    ** <by>Baldev Singh T</by> <date>19 March, 2015</date>
    ** </createDetails>}
    ** <changeHistory>}
    ** <id></id> <by></by> <date></date>
    ** </changeHistory>
    */
    var VendorBillPODDocViewModel = (function () {
        //#endregion
        //#region Initializes the properties of this class
        function VendorBillPODDocViewModel() {
            var _this = this;
            //#region Properties
            this.vendorBillPodDocDetail = ko.observableArray([]);
            this.currentUser = ko.observable();
            this.docOwner = ko.observable('');
            this.fileType = ko.observable('');
            //selecteedNotesType: KnockoutObservable<string> = ko.observable("Select");
            this.canAdd = ko.observable(false);
            this.salesOrderOwnerTypes = ko.observableArray([]);
            this.selectedOwnerType = ko.observable(0);
            this.salesOrderFileTypes = ko.observableArray([]);
            this.selectedFileType = ko.observable(0);
            this.description = ko.observable('');
            this.returnValue = ko.observable(false);
            this.ischange = ko.observable(false);
            this.UploadedFileName = ko.observable();
            this.FileName = ko.observable();
            this.uploadedItems = ko.observableArray();
            this.shipmentId = ko.observable(0);
            this.vendorBillId = ko.observable(0);
            this.carrierId = ko.observable(0);
            this.bolNumber = ko.observable();
            this.proNumber = ko.observable();
            this.carrierName = ko.observable();
            this.originZip = ko.observable();
            //For upload button
            this.isEnableUpload = ko.observable(true);
            this.isEnableBrowse = ko.observable(false);
            //For filE extensions
            this.isPOD = ko.observable(true);
            this.isBolRc = ko.observable(false);
            this.isDocOther = ko.observable(false);
            this.isReadOnly = ko.observable(true);
            this.reportContainer = null;
            this.header = null;
            this.grid = null;
            this.reportAction = null;
            this.reportData = null;
            this.modeType = ko.observable();
            this.checkMsgDisplay = true;
            this.commonUtils = new Utils.Common();
            this.oldFileType = ko.observable('');
            this.vendorBillClientCommand = new refVendorBillClient.VendorBillClient();
            this.disposables = [];
            var self = this;
            self.getLoggedInUserDetails();
            if (refSystem.isObject(refEnums.Enums.DocumentType)) {
                self.salesOrderFileTypes.removeAll();
                for (var item in refEnums.Enums.DocumentType) {
                    self.salesOrderFileTypes.push(refEnums.Enums.DocumentType[item]);
                }
            }

            // Handles the add command
            self.onAdd = function () {
                // Try to get the current user again if first time failed
                self.isEnableBrowse(false);
                if (!self.currentUser()) {
                    self.getLoggedInUserDetails();
                }

                var uploadResquestModel = new refUploadFileModel.Models.SalesOrderUploadFileModel();

                uploadResquestModel.Description = self.FileName();
                uploadResquestModel.DocumentType = self.fileType();
                uploadResquestModel.OwnerType = 'Vendor';
                uploadResquestModel.VendorBillId = self.vendorBillId();
                uploadResquestModel.CarrierId = self.carrierId();
                uploadResquestModel.BolNumber = self.bolNumber();
                uploadResquestModel.UploadedFileDetails = self.uploadedItem;
                uploadResquestModel.ProNumber = self.proNumber();
                if (self.proNumber().indexOf(' ') >= 0) {
                    var str = self.proNumber().split(' ');
                    uploadResquestModel.BolNumber = str[0];
                } else {
                    uploadResquestModel.BolNumber = self.proNumber();
                }
                uploadResquestModel.CarrierName = self.carrierName();
                uploadResquestModel.OriginZip = self.originZip();

                var uploadLine = self.getSalesOrderPodDocDetails(self, '');

                //To disable the Upload button
                self.reportContainer.listProgress(true);
                self.vendorBillClientCommand.uploadAndGetUploadedResponse(uploadResquestModel, function (result) {
                    uploadLine.fileUrl = result.UploadedPOFilePath;
                    uploadLine.Id = result.Id;
                    self.vendorBillPodDocDetail.unshift(uploadLine);
                    self.setPagingData(ko.observableArray(self.vendorBillPodDocDetail()), self.gridOptions, self.reportAction);
                    self.reportContainer.listProgress(false);
                    self.resetPODDOC();
                    self.isEnableUpload(true);
                    self.resetGridSelection(self);
                }, function () {
                });
                self.canAdd(false);
            };

            // Handles the Update command
            self.onUpdate = function () {
                if (!self.currentUser()) {
                    self.getLoggedInUserDetails();
                }
                var index = self.vendorBillPodDocDetail.indexOf(self.selectedlineitem);
                self.vendorBillPodDocDetail()[index].description(self.FileName());
                self.vendorBillPodDocDetail()[index].docOwner(self.commonUtils.getEnumValueById(refEnums.Enums.DocumentOwner, self.docOwner()));

                var uploadLine = self.getSalesOrderPodDocDetails(self, '');
                var uploadFileDetails = new refUploadFileModel.Models.SalesOrderUploadFileModel();
                uploadFileDetails.Id = self.selectedlineitem.Id;
                uploadFileDetails.Description = self.FileName();
                uploadFileDetails.OwnerType = 'Vendor';

                self.reportContainer.listProgress(true);
                self.UploadedFileName('');
                self.vendorBillClientCommand.updatePodDoc(uploadFileDetails, function (result) {
                    uploadLine.Id = result.Id;
                    self.setPagingData(ko.observableArray(self.vendorBillPodDocDetail()), self.gridOptions, self.reportAction);
                    self.reportContainer.listProgress(false);
                    self.resetPODDOC();
                    self.isEnableUpload(true);
                }, function () {
                });
                self.canAdd(false);
            };

            self.header = new _reportViewer.ReportHeaderOption();
            self.header.reportHeader = "";
            self.header.reportName = "Sales POD Doc";
            self.header.gridTitleHeader = "";

            //initialize date filters
            self.reportAction = new _reportViewer.ReportAction();
            self.grid = self.setGridOptions(self);

            self.setReportCriteria = function (reportActionObj) {
                _this.gridOptions = reportActionObj.gridOptions;
                if (_this.reportAction != null) {
                    if ((_this.modeType() != reportActionObj.filter1selectedItemId) || (_this.reportAction.view != reportActionObj.view) || (reportActionObj.dateFrom != _this.reportAction.dateFrom) || (reportActionObj.dateTo != _this.reportAction.dateTo)) {
                        _this.gridOptions.pagingOptions.currentPage(1);
                    }
                }

                // Re-set the Grid Columns since the prev. selection of serviceType is diff. to the Current selection
                // we don't want any data on page load so we commented getReportdata  function.
                // self.getReportData();
                _this.reportAction = reportActionObj;

                if (reportActionObj.dateFrom !== null && reportActionObj.dateTo !== null) {
                    // self.getReportData();
                } else {
                    var toastrOptions = {
                        toastrPositionClass: "toast-top-middle",
                        delayInseconds: 10,
                        fadeOut: 10,
                        typeOfAlert: "",
                        title: ""
                    };

                    Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.PleaseSelectDateTimeFrame, "info", null, toastrOptions);
                }
            };

            self.reportContainer = new _reportViewer.ReportViewerControlV2(self.header, self.grid);
            self.reportContainer.showOptionalHeaderRow(false);
            self.reportContainer.OptionalHeaderRowLocation('TOP');
            self.reportContainer.onFilterChange = self.setReportCriteria;
            self.reportContainer.ForceChange();

            //if we click on grid ROW then notes will be appear in the text area field. (canSelectRows => true;)
            self.reportContainer.afterSelectionChange = function (items) {
                var selectedRowCount = items.length;
                var file;
                self.isEnableUpload(false);
                self.isEnableBrowse(false);
                if (selectedRowCount > 0) {
                    self.selectedlineitem = items[0];
                    self.FileName(items[0].description());
                    self.docOwner(self.commonUtils.getEnumIdByValue(refEnums.Enums.DocumentOwner, items[0].docOwner()));
                    file = self.commonUtils.getEnumIdByValue(refEnums.Enums.DocumentType, items[0].fileType());
                    self.oldFileType(file);
                    self.fileType(file);
                    self.UploadedFileName(item[0].fileUrl);
                }
            };

            //Enables Upload Button once all the mandatory fields are filled up.self.uploadedFileName.length > -1 &&
            self.disposables.push(self.enableUploadButton = ko.computed(function () {
                if (self.UploadedFileName() != undefined && self.fileType() != undefined && self.UploadedFileName() != "") {
                    return true;
                }

                return false;
            }));

            //Enable Update related to file type
            self.disposables.push(self.enableUpdateButton = ko.computed(function () {
                if (self.fileType() != undefined && self.FileName() != "") {
                    if (self.isReadOnly()) {
                        return true;
                    } else {
                        return false;
                    }
                }

                return false;
            }));

            //To check if MSG is clicked
            self.checkMsgClick = function () {
                self.checkMsgDisplay = true;
            };

            // to Check if MSG is hidden or closed
            self.checkMsgHide = function () {
                self.checkMsgDisplay = true;
            };

            /*	This is triggered when the user is uploading a document.
            It saves the document object to be saved in system */
            self.uploadSalesOrderDocument = function (obj, event) {
                var reader = new FileReader(), fileUploadObj = (event.target).files[0];
                var ext = fileUploadObj.name.split(".")[fileUploadObj.name.split(".").length - 1];
                if (self.fileType().toString() === "1") {
                    switch (ext.toLowerCase()) {
                        case 'pdf':
                        case 'jpeg':
                        case 'jpg':
                        case 'tiff':
                        case 'tif':
                        case 'gif':
                        case 'png':
                            break;
                        default:
                            var toastrOptionss = {
                                toastrPositionClass: "toast-top-middle",
                                delayInseconds: 5,
                                fadeOut: 5,
                                typeOfAlert: "",
                                title: ""
                            };
                            Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.MessageForOnlyImageAndPdfFile, "info", null, toastrOptionss);
                            self.resetPODDOC();
                            return;
                    }
                } else if (self.fileType().toString() === "2" || self.fileType().toString() === "3") {
                    switch (ext.toLowerCase()) {
                        case 'jpeg':
                        case 'jpg':
                        case 'tiff':
                        case 'tif':
                        case 'gif':
                        case 'png':
                            break;
                        default:
                            var toastrOptions1 = {
                                toastrPositionClass: "toast-top-middle",
                                delayInseconds: 5,
                                fadeOut: 5,
                                typeOfAlert: "",
                                title: ""
                            };
                            Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.MessageForOnlyImagesFile, "info", null, toastrOptions1);
                            self.resetPODDOC();
                            return;
                    }
                } else if (self.fileType().toString() === "4" || self.fileType().toString() === "5") {
                    switch (ext.toLowerCase()) {
                        case 'pdf':
                        case 'doc':
                        case 'docx':
                        case 'rtf':
                            break;
                        default:
                            var toastrOptions2 = {
                                toastrPositionClass: "toast-top-middle",
                                delayInseconds: 5,
                                fadeOut: 5,
                                typeOfAlert: "",
                                title: ""
                            };
                            Utility.ShowToastr(refEnums.Enums.ToastrMessageType.info.ID, ApplicationMessages.Messages.MessageForOnlyPDFandWordDocument, "info", null, toastrOptions2);
                            self.resetPODDOC();
                            return;
                    }
                }
                reader.readAsDataURL(fileUploadObj);
                reader.onload = function (imgsrc) {
                    self.uploadFileContent = imgsrc.target.result;
                    self.UploadedFileName(fileUploadObj.name);
                    var item = {
                        FileContent: self.uploadFileContent,
                        FileExtension: self.UploadedFileName().split(".")[self.UploadedFileName().split(".").length - 1],
                        Description: self.UploadedFileName(),
                        FileName: self.UploadedFileName()
                    };
                    self.FileName(self.UploadedFileName().split(".")[self.UploadedFileName().split(".").length - 2]);
                    self.uploadedItem = item;
                };
            };

            // redirects to Vendor bill order page
            self.reportContainer.onGridColumnClick = function (lineItem) {
                if (self.isReadOnly()) {
                    self.resetPODDOC();
                    if (self.vendorBillPodDocDetail().length > 0) {
                        self.selectedlineitem = lineItem;
                        if (self.checkMsgDisplay) {
                            self.checkMsgDisplay = false;
                            var actionButtons = [];
                            actionButtons.push({
                                actionButtonName: "Yes",
                                actionClick: self.deleteSalesOrderPODDocList
                            });

                            actionButtons.push({
                                actionButtonName: "No",
                                actionClick: self.checkMsgClick
                            });
                            var toastrOptions1 = {
                                toastrPositionClass: "toast-top-middle",
                                delayInseconds: 0,
                                fadeOut: 0,
                                typeOfAlert: "",
                                title: "",
                                actionButtons: actionButtons
                            };

                            Utility.ShowToastr(refEnums.Enums.ToastrMessageType.warning.ID, ApplicationMessages.Messages.AreYouSureWantToRemoveThis, "warning", self.checkMsgClick, toastrOptions1, self.checkMsgHide);
                        }
                    }
                }
            };

            //Check File type is same as old file type or not
            self.disposables.push(self.fileType.subscribe(function (newValue) {
                if (self.oldFileType() !== newValue && newValue !== undefined) {
                    self.isEnableUpload(true);
                    self.isEnableBrowse(true);
                    self.UploadedFileName("");
                } else if (newValue === undefined) {
                    self.isEnableBrowse(false);
                    self.UploadedFileName("");
                } else {
                    self.isEnableUpload(false);
                    self.isEnableBrowse(false);
                    self.UploadedFileName("");
                }
            }));

            self.deleteSalesOrderPODDocList = function () {
                self.vendorBillClientCommand.deletePodDoc(self.selectedlineitem.Id, function (result) {
                    self.vendorBillPodDocDetail.remove(self.selectedlineitem);
                    self.setPagingData(ko.observableArray(self.vendorBillPodDocDetail()), self.gridOptions, self.reportAction);
                    self.checkMsgDisplay = true;
                    self.resetPODDOC();
                }, function () {
                });
            };

            self.SetBITrackChange(self);

            self.getBITrackChange = function () {
                return Utils.getDirtyItems(self);
            };

            self.disposables.push(self.isBIDirty = ko.computed(function () {
                var result = (self.getBITrackChange().length ? true : false);
                if (self.onChangesMade) {
                    self.onChangesMade(false);
                }

                return result;
            }));
        }
        //#endregion
        //#region Public Methods
        VendorBillPODDocViewModel.prototype.resetPODDOC = function () {
            var self = this;
            self.docOwner("");
            self.FileName("");
            self.fileType("");
            self.UploadedFileName("");
            self.oldFileType("");
            self.isEnableUpload(true);
            self.isEnableBrowse(false);
        };

        VendorBillPODDocViewModel.prototype.updateOrUpload = function () {
            var self = this;
            if (self.fileType() != undefined) {
                if (self.fileType().toString() === "1") {
                    self.isPOD(true);
                    self.isDocOther(false);
                    self.isBolRc(false);
                } else if (self.fileType().toString() === '2' || self.fileType().toString() === '3') {
                    self.isPOD(false);
                    self.isDocOther(false);
                    self.isBolRc(true);
                } else if (self.fileType().toString() === '4' || self.fileType().toString() === '5') {
                    self.isDocOther(true);
                    self.isPOD(false);
                    self.isBolRc(false);
                }
            }
        };

        VendorBillPODDocViewModel.prototype.onKeyUp = function () {
            var self = this;
        };

        VendorBillPODDocViewModel.prototype.initializeVendorBillPodDocDetails = function (items, proNumber, carrierId, bolNumber, vendorBillId, enable, carrierName, originZip) {
            var self = this;

            if (items != null) {
                for (var i = 0; i < items.length; i++) {
                    var document = new vendorBillPodDocDetails(items[i].UploadedPOFilePath, items[i].Description, items[i].DocOwnerDisplay, items[i].FileTypeDisplay, items[i].CreatedDateDisplay, items[i].UploadedBy, items[i].DocOwner, items[i].FileType, items[i].Id, enable);
                    self.vendorBillPodDocDetail.push(document);
                }
                self.proNumber(proNumber);
                self.carrierId(carrierId);
                self.bolNumber(bolNumber);
                self.carrierName(carrierName);
                self.originZip(originZip);
                self.setPagingData(ko.observableArray(self.vendorBillPodDocDetail()), self.gridOptions, self.reportAction);
                self.resetPODDOC();
                self.isEnableUpload(true);
                self.resetGridSelection(self);
                self.isReadOnly(enable);
                self.vendorBillId(vendorBillId);
            }
        };

        //#endregion
        //#region Internal private methods
        VendorBillPODDocViewModel.prototype.resetGridSelection = function (self) {
            window.kg.toggleSelection(false);
        };

        VendorBillPODDocViewModel.prototype.setPagingData = function (data, grid, gridOption) {
            Utils.kgSetClientsidePagination(data, gridOption, grid, undefined);
        };

        VendorBillPODDocViewModel.prototype.setGridOptions = function (self) {
            var grOption = new _reportViewer.ReportGridOption();
            grOption.enableSelectiveDisplay = false;
            grOption.showGridSearchFilter = false;
            grOption.showPageSize = true;
            grOption.UIGridID = ko.observable("SalesOrderPODDocGrid");
            grOption.data = self.reportData;
            grOption.columnDefinition = self.setGridColumnDefinitions();
            grOption.useExternalSorting = false;
            grOption.sortedColumn = {
                columnName: "noteDate",
                order: "DESC"
            };
            grOption.pageSizes = [10, 25, 50, 100];
            grOption.pageSize = 10;
            grOption.totalServerItems = 0;
            grOption.currentPage = 1;
            grOption.jqueryUIDraggable = true;
            grOption.canSelectRows = true;
            grOption.selectWithCheckboxOnly = false;
            grOption.displaySelectionCheckbox = false;
            grOption.multiSelect = false;
            grOption.enablePaging = false;
            grOption.viewPortOptions = false;
            grOption.enableSaveGridSettings = false;
            grOption.useClientSideFilterAndSort = true;
            grOption.showColumnMenu = false;
            return grOption;
        };

        VendorBillPODDocViewModel.prototype.setGridColumnDefinitions = function () {
            var viewCellTemplate = '<div style="margin:0px 3px 3px 0px;"><a target="_blank" data-bind="attr: { href: $parent.entity[\'fileUrl\']}" style="cursor: pointer">View</a></div>';
            var removeCellTemplate = '<div style="text-align:center; margin-top:7px;"><input type="image" data-bind="click: function() { $userViewModel.onGridColumnClick($parent.entity) }"  src="Content/images/Icon_Trash.png"; /></div>';
            var colDefinition;
            colDefinition = [
                { field: 'description', displayName: 'Description', sortable: false },
                { field: 'docOwner', displayName: 'Doc Owner', width: 110, sortable: false },
                { field: 'fileType', displayName: 'File Type', width: 90, sortable: false },
                { field: 'createdDate', displayName: 'Created Date', width: 140, sortable: false },
                { field: 'uploadedBy', displayName: 'Uploaded By', width: 170, sortable: false },
                { field: 'fileUrl', displayName: 'View', width: 70, sortable: false, cellTemplate: viewCellTemplate },
                { field: 'remove', displayName: 'Remove', width: 90, sortable: false, cellTemplate: removeCellTemplate }
            ];
            return colDefinition;
        };

        // Creates the Sales Order upload object for grid
        VendorBillPODDocViewModel.prototype.getSalesOrderPodDocDetails = function (self, fileURL) {
            return new vendorBillPodDocDetails(fileURL, self.FileName(), self.commonUtils.getEnumValueById(refEnums.Enums.DocumentOwner, self.docOwner()), self.commonUtils.getEnumValueById(refEnums.Enums.DocumentType, self.fileType()), Date.now(), self.currentUser().FullName);
        };

        // Gets the logged in user details from shell.js
        VendorBillPODDocViewModel.prototype.getLoggedInUserDetails = function () {
            var self = this;
            _app.trigger("GetCurrentUserDetails", function (currentUser) {
                self.currentUser(currentUser);
            });
        };

        //#endregion
        // track change detection
        VendorBillPODDocViewModel.prototype.SetBITrackChange = function (self) {
            self.FileName.extend({ trackChange: true });
        };

        VendorBillPODDocViewModel.prototype.cleanUp = function () {
            var self = this;

            //self.FileName.rules.removeAll();
            self.vendorBillPodDocDetail.removeAll();
            self.disposables.forEach(function (disposable) {
                if (disposable && typeof disposable.dispose === "function") {
                    disposable.dispose();
                } else {
                    delete disposable;
                }
            });

            self.FileName.extend({ validatable: false });

            self.reportContainer.cleanup("SalesOrderPODDocGrid");

            try  {
                delete self.vendorBillPodDocDetail;
                for (var property in self) {
                    if (property != "cleanup")
                        delete self[property];
                }

                delete self;
            } catch (exception) {
                delete self;
            }
        };
        return VendorBillPODDocViewModel;
    })();
    exports.VendorBillPODDocViewModel = VendorBillPODDocViewModel;

    // This a view model of the line notes items
    var vendorBillPodDocDetails = (function () {
        // Get the entered notes and initialize the item
        function vendorBillPodDocDetails(fileURL, strDescription, strDocOwner, strFileType, strCreatedDate, strUploadedBy, docOwnerId, fileTypeId, id, isReadOnly) {
            this.description = ko.observable();
            this.docOwner = ko.observable('');
            this.fileType = ko.observable('');
            this.createdDate = ko.observable();
            this.uploadedBy = ko.observable();
            this.docOwnerId = ko.observable(0);
            this.fileTypeId = ko.observable(0);
            var self = this;
            self.description(strDescription);
            self.docOwner(strDocOwner);
            self.fileType(strFileType);
            self.createdDate(moment(strCreatedDate).format("MM/DD/YYYY"));
            self.uploadedBy(strUploadedBy);
            self.docOwnerId(docOwnerId);
            self.fileTypeId(fileTypeId);
            self.fileUrl = fileURL;
            self.Id = id;
            self.isReadOnly = isReadOnly;
        }
        vendorBillPodDocDetails.prototype.cleanUp = function () {
            var self = this;

            for (var prop in self) {
                if (typeof self[prop].dispose === "function") {
                    self[prop].dispose();
                }
                if (prop != "cleanup")
                    delete self[prop];
            }

            delete self;
        };
        return vendorBillPodDocDetails;
    })();
    exports.vendorBillPodDocDetails = vendorBillPodDocDetails;
});
