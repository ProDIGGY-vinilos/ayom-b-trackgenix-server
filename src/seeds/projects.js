import mongoose from 'mongoose';

export default [
  {
    _id: mongoose.Types.ObjectId('635342acfc13ae517a00001e'),
    name: 'Stronghold',
    description: 'Other superficial bite of breast, left breast',
    startDate: '1-4-2022',
    endDate: '9-12-2022',
    clientName: 'Schumm LLC',
    employees: [
      mongoose.Types.ObjectId('6352daf070bd974cac6927cc'),
      mongoose.Types.ObjectId('6352dbec0259a3a36db761d3'),
    ],
  },
  {
    _id: mongoose.Types.ObjectId('635342acfc13ae517a00001f'),
    name: 'Andalax',
    description: 'Unspecified open wound, unspecified ankle, initial encounter',
    startDate: '1-27-2022',
    endDate: '8-11-2022',
    clientName: 'Hane LLC',
    employees: [
      mongoose.Types.ObjectId('6352daf070bd974cac6927cc'),
      mongoose.Types.ObjectId('6352dafc15b1b196950a8583'),
      mongoose.Types.ObjectId('6352daf6f8285eeb69b2fabe'),
    ],
  },
  {
    _id: mongoose.Types.ObjectId('635342acfc13ae517a000020'),
    name: 'Regrant',
    description: 'Nursemaid elbow',
    startDate: '1-30-2022',
    endDate: '7-22-2022',
    clientName: 'Mraz, Fritsch and Schumm',
    employees: [
      mongoose.Types.ObjectId('6352dbec0259a3a36db761d3'),
      mongoose.Types.ObjectId('6352daf6f8285eeb69b2fabe'),
    ],
  },
];
