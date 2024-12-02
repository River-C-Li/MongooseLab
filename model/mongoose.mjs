import mongoose from "mongoose";

// Create a GET route at /grades/stats
// Within this route, create an aggregation pipeline that returns the following information:
router.get("/grades/stats", async (req, res) => {
    let collection = await db.collection("grades");
    let result = await collection
      .aggregate([
  // The number of learners with a weighted average (as calculated by the existing routes) higher than 70%.
  {$match: { "avg": { $gt: 70 } } },
  {$count:"numberOfgt70"}, ]);
  
  // The total number of learners.
  ([
    {$count:"numberOfLearners"}, ]);
  
  // The percentage of learners with an average above 70% (a ratio of the above two outputs).
  ([
    { $project: {  "percentOFgt70": { $divide: ["$numberOfgt70", "$numberOfLearners"] }
      }
  }
  ]);
  return result
  });


  
// use mongoose to Create the following validation rules on the grades collection:
// Each document must have a class_id field, which must be an integer between 0 and 300, inclusive.
    const learnerSchema = new mongoose.Schema({
          class_id:{
            type: "int",
            min: 0,
            max: 300,
            message: "class_id is required and must be an integer between 0 and 300, inclusive."
          },
  // Each document must have a learner_id field, which must be an integer greater than or equal to 0.
          learner_id:{
            type: "int",
            min: 0,
            message: "learner_id is required and must be an integer greater than or equal to 0."
          }
        },    
  // Change the validation action to "warn."
      validationAction: "warn";

   // Within this route, mimic the above aggregation pipeline, but only for learners within a class that has a class_id equal to the specified :id.
  // Create a single-field index on class_id.
  learnerSchema.index({ class_id: 1});
  // Create a single-field index on learner_id.
  learnerSchema.index({ learner_id: 1});
  // Create a compound index on learner_id and class_id, in that order, both ascending.
  learnerSchema.index({ learner_id: 1,  class_id: 1});
 ),


export default mongoose.model("learner", learnerSchema);



