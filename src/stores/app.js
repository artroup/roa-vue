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
        { text: 'Rifle', value: 'RIFLE' },
        { text: 'Handgun', value: 'HANDGUN' },
        { text: 'Shotgun', value: 'SHOTGUN' },
        { text: 'Miscellaneous', value: 'MISCELLANEOUS' },
    ],
    actions:[
        { text: 'Bolt', value: 'BOLT' },
        { text: 'Lever', value: 'LEVER' },
        { text: 'Pump', value: 'PUMP' },
        { text: 'Semi-Auto', value: 'SEMIAUTO' },
        { text: 'Single Action', value: 'SINGLEACTION' },
        { text: 'Double Action', value: 'DOUBLEACTION' },
        { text: 'Break', value: 'BREAK' },
        { text: 'Break Over/Under', value: 'BREAK_OVER' },
        { text: 'Break Side', value: 'BREAK_SIDE' },
        { text: 'Break Single', value: 'BREAK_SINGLE' },
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