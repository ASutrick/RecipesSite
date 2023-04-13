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
            res.sendStatus(500);
        }
    })
}
const ReadAllByIngredient = (app) => {
    app.get('/api/recipes/ingredient/:name', async (req,res) => {
        try{
            const data = await Recipe.find({"Ingredients.Name": req.params.name});
            if(data) res.json(data);
            else res.json("No Matches");
        }
        catch(err)
        {
            res.sendStatus(500);
        }
    })
}
const ReadAllByType = (app) => {
    app.get('/api/recipes/type/:type', async (req,res) => {
        try{
            const data = await Recipe.find({ Type: req.params.type });
            if(data) res.json(data);
            else res.json("No Matches");
        }
        catch(err)
        {
            res.sendStatus(500);
        }
    })
}
const ReadOneByName = (app) => {
    app.get('/api/recipes/name/:name', async (req,res) => {
        try{
            const data = await Recipe.find({Name: req.params.name});
            if(data) res.json(data);
            else res.json("No Matches");
        }
        catch(err){
            res.sendStatus(500);
        }
    })
}
const ReadOneByID = (app) => {
    app.get('/api/recipes/:id', async (req,res) => {
        try{
            const data = await Recipe.find({_id: req.params.id});
            if(data) res.json(data);
            else res.json("No Matches");
        }
        catch(err){
            res.sendStatus(500);
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
const Update = (app) => {
    app.put('/api/recipes/:id', async (req,res) => {
        const newData = req.body;
        const resp = await Recipe.updateOne({_id: req.params.id}, {Name: newData.Name, Type: newData.Type, Ingredients: newData.Ingredients});
        if(!resp.acknowledged){
           res.sendStatus(500) 
        }
        res.sendStatus(200);
    })
}
const UpdateWithImage = (app) => {
    app.put('/api/recipes/with-image/:id', async (req,res) => {
        const newData = req.body;
        const newImage = Buffer.from(newData.Image, 'base64');
        const resp = await Recipe.updateOne({_id: req.params.id}, {Name: newData.Name, Type: newData.Type, Image: newImage, Ingredients: newData.Ingredients});
        if(!resp.acknowledged){
            res.sendStatus(500) 
        }
        res.sendStatus(200);
    })
}
const Delete = (app) => {
    app.delete('/api/recipes/:id', async (req,res) => {
    try{
        await Recipe.deleteOne({_id: req.params.id})
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
    res.sendStatus(200);
    })
}

module.exports = {
    ReadAll,
    ReadAllByIngredient,
    ReadAllByType,
    ReadOneByName,
    Create,
    ReadOneByID,
    Update,
    UpdateWithImage,
    Delete,
}