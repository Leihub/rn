
  // var path = "./"
  // var path = require('../icon/Sunshine.png');
  import Storage from 'react-native-storage';
  import { AsyncStorage } from 'react-native';

  var storage = new Storage({
    size:2000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24*2,
    enableCache: true,
  })
  var path = './static/icon/'
  var Imgsrc = {
    "晴": 'Sunshine',
    "多云":"Fewclouds",
    "Scatteredclouds": "Scatteredclouds",
    "Thunderstorm":path + "Thunderstorm.png",
    "Shower": path + "Shower.png",
    "Drizzle":path + "Drizzle.png",
    "Rain":path + "Rain.png",
    "大雪":"Snow",
    "中雪":"Slightsnow",
    "Spicules":path + "Spicules.png",
    "Hail":path + "Hail.png",
    "Mist":path + "Mist.png",
    "Dust":path + "Dust.png",
    "雾":"Fog",
    "Fume":path + "Fume.png",
    "霾":"Haze",
    "灰":"Gust",
    "Sand":path + "Sand.png",
    "Volcanicash":path + "Volcanic ash.png",
    "Duststorm":path + "Duststorm.png",
    "Tornado":path + "Tornado.png",
    "Funnelcloud":path + "Funnelcloud.png",
    "Skyclear":path + "Skyclear.png",
    "Overcast":path + "Overcast.png",
    "Broken clouds":path + "Brokenclouds.png",
    }
  global.Imgsrc = Imgsrc;
  global.storage = storage;
