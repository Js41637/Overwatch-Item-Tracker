OWI.factory("StorageService", function() {
  var service = {
    data: {},
    settings: {},
    defaultSettings: {
      particles: true,
      hdVideos: false,
      currentTheme: 'standard'
    },
    getData: function() {
      return service.data;
    },
    getSetting: function(key) {
      return (service.settings[key] ? service.settings[key] : (service.defaultSettings[key] ? service.defaultSettings[key] : false));
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
    loadImage: function(url) {
      var deferred = $q.defer();
      if (service.loadedImages[url]) {
        setTimeout(function() {
          deferred.resolve(url)
        }, 0)
        return deferred.promise
      } else {
        service.images.push(service.fetchImage(url, deferred))
        if (!service.processing) {
          service.processQueue()
        }
      }
      
      return deferred.promise
    },
    fetchImage: function(url, promise) {
      return function() {
        var img = $document[0].createElement('img');
        img.onload = function() {
          service.requests--;
          service.loadedImages[url] = true;
          promise.resolve(this.src);
        };
        img.onerror = function() {
          service.requests--;
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