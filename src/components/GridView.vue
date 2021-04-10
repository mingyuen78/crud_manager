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
    </DxDataGrid>
  </div>
</template>

<script>
var URL;
if (window.location.href.indexOf("localhost") == -1) {
  //live.
  URL = "https://carnival.shopperplus.com.my";
} else {
  URL = "http://localhost:8000";
}

import {
  DxDataGrid,
  DxColumn,
  DxColumnChooser,
  DxGrouping,
  DxFilterPanel,
  DxHeaderFilter,
  DxFilterRow,
  DxSorting,
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
    DxRemoteOperations,
  },
  props: {
    title: String,
    controller: String,
    columns: Array,
  },
  data: function () {
    return {
      currentLoadType: "grid",
      headerFilterSize: 20,
      defaultPageSize: 150,
      prevTotalCount: 0,
      datasource: new CustomStore({
        key: "id",
        load: (loadOptions) =>
          this.sendRequest(
            `${URL}/${this.controller}/dg_select`,
            "post",
            loadOptions
          ),
        update: (key, values) => {
          console.log(key, values);
        },
        remove: (key, values) => {
          console.log(key, values);
        },
      }),
    };
  },
  created: function () {},
  mounted: function () {},
  methods: {
    defaultOptionOverride(_data) {
      _data.defaultSort = [{ selector: "id", desc: 1 }];
      return _data;
    },
    sendRequest(_url, _method, _data) {
      console.log("Sending Config Request", _data);
      let _this = this;
      const options = {
        method: _method,
        url: _url,
        headers: {
          "Content-Type": "application/json",
        },
        data: this.defaultOptionOverride(_data),
      };
      _this.prevFilter = _data;
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
