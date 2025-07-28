

import { pipeline } from '@xenova/transformers';

let _summarizer = null;

export  async function getSummarizer() {
  if (_summarizer === null) {
    console.log('Loading DistilBART model...');
    _summarizer = await pipeline('summarization', 'Xenova/distilbart-cnn-12-6');
  }
  return _summarizer;
}


let featureExtractor=null;


export async function initModel() {
    if (!featureExtractor) {
        console.log("🚀 Loading MiniLM embedding model...");
        featureExtractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
        console.log("✅ MiniLM model loaded.");
    }
    return featureExtractor;
}


let _classifier=null;
export  async function getTopicClassifier() {
  if (_classifier === null) {
    console.log('Loading classifier DistilBART model...');
   _classifier = await pipeline('zero-shot-classification', 'Xenova/distilbert-base-uncased-mnli');



  }
  return _classifier;
}



let _regionClassifier=null;

export  async function getRegionClassifier() {
  if (_regionClassifier === null) {
    console.log('Loading classifier DistilBART model...');
   _regionClassifier = await pipeline('ner', 'Xenova/bert-base-NER');



  }
  return _regionClassifier;
}




let _sentiment = null;

export async function getSentimenter() {
  if (_sentiment === null) {
    console.log("🌀 Loading RoBERTa Sentiment model…");
    try {
      _sentiment = await pipeline(
        "sentiment-analysis",
        "Xenova/twitter-roberta-base-sentiment-latest"
      );
      // >>> Sanity check: is it really a function?
      if (typeof _sentiment !== "function") {
        console.error("❌ Pipeline loaded, but did NOT return a function!");
      } else {
        console.log("✅ Sentimenter loaded and ready!");
      }
    } catch (error) {
      console.error("❌ Error loading sentiment model:", error);
    }
  }
  return _sentiment;
}