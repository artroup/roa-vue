<template>
  <v-container>
    <v-row class="fill-height" justify="center">
      <v-col cols="auto">
        <v-card>
          <v-card-text>
            <v-data-table :items="app.records" :headers="app.headers">
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Record of Arms</v-toolbar-title>
                  <v-dialog max-width="75%">
                    <template v-slot:activator="{ props: activatorProps }">
                      <v-btn
                        v-bind="activatorProps"
                        class="me-2"
                        prepend-icon="mdi-plus"
                        rounded="lg"
                        border
                        text="Add Arm"/>
                      </template>
                      <template v-slot:default="{ isActive }">
                        <v-card title="Enter New Entry">
                          <v-card-text>
                            <v-form>
                              <v-text-field label="Serial Number" v-model="app.newRecord.serialNumber" required/>
                              <v-combobox label="Manufacturer" v-model="app.newRecord.make" :items="app.manufacturers" required/>
                              <v-text-field label="Model" v-model="app.newRecord.model" required/>
                              <v-text-field label="Caliber" v-model="app.newRecord.caliber"/>
                              <v-select label="Type" v-model="app.newRecord.type" :items="app.types" item-title="text" item-value="value"/>
                              <v-select label="Action" v-model="app.newRecord.action" :items="app.actions" item-title="text" item-value="value"/>
                            </v-form>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer/>
                            <v-btn text @click="isActive.value = false">Cancel</v-btn>
                            <v-btn text @click="app.addRecord(app.newRecord); isActive.value = false">Save</v-btn>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-dialog>
                </v-toolbar>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card> 
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import {onMounted} from 'vue'
  import { appStore } from '@/stores/app' 

  const app = appStore()

  onMounted(() => {
    app.getRecords()
  })
</script>
