const Outpass = require('../models/Outpass');
const User = require('../models/User');

exports.requestOutpass = async (req, res) => {
  const { userId, outDate, returnDate, reason, destination } = req.body;
  console.log('Request outpass:', req.body)
  try {
    const user = await User.findById(userId);
    if (!user || user.role !== 'student') {
      return res.status(400).json({ message: 'Invalid user or user is not a student' });
    }

    const outpass = new Outpass({ student: userId, outDate, returnDate, reason, destination });
    await outpass.save();
    res.status(201).json({ message: 'Outpass requested successfully!', outpass });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.handleOutpass = async (req, res) => {
  const { userId, role } = req.user;
  const { outpassId, status, comment } = req.body;

  try {
    const outpass = await Outpass.findById(outpassId);
    if (!outpass) {
      return res.status(404).json({ message: 'Outpass not found' });
    }

    if (role !== 'warden') {
      return res.status(403).json({ message: 'Only wardens can approve or reject outpass requests' });
    }

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Only "approved" or "rejected" are allowed.' });
    }

    outpass.status = status;
    outpass.wardenComment = comment || '';
    await outpass.save();
    res.json({ message: 'Outpass status updated!', outpass });
  } catch (error) {
    console.error('Error handling outpass:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getOutpassStatus = async (req, res) => {
  const { userId } = req.user;

  try {
    const outpasses = await Outpass.find({ student: userId }).populate('student', 'username');
    res.json(outpasses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getApprovedOutpasses = async (req, res) => {
  const { role } = req.user;

  if (role !== 'warden') {
    return res.status(403).json({ message: 'Only wardens can access this resource' });
  }

  try {
    const approvedOutpasses = await Outpass.find({ status: 'approved' }).populate('student', 'username fullName email');
    res.json(approvedOutpasses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllOutpasses = async (req, res) => {
  const { role } = req.user;

  if (role !== 'warden') {
    return res.status(403).json({ message: 'Only wardens can access this resource' });
  }

  try {
    // Fetch only pending outpasses
    const pendingOutpasses = await Outpass.find({ status: 'pending' }).populate('student', 'username fullName email');
    res.json(pendingOutpasses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};