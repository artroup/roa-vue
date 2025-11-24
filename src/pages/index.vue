<template>
  <v-container>
    <v-row class="fill-height" justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-data-table :items="app.records" :headers="app.headers" @click:row="openEntry">
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
                              <v-row dense>
                                <v-col cols="12">
                                  <v-text-field label="Serial Number" v-model="app.newRecord.serialNumber" required variant="outlined"/>
                                </v-col>
                                <v-col cols="12">
                                  <v-combobox label="Manufacturer" v-model="app.newRecord.make" :items="app.manufacturers" required variant="outlined"/>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field label="Model" v-model="app.newRecord.model" required variant="outlined"/>
                                </v-col>
                                <v-col cols="12">
                                  <v-text-field label="Caliber" v-model="app.newRecord.caliber" variant="outlined"/>
                                </v-col>
                                <v-col cols="6">
                                  <v-select label="Type" v-model="app.newRecord.type" :items="app.types" item-title="text" item-value="value" variant="outlined"/>
                                </v-col>
                                <v-col cols="6">
                                  <v-select label="Action" v-model="app.newRecord.action" :items="app.actions" item-title="text" item-value="value" variant="outlined"/>
                                </v-col>
                                <v-col cols="6">
                                  <v-menu>
                                    <template v-slot:activator="{ props }">
                                      <v-text-field
                                        v-bind="props"
                                        label="Purchase Date"
                                        v-model="app.newRecord.purchaseDate"
                                        readonly
                                        variant="outlined"/>
                                    </template>
                                    <v-date-picker label="Date input" v-model="app.newRecord.purchaseDate" variant="outlined"/>
                                  </v-menu>
                                </v-col>
                                <v-col cols="6">
                                  <v-text-field label="Purchase Price" v-model="app.newRecord.purchasePrice" type="number" prefix="$" variant="outlined"/>
                                </v-col>
                                <v-col cols="6">
                                  <v-text-field label="Value High" v-model="app.newRecord.priceRange.high"  type="number" prefix="$" variant="outlined"/>
                                </v-col>
                                <v-col cols="6">
                                  <v-text-field label="Value Low" v-model="app.newRecord.priceRange.low"  type="number" prefix="$" variant="outlined"/>  
                                </v-col>
                              </v-row>
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
              <template v-slot:item.purchaseDate="{ item }">
                {{ app.formatDate(item.purchaseDate) }}
              </template>
            </v-data-table>
          </v-card-text>
        </v-card> 
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { appStore } from '@/stores/app'

const app = appStore()
const router = useRouter()

function openEntry(event, { item }){
  console.log('row clicked', item.id)
  if(item && item.id){
    router.push(`/entry/${item.id}`)
  }
}

onMounted(() => {
  app.getRecords()
})
</script>
