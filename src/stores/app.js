import { defineStore } from "pinia";
import axios from "axios";

export const appStore = defineStore("appStore", {
  state: () => ({
    records:[],
    manufacturers:[],
    headers:[
        { title: 'Make', key: 'make' },
        { title: 'Model', key: 'model' },
        { title: 'Caliber', key: 'caliber' },
        { title: 'Action', key: 'action' },
        { title: 'Type', key: 'type' },
        { title: 'Serial Number', key: 'serialNumber' },
        { title: 'Purchase Date', key: 'purchaseDate' },
        { title: 'Sold Date', key: 'soldDate' },
    ],
    types:[
        { text: 'Rifle', value: 'Rifle' },
        { text: 'Handgun', value: 'Handgun' },
        { text: 'Shotgun', value: 'Shotgun' },
        { text: 'Miscellaneous', value: 'Miscellaneous' },
    ],
    actions:[
        { text: 'Bolt', value: 'Bolt' },
        { text: 'Lever', value: 'Lever' },
        { text: 'Pump', value: 'Pump' },
        { text: 'Semi-Auto', value: 'Semi-Auto' },
        { text: 'Single Action', value: 'Single Action' },
        { text: 'Double Action', value: 'Double Action' },
        { text: 'Break', value: 'Break' },
        { text: 'Break Over/Under', value: 'Break Over/Under' },
        { text: 'Break Side/Side', value: 'Break Side/Side' },
        { text: 'Break Single', value: 'Break Single' },
    ],
    addDialog: false,
    newRecord: {
        make: '',
        model: '',
        caliber: '',
        action: '',
        type: '',
        serialNumber: '',
        purchaseDate: 0,
        purchasePrice: 0.0,
        soldDate:0,
        priceRange:{low:0.0, high:0.0},
        itemsOfInterest:[],
        features:[],
        accessories:[],
        // photos:[],
        // buyer:[],
        disposition:''
    }
  }),
  actions: {
    getRecords(){
        axios.get('/api/records')
        .then(response => {
            console.log(response.data); 
            this.records = response.data;
        })
        .catch(error => {
            console.error('There was an error!', error);
            this.records = [];
        });
    },
    addRecord(record){
        var date = record.purchaseDate
        record.purchaseDate = new Date(date).getTime()
        return axios.post('/api/record', record)
        .then(response => {
            this.getRecords(); // Refresh the records after adding a new one
            return response;
        })
        .catch(error => {
            console.error('There was an error!', error);
            throw error;
        });
    },
    formatDate(timestamp) {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    },
    formatPrice(value) {
        if (value == null) return '';
        return `$${value.toFixed(2)}`;
    }
  },
}); 