<template>
  <div class="container">
    <DxForm
      ref="dxform"
      v-bind:form-data="editables"
      :on-content-ready="validateForm"
      class="gap"
    >
      <DxItem
        v-for="(column, index) in columns"
        :key="`col${index}`"
        :data-field="column.dataField"
        :data-type="column.dataType"
        :is-required="column.isRequired"
        :visible="column.visible"
        :disabled="!column.allowEditing"
        :label="{ text: column.caption }"
        :editor-type="column.editorType"
        :validation-rules="column.validation"
        :editor-options="column.editorOptions"
        :items="column.items"
      >
      </DxItem>
    </DxForm>
    <DxButton
      :width="120"
      name="Submit"
      text="Submit"
      type="normal"
      styling-mode="primary"
      @click="onSubmitClick($event)"
    />
  </div>
</template>

<script>
import { DxForm, DxItem } from "devextreme-vue/form";
import "devextreme-vue/text-area";
import DxButton from "devextreme-vue/button";
import moment from "moment";

export default {
  name: "FormView",
  components: {
    DxButton,
    DxForm,
    DxItem,
  },
  props: {
    controller: String,
    columns: Array,
    update_url: String,
    insert_url: String,
    editables: {
      id: "",
      game_type_name: "",
      game_type_description: "",
      created_by: "",
      updated_by: "",
      created_date: moment().format("YYYY-MM-DD hh:mm:ss"),
      updated_date: moment().format("YYYY-MM-DD hh:mm:ss"),
    },
  },
  computed: {},
  mounted() {},
  data: function () {
    return {};
  },
  methods: {
    onSubmitClick() {
      if (this.$refs["dxform"].instance.validate().isValid) {
        if (this.editables.id != "") {
          //Edit Mode
          this.sendCrudRequest(
            this.update_url,
            "post",
            this.editables.id,
            this.editables
          );
        } else {
          this.sendCrudRequest(this.insert_url, "post", null, this.editables);
        }
      }
    },
    validateForm(e) {
      e.component.validate();
    },
    sendCrudRequest(_url, _method, _key, _values) {
      let _this = this;
      const options = {
        method: _method,
        url: _url,
        headers: {
          "Content-Type": "application/json",
        },
        data: [{ data: _values, pk: "id", id: _key }],
      };
      return this.axios
        .request(options)
        .then(function (response) {
          _this.$emit("onSubmitted", response);
        })
        .catch(function (error) {
          console.error(error);
          return null;
        });
    },
  },
};
</script>

<style>
.gap {
  margin-bottom: 15px;
}
</style>