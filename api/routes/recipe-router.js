const Recipe = require('../recipe-schema.js');
const mongoose = require('mongoose');
const ReadAll = (app) => {
    app.get('/api/recipes', async (req, res) => {
        try{
            const data = await Recipe.find({});
            if(data) res.json(data);  
        }
        catch(err)
        {
            res.err(err);
        }
    })
}
const ReadAllByIngredient = (app) => {
    app.get('/api/recipes/ingredient/:name', async (req,res) => {
        try{
            const data = await Recipe.find("Ingredients.Name", req.params.name);
            if(data) res.json(data);
            else res.json("No Matches");
        }
        catch(err)
        {
            res.err(err);
        }
    })
}
const ReadOneByName = (app) => {
    app.get('/api/recipes/:name', async (req,res) => {
        try{
            const data = await Recipe.find({Name: req.params.name});
            if(data) res.json(data);
            else res.json("No Matches");
        }
        catch(err){
            res.err(err);
        }
    })
}
const Create = (app) => {
    app.post('/api/recipes', async (req,res) => {
        let data = req.body;
        let imageBuffer = Buffer.from(data.Image, 'base64');
        const newRecipe = new Recipe({Name: data.Name, Type: data.Type, Image: imageBuffer, Ingredients: data.Ingredients});
        await newRecipe.save().catch(err => res.err(err));
        res.sendStatus(200);
    })
}

module.exports = {
    ReadAll,
    ReadAllByIngredient,
    ReadOneByName,
    Create,
}