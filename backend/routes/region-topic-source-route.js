import { Router } from "express";
import { getTopicList,getRegionList,getSourceList } from "../controllers/region-source-topic-controller.js";
const router = Router();



router.get("/topicList", getTopicList);
router.get("/regionList",getRegionList);
router.get("/sourceList",getSourceList);

export {router as topic_source_region_list_router  };