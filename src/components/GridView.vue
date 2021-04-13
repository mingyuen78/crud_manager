<template>
  <div class="container">
    <!-- <h1>{{ title }}</h1> -->
    <DxDataGrid
      id="gridContainer"
      :data-source="datasource"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :show-borders="true"
      :cache-enabled="false"
      :word-wrap-enabled="true"
      :row-alternation-enabled="true"
      :selection="{ mode: 'single' }"
      :repaint-changes-only="true"
      @initialized="onGridInitialized"
      @selection-changed="onSelectionChanged"
    >
      <DxSorting mode="multiple" />
      <DxColumnChooser :enabled="true" mode="select" />
      <DxGrouping :context-menu-enabled="false" />
      <DxFilterPanel :visible="true" />
      <DxFilterRow :visible="true" />
      <DxHeaderFilter :visible="true" />
      <DxRemoteOperations
        :filtering="true"
        :paging="true"
        :sorting="true"
        :summary="true"
        :grouping="true"
        :group-paging="false"
      />
      <DxColumn
        v-for="(column, index) in columns"
        :key="`col${index}`"
        :caption="column.caption"
        :data-field="column.dataField"
        :allow-editing="column.allowEditing"
        :data-type="column.dataType"
        :visible="column.visible"
        :format="column.format"
      >
      </DxColumn>
      <DxEditing
        :allow-updating="true"
        :allow-deleting="true"
        :select-text-on-edit-start="selectTextOnEditStart"
        :start-edit-action="startEditAction"
        mode="batch"
      />
      <DxPaging v-bind:page-size="defaultPageSize" />
      <DxPager
        :show-info="true"
        :show-page-size-selector="true"
        :show-navigation-buttons="true"
        info-text="Page #{0}. Total: {1} ({2} Record(s))"
      />
    </DxDataGrid>
  </div>
</template>

<script>
import {
  DxDataGrid,
  DxColumn,
  DxColumnChooser,
  DxGrouping,
  DxFilterPanel,
  DxHeaderFilter,
  DxFilterRow,
  DxSorting,
  DxEditing,
  DxPaging,
  DxPager,
  DxRemoteOperations,
} from "devextreme-vue/data-grid";
import CustomStore from "devextreme/data/custom_store";

export default {
  name: "GridView",
  components: {
    DxDataGrid,
    DxColumn,
    DxColumnChooser,
    DxGrouping,
    DxFilterPanel,
    DxHeaderFilter,
    DxFilterRow,
    DxSorting,
    DxEditing,
    DxPaging,
    DxPager,
    DxRemoteOperations,
  },
  props: {
    title: String,
    select_url: String,
    update_url: String,
    delete_url: String,
    insert_url: String,
    columns: Array,
  },
  data: function () {
    return {
      startEditAction: "click",
      closeOnOutsideClick: false,
      selectTextOnEditStart: true,
      headerFilterSize: 20,
      defaultPageSize: 20,
      prevTotalCount: 0,
      datasource: new CustomStore({
        key: "id",
        load: (loadOptions) =>
          this.sendSelectRequest(this.select_url, "post", loadOptions),
        update: (key, values) =>
          this.sendCrudRequest(this.update_url, "post", key, values),
        insert: (values) =>
          this.sendCrudRequest(this.insert_url, "post", null, values),
        remove: (key) =>
          this.sendCrudRequest(this.delete_url, "post", key, null),
      }),
    };
  },
  created: function () {},
  mounted: function () {},
  methods: {
    defaultOptionOverride(_data) {
      _data.take = this.defaultPageSize;
      _data.defaultSort = [{ selector: "id", desc: 1 }];
      return _data;
    },
    onSelectionChanged({ selectedRowsData }) {
      const data = selectedRowsData[0];
      this.$emit("gridSelected", data);
    },
    onGridInitialized(e) {
      this.$emit("gridInitialized", e);
    },
    sendCrudRequest(_url, _method, _key, _values) {
      // if _key is null meaning is insert. else is delete/edit.
      // crudRequest is more dedicated because it doesnt have
      // loadOptions.
      const options = {
        method: _method,
        url: _url,
        headers: {
          "Content-Type": "application/json",
        },
        data: [{ data: _values, pk: "id", id: _key }],
      };
      console.log(options);
      return this.axios
        .request(options)
        .then(function (response) {
          console.log("response", response);
        })
        .catch(function (error) {
          console.error(error);
          return null;
        });
    },
    sendSelectRequest(_url, _method, _data) {
      const options = {
        method: _method,
        url: _url,
        headers: {
          "Content-Type": "application/json",
        },
        data: this.defaultOptionOverride(_data),
      };

      return this.axios
        .request(options)
        .then(function (response) {
          return {
            data: response.data.result,
            totalCount: response.data.totalCount,
            summary: [response.data.summary],
          };
        })
        .catch(function (error) {
          console.error(error);
          return null;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
