function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        
        // Tên truyện nằm trong h1 của .post-title
        let name = doc.select(".post-title h1").text();
        
        // Tác giả nằm trong .author-content a
        let author = doc.select(".author-content a").text();
        
        // Mô tả nằm trong .description-summary
        let description = doc.select(".description-summary").html();
        
        // Ảnh bìa ưu tiên data-src vì web dùng lazyload
        let cover = doc.select(".summary_image img").attr("data-src") || doc.select(".summary_image img").attr("src");
        
        // Thông tin thêm (Thể loại, Tình trạng)
        let detail = "Tình trạng: " + doc.select(".post-status .summary-content").text() + "<br>";
        detail += "Thể loại: " + doc.select(".genres-content").text();

        return Response.success({
            name: name,
            cover: cover,
            author: author,
            description: description,
            detail: detail,
            host: "https://truyencogiaothao.pro"
        });
    }
    return null;
}