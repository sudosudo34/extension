function execute(key, page) {
    if (!page) page = '1';
    let response = fetch("https://truyencogiaothao.pro/page/" + page + "/", {
        method: "GET",
        queries: {
            "s": key,
            "post_type": "wp-manga"
        }
    });

    if (response.ok) {
        let doc = response.html();
        let data = [];
        // Madara khi search thường dùng class .c-tabs-item__content hoặc tương tự home
        let items = doc.select(".page-item-detail, .c-tabs-item__content"); 

        items.forEach(item => {
            let titleElement = item.select(".post-title a");
            data.push({
                name: titleElement.text(),
                link: titleElement.attr("href"),
                cover: item.select("img").attr("data-src") || item.select("img").attr("src"),
                description: item.select(".chapter a").first().text(),
                host: "https://truyencogiaothao.pro"
            });
        });
        return Response.success(data);
    }
    return null;
}