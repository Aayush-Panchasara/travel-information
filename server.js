require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;

const statesData = require('./states.json');

app.use(express.json());


// Get all states with districts and travel places
app.get('/api/states', (req, res) => {
    res.json(statesData);
});


app.get('/api/states/:stateName', (req, res) => {
    const stateName = req.params.stateName;
    const state = statesData.states.find(s => s.hasOwnProperty(stateName));
    const district = state[stateName]
    if (state) {
        res.json(Object.keys(district));
    } else {
        res.status(404).json({ message: 'State not found' });
    }
});

// Get a specific district's travel places
app.get('/api/states/:stateName/:districtName', (req, res) => {
    const stateName = req.params.stateName;
    const districtName = req.params.districtName.toLowerCase();
    const state = statesData.states.find(s => s.hasOwnProperty(stateName));
    
    if (state) {
        // Find the district in a case-insensitive way
        const districts = state[stateName];
        const district = Object.keys(districts).find(d => d.toLowerCase() === districtName.toLowerCase());
        
        if (district) {
            res.json(districts[district]);
        } else {
            res.status(404).json({ message: 'District not found in the specified state' });
        }
    } else {
        res.status(404).json({ message: 'State not found' });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`API running on http://localhost:${port}`);
});