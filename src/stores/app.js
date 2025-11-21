import { defineStore } from "pinia";
import axios from "axios";

export const appStore = defineStore("appStore", {
  state: () => ({
    records:[],
    manufacturers:[],
    headers:[
        { text: 'Make', value: 'make' },
        { text: 'Model', value: 'model' },
        { text: 'Caliber', value: 'caliber' },
        { text: 'Action', value: 'action' },
        { text: 'Type', value: 'type' },
        { text: 'Serial Number', value: 'serialNumber' },
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
        // priceRange:{low:0.0, high:0.0},
        // itemsOfInterest:[],
        // features:[],
        // accessories:[],
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
        console.log(record)
        return axios.post('/api/record', record)
        .then(response => {
            this.getRecords(); // Refresh the records after adding a new one
            return response;
        })
        .catch(error => {
            console.error('There was an error!', error);
            throw error;
        });
    }
  },
}); 