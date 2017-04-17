OWI.factory("StorageService", function() {
  var service = {
    data: {},
    settings: {},
    defaultSettings: {
      particles: true,
      langKey: 'en_US',
      showPreviews: true,
      hdVideos: false,
      currentTheme: 'standard',
      audioVolume: 0.5
    },
    getData: function() {
      return service.data;
    },
    getSetting: function(key) {
      return (typeof service.settings[key] !== 'undefined' ? service.settings[key] : (service.defaultSettings[key] ? service.defaultSettings[key] : false));
    },
    setSetting: function(key, value) {
      service.settings[key] = value;
      service.persist(true);
    },
    setData: function(data) {
      service.data = data;
      service.persist();
    },
    persist: function(settings) {
      localStorage.setItem(settings ? 'settings' : 'data', angular.toJson(service[settings ? 'settings' : 'data']));
    },
    init: function() {
      console.info("Init StorageService");
      var storedData = localStorage.getItem('data')
      if (storedData) {
        service.data = angular.fromJson(storedData);
      }
      var storedSettings = localStorage.getItem('settings');
      if (!storedSettings) {
        service.settings = service.defaultSettings;
      } else {
        service.settings = angular.fromJson(storedSettings);
      }
    }
  }
  service.init();
  return service;
})

OWI.factory("DataService", ["$http", "$q", "StorageService", function($http, $q, StorageService) {
  function initialize(data) {
    console.info("Initializing");
    var storedData = StorageService.getData() || {};
    var out = {
      initialized: true,
      checked: {}
    }
    for (var hero in data.heroes) {
      out.checked[hero] = {"skins":{},"emotes":{},"intros":{},"sprays":{},"voicelines":{},"poses":{},"icons":{}}
    }

    // Use itemnames as translation key
    Object.keys(data.events).forEach(function(event) {
      var items = data.events[event].items;
      Object.keys(items).forEach(function(type) {
        items[type].forEach(function(item) {
          var langKey = event + '.' + type + '.' + item.id;
          item.name = langKey;
          //item.langKey = langKey; //TODO: later use this?
        });
      });
    });
    Object.keys(data.heroes).forEach(function(hero) {
      var items = data.heroes[hero].items;
      Object.keys(items).forEach(function(type) {
        items[type].forEach(function(item) {
          var langKey = hero + '.' + type + '.' + item.id;
          item.name = langKey;
          //item.langKey = langKey; //TODO: later use this?
        });
      });
    });

    Object.assign(out.checked, storedData);
    Object.assign(service, out, data);
  }

  var service = {
    checked: {},
    prices: {},
    events: {},
    heroes: {},
    initialized: false,
    isItemChecked: function(who, type, id) {
      return (service.checked[who] ? (service.checked[who][type] ? service.checked[who][type][id] : false) : false);
    },
    waitForInitialization: function() {
      return $q(function(resolve) {
        function waitForInitialize() {
            if (service.initialized) {
              resolve(service);
            } else {
              setTimeout(waitForInitialize, 50);
            }
        }
        waitForInitialize();
      });
    },
    init: function() {
      console.info("Fetching Data");
      $http.get('./data/master.json').then(function(resp) {
        if (resp.status == 200) {
          initialize(resp.data);
        } else {
          console.error("Failed loading master.json ???", resp.status, resp.error);
        }
      }, function(resp) {
        console.error("Failed loading master.json ???", resp.status, resp.error);
      })
    }
  }
  service.init();
  return service;
}])

OWI.factory("ImageLoader", ["$q", "$document", function($q, $document) {
  var service = {
    processing: false,
    requests: 0,
    images: [],
    loadedImages: {},
    loadImage: function(url, noQueue) {
      var deferred = $q.defer();
      if (service.loadedImages[url]) {
        setTimeout(function() {
          deferred.resolve(url)
        }, 0)
        return deferred.promise
      } else {
        if (noQueue) {
          service.fetchImage(url, deferred, true)()
        } else {
          service.images.push(service.fetchImage(url, deferred))
          if (!service.processing) {
            service.processQueue()
          }
        }
      }
      return deferred.promise
    },
    fetchImage: function(url, promise, ignore) {
      return function() {
        var img = $document[0].createElement('img');
        img.onload = function() {
          if (!ignore) {
            service.requests--;
          }
          service.loadedImages[url] = true;
          promise.resolve(this.src);
        };
        img.onerror = function() {
          if (!ignore) {
            service.requests--;
          }
          promise.reject();
        };
        img.src = url;
      }
    },
    processQueue: function() {
      service.processing = true;
      if (service.requests == 4) {
        setTimeout(function() {
          service.processQueue()
        }, 75)
        return
      }

      var nextImage = service.images.shift()
      if (nextImage) {
        service.requests++;
        nextImage();
        setTimeout(function() {
          service.processQueue()
        }, 1);
      } else {
        service.processing = false;
      }
    }
  }
  return service;
}])

OWI.factory('CompatibilityService', ["StorageService", function(StorageService) {
  var showPreviews = StorageService.getSetting('showPreviews')
  var service = {
    noSupportMsg: false,
    supportedTypes:{
      intros: true,
      emotes: true,
      voicelines: true
    },
    supportsAudio: true,
    supportsVideo: true,
    canPlayType: function(type) {
      if (!showPreviews) return 'false'
      return service.supportedTypes[type] || true
    }
  }

  var noSupport = []
  var messages = {
    WebM: 'view previews of emotes and intros',
    Ogg: 'listen to voicelines'
  }
  var v = document.createElement('video')
  var a = document.createElement('audio')
  if (!v.canPlayType || ("" == v.canPlayType('video/webm; codecs="vp8, opus"') && "" == v.canPlayType('video/webm; codecs="vp9, opus"'))) {
    service.supportsVideo = false
    service.supportedTypes['intros'] = 'false'
    service.supportedTypes['emotes'] = 'false'
    noSupport.push('WebM')
  }
  if (!a.canPlayType || "" == a.canPlayType('audio/ogg; codecs="vorbis"')) {
    service.supportsAudio = false
    service.supportedTypes['voicelines'] = 'false'
    noSupport.push('Ogg')
  }
  if (noSupport.length) {
    service.noSupportMsg = "You're browser doesn't seem to support " + noSupport.join(' and ') + ".\nThis means you won't be able to " + noSupport.map(function(n) {
      return messages[n]
    }).join(' or ') + "."
  }

  return service
}])
