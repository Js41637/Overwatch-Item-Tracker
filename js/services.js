OWI.factory("StorageService", function() {
  var service = {
    data: {},
    settings: {},
    defaultSettings: {
      particles: true,
      showPreviews: true,
      hdVideos: false,
      currentTheme: 'standard',
      audioVolume: 0.5,
      countIcons: true,
      syncDisabled: true
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
      var storedData = localStorage.getItem('data');
      if (storedData) {
        service.data = angular.fromJson(storedData);
      }
      var storedSettings = localStorage.getItem('settings');
      if (!storedSettings) {
        service.settings = service.defaultSettings;
      } else {
        service.settings = Object.assign({}, service.defaultSettings, angular.fromJson(storedSettings));
      }
    }
  };
  service.init();
  return service;
});

OWI.factory("DataService", ["$http", "$q", "StorageService", "$timeout", function($http, $q, StorageService, $timeout) {
  function initialize(data) {
    console.info("Initializing");
    var storedData = StorageService.getData() || {};
    var out = {
      checked: {}
    };
    for (var hero in data.heroes) {
      out.checked[hero] = {"skins":{},"emotes":{},"intros":{},"sprays":{},"voicelines":{},"poses":{},"icons":{}};
    }

    Object.assign(out.checked, storedData);
    Object.assign(service, out, data);
    $timeout(function() {
      service.initialized = true;
    }, 0);
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
    getHeroOrEventName: function(type, id) {
      return service.waitForInitialization().then(function() {
        return {
          name: service[type][id].name,
          dates: service[type][id].dates,
          type: type,
          id: id
        };
      });
    },
    waitForInitialization: function() {
      return $q(function(resolve) {
        function waitForInitialize() {
          if (service.initialized) {
            $timeout(function() {
              resolve(service);
            }, 30);
          } else {
            $timeout(waitForInitialize, 30);
          }
        }
        if (service.initialized) {
          resolve(service);
          return;
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
      });
    }
  };
  service.init();
  return service;
}]);

OWI.factory('CostAndTotalService', ["DataService", "StorageService", "$q", "$timeout", function(DataService, StorageService, $q, $timeout) {
  var TYPES = {
    skinsEpic: 'skins',
    skinsLegendary: 'skins'
  };

  var isValidItem = function(item) {
    return !item.achievement && item.quality;
  };
  
  var countIcons = StorageService.getSetting('countIcons');

  var service = {
    initialized: false,
    totals: {},
    heroes: {},
    events: {},
    oldEvents: ["HALLOWEEN_2016", "SUMMER_GAMES_2016"],
    init: function() {
      DataService.waitForInitialization().then(function() {
        console.info("Calculating totals and costs");
        service.recalculate();
        service.initialized = true;
      });
    },
    waitForInitialization: function() {
      return $q(function(resolve) {
        function waitForInitialize() {
          if (service.initialized) {
            resolve(service);
          } else {
            $timeout(waitForInitialize, 30);
          }
        }
        waitForInitialize();
      });
    },
    recalculate: function() {
      console.log("Calculating costs");
      service.heroes = {};
      service.events = {};
      var d = Object.assign({}, DataService.heroes, DataService.events);
      for (var heroOrEvent in d) {
        var isEvent = DataService.events[heroOrEvent];
        var what = d[heroOrEvent];
        var TYPE = isEvent ? 'events' : 'heroes';

        service[TYPE][what.id] = { events: {}, groups: {}, cost: { selected: 0, remaining: 0, total: 0, prev: 0 }, totals: { overall: { selected: 0, total: 0, percentage: 0 } } };
        var items = what.items;
        for (var type in items) {
          if (!service[TYPE][what.id].totals[type]) service[TYPE][what.id].totals[type] = { selected: 0, total: 0 };
          for (var item of items[type]) {
            if (item.standardItem) continue;
            if (!isEvent) {
              if (item.event && !service[TYPE][what.id].events[item.event]) service[TYPE][what.id].events[item.event] = true;
              if (item.group && !service[TYPE][what.id].groups[item.group]) service[TYPE][what.id].groups[item.group] = true;
            }
            var isSelected = DataService.checked[item.hero || what.id][TYPES[type] || type][item.id];
            service[TYPE][what.id].totals.overall.total++;
            service[TYPE][what.id].totals[type].total++;
            if (isSelected) {
              service[TYPE][what.id].totals.overall.selected++;
              service[TYPE][what.id].totals[type].selected++;
            }
            if (type == 'icons') {
              if (!countIcons) {
                service[TYPE][what.id].totals.overall.total--;
                if (isSelected) service[TYPE][what.id].totals.overall.selected--;
              }
              continue;
            }
            if (isValidItem(item)) {
              var price = DataService.prices[item.quality] * (((item.event || isEvent) && !service.oldEvents.includes(item.group)) ? 3 : 1);
              service[TYPE][what.id].cost.total += price;
              if (isSelected) {
                service[TYPE][what.id].cost.selected += price;
              } else {
                service[TYPE][what.id].cost.remaining += price;
              }
            }
          }
        }
        service[TYPE][what.id].totals.overall.percentage = ((service[TYPE][what.id].totals.overall.selected / service[TYPE][what.id].totals.overall.total) * 100);
      }
    },
    updateItem: function(item, type, hero, event, idOverride) {
      const itemID = idOverride || item.id;
      var isSelected = DataService.checked[item.hero || hero][TYPES[type] || type][itemID];
      event = item.event || event;
      var eventType;
      if (event === 'SUMMER_GAMES' || event === 'HALLOWEEN') {
        eventType = (type == 'skins' && item.quality == 'legendary' && !service.oldEvents.includes(item.group)) ? 'skinsLegendary' : type;
      } else {
        eventType = type == 'skins' ? (item.quality == 'epic' ? 'skinsEpic' : 'skinsLegendary') : type;
      }
      var val = isSelected ? 1 : -1;
      var price = DataService.prices[item.quality] * ((event && !service.oldEvents.includes(item.group)) ? 3 : 1);
      var isValid = isValidItem(item, event);
      service.heroes[hero].cost.prev = service.heroes[hero].cost.remaining;
      service.heroes[hero].totals[type].selected += val;
      if (type != 'icons' || (type == 'icons' && countIcons)) {
        service.heroes[hero].totals.overall.selected += val;
      }
      if (type != 'icons' && isValid) {
        if (isSelected) {
          service.heroes[hero].cost.selected += price;
          service.heroes[hero].cost.remaining -= price;
        } else {
          service.heroes[hero].cost.selected -= price;
          service.heroes[hero].cost.remaining += price;
        }
      }
      if (event) {
        if (type !== 'icons' || type == 'icons' && countIcons) {
          service.events[event].totals.overall.selected += val;
        }
        service.events[event].totals[eventType].selected += val;
        service.events[event].cost.prev = service.events[event].cost.remaining;
        if (type !== 'icons' && isValid) {
          if (isSelected) {
            service.events[event].cost.remaining -= price;
            service.events[event].cost.selected += price;
          } else {
            service.events[event].cost.remaining += price;
            service.events[event].cost.selected -= price;
          }
        }
        service.events[event].totals.overall.percentage = ((service.events[event].totals.overall.selected / service.events[event].totals.overall.total) * 100);
      }
      service.heroes[hero].totals.overall.percentage = ((service.heroes[hero].totals.overall.selected / service.heroes[hero].totals.overall.total) * 100);
      return service.heroes[hero];
    },
    calculateFilteredHeroes: function(items, oldCost, hero) {
      var out = {
        cost: { total: 0, selected: 0, remaining: 0, prev: oldCost },
        totals: { overall: { selected: 0, total: 0, percentage: 0 } }
      };
      for (var type in items) {
        if (!out.totals[type]) out.totals[type] = { total: 0, selected: 0 };
        for (var item of items[type]) {
          if (item.standardItem) continue;
          var isSelected = DataService.checked[item.hero || hero][type][item.id];
          out.totals.overall.total++;
          out.totals[type].total++;
          if (isSelected) {
            out.totals.overall.selected++;
            out.totals[type].selected++;
          }
          if (type == 'icons') continue;
          if (isValidItem(item)) {
            var price = DataService.prices[item.quality] * ((item.group && !service.oldEvents.includes(item.group)) ? 3 : 1);
            out.cost.total += price;
            if (isSelected) {
              out.cost.selected += price;
            } else {
              out.cost.remaining += price;
            }
          }
        }
      }
      out.totals.overall.percentage = ((out.totals.overall.selected / out.totals.overall.total) * 100);
      return out;
    }
  };

  service.init();
  return service;
}]);

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
          deferred.resolve(url);
        }, 0);
        return deferred.promise;
      } else {
        if (noQueue) {
          service.fetchImage(url, deferred, true)();
        } else {
          service.images.push(service.fetchImage(url, deferred));
          if (!service.processing) {
            service.processQueue();
          }
        }
      }
      return deferred.promise;
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
      };
    },
    processQueue: function() {
      service.processing = true;
      if (service.requests == 4) {
        setTimeout(function() {
          service.processQueue();
        }, 75);
        return;
      }
      
      var nextImage = service.images.shift();
      if (nextImage) {
        service.requests++;
        nextImage();
        setTimeout(function() {
          service.processQueue();
        }, 1);
      } else {
        service.processing = false;
      }
    }
  };
  return service;
}]);

