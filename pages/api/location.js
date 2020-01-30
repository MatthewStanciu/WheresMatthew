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

const formatLocation = (location) => {
  return new Promise((resolve, reject) => {
    var splitLoc = location.split(' ')
    var thirdToLastWord = splitLoc[splitLoc.length - 3]
    var indexOfThirdToLastWord = splitLoc.indexOf(thirdToLastWord)
    splitLoc[indexOfThirdToLastWord] = thirdToLastWord + ','
    console.log(splitLoc)

    var newLoc = ''

    splitLoc.forEach(word => {
      newLoc += word + ' '
    })

    newLoc = newLoc.trim()
    const lastIndex = newLoc.lastIndexOf(' ')
    resolve(newLoc.substring(0, lastIndex))
  })
}

export default async (req, res) => {
  const location = await getLocation()
  const formattedLocation = await formatLocation(location)
  res.json({
    location: formattedLocation
  })
}