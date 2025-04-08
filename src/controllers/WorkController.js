const { Work } = require("../models");

exports.getWorks = async (req, res) => {
  try {
    const works = await Work.findAll();
    res.json(works);
  } catch (error) {
    res.status(500).json({ error: "Error fetching works" });
  }
};

exports.createWork = async (req, res) => {
  try {
    const {
      id,
      workName,
      department,
      location,
      status,
      sanctionType,
      date,
      userId,
    } = req.body;
    const work = await Work.create({
      id,
      workName,
      department,
      location,
      status,
      sanctionType,
      date,
      userId,
    });
    res.status(201).json(work);
  } catch (error) {
    res.status(500).json({ error: "Error creating work" });
  }
};
