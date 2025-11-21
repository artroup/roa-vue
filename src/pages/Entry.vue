<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card>
          <v-card-title>
            <div>
              <div class="text-h6">{{ entry.make || '—' }} {{ entry.model || '' }}</div>
              <div class="text-caption">ID: {{ entry.id || 'n/a' }}</div>
            </div>
            <v-spacer />
            <div class="text-subtitle-2">{{ entry.type?.type || entry.type || '' }}</div>
          </v-card-title>

          <v-divider />

          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>
                      <div class="font-weight-medium">Serial Number</div>
                      <div>{{ entry.serialNumber || '—' }}</div>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <div class="font-weight-medium">Caliber</div>
                      <div>{{ entry.caliber || '—' }}</div>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <div class="font-weight-medium">Action</div>
                      <div>{{ entry.action?.type || entry.action || '—' }}</div>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <div class="font-weight-medium">Purchase Date</div>
                      <div>{{ formatDate(entry.purchaseDate) || '—' }}</div>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <div class="font-weight-medium">Sold Date</div>
                      <div>{{ formatDate(entry.soldDate) || '—' }}</div>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <div class="font-weight-medium">Purchase Price</div>
                      <div>{{ formatPrice(entry.purchasePrice) || '—' }}</div>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item v-if="entry.priceRange">
                    <v-list-item-content>
                      <div class="font-weight-medium">Price Range</div>
                      <div>{{ formatRange(entry.priceRange) }}</div>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>

              <v-col cols="12" md="6">
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>
                      <div class="font-weight-medium">Disposition</div>
                      <div>{{ entry.disposition || '—' }}</div>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-content>
                      <div class="font-weight-medium">Buyer</div>
                      <div>{{ entry.buyer || '—' }}</div>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item v-if="hasList(entry.itemsOfInterest)">
                    <v-list-item-content>
                      <div class="font-weight-medium">Items Of Interest</div>
                      <div>{{ entry.itemsOfInterest.join(', ') }}</div>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item v-if="hasList(entry.features)">
                    <v-list-item-content>
                      <div class="font-weight-medium">Features</div>
                      <div>{{ entry.features.join(', ') }}</div>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item v-if="hasList(entry.accessories)">
                    <v-list-item-content>
                      <div class="font-weight-medium">Accessories</div>
                      <div>{{ entry.accessories.join(', ') }}</div>
                    </v-list-item-content>
                  </v-list-item>

                </v-list>
              </v-col>
            </v-row>

            <v-row v-if="hasList(entry.photos)" class="mt-4">
              <v-col cols="12">
                <div class="font-weight-medium mb-2">Photos</div>
                <v-row>
                  <v-col v-for="(p, i) in entry.photos" :key="i" cols="6" md="3">
                    <v-img :src="p" alt="photo" aspect-ratio="1" contain/>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn text @click="$emit('close')">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { appStore } from '@/stores/app'

const route = useRoute()
const router = useRouter()
const app = appStore()
const entry = ref(null)

const id = route.params.id

onMounted(async () => {
  if(!id) return
  // try to find in store first
  const found = app.records.find(r => String(r.id) === String(id))
  if(found){
    entry.value = found
    return
  }

  try{
    const res = await axios.get(`/api/record/${id}`)
    entry.value = res.data
  }catch(e){
    console.error(e)
  }
})

function formatDate(ts){
  if(!ts) return ''
  const n = Number(ts)
  if(Number.isNaN(n)) return String(ts)
  const date = n > 1e12 ? new Date(n) : new Date(n * 1000)
  return date.toLocaleDateString()
}

function formatPrice(p){
  if(p === undefined || p === null) return ''
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(Number(p))
}

function formatRange(r){
  if(!r) return ''
  const low = r.low ?? r.min ?? ''
  const high = r.high ?? r.max ?? ''
  return `${formatPrice(low)} — ${formatPrice(high)}`
}

function hasList(a){
  return Array.isArray(a) && a.length > 0
}

function goBack(){
  router.back()
}
</script>

<style scoped>
.font-weight-medium{font-weight:500}
</style>