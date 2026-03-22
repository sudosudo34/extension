function execute() {
    let response = fetch("https://truyencogiaothao.pro/");
    if (response.ok) {
        let doc = response.html();
        let data = [];
        
        // 1. Selector cho từng ô truyện
        let items = doc.select(".page-item-detail");

        items.forEach(item => {
            // 2. Lấy tên và link từ thẻ a trong .post-title
            let titleElement = item.select(".post-title a");
            let name = titleElement.text();
            let link = titleElement.attr("href");

            // 3. Lấy ảnh bìa (Madara dùng lazyload nên ưu tiên data-src)
            let imgElement = item.select("img");
            let cover = imgElement.attr("data-src") || imgElement.attr("src");

            // 4. Lấy tên chương mới nhất (làm phần mô tả nhỏ)
            let lastChap = item.select(".list-chapter .chapter-item .chapter a").first().text();

            if (name) { // Kiểm tra nếu có tên thì mới thêm vào danh sách
                data.push({
                    name: name,
                    link: link,
                    cover: cover,
                    description: lastChap, // Hiển thị "Chương 25" chẳng hạn
                    host: "https://truyencogiaothao.pro"
                });
            }
        });

        return Response.success(data);
    }
    return null;
}