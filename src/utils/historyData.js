import axios from 'axios'

const WIKI_API_URL = 'https://en.wikipedia.org/api/rest_v1/'

const GetOnThisDayPath = (mm, dd, type = 'all') => `feed/onthisday/${type}/${mm}/${dd}?redirect=false`

const months = {
  "01": 31,
  "02": 29,
  "03": 31,
  "04": 30,
  "05": 31,
  "06": 30,
  "07": 31,
  "08": 31,
  "09": 30,
  "10": 31,
  "11": 30,
  "12": 31
}
export const buildHistoricalEventList = async () => {
  const searchDays = []
  for (let i = 0; i < 1; i++) {
    const randomMonth = getRandomMonth();
    const randomDay = getRandomDay(randomMonth);
    const onThisDayPath = GetOnThisDayPath(randomMonth, randomDay);
    searchDays.push(onThisDayPath)
  } 
  const results = await Promise.all(searchDays.map(path => fetchWikiArticle(path)))
  return processResults(results);
}

const getRandomMonth = () => {
  const random = Math.floor(Math.random() * 12) + 1;
  let randomString = random.toString();
  if (random <= 9) {
    randomString = "0" + randomString;
  }
  return randomString
}

const getRandomDay = (month) => {
  const randomDay = Math.floor(Math.random() * months[month]) + 1;
  let randomString = randomDay.toString();
  if (randomDay <= 9) {
    randomString = "0" + randomString;
  }
  return randomString;
}
const fetchWikiArticle = async (path) => {
	try {
		// const summary = await wiki.summary(name);
    const URL = WIKI_API_URL + path
    const { data } = await axios.get(URL);
		// console.log(data);
    return data;
		//Response of type @wikiSummary - contains the intro and the main image
	} catch (error) {
		console.log(error);
		//=> Typeof wikiError
	}
};

const processResults = (results) => {
  const selected = []
  // @TODO ensure good year spread
  results = [{...results[0]}]
  results.forEach(result => {
    result.selected.slice(0, 9).forEach(s => {
      const image = findImage(s.pages);
      selected.push({title: s.text, year: s.year, image });
    })
  })
  return selected;
}

const findImage = pages => {
  let image = null 
  pages.forEach(page => {
    if (page.thumbnail?.source) {
      image = page.thumbnail?.source
      if (image !== null) {
        return
      }
    }
  })
  return image;
}