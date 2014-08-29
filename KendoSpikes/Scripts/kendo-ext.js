/* File Created: August 28, 2014 */
$(function () {
    // create the MultiSelectGridFilter widget
    var ui = kendo.ui, Widget = ui.Widget;
    var MultiSelectGridFilter = Widget.extend({
        init: function (element, options) {
            var that = this;
            Widget.fn.init.call(that, element, options);

            var id,
                listView,
                filterPanel,
                filterButtonPanel,
                resultsPanel,
                plugin;

            that.element.append('<div style="margin-bottom:4px;"><input type="checkbox" class="select-all-checkbox" />&nbsp;<b>All</b><hr style="background-color: #cccccc; border: 0 none; height:1px; margin-bottom:8px;"></div>');
            that.element.append('<div class="list-view" style="overflow:auto;max-height:300px;padding-right:2px;border-width:0px;"></div>');
            that.element.append('<div style="width:140px;"><button class="k-button k-primary filter-button" style="width:40%;">Filter</button> <button class="k-button clear-button" style="width:40%;">Clear</button></div>');

            that.element.find('.select-all-checkbox').click(function () {
                var state = $(this).is(':checked');
                that.element.find('.list-view input').each(function () {
                    log('checking....!');
                    this.checked = state;
                });
            });

            that.element.find('.clear-button').click(function () {
                // remove the current filter
                var gridFilter = that.removeCurrentFilter();

                that.element.find('.list-view input').each(function () {
                    this.checked = false;
                });

                options.gridDataSource.filter(gridFilter);
            });

            that.element.find('.filter-button').click(function () {
                var selectedIds = [];
                var filterCriteria = { logic: "or", filters: [] };

                that.element.find('.list-view input:checked').each(function () {
                    //$("#" + listViewId + " input:checked").each(function () {
                    selectedIds.push(this.value);
                    filterCriteria.filters.push({
                        field: options.field,
                        operator: "eq",
                        value: this.value
                    });
                });

                // remove the current filter
                var gridFilter = that.removeCurrentFilter();

                // add the new filter
                var filters = null;
                var moreThanOneFilter = false;
                if (gridFilter) {
                    filters = gridFilter.filters;
                    if (filters) {
                        if (typeof filters[0].filters != 'undefined') {
                            moreThanOneFilter = true;
                        }
                    }
                }

                if (filterCriteria.filters.length > 0) {
                    var newFilters = null;
                    if (gridFilter) {
                        if (moreThanOneFilter) {
                            newFilters = gridFilter;
                            newFilters.filters.push(filterCriteria);
                        } else {
                            newFilters = {
                                filters: [gridFilter],
                                logic: "and"
                            }
                            newFilters.filters.push(filterCriteria);
                        }
                    } else {
                        newFilters = {
                            filters: [filterCriteria],
                            logic: "and"
                        }
                    }
                    options.gridDataSource.filter(newFilters);
                } else {
                    options.gridDataSource.filter(gridFilter);
                }

                var filterIcon = $("[data-field='" + options.field + "'] > .k-grid-filter");
                filterIcon.addClass('k-state-active');
            });

            that.listView = that.element.find('.list-view').kendoListView({
                dataSource: options.checkBoxListDataSource,
                template: '<div style="margin-bottom:3px; vertical-align:top;"><input type="checkbox" value="#:Id#" />&nbsp;#:Value#</div>'
            }).data("kendoListView");

            that.removeCurrentFilter = function () {
                var filter = options.gridDataSource.filter();
                that.removeFilterCriteria(filter, options.field)
                that.removeEmptyFilterArrays(filter, true);
                if (filter && (filter.filters != 'undefined') && (filter.filters.length == 0)) {
                    filter = null;
                }
                return filter;
            };

            that.removeFilterCriteria = function (filter, field) {
                if ((typeof filter == 'undefined') || (filter == null))
                    return;

                if (typeof filter.filters != 'undefined') {
                    that.removeFilterCriteria(filter.filters, field);
                } else {
                    for (var x = filter.length - 1; x >= 0; x--) {
                        if (typeof filter[x].field != 'undefined') {
                            if (filter[x].field == field) {
                                filter.splice(x, 1);
                            }
                        } else if (typeof filter[x].filters != 'undefined') {
                            that.removeFilterCriteria(filter[x].filters, field);
                        }
                    }
                }
            };

            that.removeEmptyFilterArrays = function (filter, isRoot) {
                if (!filter)
                    return;

                if (isRoot) {
                    if (typeof filter.filters != 'undefined') {
                        if (filter.filters.length > 0) {
                            for (var x = filter.filters.length - 1; x >= 0; x--) {
                                if (typeof filter.filters[x].filters != 'undefined') {
                                    if (filter.filters[x].filters.length == 0) {
                                        filter.filters.splice(x, 1);
                                    } else {
                                        that.removeEmptyFilterArrays(filter.filters[x].filters, false);
                                    }
                                }
                            }
                        }
                    }
                } else {
                    for (var x = filter.length - 1; x >= 0; x--) {
                        if (typeof filter[x].filters != 'undefined') {
                            if (filter[x].filters.length == 0) {
                                filter.splice(x, 1);
                            } else {
                                that.removeEmptyFilterArrays(filter[x].filters, false);
                            }
                        }
                    }
                }
            };
        },

        options: {
            name: "MultiSelectGridFilter"
        }
    });

    ui.plugin(MultiSelectGridFilter);

});