function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        let data = [];
        
        // Chọn tất cả thẻ a trong các dòng chương
        let chapters = doc.select(".wp-manga-chapter a");
        
        chapters.forEach(item => {
            data.push({
                name: item.text().trim(),
                url: item.attr("href"),
                host: "https://truyencogiaothao.pro"
            });
        });

        // Đảo ngược danh sách để chương 1 lên đầu
        return Response.success(data.reverse());
    }
    return null;
}