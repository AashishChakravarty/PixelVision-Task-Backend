const day = async (req, res) => {
  const date = req.query.date || new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const d = new Date(date);
  const dayName = days[d.getDay()];
  res.json({
    status: true,
    message: 'Successfully Fetched',
    data: {
      day: dayName
    }
  });
};

module.exports = { day }
