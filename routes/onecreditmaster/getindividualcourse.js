import express from "express";
import Coursemaster from "./model.js";
const router = express.Router();

router.get("/:rollno", async (request, response) => {
  try {
    const rollno = request.params.rollno;
    if (!rollno) {
      return response
        .status(400)
        .send({ message: "Roll number required in the URL parameter" });
    }

    const result = await Coursemaster.findOne({ rollno: rollno }); // Use findOne instead of find
    if (!result) {
      return response.status(404).send({ message: "User not found" });
    }

    // Assuming your Coursemaster schema has properties named coursename, courseid, and completed_semester
    const { coursename, courseid, completedsemester } = result;

    return response.status(200).send({
      coursename: coursename,
      courseid: courseid,
      completedsemester: completedsemester
    });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

export default router;