OWI.factory('CompatibilityService', ["StorageService", function(StorageService) {
  var showPreviews = StorageService.getSetting('showPreviews');
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
      if (!showPreviews) return 'false';
      return service.supportedTypes[type] || true;
    }
  };

  var noSupport = [];
  var messages = {
    WebM: 'view previews of emotes and intros',
    Ogg: 'listen to voicelines'
  };
  var v = document.createElement('video');
  var a = document.createElement('audio');
  if (!v.canPlayType || ("" == v.canPlayType('video/webm; codecs="vp8, opus"') && "" == v.canPlayType('video/webm; codecs="vp9, opus"'))) {
    service.supportsVideo = false;
    service.supportedTypes['intros'] = 'false';
    service.supportedTypes['emotes'] = 'false';
    noSupport.push('WebM');
  }
  if (!a.canPlayType || "" == a.canPlayType('audio/ogg; codecs="vorbis"')) {
    service.supportsAudio = false;
    service.supportedTypes['voicelines'] = 'false';
    noSupport.push('Ogg');
  }
  if (noSupport.length) {
    service.noSupportMsg = "You're browser doesn't seem to support " + noSupport.join(' and ') + ".\nThis means you won't be able to " + noSupport.map(function(n) {
      return messages[n];
    }).join(' or ') + ".";
  }

  return service;
}]);

