<template>
  <div class="app-container">
    <DxTabPanel
      ref="dxTab"
      :data-source="tabs"
      :loop="loop"
      :animation-enabled="animationEnabled"
      :swipe-enabled="swipeEnabled"
      v-bind:selected-index="tabIndex"
      @selection-changed="onSelectionChanged"
    >
      <template #title="{ data: tab }">
        <span class="tabpanel-label">{{ tab.title }}</span>
      </template>
      <template #item="{ data: tab }">
        <div class="tabpanel-item">
          <div>
            <GridView
              v-if="tab.index == 0"
              ref="dxGridView"
              @gridInitialized="getGridInstance"
              :columns="tab.columns"
              :controller="tab.controller"
              :select_url="select_url"
              :delete_url="delete_url"
              :update_url="update_url"
              :insert_url="insert_url"
              @gridSelected="onGridSelected"
            />
            <FormView
              v-if="tab.index == 1"
              :columns="tab.columns"
              :update_url="update_url"
              :insert_url="insert_url"
              v-bind:editables="selectedGridData"
              @onSubmitted="onFormSubmitted"
            />
          </div>
        </div>
      </template>
    </DxTabPanel>
  </div>
</template>

<script>
import DxTabPanel from "devextreme-vue/tab-panel";
import GridView from "../components/GridView";
import FormView from "../components/FormView";

var BASEURL;
if (window.location.href.indexOf("localhost") == -1) {
  //live.
  BASEURL = "https://sample.somesite.com";
} else {
  BASEURL = "http://localhost:8090";
}

export default {
  name: "GameTypePage",
  components: {
    DxTabPanel,
    GridView,
    FormView,
  },
  computed: {},
  data: function () {
    return {
      dataGridInstance: null,
      select_url: `${BASEURL}/game_type/dg_select`,
      update_url: `${BASEURL}/game_type/dg_update`,
      delete_url: `${BASEURL}/game_type/dg_delete`,
      insert_url: `${BASEURL}/game_type/dg_insert`,
      swipeEnabled: false,
      animationEnabled: false,
      popupVisible: false,
      loop: false,
      tabs: [
        {
          index: 0,
          title: "Game Type",
          controller: "game_type",
          columns: [
            {
              dataField: "id",
              caption: "Id",
              allowEditing: true,
              visible: false,
              dataType: "number",
            },
            {
              dataField: "game_type_name",
              caption: "Name",
              allowEditing: true,
              visible: true,
              dataType: "string",
            },
            {
              dataField: "game_type_description",
              caption: "Description",
              allowEditing: true,
              visible: true,
              dataType: "string",
            },
            {
              dataField: "created_by",
              caption: "Created By",
              allowEditing: false,
              visible: false,
              dataType: "string",
            },
            {
              dataField: "updated_by",
              caption: "Updated By",
              allowEditing: false,
              visible: true,
              dataType: "string",
            },
            {
              dataField: "created_date",
              caption: "Created Date",
              allowEditing: false,
              visible: false,
              dataType: "string",
            },
            {
              dataField: "updated_date",
              caption: "Updated Date",
              allowEditing: false,
              visible: true,
              dataType: "string",
            },
          ],
        },
        {
          index: 1,
          title: "Add/Edit Form",
          controller: "game_type",
          columns: [
            {
              dataField: "id",
              caption: "Id",
              allowEditing: false,
              visible: false,
              editorType: "dxNumberBox",
              isRequired: false,
              validation: null,
              checkRuleURL: null,
            },
            {
              dataField: "game_type_name",
              caption: "Type Name",
              allowEditing: true,
              visible: true,
              editorType: "dxTextBox",
              isRequired: true,
              validation: [
                { type: "required", message: "Type Name is required." },
              ],
              checkRuleURL: null,
            },
            {
              dataField: "game_type_description",
              caption: "Description",
              allowEditing: true,
              visible: true,
              editorType: "dxTextBox",
              isRequired: true,
              validation: [
                { type: "required", message: "Description is required." },
              ],
              checkRuleURL: null,
            },
            {
              dataField: "created_by",
              caption: "Created By",
              allowEditing: false,
              visible: true,
              editorType: "dxTextBox",
              isRequired: false,
              validation: null,
              checkRuleURL: null,
            },
            {
              dataField: "updated_by",
              caption: "Updated By",
              allowEditing: false,
              visible: true,
              editorType: "dxTextBox",
              isRequired: false,
              validation: null,
              checkRuleURL: null,
            },
            {
              dataField: "created_date",
              caption: "Created Date",
              allowEditing: false,
              visible: true,
              editorType: "dxDateBox",
              isRequired: false,
              validation: null,
              checkRuleURL: null,
            },
            {
              dataField: "updated_date",
              caption: "Updated Date",
              allowEditing: false,
              visible: true,
              editorType: "dxDateBox",
              isRequired: false,
              validation: null,
              checkRuleURL: null,
            },
          ],
        },
      ],
      selectedTabData: null,
      selectedGridData: {},
      tabIndex: 0,
    };
  },
  created() {
    this.selectedTabData = this.tabs[this.selectedIndex];
  },
  mounted() {},
  methods: {
    onSelectionChanged(evt) {
      this.selectedIndex = evt.component.option("selectedIndex");
      this.selectedTabData = this.tabs[this.selectedIndex];
      this.tabIndex = this.selectedIndex;
      if (this.tabIndex == 0) {
        this.selectedGridData = {};
      }
    },
    onGridSelected(evt) {
      this.selectedGridData = evt;
      this.tabIndex = 1;
    },
    onFormSubmitted() {
      this.tabIndex = 0;
      this.dataGridInstance.refresh();
    },
    getGridInstance(e) {
      this.dataGridInstance = e.component;
    },
  },
};
</script>
<style scoped>
.container {
  padding: 1em;
}
</style>
