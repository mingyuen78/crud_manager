<template>
  <div class="app-container">
    <DxTabPanel
      :data-source="tabs"
      :loop="loop"
      :animation-enabled="animationEnabled"
      :swipe-enabled="swipeEnabled"
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
              :columns="tab.columns"
              :controller="tab.controller"
            />
            <div v-if="tab.index == 1" id="form" class="container">
              <h3>Add/Edit Form</h3>
            </div>
          </div>
        </div>
      </template>
    </DxTabPanel>
  </div>
</template>

<script>
import DxTabPanel from "devextreme-vue/tab-panel";
import GridView from "../components/GridView";

export default {
  name: "MasterPage",
  components: {
    DxTabPanel,
    GridView,
  },
  computed: {},
  data: function () {
    return {
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
              allowEditing: false,
              visible: false,
              dataType: "number",
            },
            {
              dataField: "gameTypeName",
              caption: "Name",
              allowEditing: true,
              visible: true,
              dataType: "string",
            },
            {
              dataField: "gameTypeDescription",
              caption: "Description",
              allowEditing: true,
              visible: true,
              dataType: "string",
            },
            {
              dataField: "createdBy",
              caption: "Created By",
              allowEditing: false,
              visible: false,
              dataType: "string",
            },
            {
              dataField: "updatedBy",
              caption: "Updated By",
              allowEditing: false,
              visible: false,
              dataType: "string",
            },
            {
              dataField: "createdDate",
              caption: "Created Date",
              allowEditing: false,
              visible: false,
              dataType: "string",
            },
            {
              dataField: "updatedDate",
              caption: "Updated Date",
              allowEditing: false,
              visible: false,
              dataType: "string",
            },
          ],
        },
        {
          index: 1,
          title: "Add/Edit Form",
          controller: "game_type",
          columns: [],
        },
      ],
      selectedData: null,
    };
  },
  created() {
    this.selectedData = this.tabs[this.selectedIndex];
  },
  mounted() {},
  methods: {
    onSelectionChanged(evt) {
      this.selectedIndex = evt.component.option("selectedIndex");
      this.selectedData = this.tabs[this.selectedIndex];
    },
  },
};
</script>
<style scoped>
.container {
  padding: 1em;
}
</style>