OWI.factory('GoogleAPI', ["$rootScope", "$timeout", "$q", "$http", "StorageService", function($rootScope, $timeout, $q, $http, StorageService) {
  var CLIENT_ID = '583147653478-cfkb2hkhdd1iocde6omf6ro2oi52qj98.apps.googleusercontent.com';
  var API_KEY = 'AIzaSyDGV8ytVdbMrBhonprSufoZwboxszL25Ww';
  var SCOPES = 'https://www.googleapis.com/auth/drive.appfolder';

  var service = {
    syncTimeout: 1000 * 60 * 20, // 20 mins
    version: '1',
    fileName: 'overwatch_item_tracker_data_NO_TOUCHY_PLEASE.json',
    dataFileID: localStorage.getItem('gdrive.file_id'),
    lastSync: localStorage.getItem('gdrive.last_sync'),
    isSignedIn: false,
    user: {},
    waitForLoad: function() {
      function waitForInitialize() {
        if (window.gapi) {
          gapi.load('client:auth2', service.init);
        } else {
          $timeout(waitForInitialize, 30);
        }
      }

      waitForInitialize();
    },
    init: function() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES
      }).then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(service.updateSigninState);
        service.updateSigninState(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
    },
    updateSigninState: function(isSignedIn) {
      if (isSignedIn) {
        $rootScope.$broadcast('google:login', { event: 'SIGN_IN', user: service.user });
        service.user = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
        service.setupSync();
      } else {
        $rootScope.$broadcast('google:login', { event: 'SIGN_OUT' });
      }

      this.isSignedIn = isSignedIn;

    },
    login: function() {
      const instance = gapi.auth2.getAuthInstance();
      if (instance) {
        instance.signIn().catch(function(err) {
          console.log('Error signing in', err);
          $rootScope.$broadcast('google:login', { event: 'ERROR', message: err.error });
        });
      }
    },
    signOut: function() {
      const instance = gapi.auth2.getAuthInstance();
      if (instance) {
        instance.signOut();
      }
    },
    setupSync: function() {
      if (StorageService.getSetting('syncDisabled')) {
        console.log('Google Sync disabled');
        return;
      }

      function sync() {
        console.log('Checking sync');
        if (!service.lastSync || (+service.lastSync + service.syncTimeout < Date.now())) {
          console.log('Syncing with Google');
          service.update().then(function(success) {
            if (success) {
              console.log('Successfully synced with Google');
              service.lastSync = Date.now();
              localStorage.setItem('gdrive.last_sync', service.lastSync);
            } else {
              console.error('Error while syncing with Google Drive');
            }
          });
        } else {
          console.log('Not syncing');
        }
      }
      
      sync();
      setInterval(sync, service.syncTimeout);
    },
    // Load stored JSON file from Google, uses normal HTTP request as using the gapi request seems to return
    //  a gzipped or encoded version of some kind and i cbf dealing with that shit
    getData: function() {
      const token = gapi.client.getToken();
      const url = 'https://www.googleapis.com/drive/v3/files/' + service.dataFileID;

      if (!token || !token.access_token || !service.dataFileID) {
        return Promise.resolve(false);
      }

      return $http.get(url, {
        params: {
          alt: 'media'
        },
        headers: {
          'Authorization': (token.token_type + ' ' + token.access_token)
        }
      }).then(function(response) {
        if (response.status === 200 && response.data) {
          console.log('Fetched data? from', new Date(response.data._synced_at));
          return response.data;
        }

        return null;
      }, function(err) {
        console.error('Error fetchingd data from google', err);
        return null;
      });
    },
    update: function(data) {
      return new $q(function(resolve, reject) {
        if (service.dataFileID) {
          console.log('File id stored, updating file')
          service.updateFile(data).then(resolve, reject);
        } else {
          console.log('No file id detected, checking if file exists')
          service.findDataFile().then(function(exists) {
            if (exists) {
              console.log('File detected, updating')
              service.updateFile(data).then(resolve, reject);
            } else {
              console.log('no file detected, creating')
              service.createFile(data).then(function(data) {
                console.log('file created, yay')
                service.dataFileID = data.id
                localStorage.setItem('gdrive.file_id', data.id)
                resolve()
              }, reject);
            }
          });
        }
      }).then(function() {
        return true;
      }, function(err) {
        console.error('Error uploading file to google', err);
        return false;
      });
    },
    // Checks to see if we already have a file saved, if we do we can update it if we don't, it needs to be made
    findDataFile: function() {
      return new $q(function(resolve) {
        var request = gapi.client.request({
          path: '/drive/v3/files/',
          method: 'GET',
          params: {
            spaces: ['appDataFolder']
          }
        });
  
        request.execute(function(data) {
          if (data.error || data.files.length === 0) {
            return resolve(false);
          }

          for (var file of data.files) {
            if (file.name === service.fileName && file.mimeType === 'application/json') {
              service.dataFileID = file.id
              localStorage.setItem('gdrive.file_id', file.id)
              resolve(true);
              return
            }
          }
          
          resolve(false)
        });
      });
    },
    createFile: function(data) {
      return service.sendRequest(data, {
        mimeType: 'application/json',
        name: service.fileName,
        parents: ['appDataFolder']
      }, 'POST', 'https://www.googleapis.com/upload/drive/v3/files');
    },
    updateFile: function(data) {
      return service.sendRequest(data, {
        mimeType: 'application/json'
      }, 'PATCH', 'https://www.googleapis.com/upload/drive/v3/files/' + service.dataFileID);
    },
    // Weird ass shit required to save/update a file using Multipart form.
    sendRequest: function(data, metadata, method, url) {
      return new $q(function(resolve, reject) {
        var boundary = '-------314159265358979323846264';
        var delimiter = "\r\n--" + boundary + "\r\n";
        var close_delim = "\r\n--" + boundary + "--";

        var body = {
          _version: service.version,
          _synced_at: Date.now(),
          data: data
        };
  
        var base64Data = btoa(JSON.stringify(body));
        var multipartRequestBody =
            delimiter +
            'Content-Type: application/json\r\n\r\n' +
            JSON.stringify(metadata) +
            delimiter +
            'Content-Type: ' + 'application/json' + '\r\n' +
            'Content-Transfer-Encoding: base64\r\n' +
            '\r\n' +
            base64Data +
            close_delim;
        var request = gapi.client.request({
          path: url,
          method: method,
          params: {
            uploadType: 'multipart'
          },
          headers: {
            'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
          },
          body: multipartRequestBody
        });
  
        request.execute(function(data) {
          if (data.error) {
            return reject(data.error);
          }

          localStorage.setItem('google_drive_data_file_created', true);
          return resolve(data);
        });
      });
    }
  };

  return service;
}]);

OWI.run(["GoogleAPI", function(GoogleAPI) {
  GoogleAPI.waitForLoad();
}]);