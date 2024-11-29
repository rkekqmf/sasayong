const axios = require("axios");
const cheerio = require("cheerio");

const BASE_URL = "https://www.inven.co.kr/board/lostark/5355";

async function fetchPosts(keyword, page = 1) {
  const url = `${BASE_URL}?query=list&p=${page}&sterm=&name=subjcont&keyword=${encodeURIComponent(keyword)}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const $ = cheerio.load(data);
    const posts = [];

    $(".subject-link").each((index, element) => {
      const title = $(element).text().trim();
      const link = "https://www.inven.co.kr" + $(element).attr("href");
      posts.push({ title, link });
    });

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
  }
}

module.exports = { fetchPosts };
