import Region from "../models/Region.js";
import Topic from "../models/Topic.js";
import Source from "../models/Source.js";
export async function getTopicList(req, res) {
    try{
        const topicList = await Topic.find();
        res.json(topicList);
    }
    catch(err){
        console.log(err);
        res.status(500).json("Failed to get  topicList");
    }
}


export async function getSourceList(req, res) {
    try{
        const sourceList = await Source.find();
        res.json(sourceList);
    }
    catch(err){
        console.log(err);
        res.status(500).json("Failed to get  sourceList");
    }
}


export async function getRegionList(req, res) {
    try{
        const regionList = await Region.find();
        res.json(regionList);
    }
    catch(err){
        console.log(err);
        res.status(500).json("Failed to get regionList");
    }
}
