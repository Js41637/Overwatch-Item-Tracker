
const json = window.json

const getCleanName = name => name.replace(/,/g, '').split(/ /g).join('-').toLowerCase()

const teams = json.competitors.reduce((res, { competitor: team }) => {
  const tC = team.content
  const guid = team.attributes.team_guid
  const teamId = `${getCleanName(tC.location)}_${getCleanName(tC.name)}`

  res[teamId] = {
    id: teamId,
    guid: guid,
    abbreviation: tC.abbreviatedName,
    location: tC.location,
    name: tC.name,
    display_name: team.name,
    home_location: team.homeLocation,
    division: team.owl_division,
    description: tC.description,
    colors: tC.colors.reduce((res, color) => ({
      ...res,
      [color.usage]: color.color.color // lol
    }), {})
  }

  return res
}, {})

console.log(teams)
