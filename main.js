var OWI = angular.module('OWI', [])

OWI.config(['$compileProvider', function($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}])

OWI.controller('MainCtrl', ["$scope", function($scope) {
  var vm = this;

  this.checked = {
    legendary: {},
    epic: {},
    emotes: {},
    intros: {},
    sprays: {},
    voicelines: {},
    victoryposes: {},
    icons: {}
  }

  // Update localstorage on new data
  this.onSelect = function() {
    localStorage.setItem('data', JSON.stringify(this.checked))
  }

  // Load any saved data from localstorage
  var onStartup = function() {
    var data = localStorage.getItem('data')
    if (data) {
      vm.checked = JSON.parse(data)
      $scope.$digest()
    }
  }

  var heroes = [
    "Ana", "Bastion", "D.Va", "Genji", "Hanzo",
    "Junkrat", "Lucio", "McCree", "Mei", "Mercy",
    "Pharah", "Reaper", "Reinhardt", "Roadhog",
    "Soldier: 76", "Symetra", "Torbjorn", "Tracer",
    "Widowmaker", "Winston", "Zarya", "Zenyatta"
  ]
  this.items = {
    skins: {
      legendary: [{
        name: "Junkenstein Junkrat",
        img: "./img/junkrat.jpg"
      }, {
        name: "Monster Roadhog",
        img: "./img/roadhog.jpg"
      }, {
        name: "Witch Mercy",
        img: "./img/mercy.jpg"
      }, {
        name: "Pumpkin Reaper",
        img: "./img/reaper.jpg"
      }],
      epic: [
        "Ghoul Ana", "Tombstone Bastion", "Demon Hanzo",
        "Possessed Pharah", "Coldhardt Reinhart", "Immortal Soldier: 76",
        "Vampire Symmetra", "Skullyata Zenyatta"
      ]
    },
    intros: [
      "Pumpkin Carving Genji", "Ice Scream Mei", "Eternal Rest Reaper"
    ],
    emotes: [
      "Candy Ana", "Pumpkin Smashing Reinhardt", "Shadow Puppets Winston"
    ],
    voicelines: heroes,
    victoryposes: heroes,
    sprays: heroes.concat([
      "...Never Die", "Bats", "Boo!", "Boop!",
      "Candyball", "Fangs", "Gummy Hog",
      "Halloween Terror", "Pumpkins", "Witch's Brew",
    ]),
    icons: [
      "Halloween Terror 2016", "The Doctor", "The Monster",
      "The Reaper", "The Witch", "...Never Die", "Candle",
      "Bewitching", "Ghostymari", "Eyeball", "Calavera",
      "Spider", "Witch's Brew", "Vampachimari", "Superstition",
      "Witch's Hat", "Tombstone", "The Wolf"
    ]
  }

  // Defer the starup so the initial digest finishes
  setTimeout(function () {
    onStartup()
  }, 0);
}])
