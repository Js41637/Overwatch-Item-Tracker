var OWI = angular.module('OWI', ['ui.bootstrap'])

// Setup some angular config stuff
OWI.config(['$compileProvider', function($compileProvider) {
   $compileProvider.debugInfoEnabled(false); // more perf
}])

OWI.controller('MainCtrl', ["$http", function($http) {
  const vm = this;
  this.looping = false
  this.soundData = {}
  this.heroes = []
  this.mappedSounds = []
  this.selectedSoundID = -1
  const init = () => {
    $http.get('../../data/soundFiles.json').then(resp => {
      if (resp.status == 200) {
        vm.soundData = resp.data
        vm.heroes = Object.keys(resp.data)
        vm.selectedHero = vm.heroes[0]
      } else {
        console.error("Failed loading soundFiles.json ???", resp.status, resp.error);
      }
    }, function(resp) {
      console.error("Failed loading soundFiles.json ???", resp.status, resp.error);
    })
    $http.get('../../data/items.json').then(resp => {
      if (resp.status == 200) {
        vm.itemData = resp.data
      } else {
        console.error("Failed loading items.json ???", resp.status, resp.error);
      }
    }, function(resp) {
      console.error("Failed loading items.json ???", resp.status, resp.error);
    })
  }

  this.toggleLoop = () => {
    this.looping = !this.looping
    audio.loop = this.looping //eslint-disable-line
    if (this.looping) this.replaySound()
  }

  this.handleKeyPress = event => {
    const keyCode = event.keyCode.toString()
    if (keyCode.match(/(40|39|38|37)/)) {
      event.preventDefault()
      vm.selectNextSound(keyCode)
      return
    }
    if (keyCode == 13) {
      event.preventDefault()
      vm.replaySound()
    }
  }

  this.selectNextSound = keyCode => {
    var num = keyCode == 40 || keyCode == 39 ? 1 : keyCode == 38 || keyCode == 37 ? -1 : undefined
    if (!num) return
    var d = vm.soundData[vm.selectedHero]
    var i = vm.selectedSoundID
    var nextItem = i + num > d.length - 1 ? 0 : i + num < 0 ? d.length -1 : i + num
    this.playSound(d[nextItem].id, nextItem)
    setTimeout(() => {
      document.querySelector('#soundList div.selected').scrollIntoViewIfNeeded(true)
    }, 10)
    
  }

  this.replaySound = () => {
    audio.play() //eslint-disable-line
  }

  this.playSound = (soundID, index) => {
    if (soundID == this.selectedSound) {
      this.replaySound()
      return
    }
    this.selectedSound = soundID
    this.selectedSoundID = index
    this.currentURL = `http://localhost:4000/${this.selectedHero}/${this.selectedHero}-${soundID.replace('.wem', '.ogg')}`
  }

  init()
}])