var OWI = angular.module('OWI', ['ui.bootstrap'])

// Setup some angular config stuff
OWI.config(['$compileProvider', function($compileProvider) {
   $compileProvider.debugInfoEnabled(false); // more perf
}])

OWI.directive("fileread", [function () {
  return {
    scope: {
      fileread: "="
    },
    link: function (scope, element) {
      element.bind("change", function (changeEvent) {
        var reader = new FileReader()
        reader.onload = function (loadEvent) {
          scope.$apply(function () {
            scope.fileread(loadEvent.target.result)
          })
        }
        reader.readAsDataURL(changeEvent.target.files[0])
      })
    }
  }
}])

OWI.controller('MainCtrl', ["$http", function($http) {
  const vm = this;
  const audio = window.audio
  const download = window.download
  const fileInput = window.fileInput

  this.looping = false
  this.soundData = {}
  this.heroes = []
  this.mappedSounds = {}
  this.selectedItems = {}
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

  this.clearItem = itemID => {
    var soundID = this.selectedItems[itemID]
    delete this.mappedSounds[this.selectedHero][soundID]
    delete this.selectedItems[itemID]
  }

  this.selectItem = itemID => {   
    if (this.selectedItems[itemID]) {
      this.playSound(this.selectedItems[itemID], null, true)
      return
    }
    if (!this.selectedSound) return
    this.mappedSounds[this.selectedHero] = this.mappedSounds[this.selectedHero] || {}
    if (this.mappedSounds[this.selectedHero][this.selectedSound]) return
    this.mappedSounds[this.selectedHero][this.selectedSound] = itemID
    this.selectedItems[itemID] = this.selectedSound
  }

  this.saveData = () => {
    console.log(this.mappedSounds)
    download(JSON.stringify(this.mappedSounds, null, 2), `mappedSounds-${Date.now()}.json`, 'application/json');
  }

  this.clearData = () => {
    this.mappedSounds = {}
    this.selectedItems = {}
  }

  this.importData = data => {
    fileInput.value = null
    var savedData
    try {
      savedData = JSON.parse(atob(data.replace('data:;base64,', '')))
    } catch(e) {
      console.log("Error")
      return
    }
    Object.keys(savedData).forEach(hero => {
      if (!vm.mappedSounds[hero]) vm.mappedSounds[hero] = {}
      Object.assign(vm.mappedSounds[hero], savedData[hero])
      Object.keys(savedData[hero]).forEach(sound => {
        vm.selectedItems[savedData[hero][sound]] = sound
      })
    })
    console.log(vm.mappedSounds, vm.selectedItems)
  }

  this.toggleLoop = () => {
    this.looping = !this.looping
    audio.loop = this.looping
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

  this.selectNextSound = (keyCode, index) => {
    var num = keyCode == 40 || keyCode == 39 ? 1 : keyCode == 38 || keyCode == 37 ? -1 : undefined
    if (!num) return
    var d = vm.soundData[vm.selectedHero]
    var i = index || vm.selectedSoundIndex
    var nextItem = i + num > d.length - 1 ? 0 : i + num < 0 ? d.length -1 : i + num
    if (d[nextItem].dupe) {
      this.selectNextSound(keyCode, nextItem)
      return
    }
    this.playSound(d[nextItem].id, nextItem)
    setTimeout(() => {
      document.querySelector('#soundList div.selected').scrollIntoViewIfNeeded(true)
    }, 10)
  }

  this.replaySound = () => {
    audio.currentTime = 0
    audio.play()
  }

  var tempSound
  this.playSound = (soundID, index, noSave) => {
    if (!soundID) return
    if (soundID == this.selectedSound || (noSave && tempSound == soundID)) {
      this.replaySound()
      return
    }
    tempSound = soundID
    if (!noSave) {
      this.selectedSound = soundID
      this.selectedSoundIndex = index
    }
    this.currentURL = `http://localhost:4000/${this.selectedHero}/${this.selectedHero}-${soundID}.ogg`
  }

  init()
}])