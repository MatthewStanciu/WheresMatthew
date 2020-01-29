const Storage = require('node-storage')
const store = new Storage('location.json')
const Airtable = require('airtable')
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.BASE_ID)

const getLocation = async () => {
  return new Promise((resolve, reject) => {
    base('Location').find('rec9tCoytsSvINFK3', (err, record) => {
      if (err) reject(err)
      resolve(record.fields.Location)
    })
  })
}

export default async (req, res) => {
  const location = await getLocation()
  res.json({
    location: location
  })
}