const GETALLPEOPLE = JSON.stringify({
  query: "query getAllPeople {\r\n  allPeople {\r\n    people {\r\n      id\r\n      name\r\n      birthYear\r\n      eyeColor\r\n      gender\r\n      hairColor\r\n      height\r\n      mass\r\n      skinColor\r\n      homeworld {\r\n        id\r\n        name\r\n        diameter\r\n        rotationPeriod\r\n        orbitalPeriod\r\n        gravity\r\n        population\r\n        surfaceWater\r\n      }\r\n      species {\r\n        id\r\n        name\r\n        classification\r\n        designation\r\n        averageHeight\r\n        averageLifespan\r\n        eyeColors\r\n        hairColors\r\n        skinColors\r\n        language\r\n        homeworld {\r\n            id\r\n            name\r\n            diameter\r\n            rotationPeriod\r\n            orbitalPeriod\r\n            gravity\r\n            population\r\n            surfaceWater\r\n        }\r\n      }\r\n      starshipConnection {\r\n        starships {\r\n            id\r\n            name\r\n            model\r\n            starshipClass\r\n            costInCredits\r\n            length\r\n            crew\r\n            passengers\r\n            maxAtmospheringSpeed\r\n            hyperdriveRating\r\n            cargoCapacity\r\n            consumables\r\n        }\r\n      }\r\n      vehicleConnection {\r\n        vehicles {\r\n            id\r\n            name\r\n            model\r\n            vehicleClass\r\n            costInCredits\r\n            length\r\n            crew\r\n            passengers\r\n            maxAtmospheringSpeed\r\n            cargoCapacity\r\n            consumables\r\n        }\r\n      }\r\n    }\r\n  }\r\n}",
  variables: {}
})

const GETALLSPECIES = JSON.stringify({
  query: "query getAllSpecies {\r\n    allSpecies {\r\n        species {\r\n            id\r\n            name\r\n            classification\r\n            designation\r\n            averageHeight\r\n            averageLifespan\r\n            eyeColors\r\n            hairColors\r\n            skinColors\r\n            language\r\n            homeworld {\r\n                id\r\n                name\r\n                diameter\r\n                rotationPeriod\r\n                orbitalPeriod\r\n                gravity\r\n                population\r\n                surfaceWater\r\n            }\r\n        }\r\n    }\r\n}",
  variables: {}
})

const GETPERSON = (id: string) => {
  return JSON.stringify({
    query: "query getPerson($id: ID!) {\r\n    person (id: $id) {\r\n        id\r\n        name\r\n        birthYear\r\n        eyeColor\r\n        gender\r\n        hairColor\r\n        height\r\n        mass\r\n        skinColor\r\n        homeworld {\r\n            id\r\n            name\r\n            diameter\r\n            rotationPeriod\r\n            orbitalPeriod\r\n            gravity\r\n            population\r\n            surfaceWater\r\n        }\r\n        starshipConnection {\r\n            starships {\r\n                id\r\n                name\r\n                model\r\n                starshipClass\r\n                costInCredits\r\n                length\r\n                crew\r\n                passengers\r\n                maxAtmospheringSpeed\r\n                hyperdriveRating\r\n                cargoCapacity\r\n                consumables\r\n            }\r\n        }\r\n        vehicleConnection {\r\n            vehicles {\r\n                id\r\n                name\r\n                model\r\n                vehicleClass\r\n                costInCredits\r\n                length\r\n                crew\r\n                passengers\r\n                maxAtmospheringSpeed\r\n                cargoCapacity\r\n                consumables\r\n            }\r\n        }\r\n    }\r\n}",
    variables: { "id": id }
  })
}

const GETSPECIES = (id: string) => {
  return JSON.stringify({
    query: "query getSpecies($id: ID!) {\r\n    species (id: $id) {\r\n        id\r\n        name\r\n        classification\r\n        designation\r\n        averageHeight\r\n        averageLifespan\r\n        eyeColors\r\n        hairColors\r\n        skinColors\r\n        language\r\n        homeworld {\r\n            id\r\n            name\r\n            diameter\r\n            rotationPeriod\r\n            orbitalPeriod\r\n            gravity\r\n            population\r\n            surfaceWater\r\n        }\r\n    }\r\n}",
    variables: { "id": id }
  })
}

export { GETALLPEOPLE, GETALLSPECIES, GETPERSON, GETSPECIES }