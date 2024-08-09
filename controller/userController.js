const staffModel = require(`../model/userModel`)
const mongoose = require(`mongoose`)



exports.createStaff = async (req, res) => {
    try {
      const { fullName, age, maritalStatus, address, gender, academicQualification, stateOfOrigin } = req.body;
  
      const data = {
        fullName:fullName.trim(),
        age,
        maritalStatus,
        address,
        gender,
        academicQualification,
        stateOfOrigin,
      };
      const newStaff = await staffModel.create(data);
      res.status(201).json({ message: `New Staff created successfully.`, data: newStaff });
    } catch (error) {
      res.status(500).json(error.message);}
  };


exports.getAllStaff = async(req,res)=>{
    try {
        const allStaff = await staffModel.find()
    res.status(200).json({message:`Kindly find the information of the ${allStaff.length} staff below:`,data:allStaff})
    } catch (error) {
     res.status(500).json(error.message)   
    }
}

exports.getOneStaff = async (req, res) => {
    try {
      let id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format.' });
      }
      const getStaff = await staffModel.findById(id);
      if (!getStaff) {
        return res.status(400).json(`Staff with ID: ${id} not found.`);
      } else {
      res.status(200).json({ message: `Kindly find the information for the Staff with ID: ${id} below.`, getStaff });
    }} catch (error) {
      res.status(500).json(error.message);
    }
  };

exports.updateStaffInfo = async (req, res) => {
    try {
      let id = req.params.id;
      const { maritalStatus, address, academicQualification} = req.body;
      const data = { 
        maritalStatus, 
        address,
        academicQualification };

      const updateStaff = await staffModel.findByIdAndUpdate(id, data, { new: true });
      res.status(200).json({ message: `The update for ${updateStaff.fullName}, has been completed successfully.`, updateStaff });
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

exports.replaceOneStaff = async (req, res) => {
    try {
      let id = req.params.id;
     const { fullName, age, maritalStatus, address, gender, academicQualification, stateOfOrigin } = req.body;

     const data = {
        fullName,
        age,
        maritalStatus,
        address,
        gender,
        academicQualification,
        stateOfOrigin,
      };
      const replaceStaff = await staffModel.findByIdAndUpdate(id, data, { new: true, overwrite: true});
      res.status(200).json({ message: `The old staff has been replaced with the new staff ${replaceStaff.fullName} successfully.`, replaceStaff });
    } catch (error) {
      res.status(500).json(error.message);
    }
  };


exports.TimeIn = async (req, res) => {
  try {
    const { fullName, age } = req.body;
    const checkIn = await staffModel.findOne({ fullName });
    if (!checkIn) {
      return res.status(404).json({ message: 'Name does not match a staff in Dangote Sugar.' });
    }
    if (checkIn.age != age) {
      return res.status(400).json({ message: 'The age provided is incorrect.' });
    } else {
      const signInTime = new Date().toLocaleTimeString() +" by "+ new Date().toLocaleDateString()
     
      checkIn.signInTime = signInTime
      await checkIn.save();
      return res.status(200).json({
        message: `Dear ${checkIn.fullName}, your check-in time has been logged successfully.`,
        signInTime: signInTime
      });
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

exports.TimeOut = async (req, res) => {
    try {
        const { fullName, age } = req.body;
        const checkOut = await staffModel.findOne({ fullName });

        if (!checkOut) {
            return res.status(404).json({ message: 'Name does not match a staff in Dangote Sugar.' });
        }

        if (checkOut.age != age) {
            return res.status(400).json({ message: 'The age provided is incorrect.' });
        } else {
        const signOutTime = new Date().toLocaleTimeString()
        checkOut.signOutTime = signOutTime
        await checkOut.save()
            return res.status(200).json({
                message: `Dear ${checkOut.fullName}, your sign-out time has been logged successfully.`,
                signOutTime: signOutTime
            });
        }
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

exports.getTimeIn = async (req, res) => {
    try {
        const { id } = req.params;
        const getTime = await staffModel.findById(id, 'signInTime');

        if (!getTime) {
            return res.status(404).json({ message: 'Staff not found.' });
        }

       return res.status(200).json({message: `Check in time for Staff with ID: ${id} is`,signInTime: getTime.signInTime});
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

exports.getTimeOut = async (req, res) => {
    try {
        const { id } = req.params;
        const getTime = await staffModel.findById(id, 'signOutTime');

        if (!getTime) {
            return res.status(404).json({ message: 'Staff not found.' });
        }

        return res.status(200).json({message: `Sign out time for Staff with ID: ${id} is`,signOutTime: getTime.signOutTime});
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

