function execute(url) {
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        
        // 1. Chọn vùng chứa nội dung chính
        let content = doc.select(".reading-content .text-left");

        // 2. Loại bỏ các thành phần rác/quảng cáo dựa trên HTML bạn gửi
        content.select("script").remove(); // Xóa script
        content.select("div[data-type='_mgwidget']").remove(); // Xóa widget quảng cáo
        content.select(".chapter-content div").remove(); // Xóa các div rác trong content
        
        // 3. Xử lý hình ảnh (Nếu có hình ảnh minh họa từ Wattpad/Truyen2u như trong HTML)
        // Madara đôi khi để ảnh trong thẻ p hoặc div, lệnh .html() sẽ giữ lại tất cả
        let htmlContent = content.html();

        // 4. Dọn dẹp một chút về định dạng (tùy chọn)
        // Loại bỏ các đoạn text thừa nếu web chèn vào cuối bài
        htmlContent = htmlContent.replace(/Id tiktok: vivi_v89/g, ""); 

        return Response.success(htmlContent);
    }
    return null;
}