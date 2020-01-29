import fetch from 'isomorphic-unfetch'

const Page = ({ location }) => (
  <h1>{location}</h1>
)

Page.getInitialProps = async ({ req }) => {
  const locData = await fetch(
    (req ? `https://${req.headers.host}` : '') + '/api/location'
  )
  const data = await locData.json()
  return data
}

export default Page