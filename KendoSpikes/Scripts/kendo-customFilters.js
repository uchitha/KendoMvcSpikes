var MyMvcApp = MyMvcApp || {}

/**
Namespace for customized kendo filters to be used in grids
*/
MyMvcApp.customKendoFilters = (function() {
    var _configuration = [];

    $(function() {
        var vehicleStatusFilters = [];
        vehicleStatusFilters["Location"] = { url: "_Locations"};
        vehicleStatusFilters["Type"] = { url: "_Types"};

        _configuration["VehicleStatus"] = {
            grid: "GridVehicles",
            filters: vehicleStatusFilters
        }

    });

    return {
        filterByAjax: createMultiSelectCheckBoxFilterViaAjax,
        filter: createMultiSelectCheckBoxFilter
    };
   
    setConfig: function setConfig(configObject) {
        _configuration = configObject;
    }

    function createMultiSelectCheckBoxFilter(element, field, filterData, dataSource) {
        element.removeAttr('data-bind');
        var filterMenu = $(element).closest('.k-filter-menu');
        filterMenu.html('<div class="filter-div"></div>');
        var filterDiv = filterMenu.find('.filter-div');

        var checkBoxDataSource = new kendo.data.DataSource({
            data: filterData
        });

        checkBoxDataSource.sort({ field: "Value", dir: "asc" });

        filterDiv.kendoMultiSelectGridFilter({
            field: field,
            checkBoxListDataSource: checkBoxDataSource.view(),
            gridDataSource: dataSource
        });
    }

    function createMultiSelectCheckBoxFilterViaAjax(element, field, url, dataSource) {
        element.removeAttr('data-bind');
        var filterMenu = $(element).closest('.k-filter-menu');
        filterMenu.html('<div class="filter-div"></div>');
        var filterDiv = filterMenu.find('.filter-div');

        var checkBoxData = [];

        var request = $.ajax({
            url: url
        });

        request.done(function (data) {
            $.each(data, function (i, e) {
                checkBoxData.push({ Id: data[i].Id, Value: data[i].Value });
            });
            var checkBoxDataSource = new kendo.data.DataSource({
                data: checkBoxData
            });

            checkBoxDataSource.sort({ field: "Value", dir: "asc" });

            filterDiv.kendoMultiSelectGridFilter({
                field: field,
                checkBoxListDataSource: checkBoxDataSource.view(),
                gridDataSource: dataSource
            });
        });
    };

   

})();







//Common function
